"use client"

import { RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined } from "@mui/icons-material";
import palette from "../palette";

const MuiRadio = {
  defaultProps: {
    icon: <RadioButtonUncheckedOutlined />,
    checkedIcon: <RadioButtonCheckedOutlined />,
  },
  styleOverrides: {
    root: {
      "&.Mui-checked": {
        color: palette.text.secondary,
      },
    },
  },
};

export default MuiRadio;
