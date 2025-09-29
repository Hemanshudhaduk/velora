"use client";
import { getActivityDetailsWithCancelation, getServiceTimeSlots } from "@/src/api/bookService";
import { CommonSnackBar, ModalState, SnackState, StaticDatePicker } from "@/src/components/atoms";
import { StaffSelectionType, dateTimeFormate } from "@/src/constants";
import { ConvertUTCToUserTimeZone, ConvertUserTimeZoneToUTC } from "@/src/utils";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import moment from "moment-timezone";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActivityCalendar, BookServiceStaffSelection } from "../molecules";
import { BookServiceSectionStyle, CalenderModalStyle, ContainerStyle } from "../style";
const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

const BookServiceTemplate = params => {
  const { guid, activityDetails } = params;
  const t = useTranslations();
  const route = useRouter();
  const [snack, closeSnack, showSnackbar] = SnackState();
  const [calendarModal, openCalendarModal, closeCalendarModal] = ModalState();
  const [isLoading, setIsLoading] = useState(true);
  const [activityDetail, setActivityDetail] = useState(activityDetails);
  const [serviceTimeSlots, setServiceTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [calendarDate, setCalendarDate] = useState(moment().utc());
  const [sourceToken, setSourceToken] = useState(axios.CancelToken.source());
  const [calendarRequest, setCalendarRequest] = useState({
    calendarDate: moment().utc(),
    visibleDays: dateTimeFormate.calendarVisibleDays,
    activityGUID: "",
    staffGUIDList: "",
    selectionType: StaffSelectionType.anyone,
    callAPI: true,
  });
  const [key, setKey] = useState(Math.random());
  const getActivityDetail = async () => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    setSourceToken(source);
    await getActivityDetailsWithCancelation({ guid: guid, source: source }).then(response => {
      if (response && response !== "RequestCancel" && response?.status !== "NotFound") {
        response.data.resourcesDetails = _.map(response?.data?.resourcesDetails ?? [], item => {
          return { ...item, isChecked: item.isMandatory };
        });
        response.data.imageURLList = _.map(
          response?.data?.imageURLList,
          ({ imageURL }) => `${BLOB_DOMAIN}/${imageURL}`
        );
        setActivityDetail(response?.data);
        setCalendarRequest(pre => {
          return {
            ...pre,
            activityGUID: response?.data?.activityGuid,
            activityWindowTimeZoneName: response?.data?.windowTimezoneName,
            selectionType: StaffSelectionType.anyone,
            callAPI: true,
          };
        });
      }
    });
  };
  const cancellationPopUpButtons = (
    <>
      <Button color="primary" onClick={closeCalendarModal} variant="outlined" fullWidth>
        {t("cancel")}
      </Button>
      <Button
        color="primary"
        onClick={() => {
          closeCalendarModal();
          onChangeDate(calendarDate);
        }}
        variant="contained"
        fullWidth
      >
        {t("apply")}
      </Button>
    </>
  );
  const staticDatePicker = (
    <StaticDatePicker
      t={t}
      convertUTCToUserTimeZone={ConvertUTCToUserTimeZone}
      moment={moment}
      calendarDate={calendarDate}
      onChangeDate={e => changeCalendarState(e)}
      googleTimeZoneName={activityDetail?.googleTimeZoneName}
    />
  );
  const changeCalendarState = newDate => {
    const selectedCalendarDate = moment(newDate).startOf("day");
    setCalendarDate(ConvertUserTimeZoneToUTC(selectedCalendarDate, activityDetail?.googleTimeZoneName).utc(true));
  };
  const openCalendarPopup = () => {
    setCalendarDate(calendarRequest.calendarDate);
    openCalendarModal();
  };
  const onChangeDate = newDate => {
    sourceToken.cancel("RequestCancel");
    if (moment(newDate).isValid()) {
      if (
        moment(ConvertUTCToUserTimeZone(moment().utc(), activityDetail?.googleTimeZoneName)).diff(
          moment(ConvertUTCToUserTimeZone(newDate, activityDetail?.googleTimeZoneName)),
          "day"
        ) > 0
      ) {
        setCalendarRequest(pre => {
          return {
            ...pre,
            calendarDate: moment().utc(),
            callAPI: true,
          };
        });
      } else {
        setCalendarRequest(pre => {
          return {
            ...pre,
            calendarDate: newDate,
            callAPI: true,
          };
        });
      }
    }
  };
  const checkSelectedTimeSlot = data => {
    const tempTimeSlotList = data;
    if (selectedTimeSlot?.startDateTimeUTC) {
      const findIndex = _.findIndex(
        tempTimeSlotList,
        x =>
          x.startDateTimeUTC === selectedTimeSlot.startDateTimeUTC &&
          x.endDateTimeUTC === selectedTimeSlot.endDateTimeUTC
      );
      if (findIndex > -1) {
        tempTimeSlotList[findIndex].IsSelected = true;
      }
    }
    setServiceTimeSlots(tempTimeSlotList);
  };
  const getActivityTimeSlotDetails = async () => {
    setIsLoading(true);
    sourceToken.cancel("RequestCancel");
    const source = axios.CancelToken.source();
    setSourceToken(source);
    await getServiceTimeSlots(calendarRequest, source).then(response => {
      if (response && response !== "RequestCancel") {
        checkSelectedTimeSlot(response);
        setIsLoading(false);
      }
    });
  };
  const getPreviousDates = () => {
    ConvertUTCToUserTimeZone(calendarRequest.calendarDate, activityDetail?.googleTimeZoneName);
    const updatedDateUTC = moment(
      ConvertUTCToUserTimeZone(calendarRequest.calendarDate, activityDetail?.googleTimeZoneName)
    ).add(-dateTimeFormate.calendarVisibleDays, "days");
    const UserTime = moment(ConvertUTCToUserTimeZone(updatedDateUTC, activityDetail?.googleTimeZoneName)).startOf(
      "day"
    );
    onChangeDate(moment(ConvertUserTimeZoneToUTC(UserTime, activityDetail?.googleTimeZoneName)).utc(true));
  };
  const getNextDates = () => {
    const updatedDateUTC = moment(
      ConvertUTCToUserTimeZone(calendarRequest.calendarDate, activityDetail?.googleTimeZoneName)
    ).add(dateTimeFormate.calendarVisibleDays, "days");
    const UserTime = moment(ConvertUTCToUserTimeZone(updatedDateUTC, activityDetail?.googleTimeZoneName)).startOf(
      "day"
    );
    onChangeDate(moment(ConvertUserTimeZoneToUTC(UserTime, activityDetail?.googleTimeZoneName)).utc(true));
  };
  const handleTimeSlot = slot => {
    const tempTimeSlotList = serviceTimeSlots;
    const findSelectedIndex = _.findIndex(tempTimeSlotList, x => x.IsSelected === true);
    if (findSelectedIndex > -1) tempTimeSlotList[findSelectedIndex].IsSelected = false;
    const findIndex = _.findIndex(
      tempTimeSlotList,
      x => x.startDateTimeUTC === slot.startDateTimeUTC && x.endDateTimeUTC === slot.endDateTimeUTC
    );
    if (findIndex > -1) {
      tempTimeSlotList[findIndex].IsSelected = true;
      setSelectedTimeSlot(slot);
    }
    setServiceTimeSlots(tempTimeSlotList);
  };
  const handleStaffSelectionType = value => {
    sourceToken.cancel("RequestCancel");
    if (value.target.value === StaffSelectionType.anyone) {
      getActivityDetail();
      setCalendarRequest(pre => {
        return {
          ...pre,
          selectionType: value.target.value,
          staffGUIDList: "",
          callAPI: false,
        };
      });
    } else {
      setIsLoading(false);
      const tempActivityDetails = _.cloneDeep(activityDetail);

      tempActivityDetails.resourcesDetails = _.map(tempActivityDetails.resourcesDetails ?? [], resources => {
        if (resources.isMandatory === true) return { ...resources, isChecked: true };
        else return { ...resources, isChecked: false };
      });
      const resourceArray = _.filter(tempActivityDetails.resourcesDetails, resources => {
        return resources.isChecked === true;
      });
      setActivityDetail(tempActivityDetails);
      setCalendarRequest(pre => {
        return {
          ...pre,
          selectionType: value.target.value,
          staffGUIDList: _.map(resourceArray, x => {
            return x.resourceGuid;
          }).join(","),
          callAPI: true,
        };
      });
    }
  };
  const onChangeAdditionalStaff = (e, item) => {
    sourceToken.cancel("RequestCancel");
    const tempActivityDetails = _.cloneDeep(activityDetail);
    tempActivityDetails.resourcesDetails = _.map(tempActivityDetails.resourcesDetails ?? [], resources => {
      if (resources.resourceGuid === item.resourceGuid) return { ...resources, isChecked: e.target.checked };
      else return { ...resources };
    });
    const resourceArray = _.filter(tempActivityDetails.resourcesDetails, resources => {
      return resources.isChecked === true;
    });
    setCalendarRequest(pre => {
      return {
        ...pre,
        staffGUIDList: _.map(resourceArray, x => {
          return x.resourceGuid;
        }).join(","),
        callAPI: true,
      };
    });
    setActivityDetail(tempActivityDetails);
    setKey(Math.random());
  };
  const onHandleSubmit = async () => {
    if (moment(selectedTimeSlot?.startTimeWithoutBufferUTC).utc(true).isSameOrBefore(moment().utc(), "minute")) {
      showSnackbar(`${t("bookService.futureTimeOnly")}`, "error");
      return;
    }
    if (!selectedTimeSlot?.startDateTimeUTC) {
      showSnackbar(`${t("bookService.selectValidation")}`, "error");
      return;
    }
    const requestModel = {
      selectedTimeSlot,
    };
    localStorage.setItem("serviceSummary", JSON.stringify(requestModel));
    route.push(`/activity/${guid}/reserve/summary`);
  };
  const cancelClick = () => {
    route.push(`/activity/${guid}`);
  };
  const processNextAvailabilityDate = (updatedDateUTC, activityTimeZone) => {
    const UserTime = ConvertUTCToUserTimeZone(moment(updatedDateUTC), activityTimeZone).startOf("day");
    return ConvertUserTimeZoneToUTC(UserTime, activityTimeZone);
  };
  useEffect(() => {
    localStorage.setItem("serviceSummary", JSON.stringify({}));
    if (activityDetails) {
      setIsLoading(true);
      const tempActivityDetails = activityDetails;
      tempActivityDetails.resourcesDetails = _.map(activityDetails?.resourcesDetails ?? [], item => {
        return { ...item, isChecked: item.isMandatory };
      });
      setActivityDetail(tempActivityDetails);
      setCalendarRequest(pre => {
        return {
          ...pre,
          calendarDate: moment(activityDetails?.nextAvailabilityDateUTC).isValid()
            ? processNextAvailabilityDate(activityDetails?.nextAvailabilityDateUTC, activityDetails?.googleTimeZoneName)
            : moment().utc(),
          activityGUID: activityDetails?.activityGuid,
          activityWindowTimeZoneName: activityDetails?.windowTimezoneName,
          selectionType: StaffSelectionType.anyone,
          callAPI: true,
        };
      });
    }
  }, [activityDetails]);
  useEffect(() => {
    setServiceTimeSlots([]);
    if (
      calendarRequest.activityGUID &&
      calendarRequest.callAPI === true &&
      ((calendarRequest.selectionType !== StaffSelectionType.anyone &&
        calendarRequest?.staffGUIDList.split(",").length === activityDetail?.noOfStaffRequire &&
        calendarRequest?.staffGUIDList !== "") ||
        calendarRequest.selectionType === StaffSelectionType.anyone)
    ) {
      getActivityTimeSlotDetails();
    } else setSelectedTimeSlot({});
  }, [calendarRequest]);
  return (
    <BookServiceSectionStyle>
      <ContainerStyle>
        <Typography variant="h5" mb={3}>
          {t("bookService.title")}
        </Typography>
        <Grid container spacing={{ xs: 6, sm: 7 }}>
          <Grid item xs={12} sm={5}>
            <BookServiceStaffSelection
              t={t}
              key={key}
              handleStaffSelectionType={handleStaffSelectionType}
              activityDetail={activityDetail}
              calendarRequest={calendarRequest}
              onChangeAdditionalStaff={onChangeAdditionalStaff}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <ActivityCalendar
              t={t}
              key={key}
              moment={moment}
              convertUTCToUserTimeZone={ConvertUTCToUserTimeZone}
              isLoading={isLoading}
              activityDetail={activityDetail}
              calendarRequest={calendarRequest}
              dateTimeFormate={dateTimeFormate}
              serviceTimeSlots={serviceTimeSlots}
              handleTimeSlot={handleTimeSlot}
              getNextDates={getNextDates}
              getPreviousDates={getPreviousDates}
              currentDateTime={moment().utc()}
              onHandleSubmit={onHandleSubmit}
              openCalendarPopup={openCalendarPopup}
              cancelClick={cancelClick}
            />
          </Grid>
        </Grid>
        <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
        <CalenderModalStyle
          open={calendarModal}
          closeModal={closeCalendarModal}
          popUpButtons={cancellationPopUpButtons}
          details={staticDatePicker}
          maxWidth="sm"
          className="cm-calender"
        />
      </ContainerStyle>
    </BookServiceSectionStyle>
  );
};

export default BookServiceTemplate;
