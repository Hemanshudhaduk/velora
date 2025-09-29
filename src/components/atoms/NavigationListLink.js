"use client";
import palette from "@/src/utils/theme/palette";
import { Link as MuiLink, styled } from "@mui/material";
import NextLink from "next/link";

const LinkStyle = styled(MuiLink)(() => ({
  textDecoration: "none",
}));

function NavigationListLink(props) {
  const { isCurrentPath = false, disc, href, as, ...otherProps } = props;
  return (
    <>
      <LinkStyle
        href={href}
        as={as}
        component={NextLink}
        color={isCurrentPath === true ? palette.text.primary : palette.text.secondary}
        {...otherProps}
      >
        {disc}
      </LinkStyle>
    </>
  );
}

export default NavigationListLink;
