"use client";

import palette from "@/src/utils/theme/palette";
import { Drawer, Menu, MenuItem, MenuList, styled } from "@mui/material";
import { CustomLink } from "../atoms";

export const LogoLinkStyle = styled(CustomLink)(() => ({
  display: "inline-flex",
  alignItems: "center",
  "& img": {
    position: "unset !important",
    height: "44px",
    width: "auto",
    objectFit: "contain",
  },
  "@media screen and (max-width:1199px)": {
    "& img": {
      height: "40px",
    },
  },
  "@media screen and (max-width:767px)": {
    "& img": {
      height: "32px",
    },
  },
}));

export const NavBoxStyle = styled(MenuList)(() => ({
  display: "flex",
  gap: "0.5rem",
  padding: "20px 0",

  "& .MuiMenuItem-root": {
    padding: "0",
    transition: "all 0.3s ease-in",
    lineHeight: 1,

    "& .MuiLink-root": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 500,
      padding: "8px 12px",
      transition: "all 0.3s ease-in",
    },

    "& .MuiButton-root": {
      padding: "8px 12px",
      transition: "all 0.3s ease-in",

      "& .MuiTypography-root": {
        color: palette.text.secondary,
        fontWeight: 500,
        lineHeight: 1.5,
        transition: "all 0.3s ease-in",
      },
    },

    "& .MuiTouchRipple-root": {
      display: "none",
    },

    "&:hover, &.Mui-selected": {
      backgroundColor: "transparent",
      borderRadius: "8px",

      "& .MuiLink-root, & .MuiButton-root": {
        backgroundColor: "transparent",
        color: palette.text.primary,

        "& .MuiTypography-root": {
          color: palette.text.primary,
        },
      },
    },
  },
}));

export const MobileNavStyle = styled(MenuItem)(() => ({
  fontWeight: "bold",
}));

export const MobileNavDrawerStyle = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    backgroundColor: palette.background.primary,
    padding: "1.5rem",
    gap: "0.5rem",

    "& .MuiMenuItem-root": {
      padding: "0",
      transition: "all 0.3s ease-in",
      whiteSpace: "break-spaces",
      minHeight: "unset",

      "& .MuiLink-root": {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 600,
        padding: "12px",
        color: palette.text.primary,
        transition: "all 0.3s ease-in",

        "& .MuiTypography-root": {
          color: palette.text.primary,
          fontWeight: 600,
          transition: "all 0.3s ease-in",

          "& .MuiTypography-body2": {
            color: palette.text.secondary,
          },
        },
      },

      "& .MuiButton-root": {
        padding: "12px",
        transition: "all 0.3s ease-in",
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        color: palette.text.primary,

        "& .MuiTypography-root": {
          color: palette.text.primary,
          fontWeight: 600,
          transition: "all 0.3s ease-in",
          flex: "1 1 0",
          textAlign: "left",
        },
      },

      "& .MuiTouchRipple-root": {
        display: "none",
      },

      "&:hover, &.Mui-selected": {
        backgroundColor: palette.background.hover,
        borderRadius: "8px",

        "& .MuiLink-root, & .MuiButton-root": {
          backgroundColor: "transparent",
          color: palette.text.primary,

          "& .MuiTypography-root": {
            color: palette.text.primary,
          },
        },
      },
    },

    "& .MuiDivider-root": {
      color: palette.divider.divider,
    },
  },
  "@media screen and (max-width: 767px)": {
    "& .MuiDrawer-paper": {
      width: "100%",
      padding: "0.75rem",
      paddingTop: "58px",
    },
    zIndex: "1099",
  },
}));

export const ProfileMenuStyle = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: "16px",
    border: `1px solid ${palette.divider.divider}`,
    backgroundColor: palette.background.primary,
    boxShadow: "none",
    minWidth: "320px",

    "& .MuiList-root": {
      "& .MuiMenuItem-root": {
        padding: "0",
        transition: "all 0.3s ease-in",
        whiteSpace: "break-spaces",
        minHeight: "unset",
        margin: "0 12px 8px",

        "&:last-child": {
          marginBottom: 0,
        },

        "& .MuiLink-root": {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
          padding: "12px",
          color: palette.text.primary,
          transition: "all 0.3s ease-in",

          "& .MuiTypography-root": {
            color: palette.text.primary,
            fontWeight: 500,
            transition: "all 0.3s ease-in",

            "& .MuiTypography-body2": {
              color: palette.text.secondary,
            },
          },
        },

        "& .MuiButton-root": {
          padding: "12px",
          transition: "all 0.3s ease-in",
          width: "100%",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          color: palette.text.primary,

          "& .MuiTypography-root": {
            color: palette.text.primary,
            fontWeight: 500,
            transition: "all 0.3s ease-in",
          },
        },

        "& .MuiTouchRipple-root": {
          display: "none",
        },

        "&:hover, &.Mui-selected": {
          backgroundColor: palette.background.hover,
          borderRadius: "8px",

          "& .MuiLink-root, & .MuiButton-root": {
            backgroundColor: "transparent",
            color: palette.text.primary,

            "& .MuiTypography-root": {
              color: palette.text.primary,
            },
          },
        },
      },

      "& .MuiDivider-root": {
        color: palette.divider.divider,
      },
    },
  },
}));
