const MuiContainer = {
  styleOverrides: {
    root: {
      paddingRight: "24px",
      paddingLeft: "24px",

      "@media screen and (min-width: 1200px)": {
        maxWidth: "1280px",
        paddingRight: "32px",
        paddingLeft: "32px",
      },

      "@media screen and (min-width: 1536px)": {
        maxWidth: "1400px",
      },
    },
  },
};

export default MuiContainer;
