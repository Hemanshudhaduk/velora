"use client";

import palette from "@/src/utils/theme/palette";
import { Box, FormHelperText, styled } from "@mui/material";
import { green } from "@mui/material/colors";

export const FormBoxStyle = styled(Box)({
  width: "100%",
  maxWidth: "480px",
  margin: "auto",

  "& .MuiFormControl-root": {
    marginBottom: "1.5rem",
  },

  "& .MuiFormControlLabel-root": {
    marginLeft: 0,
    marginRight: 0,
    gap: "0.5rem",

    "& .MuiCheckbox-root": {
      padding: 0,
    },
  },

  "& .MuiLink-root": {
    textDecoration: "underline",
    color: green[500],
  },
});

export const FormHelperTextStyle = styled(FormHelperText)({
  margin: "8px 0 0",
  fontSize: "14px",
  lineHeight: 1.14286,
  color: palette.text.error,
});
