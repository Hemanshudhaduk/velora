import { Box, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import { ProviderCardStyle } from "../style";

const ProviderGridSkeleton = param => (
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
    <Grid container spacing={2}>
      {[...Array(param?.pageSize)].map((_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <ProviderCardStyle>
            <Box display={{ xs: "block", sm: "block" }}>
              <Skeleton variant="circular" width={150} height={150} />
            </Box>
            <CardContent>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            </CardContent>
            <CardActions>
              <Skeleton width="100%" height="60px" />
            </CardActions>
          </ProviderCardStyle>
        </Grid>
      ))}
    </Grid>
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

export default ProviderGridSkeleton;
