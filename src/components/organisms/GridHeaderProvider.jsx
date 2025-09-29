"use client";
import { Box, Grid } from "@mui/material";
import { GridHeaderLeft, GridHeaderRightProvider } from "../molecules";
import FilterDrawerArticle from "../molecules/FilterDrawerArticle";

const GridHeaderProvider = params => (
  <Grid container mb={3} alignItems="flex-start">
    <Grid item xs={12} sm={6} mb={{ xs: 3, sm: 0 }}>
      <GridHeaderLeft header={params.header} subHeader={params.subHeader} />
    </Grid>
    <Grid item container xs={12} sm={6} justifyContent={{ sm: "flex-end" }}>
      {params.page === "providers" && (
        <GridHeaderRightProvider
          filterConfiguration={params.filterConfiguration}
          configurations={params.configurations}
        />
      )}
      {params.page === "articles" && (
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
          <FilterDrawerArticle
            filterConfiguration={params.filterConfiguration}
            configuration={params.configurations}
            setUrl={params.setUrl}
          />
        </Box>
      )}
    </Grid>
  </Grid>
);
export default GridHeaderProvider;
