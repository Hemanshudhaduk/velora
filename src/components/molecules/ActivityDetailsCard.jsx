"use client";
import { getCurrencyFormatWithLanguage } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { Launch } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Divider, Typography, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ScheduleEventDrawer } from "../atoms";
import GridHeaderLeft from "./GridHeaderLeft";

export const ActivityDetailsCardStyle = styled(Card)({
  padding: "1.5rem",
  marginTop: "1.5rem",
  border: `1px solid ${palette.divider.divider}`,
  boxShadow: "none",
  borderRadius: "1rem",
  position: "sticky",
  top: "9rem",

  "& .MuiCardContent-root": {
    padding: 0,
  },

  "& .MuiCardActions-root": {
    padding: 0,
    marginTop: "1rem",
    display: "block",

    "& .MuiButton-root": {
      marginLeft: 0,
    },
  },

  "& .MuiDivider-root": {
    margin: "1rem 0",
    color: palette.divider.divider,
  },
  "@media screen and (max-width:767px)": {
    position: "initial",
  },
});

function ActivityDetailsCard(props) {
  const { summaryData, locale } = props;
  const route = useRouter();
  const {
    price,
    currencyCode,
    bookingUnqGUID,
    leftSpots,
    isHolistikahBooking,
    activityType,
    activityUnqGUID,
    isOnlinePayment,
    moreDatesCount,
    activityOccasions,
    bookingNextDateTimeActivityZone,
    googleTimeZoneName,
    externalBookingURL,
  } = summaryData;
  const t = useTranslations();
  return (
    <ActivityDetailsCardStyle>
      <CardContent>
        <GridHeaderLeft
          headerVariant="h6"
          headerComponent="h6"
          header={
            currencyCode === null || currencyCode === undefined || currencyCode === ""
              ? ""
              : getCurrencyFormatWithLanguage(currencyCode, price, locale)
          }
          subHeader={
            <Typography variant="body2">
              {isOnlinePayment ? t("activityDetail.payOnline") : t("activityDetail.payOnArrival")}
              {activityType !== "Service" && (
                <>
                  {isHolistikahBooking
                    ? " " + "•" + " " + leftSpots + " " + t("activityDetail.spotLeft")
                    : " " + "•" + " " + leftSpots + " " + t("activityDetail.spots")}
                </>
              )}
            </Typography>
          }
        />
        <Divider />
        {activityType === "Event" && (
          <ScheduleEventDrawer
            title={activityOccasions?.length === 1 ? t("activityDetail.start") : t("activityDetail.nextStart")}
            subTitle={activityOccasions?.length >= 1 && `${bookingNextDateTimeActivityZone} (${googleTimeZoneName})`}
            btnText={activityOccasions?.length > 1 ? t("activityDetail.seeDates") : null}
            countBtn={
              activityOccasions?.length > 1 ? +activityOccasions?.length + " " + t("activityDetail.occasions") : null
            }
            moreDatesCount={moreDatesCount}
            activityOccasions={activityOccasions}
            googleTimeZoneName={googleTimeZoneName}
          />
        )}
      </CardContent>
      <CardActions>
        {isHolistikahBooking && activityType === "Service" && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => route.push(`/activity/${activityUnqGUID}/reserve`)}
          >
            {t("activityDetail.viewTimesAndReserve")}
          </Button>
        )}
        {isHolistikahBooking &&
          activityType === "Event" &&
          bookingUnqGUID !== "00000000-0000-0000-0000-000000000000" && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => route.push(`/activity/${activityUnqGUID}/eventSummary/${bookingUnqGUID}`)}
              disabled={leftSpots === 0 ? true : false}
            >
              {t("activityDetail.reserve")}
            </Button>
          )}
        {!isHolistikahBooking && (activityType === "Service" || activityType === "Event") && (
          <Button variant="contained" color="primary" fullWidth href={externalBookingURL} target="_blank">
            <Launch /> {t("activityDetail.reserve")}
          </Button>
        )}
        {activityType === "Event" &&
          moreDatesCount > 1 &&
          bookingUnqGUID !== "00000000-0000-0000-0000-000000000000" && (
            <>
              <Divider />
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                href={`/showOtherStartDates?id=${activityUnqGUID} ${
                  isHolistikahBooking ? "" : `&isExternal=${!isHolistikahBooking}&externalUrl=${externalBookingURL}`
                } `}
              >
                {t("activityDetail.showOtherStartDate")}
              </Button>
            </>
          )}
      </CardActions>
    </ActivityDetailsCardStyle>
  );
}

export default ActivityDetailsCard;
