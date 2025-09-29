"use client";

import { fetchActivityList } from "@/src/api/activity";
import { selectLocationChanged } from "@/src/lib/slice/userSlice";
import { generateConfiguration } from "@/src/utils";
import { ArrowForward } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomLink } from "../atoms";
import { ListItemSkeleton } from "../skeletons";
import { ActivitySecStyle, ContainerCenterEnd, ContainerStyle, LinkEndColoured, ListItemSkeletonHome } from "../style";
import ListItemCard from "./ListItemCard";

const HomeActivitySection = () => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const getLocationChanged = useSelector(selectLocationChanged);
  const [serviceList, setServiceList] = useState({ list: [], totalCount: 0 });
  const [eventList, setEventList] = useState({ list: [], totalCount: 0 });
  const t = useTranslations();
  const router = useRouter();

  const loadActivities = async () => {
    setIsSkeleton(true);

    const servicePayload = generateConfiguration({
      searchParams: { pageSize: 4, activityBookingType: "Service" },
    });
    await fetchActivityList(servicePayload, setServiceList, t, router);

    const eventPayload = generateConfiguration({
      searchParams: { pageSize: 4, activityBookingType: "Event" },
    });
    await fetchActivityList(eventPayload, setEventList, t, router);

    setIsSkeleton(false);
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("latitude") !== undefined &&
      localStorage.getItem("latitude") !== null &&
      localStorage.getItem("latitude") !== ""
    )
      loadActivities();
    else {
      localStorage.setItem("isLatLonRequired", true);
    }
  }, [getLocationChanged]);

  // if (!isSkeleton && serviceList?.list?.length === 0 && eventList?.list?.length === 0) {
  //   return null;
  // } else {
  //   return (
  //     <ActivitySecStyle>
  //       <ContainerStyle>
  //         {!isSkeleton && serviceList?.list?.length === 0 ? null : (
  //           <>
  //             <Grid container style={{ marginBottom: "12px" }}>
  //               <Grid item lg={6} sm={6} xs={6}>
  //                 <Typography variant="h5">{t("home.bookableService")}</Typography>
  //               </Grid>
  //               <ContainerCenterEnd item lg={6} sm={6} xs={6}>
  //                 <LinkEndColoured
  //                   href="/activity"
  //                   disc={
  //                     <Stack direction="row">
  //                       <Typography variant="p">{t("home.showAll")}</Typography>
  //                       <ArrowForward />
  //                     </Stack>
  //                   }
  //                 />
  //               </ContainerCenterEnd>
  //             </Grid>
  //             {isSkeleton ? (
  //               <Grid container spacing={2}>
  //                 {[...Array(4)].map((_, i) => (
  //                   <Grid key={i} item lg={3} sm={6} xs={12}>
  //                     <ListItemSkeletonHome>
  //                       <ListItemSkeleton numberOfButtons={0} style={"column"} />
  //                     </ListItemSkeletonHome>
  //                   </Grid>
  //                 ))}
  //               </Grid>
  //             ) : (
  //               <Grid container spacing={2}>
  //                 {serviceList?.list?.map((item, index) => (
  //                   <Grid item lg={3} sm={6} xs={12} flexDirection={"column"} key={index}>
  //                     <CustomLink
  //                       href={item.bottomRight[0].reference}
  //                       disc={
  //                         <ListItemCard
  //                           key={index}
  //                           title={item.title}
  //                           imageUrl={item.imageUrl}
  //                           noImageText={item.noImageText}
  //                           calenderText={item.calenderText}
  //                           locationText={item.locationText}
  //                           priceText={item.priceText}
  //                           bottomRight={[]}
  //                           style={{ flexDirection: "column" }}
  //                         />
  //                       }
  //                     />
  //                   </Grid>
  //                 ))}
  //               </Grid>
  //             )}
  //           </>
  //         )}

  //         {!isSkeleton && eventList?.list?.length === 0 ? null : (
  //           <>
  //             <Grid container style={{ marginBottom: "12px", marginTop: "40px" }}>
  //               <Grid item lg={6} sm={6} xs={6}>
  //                 <Typography variant="h5">{t("home.scheduleEvent")}</Typography>
  //               </Grid>
  //               <ContainerCenterEnd item lg={6} sm={6} xs={6}>
  //                 <LinkEndColoured
  //                   href="/activity"
  //                   disc={
  //                     <Stack direction="row">
  //                       <Typography variant="p">{t("home.showAll")}</Typography>
  //                       <ArrowForward />
  //                     </Stack>
  //                   }
  //                 />
  //               </ContainerCenterEnd>
  //             </Grid>
  //             {isSkeleton ? (
  //               <Grid container spacing={2}>
  //                 {[...Array(4)].map((_, i) => (
  //                   <Grid key={i} item lg={3} sm={6} xs={12}>
  //                     <ListItemSkeletonHome>
  //                       <ListItemSkeleton numberOfButtons={0} style={"column"} />
  //                     </ListItemSkeletonHome>
  //                   </Grid>
  //                 ))}
  //               </Grid>
  //             ) : (
  //               <Grid container spacing={2}>
  //                 {eventList?.list?.map((item, index) => (
  //                   <Grid item lg={3} sm={6} xs={12} flexDirection={"column"} key={index}>
  //                     <CustomLink
  //                       href={item.bottomRight.find(item => item.variant === "view").reference}
  //                       disc={
  //                         <ListItemCard
  //                           key={index}
  //                           title={item.title}
  //                           imageUrl={item.imageUrl}
  //                           noImageText={item.noImageText}
  //                           calenderText={item.calenderText}
  //                           locationText={item.locationText}
  //                           priceText={item.priceText}
  //                           bottomRight={[]}
  //                           style={{ flexDirection: "column" }}
  //                         />
  //                       }
  //                     />
  //                   </Grid>
  //                 ))}
  //               </Grid>
  //             )}
  //           </>
  //         )}
  //       </ContainerStyle>
  //     </ActivitySecStyle>
  //   );
  // }
};
export default HomeActivitySection;
