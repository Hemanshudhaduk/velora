"use client";
import { Button } from "@mui/material";

const OpenNewTabButton = ({ url, buttonName }) => {
  const openURLNewTab = () => {
    window.open(url, "_blank");
  };
  return (
    <Button variant="contained" color="primary" onClick={openURLNewTab}>
      {buttonName}
    </Button>
  );
};

export default OpenNewTabButton;
