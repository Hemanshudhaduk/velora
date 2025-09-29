"use client"
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined } from "@mui/icons-material";
import palette from "../palette";

const MuiCheckbox = {
  defaultProps: {
    icon: <CheckBoxOutlineBlankOutlined />,
    checkedIcon: <CheckBoxOutlined />,
  },
  styleOverrides: {
    root: {
      "&.Mui-checked": {
        color: palette.text.secondary,
      },

      "&.Mui-disabled": {
        color: palette.text.disabled,
      },
    },
  },
};

export default MuiCheckbox;
