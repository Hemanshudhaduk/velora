import { useTranslations } from "next-intl";
export const companyDetails = {
  id: 1,
  redirectTo: "/",
  Image: "/images/logos/image-1.svg",
  alt: "Holistikah",
};

export const Languages = [
  {
    id: 1,
    flagName: "English",
    value: "en",
  },
  {
    id: 2,
    flagName: "Swedish",
    value: "sv",
  },
];

export const navigationRoutes = [
  {
    id: 1,
    redirectTo: "/activity",
    translationKey: "activities",
  },
  {
    id: 2,
    redirectTo: "/providers",
    translationKey: "providers",
  },
  {
    id: 3,
    redirectTo: "/holipedia",
    translationKey: "holipedia",
  },
  {
    id: 4,
    redirectTo: "/articles",
    translationKey: "content.articles",
  },
  {
    id: 5,
    redirectTo: "/practitioner",
    translationKey: "forPractitioner",
  },
];

export const accountMenu = [
  {
    id: 1,
    redirectTo: "/settings",
    translationKey: "accountMenu.settings",
  },
  {
    id: 2,
    redirectTo: "/billing",
    translationKey: "accountMenu.billing",
  },
  {
    id: 3,
    redirectTo: "/activityView",
    translationKey: "accountMenu.upcomingAndPastActivities",
  },
  {
    id: 4,
    redirectTo: "/saved",
    translationKey: "accountMenu.saved",
  },
];

export const mobileMenu = [
  {
    id: 1,
    redirectTo: "/activity",
    translationKey: "activities",
  },
  {
    id: 2,
    redirectTo: "/providers",
    translationKey: "providers",
  },
  {
    id: 3,
    redirectTo: "/holipedia",
    translationKey: "holipedia",
  },
  {
    id: 4,
    redirectTo: "/practitioner",
    translationKey: "forPractitioner",
  },
  {
    id: 5,
    redirectTo: "/",
    translationKey: "accountMenu.greenYoga",
  },
  {
    id: 6,
    redirectTo: "/settings",
    translationKey: "accountMenu.settings",
  },
  {
    id: 7,
    redirectTo: "/billing",
    translationKey: "accountMenu.billing",
  },
  {
    id: 8,
    redirectTo: "/upcomingAndPastActivities",
    translationKey: "accountMenu.upcomingAndPastActivities",
  },
  {
    id: 9,
    redirectTo: "/saved",
    translationKey: "accountMenu.saved",
  },
  {
    id: 10,
    redirectTo: "/changePassword",
    translationKey: "accountMenu.changePassword",
  },
  {
    id: 11,
    redirectTo: "/signOut",
    translationKey: "accountMenu.signOut",
  },
];

export const footerCompanyRoutes = [
  {
    id: 1,
    redirectTo: "/",
    translationKey: "footer.home",
  },
  {
    id: 2,
    redirectTo: "/aboutus",
    translationKey: "footer.aboutUs",
  },
  {
    id: 3,
    redirectTo: "/support",
    translationKey: "footer.support",
  },
];

export const footerResourceRoutes = [
  {
    id: 1,
    redirectTo: "/holipedia",
    translationKey: "holipedia",
  },
  {
    id: 2,
    redirectTo: "/activity",
    translationKey: "activities",
  },
  {
    id: 3,
    redirectTo: "#categories",
    translationKey: "footer.categories",
  },
  {
    id: 4,
    redirectTo: "/symptoms",
    translationKey: "footer.symptoms",
  },
];

export const footerSocialRoutes = [
  {
    id: 1,
    redirectTo: "https://www.facebook.com/profile.php?id=61553247809685",
    translationKey: "footer.facebook",
  },
  {
    id: 2,
    redirectTo: "https://www.instagram.com/worldofholistikah/",
    translationKey: "footer.instagram",
  },
  {
    id: 3,
    redirectTo: " https://www.linkedin.com/company/101218158",
    translationKey: "footer.linkdln",
  },
];

export const FooterLegalRoutes = () => {
  const t = useTranslations();

  const footerLegalRoutes = [
    {
      id: 1,
      redirectTo: t("footer.redirectTerms"),
      translationKey: "footer.terms",
    },
    {
      id: 2,
      redirectTo: t("footer.redirectPrivacy"),
      translationKey: "footer.privacy",
    },
    {
      id: 3,
      redirectTo: t("footer.redirectCookies"),
      translationKey: "footer.cookies",
    },
  ];

  return footerLegalRoutes;
};

