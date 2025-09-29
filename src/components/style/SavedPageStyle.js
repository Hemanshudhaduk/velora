"use client";

import { gray } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { Box, Button, Card, Skeleton, styled } from "@mui/material";
import CommonModal from "../atoms/CommonModal";
import { CustomLink } from "../index";
import { SectionStyle } from "./CommonStyle";

export const ActivitySectionStyle = styled("div")({
  padding: "0 0 3rem",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  "& .MuiTabPanel-root": {
    padding: "0 0 1rem",
  },
});

export const SavedPageRemoveButtonStyle = styled(Button)({
  backgroundColor: "#FF4405",
  color: "white",
  width: "142px",
  height: "48px",
  "&:hover": {
    backgroundColor: "#FF4405", // Set the same background color on hover
    opacity: 1,
  },
  "&:hover:hover": {
    backgroundColor: "#FF4405", // Additional rule for some cases
    opacity: 1,
  },
});

export const SavedPageViewButtonStyle = styled(CustomLink)({
  color: "#099250",
  backgroundColor: "transparent",
  borderColor: "#099250",
  border: "2px solid #099250",
  width: "87px",
  height: "48px",
});

export const SavedPageButtonAlignments = styled(SectionStyle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const PageStyle = styled(SectionStyle)({
  marginRight: "50px",
  marginLeft: "50px",
  padding: "2rem 0",
});

export const ImageBoxStyle = styled(Box)(() => ({
  "& img": {
    borderRadius: "8px",
    width: "100%",
    height: "164px !important",
    objectFit: "cover",

    "@media screen and (max-width:767px)": {
      width: "100% !important",
    },
  },
}));
export const ImageSkeleton = styled(Skeleton)(prop => ({
  borderRadius: "8px",
  width: prop.width,
  height: "164px !important",
  objectFit: "cover",
  color: "red",
  "@media screen and (max-width:767px)": {
    width: "100% !important",
  },
}));
export const ContentBoxStyle = styled(Box)({
  flex: "1 1 0",

  "& .MuiTypography-subtitle2": {
    fontWeight: 500,
    color: gray[900],
  },

  "& .MuiSvgIcon-colorSecondary": {
    color: palette.text.secondary,
  },
});

export const ActivityCardStyle = styled(Card)({
  display: "flex",
  borderRadius: "12px",
  border: `1px solid ${palette.divider.divider}`,
  backgroundColor: palette.background.primary,
  padding: "16px",
  boxShadow: "none",
  gap: "20px !important",
  transition: "all 0.3s ease-in",

  "@media screen and (max-width:767px)": {
    "&:hover": {
      backgroundColor: palette.background.hover,
    },
  },
});

export const SearchActivityCardStyle = styled(Card)({
  display: "flex",
  borderRadius: "12px",
  border: `1px solid ${palette.divider.divider}`,
  backgroundColor: palette.background.primary,
  marginBottom: "16px",
  padding: "16px",
  boxShadow: "none",
  gap: "20px",
  transition: "all 0.3s ease-in",

  "&:hover": {
    backgroundColor: palette.background.hover,
  },
});

export const ActivityModalStyle = styled(CommonModal)({
  "& .MuiDialog-container": {
    "& .MuiDialog-paper": {
      width: "100%",
      maxWidth: "640px",

      "& .MuiDialogTitle-root": {
        padding: "1.5rem",
      },

      "& .MuiDialogActions-root": {
        borderTop: `1px solid ${palette.divider.divider}`,
        padding: "1rem 1.5rem",
      },
    },
  },
  "& .MuiSvgIcon-colorSecondary": {
    color: palette.text.secondary,
  },

  "@media screen and (max-width:767px)": {
    "& .MuiDialog-container": {
      alignItems: "flex-start",

      "& .MuiDialog-paper": {
        margin: "1rem",

        "& .MuiDialogTitle-root": {
          padding: "1rem",
        },

        "& .MuiDialogContent-root": {
          padding: "1rem",
        },

        "& .MuiDialogActions-root": {
          padding: "1rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        },
      },
    },
    "& .MuiButton-root": {
      padding: "0.5rem calc(0.875rem - 1px)",
      fontSize: "0.875rem",
      marginLeft: 0,
    },
  },

  "@media screen and (max-width:350px)": {
    "& .MuiButton-root": {
      marginRight: "auto",
    },
  },
});
