"use client";
import { saveServiceTimeSlots } from "@/src/api/bookService";
import FuseSplashScreen from "@/src/app/[locale]/auth/fuseSplashScreen";
import { Spinner } from "@/src/components";
import { CommonSnackBar, SnackState } from "@/src/components/atoms";
import { dateTimeFormate } from "@/src/constants";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { ConvertUTCToUserTimeZone, getCurrencyFormatWithLanguage, redirectToSignIn } from "@/src/utils";
import { Box, Button, Grid } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { useTranslations } from "next-intl";
import { notFound, usePathname, useRouter } from "next/navigation";
import { trackPromise } from "react-promise-tracker";
import { useSelector } from "react-redux";
import { StaffCard, TitleContentUnit } from "../molecules";
import { SummaryContainerStyle } from "../style";

function SummaryForm(props) {
  const { locale, activityDetail } = props;
  const route = useRouter();
  const pathname = usePathname();
  const getUser = useSelector(selectUser);
  const getUserDetails = useSelector(selectUserDetail);

  if (!getUser?.data?.email) redirectToSignIn(route, pathname);
  const t = useTranslations();
  const [snack, closeSnack, showSnackbar] = SnackState();
  const summaryDetails = JSON.parse(localStorage.getItem("serviceSummary") ?? {});
  if (!summaryDetails?.selectedTimeSlot) {
    return notFound();
  }
  const promiseResponse = async formData => {
    return new Promise(async (resolve, reject) => {
      const response = await saveServiceTimeSlots(formData);
      resolve(response);
    });
  };
  const selectedTimeSlot = summaryDetails?.selectedTimeSlot;
  const handleSubmit = async () => {
    const request = {
      serviceGUID: activityDetail?.activityGuid,
      customerGUID: getUserDetails?.userDetailUnqGuid,
      startDateTimeUTC: selectedTimeSlot?.startDateTimeUTC,
      startTimeWithoutBufferUTC: selectedTimeSlot?.startTimeWithoutBufferUTC,
      endTimeWithoutBufferUTC: selectedTimeSlot?.endTimeWithoutBufferUTC,
      endDateTimeUTC: selectedTimeSlot?.endDateTimeUTC,
      resourceList: selectedTimeSlot?.resourceList,
      languageCode: locale,
    };
    // If same user create 2 or more booking with different tabs to handle that case.
    localStorage.setItem("serviceSummary", JSON.stringify(summaryDetails));
    trackPromise(
      promiseResponse(request).then(response => {
        if (response?.status === "Success") {
          if (activityDetail?.isOnlinePayment) {
            window.location.href = response?.data?.url;
          } else {
            const summaryPageData = {
              paymentStatus: "paid",
              activityName: activityDetail?.activityName,
              startDateTimeUTC: selectedTimeSlot?.startTimeWithoutBufferUTC,
              endDateTimeUTC: selectedTimeSlot?.endTimeWithoutBufferUTC,
              googleTimezone: activityDetail?.googleTimeZoneName,
              occurrencesCount: 0,
              activityType: "Service",
            };
            localStorage.setItem("summaryPageData", JSON.stringify(summaryPageData));
            route.push(`/bookingConfirmation/${activityDetail?.activityGuid}`);
          }
          localStorage.setItem("serviceSummary", JSON.stringify({}));
        } else {
          showSnackbar(t(response?.message), "error");
        }
      })
    );
  };
  return (
    <>
      {getUser?.data?.email !== "" ? (
        <>
          <Spinner />
          <SummaryContainerStyle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TitleContentUnit
                  title={t("summary.activity")}
                  content1={activityDetail?.activityName}
                  content2={activityDetail?.companyName}
                />
                {activityDetail?.resourcesDetails?.length > 0 && (
                  <>
                    <TitleContentUnit title={t("summary.practitioner")} content1={t("summary.practitionerContent")} />
                    {_.map(activityDetail?.resourcesDetails ?? [], resource => {
                      return (
                        <StaffCard
                          key={resource.resourceGuid}
                          staffName={resource.resourceName}
                          aboutDescription={resource.aboutDescription}
                          imageURL={resource.imageURL}
                        />
                      );
                    })}
                  </>
                )}
                <TitleContentUnit
                  title={t("showOtherStartDatesPage.time")}
                  content1={moment(
                    ConvertUTCToUserTimeZone(
                      selectedTimeSlot?.startTimeWithoutBufferUTC,
                      activityDetail?.googleTimeZoneName
                    )
                  )
                    .locale(t("languageCode"))
                    .format(dateTimeFormate.ddddDMMMMYYY)}
                  content2={`${moment(
                    ConvertUTCToUserTimeZone(
                      selectedTimeSlot?.startTimeWithoutBufferUTC,
                      activityDetail?.googleTimeZoneName
                    )
                  ).format(dateTimeFormate.HHmm)} - ${moment(
                    ConvertUTCToUserTimeZone(
                      selectedTimeSlot?.endTimeWithoutBufferUTC,
                      activityDetail?.googleTimeZoneName
                    )
                  ).format(dateTimeFormate.HHmm)}`}
                />
                <TitleContentUnit
                  title={t("summary.price")}
                  content1={getCurrencyFormatWithLanguage(activityDetail?.currencyCode, activityDetail?.price, locale)}
                  content2={
                    activityDetail?.isOnlinePayment
                      ? t("summary.cancelationPolicy")
                      : activityDetail?.cancellationPolicy
                  }
                />
                <TitleContentUnit
                  title={t("summary.payment")}
                  content1={
                    activityDetail?.isOnlinePayment ? t("summary.onlinePaymentText") : t("summary.offlinePaymentText")
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={{ sm: "flex-end" }}
                  gap={1.5}
                  flexWrap={{ xs: "wrap", sm: "nowrap" }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      route.push(`/activity/${activityDetail?.activityGuid}/reserve`);
                    }}
                    className="helpSubmitButton"
                  >
                    {t("showOtherStartDatesPage.cancel")}
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleSubmit} className="helpSubmitButton">
                    {activityDetail?.isOnlinePayment ? t("summary.pay") : t("summary.confirmReservation")}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
            </Grid>
            <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
          </SummaryContainerStyle>
        </>
      ) : (
        <FuseSplashScreen />
      )}
    </>
  );
}

export default SummaryForm;
