import { Grid, Skeleton } from "@mui/material";
import ListItemSkeleton from "./ListItemSkeleton";

const GridSkeleton = param => (
  <>
    <Grid container mb={3}>
      <Grid item xs={12} sm={6}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={6}
        display="flex"
        justifyContent={{ xs: "flex-start", sm: "flex-end" }}
        marginTop={{ xs: 2, sm: 0 }}
        alignItems="center"
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
        minHeight={48}
        gap={2}
      >
        <Skeleton width="120px" height="48px" variant="rounded" />
        <Skeleton width="87px" height="48px" variant="rounded" />
        <Skeleton width="87px" height="48px" variant="rounded" />
      </Grid>
    </Grid>
    {[...Array(param?.pageSize)].map((_, i) => (
      <ListItemSkeleton key={i} />
    ))}
    <Grid container>
      <Grid item xs={6} sm={6}>
        <></>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Skeleton variant="text" />
      </Grid>
    </Grid>
  </>
);

export default GridSkeleton;
