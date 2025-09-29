"use client";
import palette from "@/src/utils/theme/palette";
import { Card, styled } from "@mui/material";
import { SectionStyle } from "./CommonStyle";

export const ProviderSectionStyle = styled(SectionStyle)(() => ({
  padding: "3rem 0",
}));

export const ProviderCardStyle = styled(Card)(() => ({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  boxShadow: "none",
  border: "1px solid #E4E4E7",
  borderRadius: "0.75rem",
  transition: "all 0.3s ease-in",

  "& .MuiCardMedia-root": {
    aspectRatio: "1 / 1",
    width: "100%",
    height: "100%",
    margin: "auto",
    borderRadius: "50%",
  },

  "& .MuiCardContent-root": {
    width: "100%",
    padding: "1rem 0",
    flex: "1 1 0",

    "& .MuiBox-root": {
      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
        color: palette.text.secondary,
      },
    },
  },

  "& .MuiCardActions-root": {
    padding: "0",
    width: "100%",
  },

  "@media screen and (max-width:767px)": {
    "&:hover": {
      backgroundColor: palette.background.hover,
    },

    "& .MuiCardActions-root": {
      justifyContent: "flex-end",
    },
  },
}));
