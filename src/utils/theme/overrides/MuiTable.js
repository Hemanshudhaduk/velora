import palette from "../palette";

const MuiTable = {
  styleOverrides: {
    root: {
      "& .MuiTableRow-root": {
        "& .MuiTableCell-root": {
          color: palette.text.primary,
          fontSize: "1rem",
          lineHeight: "1.5",
          borderColor: palette.divider.divider,
          padding: "0 0.5rem 0 0",

          "&[align='right']": {
            textAlign: "right",
          },

          "&.MuiTableCell-head": {
            color: palette.text.secondary,
            fontSize: "0.875rem",
            fontWeight: "400",
            lineHeight: "16px",
            padding: "0 0.5rem 0.5rem 0",
          },

          "&.MuiTableCell-paddingLarge": {
            padding: "12px",

            "&.MuiTableCell-head": {
              color: palette.text.primary,
              backgroundColor: palette.background.secondary,
              fontSize: "1rem",
              fontWeight: 500,
              lineHeight: "1.5",
            },
          },
        },
      },

      "&[border='none']": {
        border: "none",

        "& .MuiTableRow-root": {
          "& .MuiTableCell-root": {
            border: "none",
          },
        },
      },
    },
  },
};

export default MuiTable;
