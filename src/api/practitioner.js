import { API, EndPoint } from "@/src/utils/common";

export async function getSubscriptionProductWithAddOn(props) {
  try {
    const response = await API.post(EndPoint.practitionerModule.getSubscriptionProductWithAddOn, props);
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.log("Error during contacting to support:", error);
  }
}
