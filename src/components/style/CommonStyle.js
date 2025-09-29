"use client";

import { green } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { Box, Button, Container, Dialog, FormControlLabel, MenuList, TablePagination, styled } from "@mui/material";
import { CustomImg } from "../atoms";

export const MainStyle = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",

  "> section": {
    flex: "1 1 0",
  },
}));

export const ContainerStyle = styled(Container)(() => ({}));

export const SectionStyle = styled("section")(() => ({
  padding: "6rem 0",

  "@media screen and (max-width: 767px)": {
    padding: "3rem 0",
  },
}));

export const HomeCategoriesSecStyle = styled("section")(() => ({
  paddingBottom: "6rem",

  "@media screen and (max-width: 767px)": {
    paddingBottom: "3rem",
  },
}));

export const CustomImgStyle = styled(CustomImg)(({ borderRadius }) => ({
  position: "unset !important",
  objectFit: "cover",
  borderRadius: borderRadius || "0",
}));

export const AuthorLinkStyle = styled(CustomImg)(({ borderRadius }) => ({
  position: "unset !important",
  objectFit: "cover",
  borderRadius: borderRadius || "0",
  height: "1.2em !important",
  width: "1.2em !important",
}));

export const MuiMenuListStyle = styled(MenuList)(({ direction }) => ({
  display: "flex",
  flexDirection: direction || "column",
  gap: "0.75rem",
  padding: "16px 0 0",

  "& .MuiMenuItem-root": {
    padding: "0",

    "& a": {
      color: palette.text.secondaryContrast,
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "1.5",
      textDecoration: "none",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },

    "&:hover": {
      "& a": {
        color: palette.text.disabled,
      },
    },
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)({
  flexDirection: "row-reverse",
  "& .MuiFormControlLabel-label": {
    marginLeft: theme => theme.spacing(1),
  },
});

export const BoxStyle = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
});

export const ButtonWithOnClick = styled(Button)({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-container": {
    "& .MuiDialog-paper": {
      borderRadius: "16px",
      border: `1px solid ${palette.divider.divider}`,
      backgroundColor: palette.background.primary,
      boxShadow: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",

      "& .cm-modal-header": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
  },

  "&.cm-iframe-modal": {
    "& .MuiDialog-container": {
      "& .MuiDialog-paper": {
        width: "100%",
        height: "100%",
        maxHeight: "min(100%, 560px)",

        "& .MuiDialogContent-root": {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },

        "& iframe": {
          width: "100%",
          height: "100%",
          border: "none",
          flex: "1 1 0",
        },
      },
    },

    "@media screen and (max-width:767px)": {
      "& .MuiDialog-container": {
        "& .MuiDialog-paper": {
          maxWidth: "100%",
          margin: "32px 16px",
        },
      },
    },
  },
});

export const WhiteButton = styled(Button)({
  color: "#51525C",
  fontSize: "16px",
  fontFamily: "Inter",
  fontWeight: "600",
  lineHeight: "24px",
  wordWrap: "break-word",
  paddingLeft: "24px",
  paddingRight: "24px",
  paddingTop: "12px",
  paddingBottom: "12px",
  background: "white",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px #51525C solid",
  justifyContent: " center",
  alignItems: " center",
  gap: "8px",
  display: "inline-flex",
  marginLeft: "10px",
});

export const LogoImgStyle = styled(CustomImg)({
  maxWidth: "150px",
  position: "unset !important",
  marginBottom: "1.5rem",
});

export const TablePaginationStyle = styled(TablePagination)({
  "@media screen and (max-width:450px)": {
    "& .MuiTablePagination-toolbar": {
      flexWrap: "wrap",
    },

    "& .MuiTablePagination-displayedRows": {
      width: "50%",
    },
  },
});

export const TabContextStyle = styled(Box)({
  "& .MuiTabs-scroller": {
    "& .MuiTabs-flexContainer": {
      gap: "8px",

      "& .MuiTab-root": {
        borderRadius: "6px",
        backgroundColor: palette.background.primary,
        padding: "8px 12px",
        gap: "8px",
        textTransform: "none",
        flexDirection: "row",
        transition: "all 0.3s ease-in",

        "& .MuiTypography-body2": {
          fontWeight: "600",
          transition: "all 0.3s ease-in",
        },

        "& .MuiTypography-caption": {
          fontWeight: "500",
          lineHeight: "1.5",
          borderRadius: "16px",
          backgroundColor: palette.background.tag,
          padding: "2px 8px",
          textAlign: "center",
          transition: "all 0.3s ease-in",
        },

        "&.Mui-selected": {
          backgroundColor: palette.background.tabsSelected,
          border: "none",

          "& .MuiTypography-body2": {
            color: palette.text.tabSelected,
          },

          "& .MuiTypography-caption": {
            backgroundColor: green[700],
            color: palette.text.primaryContrast,
          },
        },
      },
    },

    "& .MuiTabs-indicator": {
      display: "none",
    },
  },

  "& .MuiTabPanel-root": {
    padding: "0",
  },
});
