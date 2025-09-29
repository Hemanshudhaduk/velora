import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { ActivityCardStyle, ContentBoxStyle, ImageBoxStyle, ImageSkeleton } from "../style";

const ListItemSkeleton = params => (
  <>
    <Grid
      container
      display="flex"
      gap="20px"
      flexDirection={params.style === undefined ? { xs: "column", sm: "row" } : params.style}
    >
      <ImageBoxStyle display={{ xs: "block", sm: "block" }} sx={params.divStyle}>
        <ImageSkeleton
          sx={params.imgStyle}
          width={params.style === undefined ? "200px" : "100%"}
          height="164px"
          variant="rounded"
        />
      </ImageBoxStyle>
      <ContentBoxStyle>
        <Skeleton variant="text" sx={{ mb: 1 }} />
        <Skeleton variant="text" sx={{ mr: 1 }} />
        <Skeleton variant="text" sx={{ mr: 1 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
          mt={2}
          minHeight={48}
        >
          <Skeleton width="87px" variant="text" />
          <Stack direction="row" gap={2}>
            {[...Array(params.numberOfButtons ?? 1)].map((_, i) => (
              <Skeleton key={i} width="100px" height="48px" />
            ))}
          </Stack>
        </Box>
      </ContentBoxStyle>
    </Grid>
  </>
);

export default ListItemSkeleton;
