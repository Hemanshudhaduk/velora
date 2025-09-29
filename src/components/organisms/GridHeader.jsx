"use client";
import { Grid } from "@mui/material";
import { GridHeaderLeft, GridHeaderRight } from "../molecules";

const GridHeader = params => (
  <Grid container mb={3} alignItems="flex-start">
    <Grid item xs={12} sm={6} mb={{ xs: 3, sm: 0 }}>
      <GridHeaderLeft header={params.header} subHeader={params.subHeader} />
    </Grid>
    <Grid item container xs={12} sm={6} justifyContent={{ sm: "flex-end" }}>
      <GridHeaderRight filterConfiguration={params.filterConfiguration} configurations={params.configurations} />
    </Grid>
  </Grid>
);
export default GridHeader;
