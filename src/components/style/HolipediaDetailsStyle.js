"use client";

import palette from "@/src/utils/theme/palette";
import { styled } from "@mui/material";
import { SectionStyle } from "./CommonStyle";

export const AccessBarsSecStyle = styled(SectionStyle)(() => ({
  padding: "3rem 0 4rem",

  "& .MuiTypography-root": {
    "& p": {
      margin: "0 0 0.5rem",

      "&:last-child": {
        marginBottom: "0",
      },
    },
  },

  "& .MuiButtonGroup-root": {
    gap: "1rem",
    borderRadius: "0.5rem",
    marginTop: "1.5rem",

    "& .MuiButton-root": {
      borderRadius: "0.5rem",
    },
  },

  "@media screen and (max-width: 575px)": {
    "& .MuiButtonGroup-root": {
      flexWrap: "wrap",
    },
  },
}));

export const ArticleSecStyle = styled(SectionStyle)(() => ({
  padding: "0 0 4rem",

  "& #ArticleSidebar": {
    position: "sticky",
    top: "6rem",
  },

  "& .MuiList-root": {
    "& .MuiListItem-root": {
      marginBottom: "0.75rem",
      outline: "none",
      transition: "all 0.3s ease-in-out",

      "& .MuiTypography-root": {
        transition: "all 0.3s ease-in-out",
      },

      "& .cm-gosec": {
        "& .cm-gosec-active": {
          "&.MuiTypography-root": {
            color: palette.text.tabSelected,
          },
        },

        "&:hover, &:focus": {
          "& .MuiTypography-root": {
            color: palette.text.primary,
          },
        },
      },

      "&:last-child": {
        marginBottom: "0",
      },
    },
  },

  "& .MuiBox-root": {
    "& .MuiTypography-root": {
      "& p": {
        margin: "0 0 0.5rem",
        textOverflow: "ellipsis",
        overflow: "hidden",

        "&:last-child": {
          marginBottom: "0",
        },
      },
    },
  },

  "& #symptoms": {
    "& .MuiBox-root": {
      padding: "3rem 5rem",
      borderRadius: "24px",
      backgroundColor: palette.background.secondary,

      "& .MuiList-root": {
        "& .MuiListItem-root": {
          transition: "all 0.3s ease-in-out",

          "& .MuiLink-root": {
            "&.MuiTypography-root": {
              "& p": {
                marginBottom: "0",
              },
            },
            "& .MuiSvgIcon-root": {
              color: palette.text.secondary,
              transition: "all 0.3s ease-in-out",
            },
          },

          "&.active, &:hover, &:focus": {
            "& .MuiTypography-root": {
              color: palette.text.primary,
            },

            "& .MuiSvgIcon-root": {
              color: palette.text.primary,
              transform: "translateX(12px)",
            },
          },
        },
      },
    },
  },

  "@media screen and (max-width: 991px)": {
    "& #symptoms": {
      "& .MuiBox-root": {
        padding: "1.5rem 2.5rem",
      },
    },
  },

  "@media screen and (max-width: 767px)": {
    padding: "0 0 3rem",

    "& #symptoms": {
      "& .MuiBox-root": {
        padding: "1rem 1.5rem",
      },
    },
  },
}));
