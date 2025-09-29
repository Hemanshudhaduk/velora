"use client";
import palette from "@/src/utils/theme/palette";
import { styled } from "@mui/material";

export const SettingsContainerStyle = styled("div")(({ customPhoneError }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "65%",
  marginBottom: "3rem",

  "& .form-control ": {
    borderColor: customPhoneError && "red",
  },

  "& > .MuiTypography-body1": {
    marginBottom: "2.5rem",
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
    "& input": {
      width: "100%",

      "&:focus": {
        borderColor: palette.divider.dividerContrast,
        boxShadow: `0 0 0 1px ${palette.divider.dividerContrast}`,
      },
    },
  },

  "& .MuiLink-root": {
    color: palette.text.primary,
    fontWeight: "500",
    textDecoration: "underline",
  },

  "@media screen and (max-width: 991px)": {
    maxWidth: "100%",
  },
}));
