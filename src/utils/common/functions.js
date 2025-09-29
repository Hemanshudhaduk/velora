import {
  ActivityDefaultValues,
  ArticlesDefaultValues,
  AuthorsDefaultValues,
  ProviderDefaultValues,
  call,
  online,
} from "@/src/constants";
import moment from "moment-timezone";

const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

export const getCurrencyFormatWithLanguage = (currencyCode, value, languageCode) => {
  return value.toLocaleString(languageCode.toLowerCase(), {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const generateConfiguration = page => {
  const pageNumber =
    Number.isInteger(parseInt(page.searchParams.pageNumber)) &&
    parseInt(page.searchParams.pageNumber) > ActivityDefaultValues.pageNumber
      ? parseInt(page.searchParams.pageNumber)
      : ActivityDefaultValues.pageNumber;
  const pageSize =
    Number.isInteger(parseInt(page.searchParams.pageSize)) &&
    parseInt(page.searchParams.pageSize) >= ActivityDefaultValues.minPageSize &&
    parseInt(page.searchParams.pageSize) <= ActivityDefaultValues.maxPageSize
      ? parseInt(page.searchParams.pageSize)
      : ActivityDefaultValues.pageSize;

  const priceFrom =
    parseFloat(page.searchParams.priceFrom) < ActivityDefaultValues.filterColumns.priceFromMinValue ||
    page.searchParams.priceFrom === undefined ||
    Array.isArray(page.searchParams.priceFrom) ||
    Number.isNaN(parseFloat(page.searchParams.priceFrom)) ||
    parseFloat(page.searchParams.priceFrom) > ActivityDefaultValues.filterColumns.maxPrice
      ? ActivityDefaultValues.filterColumns.priceFrom
      : parseFloat(page.searchParams.priceFrom);
  const priceTo =
    parseFloat(page.searchParams.priceTo) < ActivityDefaultValues.filterColumns.priceToMinValue ||
    page.searchParams.priceTo === undefined ||
    Array.isArray(page.searchParams.priceTo) ||
    Number.isNaN(parseFloat(page.searchParams.priceTo)) ||
    page.searchParams.priceTo < priceFrom ||
    parseFloat(page.searchParams.priceTo) > ActivityDefaultValues.filterColumns.maxPrice
      ? ActivityDefaultValues.filterColumns.priceTo
      : parseFloat(page.searchParams.priceTo);
  const activityName =
    page.searchParams.activityName === undefined || Array.isArray(page.searchParams.activityName)
      ? ""
      : page.searchParams.activityName;
  const supportingType =
    page.searchParams.supportingType === undefined
      ? []
      : Array.isArray(page.searchParams.supportingType)
        ? page.searchParams.supportingType.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.supportingType].filter(item => item !== "" && item !== undefined && item !== null);
  const category =
    page.searchParams.category === undefined
      ? []
      : Array.isArray(page.searchParams.category)
        ? page.searchParams.category.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.category].filter(item => item !== "" && item !== undefined && item !== null);
  const topic =
    page.searchParams.topic === undefined
      ? []
      : Array.isArray(page.searchParams.topic)
        ? page.searchParams.topic.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.topic].filter(item => item !== "" && item !== undefined && item !== null);
  const city =
    page.searchParams.city === undefined ||
    page.searchParams.activityType === ActivityDefaultValues.filterColumns.virtualActivityType
      ? []
      : Array.isArray(page.searchParams.city)
        ? page.searchParams.city.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.city].filter(item => item !== "" && item !== undefined && item !== null);
  const activityType =
    page.searchParams.activityType === ActivityDefaultValues.filterColumns.virtualActivityType
      ? ActivityDefaultValues.filterColumns.virtualActivityType
      : ActivityDefaultValues.filterColumns.activityType;
  const symptoms =
    page.searchParams.symptoms === undefined
      ? []
      : Array.isArray(page.searchParams.symptoms)
        ? page.searchParams.symptoms.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.symptoms].filter(item => item !== "" && item !== undefined && item !== null);

  const activityBookingType = page.searchParams.activityBookingType;

  let sortColumn;
  let sortOrder;
  if (activityType === ActivityDefaultValues.filterColumns.virtualActivityType) {
    if (
      page.searchParams.sortColumn === ActivityDefaultValues.sortColumns.sortColumnDistance ||
      page.searchParams.sortColumn === "" ||
      page.searchParams.sortColumn === null ||
      page.searchParams.sortColumn === undefined
    ) {
      sortColumn = ActivityDefaultValues.sortColumns.sortColumnPopular;
      sortOrder = ActivityDefaultValues.sortColumns.sortOrderDesc;
    } else {
      sortColumn = page.searchParams.sortColumn;
      if (page.searchParams.sortColumn === ActivityDefaultValues.sortColumns.sortColumnPopular) {
        sortOrder = ActivityDefaultValues.sortColumns.sortOrderDesc;
      } else {
        sortOrder = page.searchParams.sortOrder ?? ActivityDefaultValues.sortColumns.sortOrder;
      }
    }
  } else {
    if (
      page.searchParams.sortColumn === ActivityDefaultValues.sortColumns.sortColumnDistance ||
      page.searchParams.sortColumn === "" ||
      page.searchParams.sortColumn === null ||
      page.searchParams.sortColumn === undefined
    ) {
      sortColumn = ActivityDefaultValues.sortColumns.sortColumnDistance;
      sortOrder = ActivityDefaultValues.sortColumns.sortOrder;
    } else {
      sortColumn = page.searchParams.sortColumn;
      if (page.searchParams.sortColumn === ActivityDefaultValues.sortColumns.sortColumnPopular) {
        sortOrder = ActivityDefaultValues.sortColumns.sortOrderDesc;
      } else {
        sortOrder = page.searchParams.sortOrder ?? ActivityDefaultValues.sortColumns.sortOrder;
      }
    }
  }

  const payload = {
    pageNumber: pageNumber,
    rowsPerPage: pageSize,
    sortColumns: {
      addressLat: typeof window !== "undefined" && localStorage.getItem("latitude"),
      addressLong: typeof window !== "undefined" && localStorage.getItem("longitude"),
      languageCode: page?.params?.locale ?? ActivityDefaultValues.sortColumns.languageCode,
      sortColumnName: sortColumn,
      sortOrder: sortOrder,
    },
    filterColumns: {
      priceFrom: priceFrom,
      priceTo: priceTo,
      activityName: activityName,
      supportingType: supportingType,
      category: category,
      topic: topic,
      city: city,
      activityType: activityType,
      symptoms: symptoms,
      activityBookingType: activityBookingType,
    },
  };
  return payload;
};
export const generateURLFromPayload = payload => {
  const keyValuePairs = [];
  //Page
  if (payload.pageNumber !== undefined && payload.pageNumber !== ActivityDefaultValues.pageNumber) {
    keyValuePairs.push(`pageNumber=${payload.pageNumber}`);
  }
  if (payload.rowsPerPage !== undefined && payload.rowsPerPage !== ActivityDefaultValues.pageSize) {
    keyValuePairs.push(`pageSize=${payload.rowsPerPage}`);
  }

  //Filters
  if (
    payload.filterColumns.priceFrom !== ActivityDefaultValues.filterColumns.priceFrom &&
    payload.filterColumns.priceFrom !== undefined
  ) {
    keyValuePairs.push(`priceFrom=${payload.filterColumns.priceFrom}`);
  }
  if (
    payload.filterColumns.priceTo !== ActivityDefaultValues.filterColumns.priceTo &&
    payload.filterColumns.priceTo !== undefined
  ) {
    keyValuePairs.push(`priceTo=${payload.filterColumns.priceTo}`);
  }
  if (payload.filterColumns.activityName !== ActivityDefaultValues.filterColumns.activityName) {
    keyValuePairs.push(`activityName=${payload.filterColumns.activityName}`);
  }
  if (payload.filterColumns.supportingType !== ActivityDefaultValues.filterColumns.supportingType) {
    payload.filterColumns.supportingType.forEach(supportingType => {
      if (supportingType !== "" && supportingType !== undefined && supportingType !== null) {
        keyValuePairs.push(`supportingType=${supportingType}`);
      }
    });
  }
  if (payload.filterColumns.category !== ActivityDefaultValues.filterColumns.category) {
    payload.filterColumns.category.forEach(category => {
      if (category !== "" && category !== undefined && category !== null) {
        keyValuePairs.push(`category=${category}`);
      }
    });
  }
  if (payload.filterColumns.topic !== ActivityDefaultValues.filterColumns.topic) {
    payload.filterColumns.topic.forEach(topic => {
      if (topic !== "" && topic !== undefined && topic !== null) {
        keyValuePairs.push(`topic=${topic}`);
      }
    });
  }
  if (payload.filterColumns.city !== ActivityDefaultValues.filterColumns.city) {
    payload.filterColumns.city.forEach(city => {
      if (city !== "" && city !== undefined && city !== null) {
        keyValuePairs.push(`city=${city}`);
      }
    });
  }
  if (payload.filterColumns.activityType !== ActivityDefaultValues.filterColumns.activityType) {
    keyValuePairs.push(`activityType=${payload.filterColumns.activityType}`);
  }
  if (payload.filterColumns.symptoms !== ActivityDefaultValues.filterColumns.symptoms) {
    payload.filterColumns.symptoms.forEach(symptoms => {
      if (symptoms !== "" && symptoms !== undefined && symptoms !== null) {
        keyValuePairs.push(`symptoms=${symptoms}`);
      }
    });
  }

  //Sort
  if (
    payload.filterColumns.activityType === ActivityDefaultValues.filterColumns.activityType &&
    payload.sortColumns.sortColumnName !== ActivityDefaultValues.sortColumns.sortColumnDistance
  ) {
    keyValuePairs.push(`sortColumn=${payload.sortColumns.sortColumnName}`);
  } else if (
    payload.filterColumns.activityType === ActivityDefaultValues.filterColumns.virtualActivityType &&
    payload.sortColumns.sortColumnName !== ActivityDefaultValues.sortColumns.sortColumnPopular
  ) {
    keyValuePairs.push(`sortColumn=${payload.sortColumns.sortColumnName}`);
  }

  if (payload.sortColumns.sortOrder !== ActivityDefaultValues.sortColumns.sortOrder) {
    if (
      payload.filterColumns.activityType === ActivityDefaultValues.filterColumns.activityType &&
      payload.sortColumns.sortColumnName !== ActivityDefaultValues.sortColumns.sortColumnDistance
    ) {
      keyValuePairs.push(`sortOrder=${payload.sortColumns.sortOrder}`);
    } else if (
      payload.filterColumns.activityType === ActivityDefaultValues.filterColumns.virtualActivityType &&
      payload.sortColumns.sortColumnName !== ActivityDefaultValues.sortColumns.sortColumnPopular
    ) {
      keyValuePairs.push(`sortOrder=${payload.sortColumns.sortOrder}`);
    }
  }

  return keyValuePairs.join("&");
};

