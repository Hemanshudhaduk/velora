"use client";
import { getCancelReservationPopupDetails } from "@/src/api/activityView";
import { selectUserDetail } from "@/src/lib/slice/userSlice";
import { ConvertUTCToUserTimeZone, getCurrencyFormatWithLanguage } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { CalendarTodayOutlined, InfoOutlined } from "@mui/icons-material";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommonSnackBar, SnackState } from "../atoms";
import ModalState from "../atoms/ModalState";
import { ModalPopupButtonSkeleton, ModalPopupSkeleton } from "../skeletons";
import {
  ActivityCardStyle,
  ActivityModalStyle,
  ContentBoxStyle,
  CustomImgStyle,
  ImageBoxStyle,
  SavedPageViewButtonStyle,
} from "../style";

const ActivityCard = props => {
  const { savedList, removeFromSaved, t, isUpcoming, isActivity = false, handleCancelReservation, locale } = props;
  const [cancelReservationModal, openCancelReservationModal, closeCancelReservationModal] = ModalState();
  const [cancelPopupResponse, setCancelPopupResponse] = useState(null);
  const getUserDetails = useSelector(selectUserDetail);
  const [snack, closeSnack] = SnackState();
  const route = useRouter();
  const [isSkeleton, setIsSkeleton] = useState(true);
  const openPopUp = async bookingActivityScheduleUnqGUID => {
    setIsSkeleton(true);
    const cancelData = {};
    //user guid will be of LoggedIn user's unqguid
    cancelData.userGuid = getUserDetails?.userUnqGuid;
    cancelData.BookingActivityScheduleGuid = bookingActivityScheduleUnqGUID;

    // Get the current date and time in UTC using new Date()
    const currentUTCDate = new Date();
    const currentUTCDateString = currentUTCDate.toISOString(); // UTC string

    cancelData.currentDatetime = currentUTCDateString;
    const openCancelPopupResponse = await getCancelReservationPopupDetails(cancelData);
    setCancelPopupResponse(openCancelPopupResponse?.data);
    openCancelReservationModal();
    setIsSkeleton(false);
  };

  useEffect(() => {
    route.refresh();
  }, [route]);

  const cancellationPopUpButtons = (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          closeCancelReservationModal();
        }}
      >
        {t("activity.keepReservation")}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="error"
        onClick={() => {
          handleCancelReservation(
            cancelPopupResponse[0].bookingCustomerUnqGUID,
            getUserDetails?.userDetailUnqGuid,
            getUserDetails?.userUnqGuid
          );
        }}
      >
        {t("activity.cancelReservation")}
      </Button>
    </>
  );

  const popUpTitle = (
    <Typography color={palette.text.primary} variant="h6">
      {t("activity.cancelPopupTitle")}
    </Typography>
  );
  const details = (
    <>
      {isSkeleton ? (
        <ModalPopupSkeleton />
      ) : (
        cancelPopupResponse && (
          <>
            <Typography
              color={palette.text.secondary}
              mb={{ xs: 2, sm: 2 }}
              variant="subtitle2"
              fontWeight={500}
              sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
            >
              {cancelPopupResponse[0]?.activityName}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CalendarTodayOutlined color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                color={palette.text.secondary}
              >
                {`${moment(
                  ConvertUTCToUserTimeZone(
                    cancelPopupResponse[0]?.bookingStartDateTime,
                    cancelPopupResponse[0]?.googleTimeZoneName
                  )
                )
                  .locale(t("languageCode"))
                  .format("ddd, DD MMM YYYY • HH:mm")} (${cancelPopupResponse[0]?.googleTimeZoneName})`}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOnOutlinedIcon color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                color={palette.text.secondary}
              >
                {cancelPopupResponse[0]?.bookingLocation}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CreditCardOutlinedIcon color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                color={palette.text.secondary}
              >
                {cancelPopupResponse[0]?.isOnlinePayment === true &&
                cancelPopupResponse[0]?.totalBookingAmount !== 0 ? (
                  <>
                    {cancelPopupResponse[0]?.currencyCode === null ||
                    cancelPopupResponse[0]?.currencyCode === undefined ||
                    cancelPopupResponse[0]?.currencyCode === ""
                      ? ""
                      : getCurrencyFormatWithLanguage(
                          cancelPopupResponse[0]?.currencyCode,
                          _.toNumber(cancelPopupResponse[0]?.totalBookingAmount),
                          locale
                        )}
                    {cancelPopupResponse[0]?.refundStatus === "Fully refundable"
                      ? t("activity.refundable")
                      : cancelPopupResponse[0]?.refundStatus === "Non refundable"
                        ? t("activity.nonRefundable")
                        : ""}
                  </>
                ) : cancelPopupResponse[0]?.isOnlinePayment === false &&
                  cancelPopupResponse[0]?.totalBookingAmount !== 0.0 ? (
                  <>
                    {cancelPopupResponse[0]?.currencyCode === null ||
                    cancelPopupResponse[0]?.currencyCode === undefined ||
                    cancelPopupResponse[0]?.currencyCode === ""
                      ? ""
                      : getCurrencyFormatWithLanguage(
                          cancelPopupResponse[0]?.currencyCode,
                          _.toNumber(cancelPopupResponse[0]?.totalBookingAmount),
                          locale
                        )}
                  </>
                ) : cancelPopupResponse[0]?.totalBookingAmount === 0.0 ? (
                  <>{t("activity.free")}</>
                ) : null}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                color={palette.text.secondary}
              >
                {cancelPopupResponse[0].isOnlinePayment === false &&
                cancelPopupResponse[0].totalBookingAmount !== "0.00" ? (
                  <>
                    {t("activity.cancellationPolicyTitle")} {cancelPopupResponse[0].companyName}
                  </>
                ) : null}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                color={palette.text.secondary}
              >
                {cancelPopupResponse[0].isOnlinePayment === false &&
                cancelPopupResponse[0].totalBookingAmount !== "0.00" ? (
                  <>{cancelPopupResponse[0].cancellationPolicy}</>
                ) : null}
              </Typography>
            </Box>
          </>
        )
      )}
    </>
  );

  return (
    <>
      {savedList && savedList.length > 0 ? (
        savedList?.map((item, key) => (
          <ActivityCardStyle key={key}>
            <Grid container display="flex" gap="20px" flexDirection={{ xs: "column", sm: "row" }}>
              {/* Left side: Image */}
              <ImageBoxStyle
                maxWidth={{ sm: "200px", xs: "100%" }}
                minWidth={{ sm: "200px", xs: "100%" }}
                display={{ xs: "block", sm: "block" }}
              >
                {item?.imagesUrl && (
                  <CustomImgStyle src={`${item?.imagesUrl?.imageUrl}`} alt="Activity_Image_Holistikah" />
                )}
                {item?.savedImageListDTO && (
                  <CustomImgStyle src={`${item?.savedImageListDTO?.imageUrl}`} alt="Activity_Image_Holistikah" />
                )}
              </ImageBoxStyle>
              {/* Right side: Text and Buttons */}
              <ContentBoxStyle display="flex" flexDirection="column" gap={2} justifyContent="space-between">
                <Box>
                  {item?.activityCompanyName && (
                    <Typography variant="subtitle2" mb={2}>
                      {item?.activityCompanyName}
                    </Typography>
                  )}
                  {item?.activityName && (
                    <Typography variant="subtitle2" mb={2}>
                      {item?.activityName}
                    </Typography>
                  )}
                  {item?.bookingStartDateTime && (
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <CalendarTodayOutlined color="secondary" />
                      <Typography variant="body1" color={palette.text.secondary}>
                        {`${moment(ConvertUTCToUserTimeZone(item?.bookingStartDateTime, item?.googleTimeZoneName))
                          .locale(t("languageCode"))
                          .format("ddd, DD MMM YYYY • HH:mm")} (${item?.googleTimeZoneName})`}
                      </Typography>
                    </Box>
                  )}
                  {item?.activityCompanyLocation && (
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <LocationOnOutlinedIcon color="secondary" />
                      <Typography variant="body1" color={palette.text.secondary}>
                        {item?.activityCompanyLocation}
                      </Typography>
                    </Box>
                  )}
                  {item?.bookingLocation && (
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <LocationOnOutlinedIcon color="secondary" />
                      <Typography variant="body1" color={palette.text.secondary}>
                        {item?.bookingLocation}
                      </Typography>
                    </Box>
                  )}
                  <Box display="flex" alignItems="center" gap={1} mb={1} style={{ opacity: 0.5 }}>
                    {item?.activityBookingDateUTC && (
                      <>
                        <InfoOutlined color="secondary" />
                        <Typography variant="body1" color={palette.text.secondary}>
                          {`${t("activity.bookedAt")} ${moment(
                            ConvertUTCToUserTimeZone(item?.activityBookingDateUTC, item?.googleTimeZoneName)
                          )
                            .locale(t("languageCode"))
                            .format("ddd, DD MMM YYYY • HH:mm")} (${item?.googleTimeZoneName}) `}
                          {item?.activityCanceledDateUTC &&
                            `${t("activity.andCanceled")} ${moment(
                              ConvertUTCToUserTimeZone(item?.activityCanceledDateUTC, item?.googleTimeZoneName)
                            )
                              .locale(t("languageCode"))
                              .format("ddd, DD MMM YYYY • HH:mm")} (${item?.googleTimeZoneName})`}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  alignItems="center"
                  flexWrap={{ xs: "wrap", sm: "nowrap" }}
                  minHeight={48}
                  gap={2}
                >
                  {item?.price === null || item?.price === undefined || item?.price === "" ? (
                    ""
                  ) : (
                    <Typography variant="h6" flex="1 1 0">
                      {item?.currencyCode === null || item?.currencyCode === undefined || item?.currencyCode === ""
                        ? ""
                        : getCurrencyFormatWithLanguage(item?.currencyCode, item?.price, locale)}
                    </Typography>
                  )}

                  {item?.totalBookingAmount === null ||
                  item?.totalBookingAmount === undefined ||
                  item?.totalBookingAmount === "" ? (
                    ""
                  ) : (
                    <Typography variant="h6" flex="1 1 0">
                      {item?.bookingAmountCurrencyCode === null ||
                      item?.bookingAmountCurrencyCode === undefined ||
                      item?.bookingAmountCurrencyCode === ""
                        ? ""
                        : getCurrencyFormatWithLanguage(
                            item?.bookingAmountCurrencyCode,
                            item?.totalBookingAmount,
                            locale
                          )}
                    </Typography>
                  )}

                  <Box display="flex" alignItems="center" gap={1} flexWrap={{ xs: "wrap", sm: "nowrap" }}>
                    {item.unqGUID && (
                      <Button
                        onClick={() => removeFromSaved(item?.unqGUID)}
                        startIcon={<FavoriteBorderIcon />}
                        variant="contained"
                        color="error"
                      >
                        {t("saved.remove")}
                      </Button>
                    )}
                    {item.bookingActivityScheduleUnqGUID &&
                      item.subscriptionStatus &&
                      item.cancellationStatus === "Active" && (
                        <>
                          <Button
                            onClick={() => openPopUp(item.bookingActivityScheduleUnqGUID)}
                            variant="contained"
                            color="error"
                          >
                            {t("activity.cancelReservation")}
                          </Button>
                        </>
                      )}
                    {item.bookingActivityScheduleUnqGUID &&
                      item.cancellationStatus === "Administrator" &&
                      item.bookingCustomerStatus === "Deleted" && (
                        <>
                          <Button variant="outlined" color="error" disabled>
                            {t("activity.cancelledByProviderLabel")}
                          </Button>
                        </>
                      )}
                    {item.bookingActivityScheduleUnqGUID &&
                      item.cancellationStatus === "Customer" &&
                      item.bookingCustomerStatus === "Deleted" && (
                        <>
                          <Button variant="outlined" color="error" disabled>
                            {t("activity.cancelledByCustomerLabel")}
                          </Button>
                        </>
                      )}
                    {item.bookingActivityScheduleUnqGUID &&
                      item.bookingUnqGUID &&
                      item.subscriptionStatus === "0" &&
                      item.cancellationStatus === "Active" && (
                        <SavedPageViewButtonStyle
                          btn
                          href={"/activity/" + item.activityUnqGUID}
                          disc={t("activity.view")}
                        />
                      )}
                    {/* Need to have a check on the conditional and understanding for the same */}
                    {item?.isActivity === 1 && item?.isActivityBookable === 1 && (
                      <Button variant="outlined" color="primary" href={"/activity/" + item.activityCompanyUnqGUID}>
                        {t("saved.view")}
                      </Button>
                    )}
                    {item?.isCompanyActive === 1 && item?.isActivity !== 1 && (
                      <Button variant="outlined" color="primary" href={"/providers/" + item.activityCompanyUnqGUID}>
                        {t("saved.view")}
                      </Button>
                    )}
                  </Box>
                </Box>
              </ContentBoxStyle>
            </Grid>
          </ActivityCardStyle>
        ))
      ) : isActivity === true ? (
        isUpcoming === true ? (
          <div>
            <p> {t("activity.noUpcomingActivities")}</p>
          </div>
        ) : (
          <div>
            <p> {t("activity.noPreviousActivities")}</p>
          </div>
        )
      ) : null}
      <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
      <ActivityModalStyle
        open={cancelReservationModal}
        title={isSkeleton ? <Skeleton component="p" variant="p" height="40px" /> : popUpTitle}
        closeModal={closeCancelReservationModal}
        popUpButtons={isSkeleton ? <ModalPopupButtonSkeleton /> : cancellationPopUpButtons}
        details={details}
        maxWidth="sm"
      />
    </>
  );
};

export default ActivityCard;
