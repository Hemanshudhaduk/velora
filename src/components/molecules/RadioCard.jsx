import { Radio } from "@mui/material";
import { StyledFormControlLabelStyle } from "../style/EventStartDatePageStyle";

const RadioCard = props => {
  const { label, id } = props;
  return (
    <StyledFormControlLabelStyle
      value={id}
      control={<Radio className="radio-button" />}
      label={
        <>
          {label}
          <fieldset></fieldset>
        </>
      }
      classes={{ label: "radio-label" }}
      key={id}
    />
  );
};

export default RadioCard;
