import { Grid, Skeleton } from "@mui/material";
import { ListItemUserCardSkeleton } from ".";

const ArticleGridSkeleton = param => (
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
        {[...Array(param?.buttonSize ?? 2)].map((_, i) => (
          <Skeleton width="87px" height="48px" variant="rounded" key={i} />
        ))}
      </Grid>
    </Grid>
    <ListItemUserCardSkeleton pageSize={param?.pageSize} />
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

export default ArticleGridSkeleton;
