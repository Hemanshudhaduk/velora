import palette from "../palette";

const MuiTextField = {
  styleOverrides: {
    root: {
      width: "100%",

      "& .MuiFormLabel-root": {
        transform: "translate(12px, 12px) scale(1)",

        "&.Mui-focused, &.MuiInputLabel-shrink": {
          transform: "translate(12px, -9px) scale(0.75)",
          color: palette.divider.dividerContrast,
        },

        "&.Mui-error": {
          color: palette.text.error,
        },
      },

      "& .MuiInputBase-root": {
        width: "100%",

        "&.MuiAutocomplete-inputRoot, &.MuiInputBase-multiline": {
          paddingTop: "12px",
          paddingBottom: "12px",

          "& .MuiAutocomplete-input": {
            padding: "0 4px 0 5px",
            width: "0",
          },
        },

        "& .MuiInputBase-input": {
          padding: "12px",
          width: "100%",
          transition: "all 0.3s ease-in",
          lineHeight: 1.5,
          height: "auto",
        },

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.divider.divider,
          transition: "all 0.3s ease-in",
          borderRadius: "8px",
        },

        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.divider.dividerHover,
          },
        },

        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.divider.dividerContrast,
            borderWidth: "1px",
          },
        },

        "&.Mui-error": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.divider.error,
          },
        },
      },

      "& .MuiFormHelperText-root": {
        margin: "8px 0 0",
        fontSize: "14px",
        lineHeight: 1.14286,

        "&.Mui-error": {
          color: palette.text.error,
        },
      },
    },
  },
};

export default MuiTextField;