export const customerReviews = [
  {
    id: 1,
    nameTranslationKey: "practitionersModule.customerReview1.name",
    designationTranslationKey: "practitionersModule.customerReview1.designation",
    feedbackTranslationKey: "practitionersModule.customerReview1.feedback",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/Kaylynn%20Geidt.png`,
  },
  {
    id: 2,
    nameTranslationKey: "practitionersModule.customerReview1.name",
    designationTranslationKey: "practitionersModule.customerReview1.designation",
    feedbackTranslationKey: "practitionersModule.customerReview1.feedback",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/Kaylynn%20Geidt.png`,
  },
  {
    id: 3,
    nameTranslationKey: "practitionersModule.customerReview1.name",
    designationTranslationKey: "practitionersModule.customerReview1.designation",
    feedbackTranslationKey: "practitionersModule.customerReview1.feedback",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/Kaylynn%20Geidt.png`,
  },
];

export const coFounderDetails = [
  {
    id: 1,
    name: "Roger Söderkvist",
    designationTranslationKey: "aboutUsModule.coFounderCMO",
    descriptionTranslationKey: "aboutUsModule.coFounder1Description",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/AboutUsPage/Avatar.png`,
    linkedInUrl: "https://www.linkedin.com/in/rogersoderkvist/",
  },
  {
    id: 2,
    name: "Marina Ebe",
    designationTranslationKey: "aboutUsModule.coFounderContentCreator",
    descriptionTranslationKey: "aboutUsModule.coFounder2Description",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/AboutUsPage/Avatar-2.png`,
    linkedInUrl: "",
  },
  {
    id: 3,
    name: "Kajsa Andersson",
    designationTranslationKey: "aboutUsModule.coFounderOriginator",
    descriptionTranslationKey: "aboutUsModule.coFounder3Description",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/AboutUsPage/Avatar-3.png`,
    linkedInUrl: "https://www.linkedin.com/in/kajsa-andersson-743470133/",
  },
  {
    id: 4,
    name: "Jonas Hedlund",
    designationTranslationKey: "aboutUsModule.coFounderCEO",
    descriptionTranslationKey: "aboutUsModule.coFounder4Description",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/AboutUsPage/Avatar-4.png`,
    linkedInUrl: "https://www.linkedin.com/in/jonashedlund/",
  },
];

export const alphabet = [
  {
    locale: "en",
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    locale: "sv",
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ",
  },
  {
    locale: "hi", // Hindi
    letters: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह",
  },
  {
    locale: "gu", // Gujarati
    letters: "અઆઇઈઉઊઋએઐઓઔકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલવશષસહળ",
  },
];

export const platformItems = [
  {
    id: 1,
    titleTranslationKey: "practitionersModule.platformItems.item1.title",
    descriptionsTranslationKey: "practitionersModule.platformItems.item1.descriptions",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/Icons/booking.svg`,
  },
  {
    id: 2,
    titleTranslationKey: "practitionersModule.platformItems.item2.title",
    descriptionsTranslationKey: "practitionersModule.platformItems.item2.descriptions",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/Icons/size.svg`,
  },
  {
    id: 3,
    titleTranslationKey: "practitionersModule.platformItems.item3.title",
    descriptionsTranslationKey: "practitionersModule.platformItems.item3.descriptions",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/Icons/growth.svg`,
  },
  {
    id: 4,
    titleTranslationKey: "practitionersModule.platformItems.item4.title",
    descriptionsTranslationKey: "practitionersModule.platformItems.item4.descriptions",
    imageUrl: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/Icons/time.svg`,
  },
];

export const pricingPackage = [
  {
    id: 1,
    PlanTranslationKey: "practitionersModule.pricing.packagePlan.firstPlan",
    PlanValueTranslationKey: "practitionersModule.pricing.packagePlan.firstPlanValue",
    PlanPriceTranslationKey: "practitionersModule.pricing.packagePlan.firstPlanPrice",
    monthTranslationKey: "practitionersModule.pricing.packagePlan.month",
    durationTranslationKey: "practitionersModule.pricing.packagePlan.duration",
    DurationValueTranslationKey: "practitionersModule.pricing.packagePlan.firstDurationValue",
    attendanceTranslationKey: "practitionersModule.pricing.packagePlan.attendance",
    attendanceValueTranslationKey: "practitionersModule.pricing.packagePlan.attendanceValue",
    optionalTranslationKey: "practitionersModule.pricing.packagePlan.optional",
    onlinePaymentTranslationKey: "practitionersModule.pricing.packagePlan.onlinePayment",
    onlinePaymentValueTranslationKey: "practitionersModule.pricing.packagePlan.onlinePaymentValue",
    bookingSystemTranslationKey: "practitionersModule.pricing.packagePlan.bookingSystem",
    bookingSystemValueTranslationKey: "practitionersModule.pricing.packagePlan.bookingSystemValue",
    staffCalendarTranslationKey: "practitionersModule.pricing.packagePlan.staffCalendar",
    staffCalendarValueTranslationKey: "practitionersModule.pricing.packagePlan.staffCalendarValue",
    smsRemindersTranslationKey: "practitionersModule.pricing.packagePlan.smsReminders",
    smsRemindersValueTranslationKey: "practitionersModule.pricing.packagePlan.smsRemindersValue",
  },
  {
    id: 2,
    PlanTranslationKey: "practitionersModule.pricing.packagePlan.secondPlan",
    PlanValueTranslationKey: "practitionersModule.pricing.packagePlan.secondPlanValue",
    PlanPriceTranslationKey: "practitionersModule.pricing.packagePlan.secondPlanPrice",
    monthTranslationKey: "practitionersModule.pricing.packagePlan.month",
    durationTranslationKey: "practitionersModule.pricing.packagePlan.duration",
    DurationValueTranslationKey: "practitionersModule.pricing.packagePlan.secondDurationValue",
    attendanceTranslationKey: "practitionersModule.pricing.packagePlan.attendance",
    attendanceValueTranslationKey: "practitionersModule.pricing.packagePlan.unlimited",
    optionalTranslationKey: "practitionersModule.pricing.packagePlan.optional",
    onlinePaymentTranslationKey: "practitionersModule.pricing.packagePlan.onlinePayment",
    onlinePaymentValueTranslationKey: "practitionersModule.pricing.packagePlan.onlinePaymentValue",
    bookingSystemTranslationKey: "practitionersModule.pricing.packagePlan.bookingSystem",
    bookingSystemValueTranslationKey: "practitionersModule.pricing.packagePlan.bookingSystemValue",
    staffCalendarTranslationKey: "practitionersModule.pricing.packagePlan.staffCalendar",
    staffCalendarValueTranslationKey: "practitionersModule.pricing.packagePlan.staffCalendarValue",
    smsRemindersTranslationKey: "practitionersModule.pricing.packagePlan.smsReminders",
    smsRemindersValueTranslationKey: "practitionersModule.pricing.packagePlan.smsRemindersValue",
  },
  {
    id: 3,
    PlanTranslationKey: "practitionersModule.pricing.packagePlan.thirdPlan",
    PlanValueTranslationKey: "practitionersModule.pricing.packagePlan.thirdPlanValue",
    PlanPriceTranslationKey: "practitionersModule.pricing.packagePlan.thirdPlanPrice",
    monthTranslationKey: "practitionersModule.pricing.packagePlan.month",
    durationTranslationKey: "practitionersModule.pricing.packagePlan.duration",
    DurationValueTranslationKey: "practitionersModule.pricing.packagePlan.unlimited",
    attendanceTranslationKey: "practitionersModule.pricing.packagePlan.attendance",
    attendanceValueTranslationKey: "practitionersModule.pricing.packagePlan.unlimited",
    optionalTranslationKey: "practitionersModule.pricing.packagePlan.optional",
    onlinePaymentTranslationKey: "practitionersModule.pricing.packagePlan.onlinePayment",
    onlinePaymentValueTranslationKey: "practitionersModule.pricing.packagePlan.onlinePaymentValue",
    bookingSystemTranslationKey: "practitionersModule.pricing.packagePlan.bookingSystem",
    bookingSystemValueTranslationKey: "practitionersModule.pricing.packagePlan.bookingSystemValue",
    staffCalendarTranslationKey: "practitionersModule.pricing.packagePlan.staffCalendar",
    staffCalendarValueTranslationKey: "practitionersModule.pricing.packagePlan.staffCalendarValue",
    smsRemindersTranslationKey: "practitionersModule.pricing.packagePlan.smsReminders",
    smsRemindersValueTranslationKey: "practitionersModule.pricing.packagePlan.smsRemindersValue",
  },
];

export const alwaysIncluded = [
  {
    id: 1,
    titleTranslationKey: "practitionersModule.pricing.packagePlan.alwaysIncludedStep1",
  },
  {
    id: 2,
    titleTranslationKey: "practitionersModule.pricing.packagePlan.alwaysIncludedStep2",
  },
  {
    id: 3,
    titleTranslationKey: "practitionersModule.pricing.packagePlan.alwaysIncludedStep3",
  },
  {
    id: 4,
    titleTranslationKey: "practitionersModule.pricing.packagePlan.alwaysIncludedStep4",
  },
];

export const holipediaTopicList = [
  {
    id: 1,
    key: "otherAppellationsForTheMethod",
    titleTranslationKey: "holipediaModule.otherNamesForTheMethod",
  },
  {
    id: 2,
    key: "developedWhenAndBy",
    titleTranslationKey: "holipediaModule.developedWhenAndBy",
  },
  {
    id: 3,
    key: "effects",
    titleTranslationKey: "holipediaModule.effects",
  },
  {
    id: 4,
    key: "results",
    titleTranslationKey: "holipediaModule.results",
  },
  {
    id: 5,
    key: "symptoms",
    titleTranslationKey: "holipediaModule.symptoms",
  },
  {
    id: 6,
    key: "approach",
    titleTranslationKey: "holipediaModule.approach",
  },
  {
    id: 7,
    key: "duration",
    titleTranslationKey: "holipediaModule.duration",
  },
  {
    id: 8,
    key: "numberOfSessionsRequired",
    titleTranslationKey: "holipediaModule.howManySessionsAreRequired",
  },
  {
    id: 9,
    key: "numberOfTestsRequired",
    titleTranslationKey: "holipediaModule.howManyTestsAreRequired",
  },
  {
    id: 10,
    key: "isSuitableForYouWho",
    titleTranslationKey: "holipediaModule.isSuitableForYou",
  },
  {
    id: 11,
    key: "isNotSuitableForYouWho",
    titleTranslationKey: "holipediaModule.isNotSuitableForYou",
  },

  {
    id: 12,
    key: "previousExperienceRequired",
    titleTranslationKey: "holipediaModule.whatPriorKnowledgeIsRequired",
  },
  {
    id: 13,
    key: "worksOn",
    titleTranslationKey: "holipediaModule.workingOn",
  },
  {
    id: 14,
    key: "whatOthersAreSaying",
    titleTranslationKey: "holipediaModule.theExperiencesOfOthers",
  },
  {
    id: 15,
    key: "research",
    titleTranslationKey: "holipediaModule.research",
  },
  {
    id: 16,
    key: "readingTips",
    titleTranslationKey: "holipediaModule.readingTips",
  },
  {
    id: 17,
    key: "filmTips",
    titleTranslationKey: "holipediaModule.filmTips",
  },
  {
    id: 18,
    key: "community",
    titleTranslationKey: "holipediaModule.community",
  },
];

export const ourStoryImages = [
  {
    id: 1,
    url: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/ourstory1.jpg`,
  },
  {
    id: 2,
    url: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/ourstory2.jpg`,
  },
  {
    id: 3,
    url: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/ourstory3.jpg`,
  },
  {
    id: 4,
    url: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/ourstory4.jpg`,
  },
  {
    id: 5,
    url: `${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/ForPractitionersPage/ourstory5.jpg`,
  },
];

// export const HealthInOnePlaceImages = [
//   { id: 1, url: "/images/home/iStock-1402115248.jpg" },
//   { id: 2, url: "/images/home/iStock-1356338837.jpg" },
//   { id: 3, url: "/images/home/iStock-846236570.jpg" },
//   { id: 4, url: "/images/home/iStock-843237684.jpg" },
// ];

// export const FeaturePracticeImages = [
//   { id: 1, url: "/images/home/iStock-1461352916.jpg" },
//   { id: 2, url: "/images/home/iStock-1279631952.jpg" },
//   { id: 3, url: "/images/home/iStock-1446806057.jpg" },
//   { id: 4, url: "/images/home/iStock-1198298307.jpg" },
//   { id: 5, url: "/images/home/iStock-1286401346.jpg" },
// ];

export const EU_COUNTRY_CODES = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
  "GI",
  "IS",
  "LI",
  "NO",
  "CH",
  "ME",
  "MK",
  "RS",
  "TR",
  "AL",
  "BA",
  "XK",
  "AD",
  "BY",
  "MD",
  "MC",
  "RU",
  "UA",
  "VA",
  "AX",
  "FO",
  "GL",
  "SJ",
  "IM",
  "JE",
  "GG",
  "RS",
  "ME",
  "XK",
  "RS",
];

export const NumberOfCountry = [{ country: "Sweden", locale: "sv" }];

export const ActivityDefaultValues = {
  pageNumber: 0,
  pageSize: 50,
  minPageSize: 1,
  maxPageSize: 50,
  sortColumns: {
    languageCode: "en",
    sortColumnDistance: "Distance",
    sortColumnPopular: "Popular",
    sortOrder: "asc",
    sortOrderDesc: "desc",
  },
  filterColumns: {
    priceFrom: -1,
    priceFromMinValue: 0,
    priceTo: -1,
    priceToMinValue: 0,
    maxPrice: 99999999999.99,
    activityName: "",
    supportingType: [],
    category: [],
    topic: [],
    city: [],
    activityType: "In-Person",
    virtualActivityType: "OnlineCall",
    symptoms: [],
  },
};

export const getSortList = (_t, _params, _activityDefault) => {
  return [
    // {
    //   unqID: "1",
    //   displayTitle: _t("distance"),
    //   displaySubTitle: _t("distanceAscSubTitle"),
    //   disable:
    //     _params?.configuration?.filterColumns?.activityType === _activityDefault?.filterColumns?.virtualActivityType,
    //   value: {
    //     sortColumnName: "Distance",
    //     sortOrder: "asc",
    //   },
    // },
    // {
    //   unqID: "2",
    //   displayTitle: _t("popular"),
    //   displaySubTitle: _t("popularDescSubTitle"),
    //   value: {
    //     sortColumnName: "Popular",
    //     sortOrder: "desc",
    //   },
    // },
    // {
    //   unqID: "3",
    //   displayTitle: _t("duration"),
    //   displaySubTitle: _t("durationAscSubTitle"),
    //   value: {
    //     sortColumnName: "Duration",
    //     sortOrder: "asc",
    //   },
    // },
    // {
    //   unqID: "4",
    //   displayTitle: _t("duration"),
    //   displaySubTitle: _t("durationDescSubTitle"),
    //   value: {
    //     sortColumnName: "Duration",
    //     sortOrder: "desc",
    //   },
    // },
    {
      unqID: "5",
      displayTitle: _t("price"),
      displaySubTitle: _t("priceAscSubTitle"),
      disable:
        _params?.configuration?.filterColumns?.activityType === _activityDefault?.filterColumns?.virtualActivityType,
      value: {
        sortColumnName: "Price",
        sortOrder: "asc",
      },
    },
    {
      unqID: "6",
      displayTitle: _t("price"),
      displaySubTitle: _t("priceDescSubTitle"),
      value: {
        sortColumnName: "Price",
        sortOrder: "desc",
      },
    },
  ];
};

export const getSortListProvider = (_t, _params, _activityDefault) => {
  return [
    {
      unqID: "1",
      displayTitle: _t("distance"),
      displaySubTitle: _t("distanceAscSubTitle"),
      disable: !(
        _params?.configuration?.filterColumns?.activityType.includes(_activityDefault?.filterColumns?.activityType) &&
        _params?.configuration?.filterColumns?.activityType.length === 1
      ),
      value: {
        sortColumnName: "Distance",
        sortOrder: "asc",
      },
    },
    {
      unqID: "2",
      displayTitle: _t("popular"),
      displaySubTitle: _t("popularDescSubTitle"),
      value: {
        sortColumnName: "Popular",
        sortOrder: "desc",
      },
    },
  ];
};

export const ProviderDefaultValues = {
  pageNumber: 0,
  pageSize: 50,
  minPageSize: 1,
  maxPageSize: 50,
  sortColumns: {
    languageCode: "en",
    sortColumnDistance: "Distance",
    sortColumnPopular: "Popular",
    sortOrder: "asc",
    sortOrderDesc: "desc",
  },
  filterColumns: {
    providerName: "",
    supportingType: [],
    category: [],
    topic: [],
    city: [],
    activityType: [],
    symptoms: [],
  },
};

export const AuthorsDefaultValues = {
  pageNumber: 0,
  pageSize: 50,
  minPageSize: 1,
  maxPageSize: 50,
  languageCode: "en",
};

export const ArticlesDefaultValues = {
  pageNumber: 0,
  pageSize: 50,
  minPageSize: 1,
  maxPageSize: 50,
  languageCode: "en",
  filterColumns: {
    category: [],
    author: [],
  },
};

export const SearchDefaultItemCount = 3;
export const SearchNextItemCount = 3;
export const DefaultViewMoreCount = {
  activityLimit: SearchDefaultItemCount,
  providerLimit: SearchDefaultItemCount,
  supportedType: SearchDefaultItemCount,
  categoryLimit: SearchDefaultItemCount,
  topicsAtLimit: SearchDefaultItemCount,
  symptomsLimit: SearchDefaultItemCount,
};

export const DefaultViewMoreCountArticles = {
  articlesLimit: SearchDefaultItemCount,
};

export const emptyGuid = "00000000-0000-0000-0000-000000000000";

export const holipreneurURL = "https://holipreneur.com/";

export const specialCharacterRegex = /[`!@#$%^&*()+\-=\[\]{};:"\\|,.<>\/?~]/;

export const mobileValidation = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const online = "Online";

export const call = "Call";

export const authorLink = "/Holistikah/Icons/link.svg";
