import { EndPoint, TokenAPI } from "@/src/utils/common";
export async function getUserAccountDetailsByGuid(props) {
  try {
    const response = await TokenAPI.get(`${EndPoint.settingModule.getUserAccountDetailsByGuid}?userUnqGuid=${props}`);
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching User Account Detail:", error);
  }
}
export async function updateUserAccountDetails(props) {
  try {
    const response = await TokenAPI.post(EndPoint.settingModule.updateUserAccountDetails, props);
    if (response.status === "Success") return response;
  } catch (error) {
    return null;
  }
}
