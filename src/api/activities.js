import { API, EndPoint, TokenAPI } from "../utils";

export const getActivityDetails = async ({ guid, userGuid, locale }) => {
  try {
    const res = await API.get(
      `${EndPoint.activities.getActivityByGuid}?guid=${guid}&userUnqGUID=${userGuid}&languageCode=${locale}`
    );
    if (res.status === "Success") {
      return await res.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error while getting the activity Details", err.message);
    return err.message;
  }
};

export const saveActivity = async payload => {
  try {
    const res = await TokenAPI.post(EndPoint.activities.saveActivity, payload);
    return { status: res?.status, message: res?.message };
  } catch (err) {
    console.error("Error while post, save activity", err.message);
    return err.message;
  }
};

export async function GetActivitySeoDetails(guid, locale) {
  try {
    const response = await API.get(
      `${EndPoint.providerModule.getActivityProviderSeoDetails}?activityGuid=${guid}&languageCode=${locale}`
    );
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching provider details:", error);
  }
}
