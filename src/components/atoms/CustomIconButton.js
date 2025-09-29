import { Box, IconButton, Typography as MuiTypography } from "@mui/material";

export default function CustomText(props) {
  const { prefix, disc, suffix, ariaControls, onClick, ...otherProps } = props;

  return (
    <IconButton onClick={onClick} aria-controls={ariaControls}>
      {prefix && (
        <Box component="span" mr={1}>
          {prefix}
        </Box>
      )}
      <MuiTypography variant="subtitle2">{disc}</MuiTypography>
      {suffix && (
        <Box component="span" ml={1}>
          {suffix}
        </Box>
      )}
    </IconButton>
  );
}
