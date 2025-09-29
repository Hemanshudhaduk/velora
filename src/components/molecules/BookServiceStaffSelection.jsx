import palette from "@/src/utils/theme/palette";
import { Typography } from "@mui/material";
import { StaffSelectionType } from "../../constants";
import { StaffSelectionCheckBox, StaffSelectionTypeBox } from "../atoms";
import { FormGroupStyle } from "../style";
import { RadioGroupStyle } from "../style/EventStartDatePageStyle";
const BookServiceStaffSelection = params => {
  const { t, handleStaffSelectionType, activityDetail, calendarRequest, onChangeAdditionalStaff } = params;
  return (
    <>
      <Typography variant="h6" mb={1}>
        {t("bookService.practitioner")}
      </Typography>
      <Typography variant="body1" color={palette.text.secondary} mb={3}>
        {t("bookService.chooseHeaderDetail")}
      </Typography>
      <RadioGroupStyle
        key={calendarRequest?.selectionType}
        onChange={e => handleStaffSelectionType(e)}
        defaultValue={StaffSelectionType.anyone}
        value={calendarRequest?.selectionType}
      >
        <StaffSelectionTypeBox
          value={StaffSelectionType.anyone}
          title={t("bookService.anyone")}
          detail={t("bookService.anyoneDetail")}
        />
        <StaffSelectionTypeBox
          value={StaffSelectionType.chooseStaff}
          title={t("bookService.choose")}
          detail={t("bookService.chooseDetail")}
        />
      </RadioGroupStyle>
      {calendarRequest?.selectionType !== StaffSelectionType.anyone && (
        <>
          <FormGroupStyle sx={{ marginTop: { xs: 6, sm: 4 } }}>
            {activityDetail?.resourcesDetails
              ?.filter(x => x.isMandatory === true)
              .map((item, i) => {
                return <StaffSelectionCheckBox t={t} key={i} data={item} />;
              })}
          </FormGroupStyle>
          {activityDetail?.resourcesDetails?.filter(x => x.isMandatory === false).length > 0 &&
            activityDetail?.resourcesDetails?.filter(x => x.isMandatory === true).length !==
              activityDetail.noOfStaffRequire && (
              <>
                <Typography variant="body1" mt={3} mb={1} color={palette.text.secondary}>
                  {t("bookService.chooseOptionalStaff", {
                    number:
                      activityDetail?.noOfStaffRequire -
                      activityDetail?.resourcesDetails?.filter(x => x.isMandatory === true).length,
                  })}
                </Typography>
                <FormGroupStyle>
                  {activityDetail?.resourcesDetails
                    ?.filter(x => x.isMandatory === false)
                    .map((item, i) => {
                      return (
                        <StaffSelectionCheckBox
                          t={t}
                          key={i}
                          data={item}
                          onChangeAdditionalStaff={onChangeAdditionalStaff}
                        />
                      );
                    })}
                </FormGroupStyle>
              </>
            )}
        </>
      )}
    </>
  );
};
export default BookServiceStaffSelection;