export const generateConfigurationProvider = page => {
  const pageNumber =
    Number.isInteger(parseInt(page.searchParams.pageNumber)) &&
    parseInt(page.searchParams.pageNumber) > ProviderDefaultValues.pageNumber
      ? parseInt(page.searchParams.pageNumber)
      : ProviderDefaultValues.pageNumber;
  const pageSize =
    Number.isInteger(parseInt(page.searchParams.pageSize)) &&
    parseInt(page.searchParams.pageSize) >= ProviderDefaultValues.minPageSize &&
    parseInt(page.searchParams.pageSize) <= ProviderDefaultValues.maxPageSize
      ? parseInt(page.searchParams.pageSize)
      : ProviderDefaultValues.pageSize;

  const providerName =
    page.searchParams.providerName === undefined || Array.isArray(page.searchParams.providerName)
      ? ""
      : page.searchParams.providerName;
  const supportingType =
    page.searchParams.supportingType === undefined
      ? []
      : Array.isArray(page.searchParams.supportingType)
        ? page.searchParams.supportingType.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.supportingType].filter(item => item !== "" && item !== undefined && item !== null);
  const category =
    page.searchParams.category === undefined
      ? []
      : Array.isArray(page.searchParams.category)
        ? page.searchParams.category.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.category].filter(item => item !== "" && item !== undefined && item !== null);
  const topic =
    page.searchParams.topic === undefined
      ? []
      : Array.isArray(page.searchParams.topic)
        ? page.searchParams.topic.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.topic].filter(item => item !== "" && item !== undefined && item !== null);
  const city =
    page.searchParams.city === undefined
      ? []
      : Array.isArray(page.searchParams.city)
        ? page.searchParams.city.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.city].filter(item => item !== "" && item !== undefined && item !== null);
  const activityType =
    page.searchParams.activityType === undefined
      ? []
      : Array.isArray(page.searchParams.activityType)
        ? page.searchParams.activityType.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.activityType].filter(item => item !== "" && item !== undefined && item !== null);
  const symptoms =
    page.searchParams.symptoms === undefined
      ? []
      : Array.isArray(page.searchParams.symptoms)
        ? page.searchParams.symptoms.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.symptoms].filter(item => item !== "" && item !== undefined && item !== null);

  let sortColumn;
  let sortOrder;
  if (
    page.searchParams.sortColumn === "" ||
    page.searchParams.sortColumn === null ||
    page.searchParams.sortColumn === undefined ||
    page.searchParams?.activityType?.includes(ActivityDefaultValues?.filterColumns?.virtualActivityType)
  ) {
    sortColumn = ProviderDefaultValues.sortColumns.sortColumnPopular;
    sortOrder = ProviderDefaultValues.sortColumns.sortOrderDesc;
  } else {
    sortColumn = ProviderDefaultValues.sortColumns.sortColumnDistance;
    sortOrder = ProviderDefaultValues.sortColumns.sortOrder;
  }

  const payload = {
    pageNumber: pageNumber,
    rowsPerPage: pageSize,
    sortColumns: {
      addressLat: typeof window !== "undefined" && localStorage.getItem("latitude"),
      addressLong: typeof window !== "undefined" && localStorage.getItem("longitude"),
      sortColumnName: sortColumn,
      sortOrder: sortOrder,
    },
    filterColumns: {
      providerName: providerName,
      supportingType: supportingType,
      category: category,
      topic: topic,
      city: city,
      activityType: activityType,
      symptoms: symptoms,
    },
  };
  return payload;
};
export const generateURLFromPayloadProvider = payload => {
  const keyValuePairs = [];
  //Page
  if (payload.pageNumber !== undefined && payload.pageNumber !== ProviderDefaultValues.pageNumber) {
    keyValuePairs.push(`pageNumber=${payload.pageNumber}`);
  }
  if (payload.rowsPerPage !== undefined && payload.rowsPerPage !== ProviderDefaultValues.pageSize) {
    keyValuePairs.push(`pageSize=${payload.rowsPerPage}`);
  }

  //Filters
  if (payload.filterColumns.providerName !== ProviderDefaultValues.filterColumns.providerName) {
    keyValuePairs.push(`providerName=${payload.filterColumns.providerName}`);
  }
  if (payload.filterColumns.supportingType !== ProviderDefaultValues.filterColumns.supportingType) {
    payload.filterColumns.supportingType.forEach(supportingType => {
      if (supportingType !== "" && supportingType !== undefined && supportingType !== null) {
        keyValuePairs.push(`supportingType=${supportingType}`);
      }
    });
  }
  if (payload.filterColumns.category !== ProviderDefaultValues.filterColumns.category) {
    payload.filterColumns.category.forEach(category => {
      if (category !== "" && category !== undefined && category !== null) {
        keyValuePairs.push(`category=${category}`);
      }
    });
  }
  if (payload.filterColumns.topic !== ProviderDefaultValues.filterColumns.topic) {
    payload.filterColumns.topic.forEach(topic => {
      if (topic !== "" && topic !== undefined && topic !== null) {
        keyValuePairs.push(`topic=${topic}`);
      }
    });
  }
  if (payload.filterColumns.city !== ProviderDefaultValues.filterColumns.city) {
    payload.filterColumns.city.forEach(city => {
      if (city !== "" && city !== undefined && city !== null) {
        keyValuePairs.push(`city=${city}`);
      }
    });
  }
  if (payload.filterColumns.activityType !== ProviderDefaultValues.filterColumns.activityType) {
    payload.filterColumns.activityType.forEach(activityType => {
      if (activityType !== "" && activityType !== undefined && activityType !== null) {
        keyValuePairs.push(`activityType=${activityType}`);
      }
    });
  }
  if (payload.filterColumns.symptoms !== ProviderDefaultValues.filterColumns.symptoms) {
    payload.filterColumns.symptoms.forEach(symptoms => {
      if (symptoms !== "" && symptoms !== undefined && symptoms !== null) {
        keyValuePairs.push(`symptoms=${symptoms}`);
      }
    });
  }

  //Sort
  if (
    payload.filterColumns.activityType[0] === ActivityDefaultValues.filterColumns.activityType &&
    payload.sortColumns.sortColumnName !== ProviderDefaultValues.sortColumns.sortColumnPopular
  ) {
    keyValuePairs.push(`sortColumn=${payload.sortColumns.sortColumnName}`);
    keyValuePairs.push(`sortOrder=${payload.sortColumns.sortOrder}`);
  }

  return keyValuePairs.join("&");
};

