import { Grid } from "@mui/material";
import ActivityDetailsCard from "../molecules/ActivityDetailsCard";
import SummaryDetails from "../molecules/SummaryDetails";

function ActivityDetailsSummary(props) {
  const { summaryData, locale } = props;
  return (
    <Grid container spacing={{ sm: 3 }}>
      <Grid item xs={12} sm={6} md={7}>
        <SummaryDetails summaryData={summaryData} />
      </Grid>
      <Grid item xs={12} sm={6} md={5} position={{xs: "sticky", sm: "initial"}} bottom={{xs: "0"}}>
        <ActivityDetailsCard summaryData={summaryData} locale={locale} />
      </Grid>
    </Grid>
  );
}

export default ActivityDetailsSummary;
