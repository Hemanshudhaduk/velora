"use client";
import { mobileValidation } from "@/src/constants";
import { Box, Grid, Skeleton } from "@mui/material";

const ProviderImageComponentSkeleton = props => {
  return (
    <Box py={1} borderRadius={1} className="ImageComponent">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={225}
            bgcolor="lightgray"
            sx={{
              borderRadius:{xs: "8px", sm:"8px 0 0 8px"}}}
          />
        </Grid>
        {mobileValidation.test(navigator.userAgent) ? null : (
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" width="100%" height={225} bgcolor="lightgray" />
          </Grid>
        )}
        {mobileValidation.test(navigator.userAgent) ? null : (
          <Grid item xs={12} sm={4}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={225}
              bgcolor="lightgray"
              sx={{ borderRadius: "0 8px 8px 0" }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default ProviderImageComponentSkeleton;
