"use client";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
const StaticDatePickerModel = params => {
  const { t, calendarDate, onChangeDate, googleTimeZoneName, moment, convertUTCToUserTimeZone } = params;
  return (
    <LocalizationProvider adapterLocale={t("languageCode")} dateAdapter={AdapterMoment}>
      <StaticDatePicker
        value={moment(convertUTCToUserTimeZone(calendarDate, googleTimeZoneName))}
        onChange={onChangeDate}
        components={{
          LeftArrowIcon: ArrowBack,
          RightArrowIcon: ArrowForward,
        }}
        minDate={moment(convertUTCToUserTimeZone(moment().utc(), googleTimeZoneName))}
        componentsProps={{ actionBar: { actions: [] } }}
        showToolbar={false}
      />
    </LocalizationProvider>
  );
};
export default StaticDatePickerModel;
