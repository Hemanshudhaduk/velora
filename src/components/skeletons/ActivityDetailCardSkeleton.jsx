import { Box, Divider, Skeleton } from "@mui/material";

const ActivityDetailCardSkeleton = () => {
  return (
    <>
      <Box mt={3} flexWrap={"wrap"}>
        <Skeleton variant="text" component="h6" width="50%" sx={{ marginBottom: 0.5, fontSize: "1.5rem" }} />
        <Skeleton component="p" variant="text" sx={{ marginBottom: 2 }} width="30%" />
        <Divider sx={{ marginBottom: 2 }} />
        <Skeleton component="p" variant="text" width="20%" sx={{ marginBottom: 0.5 }} />
        <Skeleton component="p" variant="text" width="75%" sx={{ marginBottom: 0.5 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Skeleton component="p" variant="text" width="25%" />
          <Skeleton component="p" variant="text" width="25%" />
        </Box>
        <Skeleton variant="rounded" height={50} width="100%" />
        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
        <Skeleton variant="rounded" height={50} width="100%" />
      </Box>
    </>
  );
};

export default ActivityDetailCardSkeleton;
