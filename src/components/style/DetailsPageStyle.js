"use client";
import palette from "@/src/utils/theme/palette";
import { Box, Card, styled } from "@mui/material";
import { CustomImgStyle } from "./CommonStyle";

export const ImageGridStyle = styled(Box)({
  maxHeight: "339px",
  padding: "0px 2rem 0px 2rem",
  gap: "0.5rem",
  overflow: "hidden",
});

export const ProviderProfileImgStyle = styled(CustomImgStyle)({
  maxHeight: "66px",
  maxWidth: "66px",

  "@media (max-width: 767px)": {
    display: "none",
  },
});

export const StaffCardStyle = styled(Card)({
  boxShadow: "none",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "flex-start",

  "&:last-child": {
    marginBottom: 0,
  },

  "& .MuiCardMedia-root": {
    maxHeight: "48px",
    maxWidth: "48px",
    aspectRatio: "1 / 1",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    marginRight: "1rem",
  },

  "& .MuiSvgIcon-root": {
    maxHeight: "48px",
    maxWidth: "48px",
    aspectRatio: "1 / 1",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    marginRight: "1rem",
  },

  "& .MuiCardContent-root": {
    width: "100%",
    padding: "0",
    flex: "1 1 0",

    "& .MuiBox-root": {
      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
        color: palette.text.secondary,
      },
    },
  },
});
