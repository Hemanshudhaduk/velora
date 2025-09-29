import { API, EndPoint } from "@/src/utils/common";

export async function GetProviderDetails(guid) {
  try {
    const response = await API.get(`${EndPoint.providerModule.getProviderDetails}?guid=${guid}`);
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching provider details:", error);
  }
}

export async function GetProviderSeoDetails(guid, locale) {
  try {
    const response = await API.get(
      `${EndPoint.providerModule.getActivityProviderSeoDetails}?companyGuid=${guid}&languageCode=${locale}`
    );
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching provider details:", error);
  }
}
