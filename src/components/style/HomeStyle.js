"use client";
import { gray } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { styled } from "@mui/material";
import { HomeCategoriesSecStyle, SectionStyle } from "./CommonStyle";

export const OurStoryTopImgStyle = styled("div")(() => ({
  display: "flex",
  justifyContent: "start",
  paddingLeft: "4.19rem",

  "& img:first-child": {
    maxWidth: "4.5rem !important",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "16px",
    marginRight: "2rem",
    marginTop: "-0.56rem",
  },

  "& img:nth-child(2)": {
    maxWidth: "5.625rem !important",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "16px",
    marginRight: "2.19rem",
  },

  "& img:nth-child(3)": {
    maxWidth: "5.375rem !important",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "16px",
    marginTop: "2.56rem",
  },

  "@media screen and (max-width: 574px)": {
    paddingLeft: "3.5rem",

    "& img:first-child": {
      maxWidth: "3.8835rem !important",
      height: "4.55rem !important",
      marginRight: "1.7rem",
      marginTop: "-0.56rem",
      aspectRatio: "unset",
    },

    "& img:nth-child(2)": {
      maxWidth: "4.78788rem !important",
      height: "5.625rem !important",
      marginRight: "1.86rem",
      aspectRatio: "unset",
    },

    "& img:nth-child(3)": {
      maxWidth: "4.57506rem !important",
      maxHeight: "5.375rem !important",
      marginTop: "2.56rem",
      aspectRatio: "unset",
    },
  },

  "@media screen and (max-width: 350px)": {
    paddingLeft: "0",
  },
}));

export const OurStoryBottomImgStyle = styled("div")(() => ({
  display: "flex",
  justifyContent: "start",
  gap: "4.44rem",
  marginTop: "-2.56rem",

  "& img:first-child": {
    maxWidth: "8rem !important",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "16px",
  },

  "& img:nth-child(2)": {
    maxWidth: "5.5rem !important",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "16px",
    marginTop: "1.62rem",
  },

  "@media screen and (max-width: 574px)": {
    gap: "3.78rem",
    marginTop: "-2.56rem",

    "& img:first-child": {
      maxWidth: "6.80938rem !important",
      height: "8rem !important",
    },

    "& img:nth-child(2)": {
      maxWidth: "4.68144rem !important",
      height: "5.5rem !important",
    },
  },

  "@media screen and (max-width: 350px)": {
    gap: "1.5rem",

    "& img:first-child": {
      maxWidth: "6rem !important",
    },
  },
}));

export const FeatureSecTopImgStyle = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  gap: "16px",
  marginBottom: "16px",

  "& img:first-child": {
    maxWidth: "12rem !important",
    maxHeight: "8rem !important",
    objectFit: "cover",
    borderRadius: "16px",
  },

  "& img:nth-child(2)": {
    maxWidth: "12.5rem !important",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "16px",
  },

  "@media screen and (max-width: 1199px)": {
    "& img:first-child": {
      maxWidth: "10rem !important",
      maxHeight: "6rem !important",
    },

    "& img:nth-child(2)": {
      maxWidth: "12.5rem !important",
    },
  },
  "@media screen and (max-width: 575px)": {
    "& img:first-child": {
      maxHeight: "10rem !important",
      aspectRatio: "1/ 1",
    },

    "& img:nth-child(2)": {
      maxWidth: "10rem !important",
      height: "15rem !important",
    },
  },
  "@media screen and (max-width: 340px)": {
    "& img:first-child": {
      maxHeight: "8rem !important",
      aspectRatio: "1/ 1",
    },

    "& img:nth-child(2)": {
      maxWidth: "8rem !important",
      height: "13rem !important",
    },
  },
}));

