"use client";
import { cancelReservation, getPreviousActivityList, getUpcomingActivityList } from "@/src/api/activityView";
import { getSavedListData, removeFromSavedData } from "@/src/api/saved";
import FuseSplashScreen from "@/src/app/[locale]/auth/fuseSplashScreen";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { redirectToSignIn } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Skeleton, Tab, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useSelector } from "react-redux";
import { CommonSnackBar, CustomText, SnackState, Spinner } from "../atoms";
import { ActivityCard } from "../molecules";
import ViewMore from "../molecules/ViewMoreComponent";
import { SavePageOrganisms } from "../organisms";
import { ListItemSkeleton } from "../skeletons";
import { ActivitySectionStyle, ContainerStyle, TabContextStyle, TablePaginationStyle } from "../style";

function SavePageTemplate(props) {
  const { page, locale } = props;
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector(selectUser);
  const [savedDataList, setSavedDataList] = useState([]);
  const [snack, closeSnack, showSnackbar] = SnackState();
  const defaultPageSize = 20;
  const nextPageSize = 20;
  const [upcomingActivityDataList, setUpcomingActivityDataList] = useState([]);
  const [previousActivityDataList, setPreviousActivityDataList] = useState([]);
  const [tabValue, setTabValue] = useState("0");
  const [activityCountUpcoming, setActivityCountUpcoming] = useState(0);
  const [activityCountPrevious, setActivityCountPrevious] = useState(0);
  const [templatePage, setTemplatePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can set your initial rows per page value
  const [pageSize, setPageSize] = useState(10);
  const getUserDetails = useSelector(selectUserDetail);
  const userUnqGuid = getUserDetails?.userUnqGuid;
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [isSkeletonForSavedPage, setIsSkeletonForSavedPage] = useState(true);

  const handlePageChange = async (event, newPage) => {
    setTemplatePage(newPage);
    const previousData = {
      pageNumber: newPage + 1,
      rowsPerPage: rowsPerPage,
      userGuid: userUnqGuid,
    };
    await loadAPIPreviousData(previousData);

    const upcomingData = {
      pageNumber: newPage + 1,
      rowsPerPage: rowsPerPage,
      userGuid: userUnqGuid,
    };
    await loadAPIUpcomingData(upcomingData);
    window.scroll({ top: 0 });
  };

  const removeFromSaved = useCallback(
    async unqGUID => {
      const response = await removeFromSavedData({ _id: unqGUID });
      if (response) {
        showSnackbar(t("saved.removedFromSaved"), "success");
        router.refresh();
        callAPIToGetSavedDataList(defaultPageSize);
      }
    },
    [router]
  );

  const promiseResponse = async cancelDataRequest => {
    return new Promise(async (resolve, reject) => {
      const response = await cancelReservation(cancelDataRequest);
      resolve(response);
    });
  };

  const handleCancelReservation = useCallback(
    async (bookingCustomerUnqGUID, userDetailUnqGuid, userUnqGuid) => {
      const cancelDataRequest = {};
      cancelDataRequest.bookingCustomerGUID = bookingCustomerUnqGUID;
      cancelDataRequest.loggedInUserGUID = userDetailUnqGuid;
      cancelDataRequest.loggedInUserEmail = user?.data?.email;

      trackPromise(
        promiseResponse(cancelDataRequest).then(async response => {
          if (response?.status === "Success") {
            showSnackbar(t("activity.successCancelMessage"), "success");
            router.refresh();
            const upcomingData = {
              pageNumber: 1,
              rowsPerPage: rowsPerPage,
              userGuid: userUnqGuid,
            };
            await loadAPIUpcomingData(upcomingData);
          } else {
            showSnackbar(t("activity.failCancelMessage"), "error");
          }
        })
      );
    },
    [router]
  );

  const callAPIToGetSavedDataList = async pageSize => {
    setIsSkeletonForSavedPage(true);
    const savedData = {};
    savedData.guid = getUserDetails?.userUnqGuid;
    savedData.pageSize = pageSize;
    const savedDataResponse = await getSavedListData(savedData);
    if (savedDataResponse) setSavedDataList(savedDataResponse?.data);
    setIsSkeletonForSavedPage(false);
  };

  const callAPIToGetUpcomingActivityDataList = async newRowsPerPage => {
    const upcomingData = {
      pageNumber: 1,
      rowsPerPage: newRowsPerPage,
      userGuid: userUnqGuid,
    };
    await loadAPIUpcomingData(upcomingData);
  };

  const callAPIToGetPreviousActivityDataList = async newRowsPerPage => {
    const previousData = {
      pageNumber: 1,
      rowsPerPage: newRowsPerPage,
      userGuid: userUnqGuid,
    };
    await loadAPIPreviousData(previousData);
    window.scroll({ top: 0 });
  };

  const loadAPIPreviousData = async previousData => {
    setIsSkeleton(true);
    const previousActivityDataResponse = await getPreviousActivityList(previousData);
    setPreviousActivityDataList(previousActivityDataResponse?.data?.activityUpcomingPreviousData);
    if (
      previousActivityDataResponse?.data?.activityUpcomingPreviousTotalCount[0]?.totalCount !== null &&
      previousActivityDataResponse?.data?.activityUpcomingPreviousTotalCount[0]?.totalCount !== undefined
    ) {
      setActivityCountPrevious(previousActivityDataResponse?.data?.activityUpcomingPreviousTotalCount[0]?.totalCount);
    } else {
      setActivityCountPrevious(0);
    }
    setIsSkeleton(false);
  };

  const loadAPIUpcomingData = async upcomingData => {
    setIsSkeleton(true);
    const upcomingActivityDataResponse = await getUpcomingActivityList(upcomingData);
    setUpcomingActivityDataList(upcomingActivityDataResponse?.data?.activityUpcomingPreviousData);
    if (
      upcomingActivityDataResponse?.data?.activityUpcomingPreviousTotalCount[0]?.totalCount !== null &&
      upcomingActivityDataResponse?.data?.activityUpcomingPreviousTotalCount[0]?.totalCount !== undefined
    ) {
      setActivityCountUpcoming(upcomingActivityDataResponse?.data?.activityUpcomingPreviousTotalCount[0]?.totalCount);
    } else {
      setActivityCountUpcoming(0);
    }
    setIsSkeleton(false);
  };

  const handleRowsPerPageChange = async event => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setTemplatePage(0); // Reset to the first page when rows per page changes
    await callAPIToGetPreviousActivityDataList(newRowsPerPage);
    await callAPIToGetUpcomingActivityDataList(newRowsPerPage);
  };

  useEffect(() => {
    if (!user?.data?.email) {
      redirectToSignIn(router, pathname);
    }
    if (page === "activityPage") {
      if (getUserDetails?.userUnqGuid) {
        callAPIToGetUpcomingActivityDataList(rowsPerPage);
        callAPIToGetPreviousActivityDataList(rowsPerPage);
        if (pageSize) {
          setPageSize(pageSize);
        }
      }
    } else {
      if (getUserDetails?.userUnqGuid) callAPIToGetSavedDataList(defaultPageSize);
    }
  }, [rowsPerPage, router, tabValue, getUserDetails, user]);

  const handleTabChange = (event, newValue) => {
    setTemplatePage(0);
    setTabValue(newValue);
  };

  return (
    <>
      {user?.data?.email !== "" ? (
        <>
          <Spinner />
          {page === "savedPage" &&
            (isSkeletonForSavedPage ? (
              <ActivitySectionStyle>
                <Skeleton variant="text" />
                {[...Array(defaultPageSize)].map((_, i) => (
                  <ListItemSkeleton key={i} />
                ))}
              </ActivitySectionStyle>
            ) : (
              <SavePageOrganisms t={t} />
            ))}
          <ActivitySectionStyle>
            {page === "activityPage" &&
              (isSkeleton ? (
                <Skeleton variant="text" width="136px" height="38px" style={{ marginBottom: "16px" }} />
              ) : (
                <Box sx={{ paddingTop: "32px", paddingBottom: "32px" }}>
                  <CustomText variant="h4" disc={t("activity.activityLabel")} />
                </Box>
              ))}

            {savedDataList?.length > 0 && page === "savedPage" ? (
              <>
                <ActivityCard savedList={savedDataList} removeFromSaved={removeFromSaved} t={t} locale={locale} />
                {savedDataList?.length < savedDataList[0]?.totalCount ? (
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <ViewMore
                      title={
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          color={palette.text.secondary}
                          textAlign="center"
                          sx={{ textDecoration: "none" }}
                        >
                          {t("providerDetail.viewMore")}
                        </Typography>
                      }
                      defaultPageSize={defaultPageSize}
                      pageSize={nextPageSize}
                      clickHandler={callAPIToGetSavedDataList}
                    />
                  </div>
                ) : null}
              </>
            ) : page === "savedPage" ? (
              <Typography>{t("saved.noRecord")}</Typography>
            ) : null}

            {page === "activityPage" && (
              <TabContextStyle>
                <TabContext value={tabValue}>
                  {isSkeleton ? (
                    <TabList sx={{ marginBottom: 2 }}>
                      <Skeleton width="150px" height="50px" />
                      <Skeleton width="150px" height="50px" sx={{ marginLeft: 2 }} />
                    </TabList>
                  ) : (
                    <TabList
                      value={tabValue}
                      onChange={handleTabChange}
                      indicatorColor="primary"
                      sx={{ marginBottom: 2 }}
                    >
                      <Tab
                        label={`${t("activity.upcoming")} (${activityCountUpcoming || 0})`}
                        value={"0"}
                        selected={tabValue === "0"}
                        style={{ color: tabValue === "0" ? "green" : "inherit" }}
                      />
                      <Tab
                        label={`${t("activity.previous")} (${activityCountPrevious || 0})`}
                        value={"1"}
                        selected={tabValue === "1"}
                        style={{ color: tabValue === "1" ? "green" : "inherit" }}
                      />
                    </TabList>
                  )}

                  <TabPanel value="0">
                    {isSkeleton ? (
                      <Box display="flex" flexDirection="column" gap={2}>
                        {[...Array(10)].map((_, i) => (
                          <ListItemSkeleton key={i} numberOfButtons={2} />
                        ))}
                      </Box>
                    ) : (
                      <Box display="flex" flexDirection="column" gap={2}>
                        <ActivityCard
                          savedList={upcomingActivityDataList}
                          handleCancelReservation={handleCancelReservation}
                          t={t}
                          isActivity={true}
                          isUpcoming={true}
                          locale={locale}
                        />
                      </Box>
                    )}
                    {isSkeleton ? (
                      <Grid container>
                        <Grid item xs={6} sm={6}>
                          <></>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Skeleton variant="text" />
                        </Grid>
                      </Grid>
                    ) : (
                      activityCountUpcoming !== 0 &&
                      upcomingActivityDataList.length > 0 && (
                        <TablePaginationStyle
                          component="div"
                          count={activityCountUpcoming}
                          page={templatePage}
                          onPageChange={handlePageChange}
                          rowsPerPage={rowsPerPage}
                          onRowsPerPageChange={handleRowsPerPageChange}
                          rowsPerPageOptions={[10, 25, 50]}
                          labelRowsPerPage={t("activity.rowsPerPage")}
                          labelDisplayedRows={(from = page) =>
                            `${from.from}-${from.to === -1 ? from.count : from.to} ${t("of")} ${from.count}`
                          }
                        />
                      )
                    )}
                  </TabPanel>

                  <TabPanel value="1">
                    {isSkeleton ? (
                      <Box display="flex" flexDirection="column" gap={2}>
                        {[...Array(10)].map((_, i) => (
                          <ListItemSkeleton key={i} numberOfButtons={1} />
                        ))}
                      </Box>
                    ) : (
                      <Box display="flex" flexDirection="column" gap={2}>
                        <ActivityCard
                          savedList={previousActivityDataList}
                          removeFromSaved={removeFromSaved}
                          t={t}
                          isActivity={true}
                          isUpcoming={false}
                          locale={locale}
                        />
                      </Box>
                    )}
                    {isSkeleton ? (
                      <Grid container>
                        <Grid item xs={6} sm={6}>
                          <></>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Skeleton variant="text" />
                        </Grid>
                      </Grid>
                    ) : (
                      activityCountPrevious !== 0 &&
                      previousActivityDataList.length > 0 && (
                        <TablePaginationStyle
                          component="div"
                          count={activityCountPrevious}
                          page={templatePage}
                          onPageChange={handlePageChange}
                          rowsPerPage={rowsPerPage}
                          onRowsPerPageChange={handleRowsPerPageChange}
                          rowsPerPageOptions={[10, 25, 50]}
                          labelRowsPerPage={t("activity.rowsPerPage")}
                          labelDisplayedRows={(from = page) =>
                            `${from.from}-${from.to === -1 ? from.count : from.to} ${t("of")} ${from.count}`
                          }
                        />
                      )
                    )}
                  </TabPanel>
                </TabContext>
              </TabContextStyle>
            )}
            <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
          </ActivitySectionStyle>
        </>
      ) : (
        <FuseSplashScreen />
      )}
      <Spinner />
    </>
  );
}

export default SavePageTemplate;
