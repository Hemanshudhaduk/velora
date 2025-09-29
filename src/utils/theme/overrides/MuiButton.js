import { green, orange } from "../colors";
import palette from "../palette";

const MuiButton = {
  styleOverrides: {
    root: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      border: "1px solid transparent",
      color: palette.text.secondary,
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.5rem",
      borderRadius: "0.5rem",
      padding: "0.75rem 1.5rem",
      boxShadow: "none",
      transition: "all 0.3s ease-in",

      "&:hover, &:active": {
        boxShadow: "none",
      },

      "&.MuiButton-sizeSmall": {
        padding: "0.5rem 1rem",
      },

      "&.MuiButton-contained": {
        "&.MuiButton-containedPrimary": {
          color: palette.text.primaryContrast,
          borderColor: green[600],
          background: green[600],

          "&:hover": {
            borderColor: green[800],
            background: green[800],
          },

          "&:focus, &.Mui-focused": {
            borderColor: green[700],
            background: green[700],
          },

          "&.Mui-disabled": {
            borderColor: green[200],
            background: green[200],
          },
        },

        "&.MuiButton-containedError": {
          color: palette.text.primaryContrast,
          borderColor: orange[500],
          background: orange[500],

          "&:hover": {
            borderColor: orange[700],
            background: orange[700],
          },

          "&:focus, &.Mui-focused": {
            borderColor: orange[600],
            background: orange[600],
          },

          "&.Mui-disabled": {
            borderColor: orange[200],
            background: orange[200],
          },
        },
      },

      "&.MuiButton-outlined": {
        "&.MuiButton-outlinedInherit": {
          color: palette.text.secondary,
          borderColor: palette.text.secondary,
          background: palette.background.primary,

          "&:hover": {
            color: palette.text.secondaryHover,
            borderColor: palette.text.secondaryHover,
            background: palette.background.hover,
          },

          "&:focus, &.Mui-focused": {
            color: palette.text.secondaryHover,
            borderColor: palette.text.secondaryHover,
            background: palette.background.hover,
          },

          "&.Mui-disabled": {
            color: palette.text.disabled,
            borderColor: palette.text.disabled,
            background: palette.background.primaryDisabled,
          },
        },

        "&.MuiButton-outlinedPrimary": {
          color: green[600],
          borderColor: green[600],
          background: palette.background.primary,

          "&:hover": {
            borderColor: green[700],
            background: green[50],
          },

          "&:focus, &.Mui-focused": {
            borderColor: green[700],
            background: green[100],
          },

          "&.Mui-disabled": {
            borderColor: green[200],
            background: green[200],
          },
        },

        "&.MuiButton-outlinedError": {
          color: orange[600],
          borderColor: orange[600],
          background: palette.background.primary,

          "&:hover": {
            borderColor: orange[700],
            background: orange[50],
          },

          "&:focus, &.Mui-focused": {
            borderColor: orange[700],
            background: orange[100],
          },

          "&.Mui-disabled": {
            borderColor: orange[200],
            background: orange[200],
          },
        },
      },

      "&.MuiButton-text": {
        padding: 0,
        background: "none",

        "&.Mui-disabled": {
          color: palette.text.disabled,
        },
      },
    },
  },
};

export default MuiButton;
