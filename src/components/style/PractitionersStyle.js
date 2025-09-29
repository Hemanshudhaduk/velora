"use client";
import { gray, green } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { styled } from "@mui/material";
import { SectionStyle } from "./CommonStyle";

export const PractitionersHeroSecStyle = styled(SectionStyle)(() => ({}));

export const PractitionersFeatureSecStyle = styled(SectionStyle)({
  marginBottom: "6rem",
  position: "relative",

  "& .MuiList-root": {
    padding: "0 32px",

    "& .MuiListItem-root": {
      gap: "0.75rem",
      alignItems: "flex-start",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",

      "& .MuiListItemIcon-root": {
        minWidth: "auto",

        "& .MuiSvgIcon-root": {
          color: green[500],
        },
      },

      "& .MuiListItemText-root": {
        margin: "0",
        color: gray[600],
      },
    },
  },

  "& img": {
    position: "absolute !important",
    width: "calc(50% - 4rem) !important",
    right: "0 !important",
    left: "auto !important",
  },

  "@media screen and (max-width:1199px)": {
    "& .MuiList-root": {
      padding: "0 24px",
    },

    "& img": {
      width: "calc(50% - 3rem) !important",
    },
  },

  "@media screen and (max-width:991px)": {
    margin: 0,
    padding: "0 0 6rem",

    "& .MuiList-root": {
      padding: "0",
    },

    "& img": {
      position: "unset !important",
      width: "100% !important",
    },
  },

  "@media screen and (min-width:1921px)": {
    "& img": {
      width: "100% !important",
      right: "unset !important",
      position: "unset !important",
    },
  },
});

export const PractitionersNeedsSecStyle = styled(SectionStyle)({
  padding: "3.625rem 0 9.625rem",
  position: "relative",

  "& img[alt='icon']": {
    maxWidth: "2rem",
    maxHeight: "2rem",
    objectFit: "contain",
  },

  "& #dashboard": {
    position: "absolute !important",
    width: "calc(50% - 4rem) !important",
    right: "0 !important",
    left: "auto !important",
    objectFit: "contain",
    objectPosition: "center right",
  },

  "@media screen and (max-width:991px)": {
    padding: "4rem 0 0",

    "& #dashboard": {
      position: "unset !important",
      width: "100% !important",
    },
  },

  "@media screen and (min-width:1921px)": {
    "& #dashboard": {
      width: "100% !important",
      right: "unset !important",
      position: "unset !important",
    },
  },
});

export const PractitionersPaymentSecStyle = styled(SectionStyle)({
  "& .MuiGrid-container": {
    backgroundColor: palette.background.secondary,
    borderRadius: "16px",
  },
});

export const PractitionersPricingSecStyle = styled(SectionStyle)({
  paddingTop: "0",

  "& .MuiCard-root": {
    borderRadius: "16px",
    border: `1px solid ${palette.divider.dividerContrast}`,
    boxShadow: "none",
    height: "100%",

    "& .MuiCardHeader-root": {
      padding: "32px",

      "& .MuiCardHeader-action": {
        margin: 0,
        alignSelf: "center",
      },
    },

    "& .MuiCardContent-root": {
      padding: "32px",
      borderBottom: `1px solid ${palette.divider.divider}`,

      "&:last-child": {
        borderBottom: 0,
      },

      "& .MuiList-root": {
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",

        "& .MuiListItem-root": {
          gap: "12px",

          "& .MuiListItemIcon-root": {
            minWidth: "auto",

            "& img[alt='checkmark']": {
              maxHeight: "24px",
              maxWidth: "24px",
              objectFit: "contain",
            },
          },

          "& .MuiListItemText-root": {
            margin: "0",
          },
        },
      },
    },
  },

  "@media screen and (max-width:991px)": {
    "& .MuiCard-root": {
      "& .MuiCardHeader-root": {
        flexWrap: "wrap",
        gap: "2rem",
      },
    },

    "& .MuiGrid-item:last-child": {
      "& .MuiCard-root": {
        height: "auto",
      },
    },
  },
});

export const PractitionersHolipreneurSecStyle = styled(SectionStyle)({
  backgroundColor: green[800],

  "& img:first-child": {
    borderRadius: "16px",
  },

  "& .MuiList-root": {
    "& .MuiListItem-root": {
      alignItems: "flex-start",

      "& .MuiListItemIcon-root": {
        minWidth: "auto",
        padding: "0.8rem",

        "& .MuiSvgIcon-root": {
          color: palette.text.secondaryContrast,
          fontSize: "0.5rem",
        },
      },

      "& .MuiListItemText-root": {
        margin: "0",

        "& .MuiTypography-root": {
          color: palette.text.secondaryContrast,
        },
      },
    },
  },
});
