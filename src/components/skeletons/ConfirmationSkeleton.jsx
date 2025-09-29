import { Grid, Skeleton } from "@mui/material";

const ConfirmationSkeleton = () => (
  <Grid container sx={{ display: "flex", justifyContent: "center" }}>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Skeleton variant="text" width={300} height={60} />
    </Grid>
    <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
      <Skeleton variant="text" width={300} height={30} />
    </Grid>
    <Grid item xs={12}>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={1}>
          <Skeleton variant="text" width={100} height={50} sx={{ marginRight: 1 }} />
        </Grid>
        <Grid item xs={1}>
          <Skeleton variant="text" width={150} height={50} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default ConfirmationSkeleton;
