import { Skeleton } from "@mui/material";

const LocationMapSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" component="h6" sx={{ marginBottom: 2, fontSize: "1.5rem" }} />
      <Skeleton variant="rectangular" height="277px" width="100%" sx={{ marginBottom: 2 }} />
      <Skeleton component="p" variant="text" />
    </>
  );
};
export default LocationMapSkeleton;
