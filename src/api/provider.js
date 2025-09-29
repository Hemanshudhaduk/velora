import { API, EndPoint, generateURLFromPayload } from "@/src/utils/common";

const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

export async function fetchProviderList(payload, setGrid, t, router) {
  try {
    payload.pageNumber++;
    const response = await API.post(`${EndPoint.providerModule.getProviderList}`, payload);
    if (response?.status === "Success") {
      setGrid({
        list: response.data?.list.map(item => ({
          title: item.companyName,
          imageUrl: `${
            item.imageURL === null || item.imageURL === undefined || item.imageURL === ""
              ? ""
              : `${BLOB_DOMAIN}/${item.imageURL}`
          }`,
          noImageText: t("noPictureText"),
          locationText: item.companyFullAddress,
          bottomRight: [
            {
              reference: `/providers/${item.companyUnqGUID}`,
              label: t("view"),
              variant: "view",
            },
          ],
        })),
        totalCount: response.data.totalCount ?? 0,
      });
      if (
        payload.pageNumber > Math.ceil(response.data.totalCount / payload.rowsPerPage) &&
        response.data.totalCount > 0
      ) {
        payload.pageNumber = 0;
        router.replace(`providers?${generateURLFromPayload(payload)}`, { shallow: true });
      }
    } else {
      setGrid({ list: [], totalCount: 0 });
    }
    return response;
  } catch (error) {
    return null;
  }
}

export async function fetchFilterList(languageCode) {
  try {
    const response = await API.get(`${EndPoint.activities.getFilterLists}?languageCode=${languageCode}`);
    return response;
  } catch (error) {
    return null;
  }
}

export async function getProviderDetails(guid, userGuid, locale) {
  try {
    const response = await API.get(
      `${EndPoint.providerModule.getProviderDetails}?guid=${guid}&userUnqGUID=${userGuid}&languageCode=${locale}`
    );
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching provider details:", error);
  }
}

export async function getProviderGuidFromDomain(domain) {
  try {
    const response = await API.get(`${EndPoint.providerModule.getProviderByDomain}?domain=${domain}`);
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching provider details:", error);
  }
}

export async function getProviderDetailsScheduled(requestData) {
  try {
    const response = await API.post(EndPoint.providerModule.getProviderDetailSchedule, requestData);
    if (response?.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching provider detail schedule:", error);
  }
}
