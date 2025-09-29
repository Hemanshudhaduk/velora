"use client";

import { green } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { Button, FormControlLabel, FormGroup, styled } from "@mui/material";
import { SectionStyle } from "./CommonStyle";

export const SummarySectionStyle = styled(SectionStyle)({
  padding: "3rem 0",
});

export const CancelButtonStyle = styled(Button)({
  border: "1px solid #099250",
  marginRight: "10px",
  width: "102px",
  height: "48px",
});

export const BookServiceSectionStyle = styled(SectionStyle)({
  padding: "3rem 0",

  "& .MuiTableContainer-root": {
    maxHeight: "352px",
    overflow: "auto",

    "& .MuiTable-root": {
      "& .MuiTableCell-root": {
        width: "calc(14.28571428571429% - 4px)",
        minWidth: "calc(14.28571428571429% - 4px)",
        maxWidth: "calc(14.28571428571429% - 4px)",
        verticalAlign: "unset",
        textAlign: "center",
        padding: "0 0.25rem 0 0",

        "&.MuiTableCell-head": {
          padding: "0 0.25rem 1rem 0",
        },

        "& .MuiButton-root": {
          fontSize: "0.75rem",
          padding: "6px",
          lineHeight: "1.5",
          borderRadius: "4px",
          maxWidth: "45px",
          minWidth: "auto",
          display: "flex",
          margin: "0 auto 0.75rem",

          "&.MuiButton-containedInherit": {
            borderColor: palette.divider.divider,
            backgroundColor: palette.background.tag,

            "&:focus, &.Mui-focused": {
              background: palette.background.tag,
            },
          },

          "&.MuiButton-containedPrimary": {
            borderColor: palette.divider.dividerContrast,

            "&:focus, &.Mui-focused": {
              background: green[600],
            },
          },

          "&:last-child": {
            marginBottom: 0,
          },
        },

        "& .MuiSkeleton-root": {
          width: "100%",
          maxWidth: "45px",
          height: "30px",
          margin: "0 auto 0.75rem",
        },
      },
    },
  },
});

export const PractitionerRadioStyle = styled(FormControlLabel)({
  position: "relative",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",

  "& .MuiRadio-root": {
    padding: 0,
  },

  "& .radio-label": {
    fontWeight: 500,

    "& fieldset": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "8px",
      border: `1px solid ${palette.divider.divider} `,
      margin: 0,
      padding: 0,
      zIndex: -1,
    },
  },

  "& .Mui-checked": {
    "&+.MuiFormControlLabel-label": {
      "& fieldset": {
        borderColor: palette.divider.dividerContrast,
      },
    },
  },
});

export const FormGroupStyle = styled(FormGroup)({
  flexWrap: "nowrap",
  gap: "0.5rem",
  maxHeight: "42vh",
  overflow: "auto",
});

export const PractitionerCheckboxStyle = styled(FormControlLabel)({
  position: "relative",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: 0,
  gap: "1rem",

  "& .MuiRadio-root": {
    padding: 0,
  },

  "& .checkbox-label": {
    fontWeight: 500,
    display: "flex",
    gap: ".75rem",

    "& fieldset": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "8px",
      border: `1px solid ${palette.divider.divider} `,
      margin: 0,
      padding: 0,
      zIndex: -1,
    },
  },

  "& .Mui-checked": {
    "&+.MuiFormControlLabel-label": {
      "& fieldset": {
        borderColor: palette.divider.dividerContrast,
      },
    },
  },
});
