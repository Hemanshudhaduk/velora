import { API, EndPoint } from "@/src/utils/common";

export async function sendMailForContactSupport(props) {
  try {
    const response = await API.post(EndPoint.helpModule.sendMailForContactSupport, props);
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during contacting to support:", error);
  }
}
