import { base, gray, green, orange } from "./colors";

const palette = {
  background: {
    primary: base.white,
    primaryDisabled: gray[200],
    primaryContrast: green[900],
    highlight: gray[700],
    secondary: gray[100],
    tabsSelected: green[50],
    hover: gray[100],
    tag: gray[100],
    tagSelected: green[700],
  },
  divider: {
    divider: gray[200],
    dividerHover: gray[400],
    dividerContrast: green[800],
    error: orange[500],
  },
  text: {
    primary: gray[900],
    primaryContrast: base.white,
    secondary: gray[600],
    secondaryContrast: gray[200],
    secondaryHover: gray[800],
    placeholder: gray[500],
    disabled: gray[400],
    tabSelected: green[600],
    error: orange[500],
    green: green[500],
  },
};

export default palette;
