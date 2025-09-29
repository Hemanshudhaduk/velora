const tenant = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  authority: process.env.NEXT_PUBLIC_AUTHORITY,
  signUpSignIn: process.env.NEXT_PUBLIC_SIGNUP_SIGNIN,
  signIn: process.env.NEXT_PUBLIC_SIGN_IN,
  redirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL,
  postLogoutRedirectURL: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URL,
  loginScope: process.env.NEXT_PUBLIC_LOGIN_SCOPE, // api client ID "62848333-632c-402d-97e4-25553e0c1510"
  signInPolicyName: process.env.NEXT_PUBLIC_SIGN_IN_POLICY_NAME,
  resetPassword: process.env.NEXT_PUBLIC_RESET_PASSWORD,
  passwordReset: process.env.NEXT_PUBLIC_PASSWORD_RESET,
  changePassword: process.env.NEXT_PUBLIC_CHANGE_PASSWORD,
  passwordChange: process.env.NEXT_PUBLIC_PASSWORD_CHANGE,
};
export const msalConfig = {
  auth: {
    clientId: tenant.clientId,
    authority: tenant.signUpSignIn,
    knownAuthorities: [tenant.authority],
    redirectUri: tenant.redirectURL,
  },
};
// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["openid", tenant.loginScope],
};

export const resetPasswordRequest = {
  authority: tenant.resetPassword,
};

export const changePasswordRequest = {
  authority: tenant.changePassword,
};

export const tokenRequest = {
  scopes: [tenant.loginScope], // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
  forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
};

// Add here scopes for silent token request
export const silentRequest = {
  scopes: [tenant.loginScope],
};

export const { signInPolicyName } = tenant;
export const { passwordReset } = tenant;
