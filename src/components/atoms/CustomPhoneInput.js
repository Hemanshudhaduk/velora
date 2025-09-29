"use client";
import { styled } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const PhoneInputStyle = styled("div")({
  "& .form-control": {
    padding: "11px 12px 11px 58px",
    width: "100%",
    transition: "all 0.3s ease-in",
    lineHeight: 1.5,
    height: "auto",
  },
});

const CustomPhoneInput = props => {
  const { value, onChange, className, label, isLabel = true, ...otherProps } = props;
  return (
    <PhoneInputStyle>
      <PhoneInput
        specialLabel={isLabel && label}
        country="se"
        value={value}
        onChange={(value, country) => onChange(`+${value}`, country)}
        className={className}
        masks={{ se: ".. ... .. .." }}
        autoFormat={true}
        countryCodeEditable={true}
        {...otherProps}
      />
    </PhoneInputStyle>
  );
};

export default CustomPhoneInput;
