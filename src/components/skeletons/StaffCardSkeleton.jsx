import { CardContent, Skeleton } from "@mui/material";
import { StaffCardStyle } from "../style";

const StaffCardSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" component="h6" sx={{ marginBottom: 3, fontSize: "1.5rem" }} />
      <StaffCardStyle>
        <Skeleton variant="circular" width={66} height={66} sx={{ marginRight: 2 }} />
        <CardContent>
          <Skeleton component={"h4"} variant="text" sx={{ marginBottom: "0.5rem" }} />
          <Skeleton variant="text" component="p" width="100%" />
          <Skeleton variant="text" component="p" width="75%" />
        </CardContent>
      </StaffCardStyle>
      <StaffCardStyle>
        <Skeleton variant="circular" width={66} height={66} sx={{ marginRight: 2 }} />
        <CardContent>
          <Skeleton component={"h4"} variant="text" sx={{ marginBottom: "0.5rem" }} />
          <Skeleton variant="text" component="p" width="100%" />
          <Skeleton variant="text" component="p" width="75%" />
        </CardContent>
      </StaffCardStyle>
    </>
  );
};

export default StaffCardSkeleton;
