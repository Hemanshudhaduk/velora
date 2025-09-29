import { Grid, Skeleton } from "@mui/material";
import ActivityDetailCardSkeleton from "./ActivityDetailCardSkeleton";
import ActivityImageComponentSkeleton from "./ActivityImageComponentSkeleton";
import ChipSkeleton from "./ChipSkeleton";
import DetailHeaderSkeleton from "./DetailHeaderSkeleton";
import LocationMapSkeleton from "./LocationMapSkeleton";
import StaffCardSkeleton from "./StaffCardSkeleton";
import TitleContentSkeleton from "./TitleContentSkeleton";

function ActivityDetailSkeleton() {
  return (
    <>
      <DetailHeaderSkeleton activityPage={true} />
      <ActivityImageComponentSkeleton /> {/* for image */}
      <Grid container spacing={{ sm: 3 }}>
        {/* ActivityDetailsSummary */}
        <Grid item xs={12} sm={6} md={7}>
          <TitleContentSkeleton numberOfLines={2} /> {/* for summary */}
          <ChipSkeleton numberOfTab={12} /> {/*for topics */}
          <Skeleton variant="text" component="h6" sx={{ marginBottom: 3, fontSize: "1.5rem" }} />{" "}
          {/*for know for help*/}
          <ChipSkeleton numberOfTab={12} /> {/*for symptoms list */}
          <TitleContentSkeleton numberOfLines={2} /> {/* for instruction */}
          <TitleContentSkeleton numberOfLines={2} /> {/* for primary language */}
          <StaffCardSkeleton />
          <TitleContentSkeleton numberOfLines={4} /> {/*for additional section*/}
          <TitleContentSkeleton numberOfLines={4} /> {/*for additional section*/}
          <TitleContentSkeleton numberOfLines={2} /> {/* for cancellation policy */}
          <LocationMapSkeleton />
          <TitleContentSkeleton numberOfLines={2} /> {/* for view provider */}
          <TitleContentSkeleton numberOfLines={9} /> {/* for google reviews */}
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <ActivityDetailCardSkeleton />
        </Grid>
      </Grid>
    </>
  );
}

export default ActivityDetailSkeleton;
