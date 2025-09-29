"use client";
import palette from "@/src/utils/theme/palette";
import { styled } from "@mui/material";
import { CustomLink, CustomText } from "./../atoms";
import { SectionStyle } from "./CommonStyle";

export const TextStyle = styled(CustomText)(() => ({
  flex: " 1 1 0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const LinkStyle = styled(CustomLink)(() => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

export const ListSecStyle = styled(SectionStyle)(() => ({
  padding: "4rem 0 3rem",

  "& .MuiList-root": {
    padding: "16px 0 0",

    "& .MuiListItem-root": {
      padding: "4px 0",

      "& .MuiLink-root": {
        gap: "8px",
        transition: "all 0.3s ease-in-out",

        "& .MuiListItemText-root": {
          margin: 0,

          "& .MuiTypography-root": {
            fontWeight: "600",
            color: palette.text.secondary,
            transition: "all 0.3s ease-in-out",
            width: "95%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          },
        },

        "& .MuiSvgIcon-root": {
          color: palette.text.secondary,
          transition: "all 0.3s ease-in-out",
        },

        "&:hover": {
          "& .MuiListItemText-root": {
            "& .MuiTypography-root": {
              color: palette.text.primary,
            },
          },

          "& .MuiSvgIcon-root": {
            color: palette.text.primary,
            transform: "translateX(12px)",
          },
        },
      },
    },
  },
}));
