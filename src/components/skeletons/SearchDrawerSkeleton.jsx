import { Box, Skeleton } from "@mui/material";
import { ContentBoxStyle, SearchActivityCardStyle } from "../style";

const SearchDrawerSkeleton = params => {
  return (
    <>
      <Box px={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" />
        {[...Array(params?.size)].map((_, i) => (
          <SearchActivityCardStyle key={i} sx={{ marginBottom: "0.5rem", cursor: "pointer" }}>
            <ContentBoxStyle display="flex" flexDirection="column" gap={1} justifyContent="space-between">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </ContentBoxStyle>
          </SearchActivityCardStyle>
        ))}
        <Skeleton height="48px" />
      </Box>
      <Box px={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" />
        {[...Array(params?.size)].map((_, i) => (
          <SearchActivityCardStyle key={i} sx={{ marginBottom: "0.5rem", cursor: "pointer" }}>
            <ContentBoxStyle display="flex" flexDirection="column" gap={1} justifyContent="space-between">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </ContentBoxStyle>
          </SearchActivityCardStyle>
        ))}
        <Skeleton height="48px" />
      </Box>
      <Box px={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" />
        {[...Array(params?.size)].map((_, i) => (
          <SearchActivityCardStyle key={i} sx={{ marginBottom: "0.5rem", cursor: "pointer" }}>
            <ContentBoxStyle display="flex" flexDirection="column" gap={1} justifyContent="space-between">
              <Skeleton variant="text" />
            </ContentBoxStyle>
          </SearchActivityCardStyle>
        ))}
        <Skeleton height="48px" />
      </Box>
      <Box px={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" />
        {[...Array(params?.size)].map((_, i) => (
          <SearchActivityCardStyle key={i} sx={{ marginBottom: "0.5rem", cursor: "pointer" }}>
            <ContentBoxStyle display="flex" flexDirection="column" gap={1} justifyContent="space-between">
              <Skeleton variant="text" />
            </ContentBoxStyle>
          </SearchActivityCardStyle>
        ))}
        <Skeleton height="48px" />
      </Box>
      <Box px={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" />
        {[...Array(params?.size)].map((_, i) => (
          <SearchActivityCardStyle key={i} sx={{ marginBottom: "0.5rem", cursor: "pointer" }}>
            <ContentBoxStyle display="flex" flexDirection="column" gap={1} justifyContent="space-between">
              <Skeleton variant="text" />
            </ContentBoxStyle>
          </SearchActivityCardStyle>
        ))}
        <Skeleton height="48px" />
      </Box>
      <Box px={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" />
        {[...Array(params?.size)].map((_, i) => (
          <SearchActivityCardStyle key={i} sx={{ marginBottom: "0.5rem", cursor: "pointer" }}>
            <ContentBoxStyle display="flex" flexDirection="column" gap={1} justifyContent="space-between">
              <Skeleton variant="text" />
            </ContentBoxStyle>
          </SearchActivityCardStyle>
        ))}
        <Skeleton height="48px" />
      </Box>
    </>
  );
};

export default SearchDrawerSkeleton;
