import { API, EndPoint, TokenAPI } from "@/src/utils/common";

export async function CustomerSignUp(props) {
  try {
    const response = await API.post(EndPoint.signUp.customerSignUp, props);
    return response;
  } catch (error) {
    return null;
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
