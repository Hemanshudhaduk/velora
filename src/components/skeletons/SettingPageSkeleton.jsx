import { Grid, Skeleton } from "@mui/material";

const SettingPageSkeleton = () => {
  return (
    <>
      <Skeleton variant="rectangular" height={50} />
      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={50} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={50} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={50} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={50} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={50} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={50} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={50} />
      </Grid>
    </>
  );
};

export default SettingPageSkeleton;
