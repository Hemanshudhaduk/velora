import { API, EndPoint, TokenAPI } from "@/src/utils/common";

export async function CustomerSignUp(props) {
  try {
    const response = await API.post(EndPoint.signUp.customerSignUp, props);
    // Normalize expected shape for UI
    if (response?.success !== undefined) {
      return response;
    }
    return { success: true, data: response };
  } catch (error) {
    // Ensure consistent error object
    const message =
      error?.message || error?.error || "Registration failed. Please try again.";
    return { success: false, message };
  }
}

export async function CustomerLogin(props) {
  try {
    const response = await API.post(EndPoint.signIn.customerLogin, props);
    if (response?.success !== undefined) {
      return response;
    }
    return { success: true, data: response };
  } catch (error) {
    const message = error?.message || error?.error || "Login failed. Please try again.";
    return { success: false, message };
  }
}

export async function UserSliceData(props) {
  try {
    const response = await TokenAPI.get(`${EndPoint.userSlice.getSliceData}?email=${props}`);
    return response;
  } catch (error) {
    return null;
  }
}
