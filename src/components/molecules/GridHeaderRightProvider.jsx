import { Box } from "@mui/material";
import FilterDrawerProvider from "./FilterDrawerProvider";
import SortDrawerProvider from "./SortDrawerProvider";

const GridHeaderRightProvider = params => (
  <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
    <SortDrawerProvider configuration={params.configurations} />
    <FilterDrawerProvider filterConfiguration={params.filterConfiguration} configuration={params.configurations} />
  </Box>
);

export default GridHeaderRightProvider;
