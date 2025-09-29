"use client";
import palette from "@/src/utils/theme/palette";
import { Paper, styled } from "@mui/material";
import { CommonModal } from "../atoms";

export const GridBox = styled(Paper)(() => ({
  width: "100%",
  padding: "",
}));

export const CalenderModalStyle = styled(CommonModal)(() => ({
  "& .MuiDialog-container": {
    "& .MuiDialog-paper": {
      maxWidth: 330,

      "& .MuiDialogTitle-root": {
        display: "none",
      },

      "& .MuiDialogContent-root": {
        padding: "1rem 1.5rem",

        "& .MuiPickerStaticWrapper-content": {
          minWidth: "auto",

          "& .MuiCalendarOrClockPicker-root": {
            "&> div": {
              width: "auto",
            },

            "& .MuiCalendarPicker-root": {
              width: "100%",

              "& .MuiPickersCalendarHeader-root": {
                margin: 0,
                padding: 0,
                position: "relative",
                zIndex: 0,
                maxHeight: "none",

                "& .MuiPickersCalendarHeader-labelContainer": {
                  margin: "auto",
                  maxHeight: "none",

                  "& .MuiIconButton-root": {
                    padding: "0.5rem 0",
                  },
                },

                "& .MuiPickersArrowSwitcher-root": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  justifyContent: "space-between",
                  zIndex: -1,

                  "& .MuiIconButton-root": {
                    padding: "0.5rem",
                  },
                },
              },

              "& .MuiDayPicker-header": {
                marginBottom: 2,

                "& .MuiDayPicker-weekDayLabel": {
                  width: 40,
                  height: 40,
                  margin: 0,
                  color: palette.text.secondary,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                },

                "@media screen and (max-width:350px)": {
                  "& .MuiDayPicker-weekDayLabel": {
                    width: 34,
                    height: 34,
                  },
                },
              },

              "& .MuiDayPicker-slideTransition": {
                minHeight: "224px",

                "& .MuiDayPicker-monthContainer": {
                  position: "unset",

                  "& .MuiDayPicker-weekContainer": {
                    margin: "4px 0",

                    "& .MuiPickersDay-root": {
                      width: 40,
                      height: 40,
                      margin: 0,
                      fontSize: "0.875rem",
                      color: palette.text.secondary,
                      borderRadius: "8px",

                      "&.Mui-disabled": {
                        color: palette.text.disabled,
                      },

                      "&.Mui-selected": {
                        backgroundColor: palette.text.tabSelected,
                        color: palette.text.primaryContrast,
                      },
                    },
                  },
                },

                "@media screen and (max-width:350px)": {
                  minHeight: "194px",

                  "& .MuiDayPicker-monthContainer": {
                    position: "unset",

                    "& .MuiDayPicker-weekContainer": {
                      margin: "4px 0",

                      "& .MuiPickersDay-root": {
                        width: 34,
                        height: 34,
                      },
                    },
                  },
                },
              },

              "& .MuiYearPicker-root": {
                "& .PrivatePickersYear-root": {
                  "& .PrivatePickersYear-yearButton": {
                    "&.Mui-selected": {
                      backgroundColor: palette.text.tabSelected,
                      color: palette.text.primaryContrast,
                    },
                  },
                },
              },
            },
          },
        },
      },

      "& .MuiDialogActions-root": {
        padding: "1rem",
        borderTop: `1px solid ${palette.divider.divider}`,
      },

      "@media screen and (max-width:575px)": {
        margin: 24,

        "& .MuiDialogContent-root": {
          padding: "1rem 1.25rem",
        },
      },
    },
  },
}));
