"use client";
import palette from "@/src/utils/theme/palette";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

const ReadMore = props => {
  const { variant, color, label, text, textSize, nextMore } = props;
  const [displaySize, setDisplaySize] = useState(textSize);
  return (
    <>
      <Typography variant={variant ?? "body1"} color={color ?? palette.text.secondary} sx={{ whiteSpace: "pre-wrap" }}>
        {text.substring(0, displaySize)}
        {text.length > displaySize ? "..." : ""}
      </Typography>
      {text.length > displaySize ? (
        <Button
          variant="text"
          disableRipple
          sx={{ padding: 0 }}
          onClick={() => {
            setDisplaySize(displaySize + nextMore);
          }}
        >
          {label}
        </Button>
      ) : null}
    </>
  );
};

export default ReadMore;