export const FeatureSecBottomImgStyle = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "bottom",
  gap: "16px",

  "& img:nth-child(1)": {
    maxWidth: "10rem !important",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "16px",
  },

  "& img:nth-child(2)": {
    maxWidth: "10rem !important",
    height: "15rem !important",
    objectFit: "cover",
    borderRadius: "16px",
  },

  "& img:nth-child(3)": {
    maxWidth: "12rem !important",
    height: "8rem !important",
    objectFit: "cover",
    borderRadius: "16px",
  },

  "@media screen and (max-width: 1199px)": {
    "& img:first-child": {
      maxWidth: "8rem !important",
    },

    "& img:nth-child(2)": {
      maxWidth: "8rem !important",
      height: "13rem !important",
    },

    "& img:nth-child(3)": {
      maxWidth: "10rem !important",
      height: "6rem !important",
    },
  },

  "@media screen and (max-width: 767px)": {
    display: "none",
  },
}));

export const HomeStaticPartStyle = styled("div")(({ gap, imageUrl }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: "80px",
  paddingBottom: "70px",
  justifyContent: "center",
  alignItems: "start",
  gap: gap || "0",

  "@media screen and (max-width: 767px)": {
    marginBottom: "1.5rem",
  },

  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundImage: imageUrl && `url(${imageUrl})`,
  backgroundRepeat: "no-repeat",
}));

export const HeroSecStyle = styled(SectionStyle)({
  backgroundColor: gray[50],

  "& img:first-child": {
    width: "16.25rem !important",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: "18.087px",
    boxShadow:
      "0px 4.522px 6.783px -2.261px rgba(16, 24, 40, 0.03), 0px 13.565px 18.087px -4.522px rgba(16, 24, 40, 0.08)",
  },

  "& img:nth-child(2)": {
    width: "13.125rem !important",
    height: "15.14425rem !important",
    objectFit: "cover",
    borderRadius: "12.923px",
    boxShadow:
      "0px 3.231px 4.846px -1.615px rgba(16, 24, 40, 0.03), 0px 9.692px 12.923px -3.231px rgba(16, 24, 40, 0.08)",
  },

  "& img:nth-child(3)": {
    width: "14.9375rem !important",
    height: "14.375rem !important",
    objectFit: "cover",
    borderRadius: "12.267px",
    boxShadow:
      "0px 3.231px 4.846px -1.615px rgba(16, 24, 40, 0.03), 0px 9.692px 12.923px -3.231px rgba(16, 24, 40, 0.08)",
  },

  "& img:nth-child(4)": {
    width: "14.95rem !important",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: "28.743px",
    boxShadow:
      "0px 3.231px 4.846px -1.615px rgba(16, 24, 40, 0.03), 0px 9.692px 12.923px -3.231px rgba(16, 24, 40, 0.08)",
  },

  "@media screen and (max-width: 1199px)": {
    "& img:first-child": {
      width: "12.5rem !important",
    },

    "& img:nth-child(2)": {
      width: "9.375rem !important",
      height: "11.25rem !important",
    },

    "& img:nth-child(3)": {
      width: "11.25rem !important",
      height: "10.625rem !important",
    },

    "& img:nth-child(4)": {
      width: "12.5rem !important",
    },
  },

  "@media screen and (max-width: 991px)": {
    "& img:first-child": {
      width: "10rem !important",
    },

    "& img:nth-child(2)": {
      width: "6.875rem !important",
      height: "8.75rem !important",
    },

    "& img:nth-child(3)": {
      width: "8.45rem !important",
      height: "7.825rem !important",
    },

    "& img:nth-child(4)": {
      width: "10rem !important",
    },
  },

  "@media screen and (max-width: 767px)": {
    "& img:first-child": {
      width: "100% !important",
      maxHeight: "18.75rem",
      maxWidth: "21.375rem",
    },

    "& img:nth-child(2)": {
      display: "none",
    },

    "& img:nth-child(3)": {
      display: "none",
    },

    "& img:nth-child(4)": {
      display: "none",
    },
  },
});

export const ArticleSecStyle = styled(SectionStyle)({});

export const ActivitySecStyle = styled(SectionStyle)({
  "& .MuiTypography-root": {
    "& .MuiCard-root": {
      padding: "0",

      "& .MuiGrid-root": {
        flexDirection: "column",

        "& > .MuiBox-root": {
          "&:first-child": {
            lineHeight: 0.6,
            height: "176px !important",

            ".MuiBox-root": {
              minHeight: "176px",
              height: "176px !important",
              borderRadius: 0,
            },

            "& img": {
              minHeight: "100%",
              borderRadius: 0,
            },
          },

          "&:last-child": {
            padding: "0 16px 16px 16px",
          },
        },
      },
    },
  },
});

