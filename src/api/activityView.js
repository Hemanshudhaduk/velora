import { EndPoint, TokenAPI } from "@/src/utils/common";

export async function getUpcomingActivityList(props) {
  try {
    const response = await TokenAPI.post(EndPoint.activityViewModule.upcomingActivityList, props);
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during upcoming activity page:", error);
  }
}

export async function getPreviousActivityList(props) {
  try {
    const response = await TokenAPI.post(EndPoint.activityViewModule.previousActivityList, props);
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during previous activity page:", error);
  }
}

export async function getCancelReservationPopupDetails(props) {
  try {
    const response = await TokenAPI.post(EndPoint.activityViewModule.openCancelPopupDetails, props);
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during open cancellation popup:", error);
  }
}

export async function cancelReservation(props) {
  try {
    const response = await TokenAPI.post(EndPoint.activityViewModule.cancelReservation, props);
    if (response?.status === "Success") return response;
  } catch (error) {
    return null;
  }
}
