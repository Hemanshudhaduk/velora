"use client";
import { styled, Toolbar } from "@mui/material";

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  margin: "0 auto",
  width: "100%",
  justifyContent: "space-between",
  gap: "1rem",
}));

export default ToolbarStyled;
