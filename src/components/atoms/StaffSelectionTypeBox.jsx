import { Radio, Typography } from "@mui/material";
import { PractitionerRadioStyle } from "../style";

const StaffSelectionTypeBox = params => {
  const { title, detail, value } = params;
  return (
    <PractitionerRadioStyle
      value={value}
      control={<Radio className="radio-button" />}
      labelPlacement="start"
      label={
        <>
          <Typography variant="body1" fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="body2">{detail}</Typography>
          <fieldset></fieldset>
        </>
      }
      classes={{ label: "radio-label" }}
    />
  );
};
export default StaffSelectionTypeBox;
