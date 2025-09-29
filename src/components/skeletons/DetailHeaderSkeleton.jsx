import { Box, Skeleton } from "@mui/material";

const DetailHeaderSkeleton = props => {
  const { activityPage } = props;
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
        rowGap={{ xs: 3, sm: 0 }}
        columnGap={1}
        mb={3}
      >
        <>
          {!activityPage && <Skeleton variant="circular" sx={{ width: 66, height: 66, borderRadius: "50%" }} />}
          <div style={{ flex: "1 1 0" }}>
            <Skeleton variant="text" height={38} style={{ marginBottom: "4px" }} />
            <Skeleton variant="text" height={24} />
          </div>
        </>
        <Skeleton variant="rounded" height={50} width={120} />
      </Box>
    </>
  );
};

export default DetailHeaderSkeleton;
