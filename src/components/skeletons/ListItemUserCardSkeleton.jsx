import { Box, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import { CardInnerColumn } from "../style";

const ListItemUserCardSkeleton = param => (
  <Grid container spacing={2}>
    {[...Array(param?.pageSize)].map((_, i) => (
      <Grid item xs={param.size ?? 12} sm={param.size ?? 6} md={param.size ?? 4} lg={param.size ?? 4} key={i}>
        <CardInnerColumn>
          <Box display={{ xs: "block", sm: "block" }} width="100%" minHeight="240px" maxHeight="240px">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Box>
          <CardContent>
            <Skeleton variant="rectangular" height="25px" width="200px" sx={{ mb: "10px" }} />
            <Skeleton variant="rectangular" height="25px" sx={{ mb: "1px" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          </CardContent>
          <CardActions sx={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <Grid container spacing={2} display="flex" flexWrap="nowrap" alignItems="center">
              <Grid item>
                <Skeleton variant="circular" width="70px" height="70px" />
              </Grid>
              <Grid item width={"100%"}>
                <Skeleton variant="text" width="100" />
                <Skeleton variant="text" />
              </Grid>
            </Grid>
          </CardActions>
        </CardInnerColumn>
      </Grid>
    ))}
  </Grid>
);

export default ListItemUserCardSkeleton;
