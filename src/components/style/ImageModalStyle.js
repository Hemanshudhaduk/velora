"use client";
import palette from "@/src/utils/theme/palette";
import { Dialog, styled } from "@mui/material";

export const ImageModalStyle = styled(Dialog)(() => ({
  "&.cm-image-modal": {
    "& .cm-carousel-wrapper": {
      "& div> div> div> div> div": {
        height: "433px",
      },
    },

    "& #close-btn": {
      position: "absolute",
      right: "1rem",
      top: "1rem",
      zIndex: 9,
      backgroundColor: palette.background.secondary,
    },

    "& .cm-indicator-wrapper": {
      margin: 0,
      position: "absolute",
      left: "0",
      bottom: "1rem",
      zIndex: 9,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",

      "& .MuiIconButton-root": {
        "& svg": {
          color: palette.background.tag,
          backgroundColor: palette.background.tag,
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(63, 63, 70, 0.5)",
          fontSize: "0.875rem",
          border: `1px solid ${palette.divider.divider}`,
        },

        "&.cm-active": {
          "& svg": {
            color: palette.text.tabSelected,
            backgroundColor: palette.text.tabSelected,
            borderColor: palette.divider.dividerContrast,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          },
        },
      },
    },
  },
}));