export const generateConfigurationAuthors = page => {
  const pageNumber =
    Number.isInteger(parseInt(page.searchParams.pageNumber)) &&
    parseInt(page.searchParams.pageNumber) > AuthorsDefaultValues.pageNumber
      ? parseInt(page.searchParams.pageNumber)
      : AuthorsDefaultValues.pageNumber;
  const pageSize =
    Number.isInteger(parseInt(page.searchParams.pageSize)) &&
    parseInt(page.searchParams.pageSize) >= AuthorsDefaultValues.minPageSize &&
    parseInt(page.searchParams.pageSize) <= AuthorsDefaultValues.maxPageSize
      ? parseInt(page.searchParams.pageSize)
      : AuthorsDefaultValues.pageSize;

  const locale = page?.params?.locale ?? AuthorsDefaultValues.languageCode;

  const payload = {
    pageNumber: pageNumber,
    rowsPerPage: pageSize,
    locale: locale,
  };
  return payload;
};

export const generateURLFromPayloadAuthors = payload => {
  const keyValuePairs = [];
  if (payload.pageNumber !== undefined && payload.pageNumber !== AuthorsDefaultValues.pageNumber) {
    keyValuePairs.push(`pageNumber=${payload.pageNumber}`);
  }
  if (payload.rowsPerPage !== undefined && payload.rowsPerPage !== AuthorsDefaultValues.pageSize) {
    keyValuePairs.push(`pageSize=${payload.rowsPerPage}`);
  }

  return keyValuePairs.join("&");
};

