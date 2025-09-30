const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_API_URL = process.env.NEXT_PUBLIC_TOKEN_API_URL;
const SIGNUP_BASE_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || API_URL;

const EndPoints = {
  homeModule: {
    getHomePageDetail: `${API_URL}Home/GetHomePageDetail`,
  },
  symptomModule: {
    getSymptomList: `${API_URL}Symptom/GetSymptomListWithLocalizationByLanguageCode`,
  },
  helpModule: {
    sendMailForContactSupport: `${API_URL}Help/SendMailForContactSupport`,
  },
  holipediaModule: {
    getTopicList: `${API_URL}Holipedia/GetTopicListWithLocalizationByLanguageCode`,
    getTopicDetails: `${API_URL}Holipedia/GetTopicDetailsWithSymptomListByTopicGUID`,
  },
  signUp: {
    customerSignUp: `${SIGNUP_BASE_URL}api/auth/register`,
  },
  signIn: {
    customerLogin: `${SIGNUP_BASE_URL}api/auth/login`,
  },
  activityModule: {
    showOtherStartDates: `${API_URL}Activities/ShowHolistikahOtherStartDates`,
    getEventOccasions: `${API_URL}Activities/GetEventOccasions`,
  },
  savedModule: {
    getSavedList: `${TOKEN_API_URL}Customer/GetCustomerBookmarks`,
    removeFromSaved: `${TOKEN_API_URL}Customer/RemoveCustomerBookmark`,
  },
  userSlice: {
    getSliceData: `${TOKEN_API_URL}User/GetUserSliceData`,
  },
  activities: {
    getActivityList: `${API_URL}Activities/GetActivityList`,
    getActivityByGuid: `${API_URL}Activities/GetActivityByGUID`,
    getEventBookingDetails: `${API_URL}ActivityBooking/GetEventBookingDetails/`,
    getFilterLists: `${API_URL}Activities/GetFilterLists`,
    saveActivity: `${TOKEN_API_URL}Customer/SaveCustomerBookmarks`,
    globalSearch: `${API_URL}Activities/GlobalSearchAssociate`,
  },
  providerModule: {
    getProviderList: `${API_URL}Provider/GetProviderList`,
    getProviderDetails: `${API_URL}Provider/GetProviderDetails`,
    getProviderByDomain: `${API_URL}Provider/GetProviderGuidFromDomain`,
    getProviderDetailSchedule: `${API_URL}Provider/GetProviderDetailsScheduled`,
    getActivityProviderSeoDetails: `${API_URL}Provider/GetActivityProviderSEO`,
  },
  activityViewModule: {
    upcomingActivityList: `${TOKEN_API_URL}Activities/GetUpcomingActivityList`,
    previousActivityList: `${TOKEN_API_URL}Activities/GetPreviousActivityList`,
    openCancelPopupDetails: `${TOKEN_API_URL}Activities/GetCancelReservationPopupDetails`,
    cancelReservation: `${TOKEN_API_URL}Customer/DeleteCustomerBooking`,
  },
  practitionerModule: {
    getSubscriptionProductWithAddOn: `${API_URL}BookingPayment/GetSubscriptionProductWithAddOn`,
  },
  settingModule: {
    getUserAccountDetailsByGuid: `${TOKEN_API_URL}Account/GetUserAccountDetailsByGuid`,
    updateUserAccountDetails: `${TOKEN_API_URL}Account/UpdateUserAccountDetails`,
  },
  activityBooking: {
    bookEventScheduleSlots: `${TOKEN_API_URL}ActivityBooking/BookEventScheduleSlots`,
    confirmPaymentBooking: `${TOKEN_API_URL}ActivityBooking/ConfirmPaymentBooking`,
  },
  bookService: {
    getActivityForBookingService: `${API_URL}Activities/GetActivityForBookingService`,
    getActivityWithNextAvailability: `${API_URL}Activities/GetActivityWithNextAvailability`,
    getActivityDetailForSummary: `${API_URL}Activities/GetActivityDetailForSummary`,
    getServiceTimeSlots: `${API_URL}ActivityBooking/GetTimeSlotsForService`,
    bookServiceTimeSlot: `${TOKEN_API_URL}ActivityBooking/BookServiceTimeSlot`,
  },
  billing: {
    getCustomerBillingDetails: `${TOKEN_API_URL}BookingPayment/GetCustomerBillingDetails`,
    getPaymentInvoiceURL: `${TOKEN_API_URL}BookingPayment/GetPaymentInvoiceURL`,
  },
};

export default EndPoints;
