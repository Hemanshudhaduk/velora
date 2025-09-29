import { API, EndPoint, TokenAPI } from "@/src/utils/common";

export const getActivityDetails = async ({ guid }) => {
  try {
    const response = await API.get(`${EndPoint.bookService.getActivityForBookingService}?activityGuid=${guid}`);
    return response;
  } catch (err) {
    return err?.message;
  }
};

export const getActivityWithNextAvailability = async ({ guid }) => {
  try {
    const response = await API.get(`${EndPoint.bookService.getActivityWithNextAvailability}?activityGuid=${guid}`);
    return response;
  } catch (err) {
    return err?.message;
  }
};

export const getActivityDetailForSummary = async ({ guid }) => {
  try {
    const response = await API.get(`${EndPoint.bookService.getActivityDetailForSummary}?activityGuid=${guid}`);
    return response;
  } catch (err) {
    return err?.message;
  }
};

export const getActivityDetailsWithCancelation = async ({ guid, source }) => {
  try {
    const response = await API.get(`${EndPoint.bookService.getActivityForBookingService}?activityGuid=${guid}`, {
      cancelToken: source.token,
    });
    return response;
  } catch (err) {
    return err?.message;
  }
};

export const getServiceTimeSlots = async (request, source) => {
  try {
    const response = await API.post(`${EndPoint.bookService.getServiceTimeSlots}`, request, {
      cancelToken: source.token,
    });
    if (response.status === "Success") {
      return await response.data;
    } else {
      return null;
    }
  } catch (err) {
    return err?.message;
  }
};

export const saveServiceTimeSlots = async request => {
  try {
    return await TokenAPI.post(`${EndPoint.bookService.bookServiceTimeSlot}`, request);
  } catch (err) {
    console.error("Error while saving service booking", err.message);
    return err.message;
  }
};
