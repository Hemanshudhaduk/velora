"use client";
import palette from "@/src/utils/theme/palette";
import { AppBar, styled } from "@mui/material";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: palette.background.primary,
  borderBottom: `1px solid ${theme.palette.divider.divider}`,
  boxShadow: "none",

  "@media screen and (max-width: 767px)": {
    "& + section, + .MuiContainer-root": {
      marginTop: "56px",
    },
  },
}));

export default AppBarStyled;
