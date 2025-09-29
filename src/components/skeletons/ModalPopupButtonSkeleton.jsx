import { Grid, Skeleton } from "@mui/material";

const ModalPopupButtonSkeleton = () => {
  return (
    <Grid
      container
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      flexWrap={{ xs: "wrap", sm: "nowrap" }}
      mt={2}
      minHeight={48}
    >
      <Skeleton width="200px" height="80px" />
      <Skeleton width="200px" height="80px" style={{ marginLeft: "10px" }} />
    </Grid>
  );
};
export default ModalPopupButtonSkeleton;