export const ListItemSkeletonHome = styled("div")({
  "& .MuiCard-root": {
    padding: "0",

    "& .MuiGrid-root": {
      flexDirection: "column",

      "& > .MuiBox-root": {
        height: "176px !important",
        "&:first-child": {
          lineHeight: 0.6,

          "& .MuiSkeleton-root": {
            minHeight: "176px",
            height: "176px !important",
            borderRadius: 0,
          },
        },

        "&:last-child": {
          padding: "0 16px 16px 16px",
        },
      },
    },
  },
});

export const ExploreSecStyle = styled(SectionStyle)({
  "& .MuiTypography-h2": {
    marginBottom: "4rem",
    textAlign: "center",
  },

  "& .MuiGrid-item": {
    "& a": {
      display: "block",
      lineHeight: 1,

      "& img": {
        width: "100%",
        aspectRatio: "1 / 1",
        objectFit: "cover",
        borderRadius: "24px",
      },

      "& .MuiTypography-root": {
        textAlign: "center",
        padding: "16px",
      },
    },
  },

  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-h2": {
      marginBottom: "1.5rem",
    },

    "& .MuiGrid-container": {
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
  },
});

export const FeatureSecStyle = styled(SectionStyle)({
  background: palette.background.secondary,
});

export const CategoriesSecStyle = styled(HomeCategoriesSecStyle)({
  "& .MuiTypography-h2": {
    paddingTop: "6rem",
    marginBottom: "4rem",
    textAlign: "center",
  },

  "& .MuiLink-root": {
    height: "100%",
    display: "block",
    textDecoration: "none",

    "& .MuiTypography-root": {
      cursor: "pointer",
    },

    "& .MuiCard-root": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "2px",
      borderRadius: "24px",
      border: `2px solid ${palette.divider.divider}`,
      boxShadow: "none",
      height: "100%",
      minHeight: "147px",
      transition: "all 0.3s ease-in-out",

      "& .MuiCardContent-root": {
        width: "100%",
        padding: "24px",
        textAlign: "center",
        textDecoration: "none",

        "& img": {
          maxWidth: "32px",
          maxHeight: "32px",
        },

        "& .MuiTypography-root": {
          color: palette.text.primary,
        },
      },
    },

    "&:hover": {
      "& .MuiTypography-root": {
        color: palette.text.primary,
        transition: "all 0.3s ease-in-out",
      },

      "& .MuiCard-root": {
        backgroundColor: palette.background.hover,
      },
    },
  },

  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-h2": {
      paddingTop: "3rem",
      marginBottom: "1.5rem",
    },
  },
});

export const SymptomsSecStyle = styled(SectionStyle)({
  "& .MuiLink-root": {
    gap: "8px",
    paddingRight: "0",
    transition: "all 0.3s ease-in-out",

    "& .MuiTypography-root": {
      fontWeight: "600",
      color: palette.text.secondary,
      transition: "all 0.3s ease-in-out",

      "&.MuiTypography-body1": {
        marginBottom: "0",
      },
    },

    "& .MuiSvgIcon-root": {
      color: palette.text.secondary,
      transition: "all 0.3s ease-in-out",
    },

    "&:hover": {
      gap: "12px",

      "& .MuiTypography-root": {
        color: palette.text.primary,
      },

      "& .MuiSvgIcon-root": {
        color: palette.text.primary,
        transform: "translateX(12px)",
      },
    },
  },

  "& .MuiButton-root": {
    marginTop: "4rem",
  },
  "@media screen and (max-width: 767px)": {
    "& .MuiGrid-root": {
      "& .MuiGrid-item": {
        "&:nth-child(3n)": {
          paddingBottom: "1.5rem",
        },
        "&:nth-last-child(2)": {
          paddingBottom: "0",
        },
      },
    },

    "& .MuiButton-root": {
      marginTop: "2rem",
    },
  },
});
