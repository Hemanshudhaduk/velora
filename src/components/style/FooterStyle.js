"use client";

import { gray } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { styled } from "@mui/material";

export const FooterSectionStyle = styled("section")(() => ({
  padding: "4rem 0",

  "@media screen and (max-width: 767px)": {
    padding: "2rem 0",
  },
}));

export const FooterFeatureSecStyle = styled(FooterSectionStyle)(() => ({
  paddingBottom: "0",

  "& .MuiGrid-container": {
    paddingBottom: "4rem",
  },

  "& .MuiTypography-h6": {
    marginBottom: "16px",
  },

  "& .MuiDivider-root": {
    borderBottom: `1px solid ${palette.divider.dividerContrast}`,
  },

  "@media screen and (max-width: 767px)": {
    paddingBottom: "0",

    "& .MuiGrid-container": {
      paddingBottom: "2rem",
    },
  },
}));

export const FooterLogoSecStyle = styled(FooterSectionStyle)(() => ({
  paddingBottom: "0",

  "& .MuiContainer-root": {
    "& > .MuiGrid-container": {
      paddingBottom: "4rem",
    },
  },

  "& .MuiList-root": {
    alignItems: "start",

    "& .MuiMenuItem-root": {
      minHeight: "auto",
      width: "100%",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      transition: "all 0.3s ease-in-out",

      "& .MuiSvgIcon-root": {
        color: gray[400],
        opacity: 0,
        visibility: "hidden",
        transition: "all 0.3s ease-in-out",
      },

      "&:hover": {
        color: gray[400],

        "& .MuiSvgIcon-root": {
          opacity: 1,
          visibility: "visible",
        },
      },
    },
  },

  "& .MuiDivider-root": {
    borderBottom: `1px solid ${palette.divider.dividerContrast}`,
  },

  "@media screen and (max-width: 767px)": {
    "& .MuiContainer-root": {
      "& > .MuiGrid-container": {
        paddingBottom: "2rem",
      },
    },
  },
}));

export const FooterWorldOfHolistikaStyle = styled(FooterSectionStyle)(() => ({
  padding: "2rem 0 3rem",

  "@media screen and (max-width: 767px)": {
    padding: "0 0 2rem",
  },
}));
