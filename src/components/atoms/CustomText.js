import { Typography as MuiTypography } from "@mui/material";

export default function CustomText(props) {
  const { component, disc, variant, prefix, suffix, ...otherProps } = props;

  return (
    <MuiTypography component={component || "p"} variant={variant || "body2"} {...otherProps}>
      {prefix}
      {disc}
      {suffix}
    </MuiTypography>
  );
}