export const generateConfigurationArticles = page => {
  const pageNumber =
    Number.isInteger(parseInt(page.searchParams.pageNumber)) &&
    parseInt(page.searchParams.pageNumber) > ArticlesDefaultValues.pageNumber
      ? parseInt(page.searchParams.pageNumber)
      : ArticlesDefaultValues.pageNumber;
  const pageSize =
    Number.isInteger(parseInt(page.searchParams.pageSize)) &&
    parseInt(page.searchParams.pageSize) >= ArticlesDefaultValues.minPageSize &&
    parseInt(page.searchParams.pageSize) <= ArticlesDefaultValues.maxPageSize
      ? parseInt(page.searchParams.pageSize)
      : ArticlesDefaultValues.pageSize;

  const category =
    page.searchParams.category === undefined
      ? []
      : Array.isArray(page.searchParams.category)
        ? page.searchParams.category.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.category].filter(item => item !== "" && item !== undefined && item !== null);

  const author =
    page.searchParams.author === undefined
      ? []
      : Array.isArray(page.searchParams.author)
        ? page.searchParams.author.filter(item => item !== "" && item !== undefined && item !== null)
        : [page.searchParams.author].filter(item => item !== "" && item !== undefined && item !== null);

  const locale = page?.params?.locale ?? ArticlesDefaultValues.languageCode;

  const payload = {
    pageNumber: pageNumber,
    rowsPerPage: pageSize,
    locale: locale,
    filterColumns: {
      category: category,
      author: author,
    },
  };

  return payload;
};

