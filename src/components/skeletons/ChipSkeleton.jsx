import { Box, Skeleton } from "@mui/material";

const ChipSkeleton = ({ numberOfTab }) => {
  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={1} mt={{ sm: 3 }} pb={3}>
        {Array.from({ length: numberOfTab }, (_, index) => (
          <div key={index}>
            <Skeleton variant="rounded" height={24} width={100} sx={{ borderRadius: 3 }} />
          </div>
        ))}
      </Box>
    </>
  );
};
export default ChipSkeleton;
