import palette from "@/src/utils/theme/palette";
import { Typography } from "@mui/material";

const GridHeaderLeft = props => {
  const { header, subHeader, headerVariant = "h5", headerComponent = "h5" } = props;
  return (
    <>
      {header && (
        <Typography variant={headerVariant} component={headerComponent} mb={0.5}>
          {header}
        </Typography>
      )}
      {subHeader && (
        <Typography variant="body1" color={palette.text.secondary}>
          {subHeader}
        </Typography>
      )}
    </>
  );
};

export default GridHeaderLeft;
