"use client";

import palette from "@/src/utils/theme/palette";
import theme from "@/src/utils/theme/theme";
import { Box, Button, Grid, RadioGroup, Typography, styled } from "@mui/material";
import { SectionStyle, StyledFormControlLabel } from "./CommonStyle";

export const EventStartSectionStyle = styled(SectionStyle)({
  padding: "3rem 0",
});

export const RadioGroupStyle = styled(RadioGroup)({
  flexWrap: "nowrap",
  gap: "0.5rem",
  maxHeight: "42vh",
  overflow: "auto",
});

export const ViewMoreDates = styled(Button)({
  width: "150px",
});

export const StyledFormControlLabelStyle = styled(StyledFormControlLabel)({
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

export const ViewMoreOccasion = styled(Button)({
  marginTop: "20px",
  marginBottom: "20px",
});

export const OccasionGridHeight = styled(Grid)({
  height: "20px",
});

export const OccasionGridHeaderHeight = styled(Grid)({
  height: "30px",
});

export const ButtonStyle = styled(Box)({
  marginBottom: "100px",
  display: "flex",
  justifyContent: "flex-end",
  width: "85%",
  "@media (max-width: 600px)": {
    width: "100%",
  },
});

export const ButtonCancelStyle = styled(Button)({
  backgroundColor: "transparent",
  border: "1px solid #099250",
  color: "#099250",
  marginRight: "10px",
  width: "102px",
  height: "48px",
});

export const ViewMoreButtonStyle = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "20px",
  maxWidth: "342px",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "580px",
  },
});

export const OccasionTypographyFontSize = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
});