export const generateURLFromPayloadArticles = payload => {
  const keyValuePairs = [];
  if (payload.pageNumber !== undefined && payload.pageNumber !== ArticlesDefaultValues.pageNumber) {
    keyValuePairs.push(`pageNumber=${payload.pageNumber}`);
  }
  if (payload.rowsPerPage !== undefined && payload.rowsPerPage !== ArticlesDefaultValues.pageSize) {
    keyValuePairs.push(`pageSize=${payload.rowsPerPage}`);
  }

  if (payload.filterColumns.category !== ArticlesDefaultValues.filterColumns.category) {
    payload.filterColumns.category.forEach(category => {
      if (category !== "" && category !== undefined && category !== null) {
        keyValuePairs.push(`category=${category}`);
      }
    });
  }
  if (payload.filterColumns.author !== ArticlesDefaultValues.filterColumns.author) {
    payload.filterColumns.author.forEach(author => {
      if (author !== "" && author !== undefined && author !== null) {
        keyValuePairs.push(`author=${author}`);
      }
    });
  }

  return keyValuePairs.join("&");
};

export const ConvertUTCToUserTimeZone = (dateValue, userTimeZoneName) => {
  return moment(dateValue).utc(true).tz(userTimeZoneName);
};
export const ConvertUserTimeZoneToUTC = (dateValue, userTimeZoneName) => {
  return moment.tz(dateValue, userTimeZoneName).utc();
};

