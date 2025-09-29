import { Box } from "@mui/material";
import { ActivityTypeRadio } from "../atoms";
import FilterDrawer from "./FilterDrawer";
import SortDrawer from "./SortDrawer";

const GridHeaderRight = params => (
  <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
    {/* <ActivityTypeRadio configuration={params.configurations} /> */}
    <SortDrawer configuration={params.configurations} />
    <FilterDrawer filterConfiguration={params.filterConfiguration} configuration={params.configurations} />
  </Box>
);

export default GridHeaderRight;
