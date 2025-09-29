import { green } from "../colors";
import palette from "../palette";

const MuiChip = {
  styleOverrides: {
    root: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.25rem",
      height: "auto",
      borderRadius: "1rem",
      padding: "0.125rem 0.5rem",
      backgroundColor: palette.background.tag,
      transition: "all 0.3s ease-in",

      "& .MuiChip-label": {
        fontWeight: 500,
        fontSize: "0.75rem",
        lineHeight: "1.5",
        color: palette.text.secondary,
        textTransform: "none",
        padding: 0,
      },

      "& .MuiSvgIcon-root": {
        fontSize: "1rem",

        "&.MuiChip-deleteIcon": {
          margin: "0",
          color: palette.text.secondary,
        },
      },

      "&.MuiChip-sizeSmall": {
        padding: "0 0.375rem",

        "& .MuiSvgIcon-root": {
          fontSize: "0.75rem",
        },
      },

      "&.MuiChip-colorPrimary": {
        backgroundColor: green[700],

        "& .MuiChip-label": {
          color: palette.text.primaryContrast,
        },
      },
    },
  },
};

export default MuiChip;