export const redirectToSignIn = (route, pathname) => {
  localStorage.setItem("redirectURL", pathname);
  route.push(`/signin`);
};

export const SetupActivityCard = (response, t) => {
  const data = {
    list: response.data?.list.map(item => ({
      title: item.activityName,
      imageUrl: `${
        item.imageURL === null || item.imageURL === undefined || item.imageURL === ""
          ? ""
          : `${BLOB_DOMAIN}/${item.imageURL}`
      }`,
      noImageText: t("noPictureText"),
      calenderText:
        item.nextAvailable === null || item.timezone === null || item.nextAvailable.length === 0
          ? t("noNextAvailable")
          : item.nextAvailable.map(dateString => new Date(dateString)).filter(date => date > moment.utc()._d).length ===
              1
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
      locationText:
        item.locationType === online || item.locationType === call
          ? t(`providersList.${item.locationType.toLowerCase()}`)
          : item.locationType,
      priceText:
        item.currencyCode === null || item.currencyCode === undefined || item.currencyCode === ""
          ? ""
          : getCurrencyFormatWithLanguage(item.currencyCode, item.price, "en"),
      bottomRight: [
        {
          reference: `/activity/${item.unqGUID}`,
          label: t("view"),
          variant: "view",
        },
      ],
    })),
    totalCount: response.data?.totalCount ?? 0,
  };
  return data;
};
