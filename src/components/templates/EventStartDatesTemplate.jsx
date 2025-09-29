"use client";
import { GetEventOccasions, ShowHolistikahOtherStartDates } from "@/src/api/showOtherStartDates";
import { ConvertUTCToUserTimeZone } from "@/src/utils";
import "@/src/utils/momentLocale";
import palette from "@/src/utils/theme/palette";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ViewMore from "../molecules/ViewMoreComponent";
import RadioList from "../organisms/RadioList";

function EventStartDates() {
  const t = useTranslations();
  const router = useRouter();
  const urlParams = useSearchParams();
  const id = urlParams.get("id");
  const isExternal = urlParams.get("isExternal") ?? false;
  const externalUrl = urlParams.get("externalUrl") ?? "";
  const [selectedValue, setSelectedValue] = useState("");
  const [activityTimeZone, setActivityTimeZone] = useState("");
  const [otherStartDates, setOtherStartDates] = useState([]);
  const [displayOccasion, setDisplayOccasion] = useState([]);
  const [bookingUnqGUID, setBookingUnqGUID] = useState();
  const [isValidate, setIsValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = value => {
    setSelectedValue(value);
    setBookingUnqGUID(value);
    setIsValidate(false);
  };
  const getEventOccasionsData = async pageSize => {
    const occasionData = {};
    occasionData.guid = id;
    occasionData.pageSize = pageSize;
    occasionData.bookingUnqGUID = bookingUnqGUID;
    const response = await GetEventOccasions(occasionData);
    if (response) setDisplayOccasion(response.data);
  };

  useEffect(() => {
    if (bookingUnqGUID) getEventOccasionsData(10);
  }, [bookingUnqGUID]);

  useEffect(() => {
    if (id) {
      getOtherStartDates(3);
    }
  }, [id]);

  useEffect(() => {
    setSelectedValue(selectedValue);
  }, [selectedValue]);

  const handleNextClick = () => {
    if (bookingUnqGUID) router.push(`/activity/${id}/eventSummary/${bookingUnqGUID}`);
    else setIsValidate(true);
  };

  const getOtherStartDates = async pageSize => {
    setLoading(true);
    const eventData = {};
    eventData.guid = id;
    eventData.pageSize = pageSize;
    const response = await ShowHolistikahOtherStartDates(eventData);
    if (response) {
      setActivityTimeZone(response.data.googleTimeZoneName);
      setOtherStartDates(response.data.activityStartDates);
    }
    setLoading(false);
  };
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={0.5}>
        {t("showOtherStartDatesPage.time")}
      </Typography>
      <Typography variant="body1" color={palette.text.secondary} mb={3}>
        {t("showOtherStartDatesPage.timeDescription")}
      </Typography>
      <Grid container spacing={{ xs: 3, sm: 7 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" mb={{ xs: 3, sm: 2 }}>
            {t("showOtherStartDatesPage.startDate")}
          </Typography>
          <>
            {loading ? (
              <Skeleton variant="rounded" />
            ) : otherStartDates?.length > 0 ? (
              <RadioList
                dataList={otherStartDates}
                handleChange={handleDateChange}
                label="date"
                id="bookingUnqGUID"
                googleTimeZoneName={activityTimeZone}
                t={t}
              />
            ) : (
              <Typography variant="body1">{t("showOtherStartDatesPage.noStartDates")}</Typography>
            )}

            {isValidate && (
              <Typography variant="body1" color={palette.text.error} mt={0.5}>
                {t("showOtherStartDatesPage.pleaseSelectStartDate")}
              </Typography>
            )}

            {otherStartDates?.length < otherStartDates[0]?.totalCount ? (
              <ViewMore
                title={
                  <Typography variant="body1" fontWeight={600} color={palette.text.secondary} textAlign="center" mt={2}>
                    {t("viewMore")}
                  </Typography>
                }
                defaultPageSize={3}
                pageSize={3}
                clickHandler={getOtherStartDates}
              />
            ) : null}
          </>

          <Box display={{ xs: "none", sm: "flex" }} justifyContent="flex-end" gap={1.5} mt={2}>
            <Button variant="outlined" href={`/activity/${id}`}>
              {t("showOtherStartDatesPage.cancel")}
            </Button>
            {isExternal ? (
              <Button variant="contained" color="primary" href={externalUrl} target="_blank">
                {t("showOtherStartDatesPage.next")}
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => handleNextClick()}>
                {t("showOtherStartDatesPage.next")}
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" display={{ xs: "none", sm: "block" }} mb={0.5}>
            {t("showOtherStartDatesPage.eventDate")}
          </Typography>
          <Typography variant="h6" display={{ xs: "block", sm: "none" }} mb={0.5}>
            {t("showOtherStartDatesPage.time")}
          </Typography>
          <Typography mb={{ xs: 3, sm: 2 }}>
            {t("showOtherStartDatesPage.activityTimezone")} {activityTimeZone}
          </Typography>
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
                {displayOccasion?.map(row => (
                  <TableRow key={row.unqGUID}>
                    <TableCell className="MuiTableCell-root MuiTableCell-body">{row.occasion}</TableCell>
                    <TableCell className="MuiTableCell-root MuiTableCell-body">
                      {moment(ConvertUTCToUserTimeZone(row.date, activityTimeZone))
                        .locale(t("languageCode"))
                        .format("ddd, DD MMM YYYY")}
                    </TableCell>
                    <TableCell className="MuiTableCell-root MuiTableCell-body" align="right">
                      {row.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          {displayOccasion?.length < displayOccasion[0]?.totalCount ? (
            <ViewMore
              title={
                <Typography variant="body1" fontWeight={600} color={palette.text.secondary} textAlign="center" mt={2}>
                  {t("viewMore")}
                </Typography>
              }
              defaultPageSize={10}
              pageSize={10}
              clickHandler={getEventOccasionsData}
            />
          ) : null}
          <Box display={{ xs: "flex", sm: "none", lg: "none" }} justifyContent="flex-end" gap={1.5} width="100%" mt={2}>
            <Button variant="outlined" href={`/activity/${id}`}>
              {t("showOtherStartDatesPage.cancel")}
            </Button>
            {isExternal ? (
              <Button type="submit" variant="contained" color="primary" href={externalUrl} target="_blank">
                {t("showOtherStartDatesPage.next")}
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary" onClick={() => handleNextClick()}>
                {t("showOtherStartDatesPage.next")}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default EventStartDates;
