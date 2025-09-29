"use client";
import palette from "@/src/utils/theme/palette";
import { styled } from "@mui/material";

export const SignUpContainerStyle = styled("div")(({ phoneError }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "50vw",
  minHeight: "100vh",
  margin: "auto",
  padding: "1.5rem 0",

  "& > .MuiTypography-body1": {
    marginBottom: "2rem",
  },
  "& .MuiTypography-h4": {
    marginBottom: "0.25rem",
  },

  "& .MuiFormControl-root": {
    width: "100%",

    "& .MuiFormLabel-root": {
      "&.Mui-focused": {
        color: palette.divider.dividerContrast,
      },
    },

    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: palette.divider.dividerContrast,
      },
    },
  },

  "& .MuiAutocomplete-root": {
    width: "100%",
  },

  "& .react-tel-input": {
    "& .special-label": {
      color: phoneError ? palette.text.error : palette.text.primary,
      fontFamily: "'Inter',sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.4375em",
      transform: "translate(12px, -12px) scale(0.75)",
      top: 0,
    },

    "& .form-control": {
      borderColor: phoneError ? palette.text.error : palette.divider.divider,
      width: "100%",
      borderRadius: "8px",

      "&:focus": {
        borderColor: palette.divider.dividerContrast,
        boxShadow: "none",
      },
    },
  },

  "& #PhoneError": {
    margin: "8px 0 0",
    fontSize: "14px",
    lineHeight: 1.14286,
    color: palette.text.error,
  },

  "& .checkbox-error": {
    margin: "0 0 0",
    fontSize: "14px",
    lineHeight: 1.14286,
    color: palette.text.error,
  },

  "& .MuiLink-root": {
    color: palette.text.primary,
    fontWeight: "500",
    textDecoration: "underline",
  },

  "@media screen and (max-width: 1199px)": {
    maxWidth: "90vw",
  },
}));
