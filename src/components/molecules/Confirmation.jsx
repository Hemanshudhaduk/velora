"use client";
import { ConvertUTCToUserTimeZone } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ConfirmationSkeleton from "../skeletons/ConfirmationSkeleton";
import { SectionStyle } from "../style";

function Confirmation(props) {
  const t = useTranslations();
  const router = useRouter();
  const { confirmationData, isLoading, guid } = props;

  const redirectTo = pageName => {
    localStorage.setItem("summaryPageData", JSON.stringify({}));
    if (pageName === "backToHome") router.push("/");
    else if (pageName === "activityDetails") router.push("/activity/" + guid);
    else if (pageName === "upcomingActivity") router.push("/activityView");
  };

  return (
    <SectionStyle sx={{ textAlign: "center" }}>
      {confirmationData?.paymentStatus && isLoading === false && (
        <>
          <Typography variant="h5" mb={3}>
            {confirmationData?.paymentStatus === "unpaid"
              ? t("activityBooking.paymentFailed")
              : t("activityBooking.reservationConfirmed")}
          </Typography>
          {confirmationData?.paymentStatus === "unpaid" ? (
            <Typography variant="body1" mb={1} color={palette.text.secondary}>
              {t("activityBooking.paymentFailedDescription")}
            </Typography>
          ) : (
            <>
              <Typography variant="body1" mb={1} color={palette.text.secondary}>
                {confirmationData?.activityName}
              </Typography>

              {confirmationData?.activityType === "Event" ? (
                <>
                  <Typography variant="body1" mb={1} color={palette.text.secondary}>
                    {`${t("activityBooking.start")} ${moment(
                      ConvertUTCToUserTimeZone(confirmationData?.startDateTimeUTC, confirmationData?.googleTimezone)
                    )
                      ?.locale(t("languageCode"))
                      .format(`dddd, DD MMMM, yyyy`)}`}
                  </Typography>
                  <Typography variant="body1" mb={1} color={palette.text.secondary}>
                    {confirmationData?.occurrencesCount + t("activityBooking.occasions")}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" mb={1} color={palette.text.secondary}>
                  {`${moment(
                    ConvertUTCToUserTimeZone(confirmationData?.startDateTimeUTC, confirmationData?.googleTimezone)
                  )
                    ?.locale(t("languageCode"))
                    .format("dddd, DD MMMM, yyyy, HH:mm - ")}${moment(
                    ConvertUTCToUserTimeZone(confirmationData?.endDateTimeUTC, confirmationData?.googleTimezone)
                  )?.format("HH:mm")} `}
                </Typography>
              )}
            </>
          )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap={{ xs: "wrap", sm: "nowrap" }}
            gap={1.5}
            mt={8}
          >
            <Button
              variant="outlined"
              onClick={() =>
                redirectTo(confirmationData?.paymentStatus === "unpaid" ? "activityDetails" : "backToHome")
              }
            >
              {confirmationData?.paymentStatus === "unpaid" ? t("activityBooking.tryAgain") : t("activityBooking.back")}
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={() => redirectTo("upcomingActivity")}>
              {t("activityBooking.viewComingActivities")}
            </Button>
          </Box>
        </>
      )}
      {isLoading === true && <ConfirmationSkeleton />}
    </SectionStyle>
  );
}

export default Confirmation;
