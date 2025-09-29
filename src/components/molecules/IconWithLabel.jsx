import palette from "@/src/utils/theme/palette";
import { Box, Typography } from "@mui/material";
import { CustomLink } from "../atoms";
import { CustomImgStyle } from "../style";

const IconWithLabel = props => {
  const { iconLink, label, href, isClickable } = props;
  let updatedHref = "";
  if (!/^https?:\/\//i.test(href)) {
    updatedHref = `https://${href}`;
  } else updatedHref = href;
  return (
    <>
      {href && (
        <Box display="flex" alignItems="center" gap={0.5} mb={1.5}>
          <CustomImgStyle src={iconLink} alt="logo" width="24" height="24" />
          {isClickable ? (
            <CustomLink href={updatedHref} color={palette.text.secondary} disc={label} title={href} target="_blank" />
          ) : (
            <Typography title={href} color={palette.text.secondary}>
              {label}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default IconWithLabel;
