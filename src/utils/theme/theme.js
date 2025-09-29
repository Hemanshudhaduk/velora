import { createTheme } from "@mui/material/styles";
import overrides from "./overrides";
import palette from "./palette";
import typography from "./typography";

const theme = createTheme({
  ...palette,
  typography,
  components: overrides,

  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
