"use client";

import { Button as MuiButton, Link as MuiLink, styled } from "@mui/material";
import NextLink from "next/link";

const LinkStyle = styled(MuiLink)(() => ({
  textDecoration: "none",
}));

function CustomLink(props) {
  const { href, disc, btn, as, ...otherProps } = props;
  if (btn) {
    return (
      <MuiButton href={href} component={NextLink} {...otherProps}>
        {disc}
      </MuiButton>
    );
  } else {
    return (
      <LinkStyle href={href} as={as} component={NextLink} {...otherProps}>
        {disc}
      </LinkStyle>
    );
  }
}

export default CustomLink;
