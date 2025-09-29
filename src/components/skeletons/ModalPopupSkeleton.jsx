import { Skeleton } from "@mui/material";

const ModalPopupSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" height="40px" style={{ marginBottom: "5px" }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </>
  );
};
export default ModalPopupSkeleton;
