"use client";

import { styled } from "@mui/material";
import { SectionStyle } from "./CommonStyle";

export const AboutUsTopSecStyle = styled(SectionStyle)({
  paddingTop: "96px",
  paddingBottom: "0px",
  "& .MuiBox-root": {
    marginBottom: "3rem",
  },
  "& .MuiTypography-h3": {
    marginBottom: "2.5rem",
  },

  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-h3": {
      marginBottom: "1.5rem",
    },
    "& .MuiBox-root": {
      marginBottom: "0.75rem",
    },
  },
});

export const AboutUsMiddleSecStyle = styled(SectionStyle)({
  "& .MuiTypography-h4 ": {
    marginBottom: "4rem",
  },

  "& .MuiTypography-subtitle2": {
    marginBottom: "0.75rem",
  },

  "@media screen and (max-width: 767px)": {
    paddingTop: "6rem",

    "& .MuiTypography-h4 ": {
      marginBottom: "1.5rem",
    },
    "& .MuiTypography-subtitle2 ": {
      marginBottom: "0.75rem",
    },
  },
});

export const AboutUsBottomSecStyle = styled(SectionStyle)({
  "& .MuiTypography-subtitle2": {
    marginBottom: "0.75rem",
  },
  "& .MuiTypography-h6": {
    marginTop: "1.25rem",
  },
});

export const CoFounderDetailsStyle = styled("div")({
  "& img[alt='userImage']": {
    maxWidth: "75px",
    maxHeight: "75px",
    borderRadius: "50%",
  },
  "& img[alt='linkedIn']": {
    maxWidth: "24px",
    maxHeight: "24px",
  },
  "& .MuiTypography-subtitle2": {
    marginBottom: "0",
  },
});
