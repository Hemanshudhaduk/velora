import { Box, Skeleton } from "@mui/material";

const TitleContentSkeleton = ({ numberOfLines }) => {
  return (
    <Box mt={3} pb={3}>
      <Skeleton variant="text" component="h6" sx={{ marginBottom: 3, fontSize: "1.5rem" }} />
      {Array.from({ length: numberOfLines }, (_, index) => (
        <Skeleton key={index} variant="text" component="p" />
      ))}
    </Box>
  );
};

export default TitleContentSkeleton;
