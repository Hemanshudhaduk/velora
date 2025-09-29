import { API, EndPoint, SetupActivityCard, TokenAPI, generateURLFromPayload } from "@/src/utils/common";
import "@/src/utils/momentLocale";
import moment from "moment";

export async function fetchActivityList(payload, setGrid, t, router) {
  try {
    payload.pageNumber++;
    const response = await API.post(`${EndPoint.activities.getActivityList}`, payload);
    if (response?.status === "Success") {
      setGrid(SetupActivityCard(response, t));
      if (
        payload.pageNumber > Math.ceil(response.data.totalCount / payload.rowsPerPage) &&
        response.data.totalCount > 0
      ) {
        payload.pageNumber = 0;
        router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
      }
    } else {
      setGrid({ list: [], totalCount: 0 });
    }
    return response;
  } catch (error) {
    return null;
  }
}

export async function fetchFilterList(languageCode, pageName) {
  try {
    const response = await API.get(
      `${EndPoint.activities.getFilterLists}?languageCode=${languageCode}&pageName=${pageName}`
    );
    return response;
  } catch (error) {
    return null;
  }
}

export async function getEventBookingSummary(bookingGuid) {
  try {
    return await API.get(`${EndPoint.activities.getEventBookingDetails}?bookingGuid=${bookingGuid}`);
  } catch (error) {
    console.error("Error during fetching event summary:", error);
  }
}

export async function bookEventScheduleSlots(requestData) {
  try {
    const response = await TokenAPI.post(`${EndPoint.activityBooking.bookEventScheduleSlots}`, requestData);
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error while doing payment:", error);
  }
}

export async function confirmPaymentBooking(sessionID) {
  try {
    const response = await TokenAPI.get(`${EndPoint.activityBooking.confirmPaymentBooking}?sessionID=${sessionID}`);
    return response?.data;
  } catch (error) {
    console.error("Error while doing payment:", error);
  }
}

export async function fetchGlobalSearchList(payload, setSearchResult, t) {
  try {
    const response = await API.get(
      `${EndPoint.activities.globalSearch}?searchText=${payload.searchText}&size=${payload.size}&languageCode=${payload.languageCode}&lng=${payload.lng}&lat=${payload.lat}`
    );
    if (response?.status === "Success") {
      setSearchResult({
        activities: response.data.activity.map(item => ({
          unqGUID: item.unqGUID,
          title: item.activityName,
          calenderText:
            item.nextAvailable === null || item.timezone === null || item.nextAvailable.length === 0
              ? t("noNextAvailable")
              : item.nextAvailable.map(dateString => new Date(dateString)).filter(date => date > moment.utc()._d)
                    .length === 1
                ? `${t("nextAvailable")} ${moment(item.nextAvailable[0])
                    .tz(item.timezone)
                    .locale(t("languageCode"))
                    ?.format(`ddd, DD MMM • HH:mm`)} (${item.duration} ${
                    item.durationUnit === "M" ? t("minutes") : t("hours")
                  }) (${item.timezone})`
                : `${t("multipleAvailable")}, ${t("nextAvailable")} ${moment(
                    item.nextAvailable
                      .map(dateString => new Date(dateString))
                      .filter(date => date > moment.utc()._d)
                      .sort((a, b) => a - b)[0]
                  )
                    .tz(item.timezone)
                    .locale(t("languageCode"))
                    ?.format(`ddd, DD MMM • HH:mm`)} (${item.duration} ${
                    item.durationUnit === "M" ? t("minutes") : t("hours")
                  }) (${item.timezone})`,
          locationText: item.locationType,
        })),
        providers: response.data.provider.map(item => ({
          unqGUID: item.companyUnqGUID,
          title: item.companyName,
          locationText: item.companyFullAddress,
        })),
        supportingType: response.data.associatedFields.supportingType.map(item => ({
          unqGUID: item.unqGUID,
          title: item.title,
        })),
        category: response.data.associatedFields.category.map(item => ({
          unqGUID: item.unqGUID,
          title: item.title,
        })),
        topic: response.data.associatedFields.topic.map(item => ({
          unqGUID: item.unqGUID,
          title: item.title,
        })),
        symptom: response.data.associatedFields.symptom.map(item => ({
          unqGUID: item.unqGUID,
          title: item.title,
        })),
      });
    }
    return response;
  } catch (error) {
    return null;
  }
}
