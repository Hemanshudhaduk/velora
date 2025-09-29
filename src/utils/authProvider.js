import * as Msal from "@azure/msal-browser";
import { login } from "../lib/slice/userSlice";
import store from "../lib/store";
import {
  changePasswordRequest,
  loginRequest,
  msalConfig,
  passwordReset,
  resetPasswordRequest,
  signInPolicyName,
  silentRequest,
  tokenRequest,
} from "./authConfig";

const msalApp = new Msal.PublicClientApplication(msalConfig);

let accountId = "";
let accessToken = "";

msalApp
  .handleRedirectPromise()
  .then(handleResponse)
  .catch(error => {
    console.error(error);
    // Check for forgot password error
    // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
    if (error.errorMessage.indexOf("AADB2C90118") > -1) {
      try {
        msalApp.loginRedirect(resetPasswordRequest);
      } catch (err) {
        console.error(err);
      }
    }
    if (error.errorMessage.indexOf("AADB2C90091") > -1) {
      //AADB2C90091: The user has cancelled entering self-asserted information.
      try {
        window.location.href = localStorage.getItem("redirectURL");
      } catch (err) {
        console.error(err);
      }
    }
  });

function selectAccount() {
  const currentAccounts = msalApp.getAllAccounts();
  const latestUser = currentAccounts?.find(
    item => item.idTokenClaims["tfp"]?.toLowerCase() === signInPolicyName?.toLowerCase()
  );
  accountId = latestUser?.homeAccountId;
  if (!currentAccounts || currentAccounts.length < 1 || !latestUser) {
    store.dispatch(
      login({
        accessToken: "",
        userName: "",
        isAuthenticated: false,
      })
    );
    return;
  } else if (currentAccounts.length > 0) {
    localStorage.setItem("isSignedIn", true);
    store.dispatch(
      login({
        accessToken: accessToken,
        userName: latestUser.username,
        isAuthenticated: true,
      })
    );
  }
}

export function resetPassword() {
  msalApp.loginRedirect(resetPasswordRequest);
}

export function changePassword() {
  msalApp.loginRedirect(changePasswordRequest);
}

function handleResponse(response) {
  if (response !== null) {
    if (response.accessToken !== null) {
      accessToken = response.accessToken;
    }
    if (response.state) {
      const { redirectPage } = JSON.parse(response.state);
      if (redirectPage && redirectPage !== "/signup") {
        window.location.href = redirectPage;
        return;
      }
    }
    if (response.idTokenClaims["acr"]?.toLowerCase() === passwordReset?.toLowerCase()) {
      // Choose which account to logout from by passing a accountId.
      const logoutRequest = {
        account: msalApp.getAccountByHomeId(accountId),
      };
      msalApp.logoutRedirect(logoutRequest);
    } else {
      selectAccount();
    }
  } else {
    selectAccount();
  }
}

let isInteractionInProgress = false;
export const signIn = async redirectPage => {
  if (!isInteractionInProgress) {
    isInteractionInProgress = true;
    try {
      localStorage.removeItem("isSignedIn");
      if (redirectPage) {
        const loginRequestWithState = {
          ...loginRequest,
          state: JSON.stringify({ redirectPage }),
        };
        await msalApp.loginRedirect(loginRequestWithState);
      } else {
        await msalApp.loginRedirect(loginRequest);
      }
    } catch (error) {
      isInteractionInProgress = false; // Reset the flag in case of an error
    }
  } else {
    console.log("Interaction is already in progress. Please wait for it to complete.");
  }
};

export const signOut = async () => {
  localStorage.removeItem("isSignedIn");
  // Choose which account to logout from by passing a accountId.
  store.dispatch(
    login({
      accessToken: "",
      userName: "",
      isAuthenticated: false,
    })
  );
  const logoutRequest = {
    account: msalApp.getAccountByHomeId(accountId),
  };
  msalApp.logoutRedirect(logoutRequest);
};

export const acquireAccessToken = async () => {
  await msalApp.handleRedirectPromise();
  silentRequest.account = msalApp.getAccountByHomeId(accountId);
  return msalApp.acquireTokenSilent(silentRequest).catch(error => {
    console.warn("silent token acquisition fails. acquiring token using interactive method");
    if (error) {
      // fallback to interaction when silent call fails
      tokenRequest.account = msalApp.getAccountByHomeId(accountId);
      return msalApp.acquireTokenRedirect(tokenRequest);
    } else {
      console.warn(error);
    }
  });
};
