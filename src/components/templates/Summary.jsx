"use client";
import { bookEventScheduleSlots } from "@/src/api/activity";
import FuseSplashScreen from "@/src/app/[locale]/auth/fuseSplashScreen";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { ConvertUTCToUserTimeZone, redirectToSignIn } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { trackPromise } from "react-promise-tracker";
import { useSelector } from "react-redux";
import { CommonSnackBar, SnackState } from "../atoms";
const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

const StaffCard = dynamic(() => import("../molecules/StaffCard"));

function Summary(props) {
  const getUserDetails = useSelector(selectUserDetail);
  const getUser = useSelector(selectUser);
  const router = useRouter();
  const pathName = usePathname();
  const [snack, closeSnack, showSnackbar] = SnackState();
  const { eventBookingSummary, page, bookingGuid, locale } = props;
  const t = useTranslations();
  const promiseResponse = async formData => {
    return new Promise(async (resolve, reject) => {
      const response = await bookEventScheduleSlots(formData);
      resolve(response);
    });
  };

  if (!getUser?.data?.email) redirectToSignIn(router, pathName);

  const getPaymentCheckoutPage = async () => {
    const requestData = {
      bookingGuid: bookingGuid,
      customerGuid: getUserDetails?.userDetailUnqGuid,
      languageCode: locale,
    };
    trackPromise(
      promiseResponse(requestData).then(response => {
        if (response?.status === "Success") {
          if (eventBookingSummary?.isOnlinePayment) {
            router.push(response.data);
          } else {
            const summaryPageData = {
              paymentStatus: "paid",
              activityName: eventBookingSummary?.activityName,
              startDateTimeUTC: eventBookingSummary?.bookingScheduleDetails[0]?.bookingWithoutBufferStartDateTimeUTC,
              endDateTimeUTC: eventBookingSummary?.bookingScheduleDetails[0]?.bookingWithoutBufferStartDateTimeUTC,
              googleTimezone: eventBookingSummary.googleTimeZoneName,
              occurrencesCount: eventBookingSummary?.bookingScheduleDetails.length,
              activityType: "Event",
            };
            localStorage.setItem("summaryPageData", JSON.stringify(summaryPageData));
            router.push(`/bookingConfirmation/${eventBookingSummary?.activityGuid}`);
          }
        } else {
          showSnackbar(t("activityBooking.alreadyBooked"), "error");
        }
      })
    );
  };

  return (
    <>
      {getUser?.data?.email !== "" ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontSize={{ xs: 24, sm: 30 }}>
                {t("eventBookingSummary.summaryTitle")}
              </Typography>
              <Box mt={3} mb={3}>
                <Typography variant="h6" mb={2}>
                  {t("eventBookingSummary.activityTitle")}
                </Typography>
                <Typography variant="body1" color={palette.text.secondary} mb={0.5}>
                  {eventBookingSummary?.activityName}
                </Typography>
                <Typography variant="body1" color={palette.text.secondary}>
                  {eventBookingSummary?.companyName}
                </Typography>
              </Box>
              {eventBookingSummary?.resourcesDetails.length > 0 && (
                <Box>
                  <Typography variant="h6" mb={2}>
                    {t("eventBookingSummary.practitionerTitle")}
                  </Typography>
                  <Typography variant="body1" color={palette.text.secondary} mb={2}>
                    {t("eventBookingSummary.youWillMeetTitle")}
                  </Typography>
                  {/* Booking resources */}
                  {eventBookingSummary?.resourcesDetails?.map(item => (
                    <StaffCard
                      userDetailUnqGUID={item.resourceGuid}
                      staffName={item.resourceName}
                      aboutDescription={item.aboutDescription}
                      imageURL={item.imageURL}
                      key={item.resourceGuid}
                    />
                  ))}
                </Box>
              )}
              <Typography variant="h6" mb={2}>
                {t("showOtherStartDatesPage.time")}
              </Typography>
              <Typography mb={{ xs: 3, sm: 2 }}>
                {t("showOtherStartDatesPage.activityTimezone")} {eventBookingSummary?.googleTimeZoneName}
              </Typography>

              {/* Occasion List */}
              {page === "eventSummary" ? (
                <Box maxHeight="265px" overflow="auto">
                  <Table border="none" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell variant="head">{t("showOtherStartDatesPage.occasion")}</TableCell>
                        <TableCell variant="head">{t("showOtherStartDatesPage.date")}</TableCell>
                        <TableCell variant="head" align="right">
                          {t("showOtherStartDatesPage.time")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {eventBookingSummary?.bookingScheduleDetails?.map(row => (
                        <TableRow key={row.unqGUID}>
                          <TableCell className="MuiTableCell-root MuiTableCell-body">{row.occasion}</TableCell>
                          <TableCell className="MuiTableCell-root MuiTableCell-body">
                            {moment(
                              ConvertUTCToUserTimeZone(
                                row.bookingStartDateTimeUTC,
                                eventBookingSummary?.googleTimeZoneName
                              )
                            )
                              ?.locale(t("languageCode"))
                              .format(`ddd, DD MMM YYYY`)}
                          </TableCell>
                          <TableCell className="MuiTableCell-root MuiTableCell-body" align="right">
                            {`${moment(
                              ConvertUTCToUserTimeZone(
                                row.bookingWithoutBufferStartDateTimeUTC,
                                eventBookingSummary?.googleTimeZoneName
                              )
                            )?.format(`HH:mm`)} - ${moment(
                              ConvertUTCToUserTimeZone(
                                row.bookingWithoutBufferEndDateTimeUTC,
                                eventBookingSummary?.googleTimeZoneName
                              )
                            )?.format(`HH:mm`)}
                    `}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              ) : null}

              <Box mt={3} mb={3}>
                <Typography variant="h6" mb={2}>
                  {t("eventBookingSummary.priceTitle")}
                </Typography>
                <Typography variant="body1" color={palette.text.secondary} mb={0.5}>
                  {eventBookingSummary?.price} {eventBookingSummary?.currencyCode}
                </Typography>
                <Typography variant="body1" color={palette.text.secondary}>
                  {eventBookingSummary?.isOnlinePayment
                    ? t("summary.cancelationPolicy")
                    : eventBookingSummary?.cancellationPolicy}
                </Typography>
              </Box>

              <Box mt={3} mb={3}>
                <Typography variant="h6" mb={2}>
                  {t("eventBookingSummary.paymentTitle")}
                </Typography>
                <Typography variant="body1">
                  {eventBookingSummary?.isOnlinePayment
                    ? t("eventBookingSummary.paymentDescription2")
                    : t("eventBookingSummary.paymentDescription1")}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent={{ sm: "flex-end" }}
                gap={1.5}
                flexWrap={{ xs: "wrap", sm: "nowrap" }}
              >
                <Button variant="outlined" href={"/activity/" + (eventBookingSummary?.activityGuid || "/")}>
                  {t("showOtherStartDatesPage.cancel")}
                </Button>

                <Button variant="contained" color="primary" onClick={getPaymentCheckoutPage}>
                  {eventBookingSummary?.isOnlinePayment
                    ? t("eventBookingSummary.payButtonTitle")
                    : t("eventBookingSummary.confirmReservationButtonTitle")}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
          <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
        </>
      ) : (
        <FuseSplashScreen />
      )}
    </>
  );
}

export default Summary;
