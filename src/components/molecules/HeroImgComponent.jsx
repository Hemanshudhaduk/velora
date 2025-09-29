"use client";

import palette from "@/src/utils/theme/palette";
import { Typography, styled } from "@mui/material";
import { CustomImgStyle } from "../style";

function HeroImgComponent(props) {
  const { primary, secondary, src, alt, mt, mb, primaryTypographyProps, secondaryTypographyProps } = props;

  const HeroImgStyle = styled(CustomImgStyle)(() => ({
    maxHeight: "20.5rem",
    minHeight: "7.5rem",
    marginBottom: `${mb}rem`,
    marginTop: `${mt}rem`,
    borderRadius: "8px",

    "@media screen and (max-width: 767px)": {
      marginBottom: "1.5rem",
      marginTop: "3rem",
      minHeight: "16rem",
    },
  }));

  const HeroContentStyle = styled("div")(() => ({
    "@media screen and (max-width: 767px)": {
      "& .MuiTypography-root": {
        width: "100%",
      },
      "& .MuiTypography-subtitle1 ": {
        fontSize: "1rem",
      },
      "& h1": {
        width: "100%",
        fontSize: "1.875rem",
        lineHeight: "1.26",
        marginBottom: "0.5rem",
      },
    },
  }));

  return (
    <>
      <HeroImgStyle src={src} alt={alt} fill={true} />
      <HeroContentStyle>
        <Typography
          component="h1"
          mb={primaryTypographyProps?.mb || 0.5}
          variant={primaryTypographyProps?.variant || "h5"}
          width={primaryTypographyProps?.width || "100%"}
          color={primaryTypographyProps?.color || "inherit"}
        >
          {primary}
        </Typography>
        <Typography
          color={secondaryTypographyProps?.color || palette.text.secondary}
          variant={secondaryTypographyProps?.variant || "body1"}
          width={secondaryTypographyProps?.width || "inherit"}
        >
          {secondary}
        </Typography>
      </HeroContentStyle>
    </>
  );
}

export default HeroImgComponent;
