import { Grid } from "@mui/material";
import ChipSkeleton from "./ChipSkeleton";
import LocationMapSkeleton from "./LocationMapSkeleton";
import OverviewTabSkeleton from "./OverviewTabSkeleton";
import ProviderImageComponentSkeleton from "./ProviderImageComponentSkeleton";
import StaffCardSkeleton from "./StaffCardSkeleton";
import TitleContentSkeleton from "./TitleContentSkeleton";

function ProviderDetailSkeleton() {
  return (
    <>
      <ProviderImageComponentSkeleton />
      <Grid container spacing={5}>
        <Grid item xs={12} sm={8} md={9} mt={3}>
          <ChipSkeleton numberOfTab={2} /> {/*for tabs*/}
          <TitleContentSkeleton numberOfLines={2} /> {/* for summary */}
          <TitleContentSkeleton numberOfLines={1} /> {/* for google review */}
          <OverviewTabSkeleton />
          <StaffCardSkeleton />
          <TitleContentSkeleton numberOfLines={4} /> {/*for additional section*/}
          <TitleContentSkeleton numberOfLines={4} /> {/*for additional section*/}
          <LocationMapSkeleton />
        </Grid>
        <Grid item xs={12} sm={4} md={3} mt={3}>
          <TitleContentSkeleton numberOfLines={9} /> {/*for social media*/}
        </Grid>
      </Grid>
    </>
  );
}
export default ProviderDetailSkeleton;
