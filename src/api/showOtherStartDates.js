import { API, EndPoint } from "@/src/utils/common";

export async function ShowHolistikahOtherStartDates(props) {
  try {
    const response = await API.get(
      `${EndPoint.activityModule.showOtherStartDates}?activityGuid=${props.guid}&pageSize=${props.pageSize}`
    );
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error while fetching start dates.", error);
    return error.message;
  }
}

export async function GetEventOccasions(props) {
  try {
    const response = await API.get(
      `${EndPoint.activityModule.getEventOccasions}?activityGuid=${props.guid}&pageSize=${props.pageSize}&bookingUnqGUID=${props.bookingUnqGUID}`
    );
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error while fetching while occasions.", error);
    return error.message;
  }
}
