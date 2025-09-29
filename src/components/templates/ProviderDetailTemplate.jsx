"use client";
import { saveActivity } from "@/src/api/activities";
import { getProviderDetails } from "@/src/api/provider";
import { emptyGuid } from "@/src/constants";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { gray } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { LocationOnOutlined } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab, Table, TableBody, TableContainer, Typography } from "@mui/material";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ActivityProviderMapLoad, CommonSnackBar, CompanyRating, SnackState } from "../atoms";
import { DetailHeader, ProviderActivityTable, ProviderScheduleTab, Section } from "../molecules";
import { ActivityProviderStaffList, IconWithLabelList } from "../organisms";
import ProviderImageComponent from "../organisms/ProviderImageComponent";
import { DetailHeaderSkeleton, ProviderDetailSkeleton } from "../skeletons";
import { ContainerStyle, SectionStyle, TabContextStyle } from "../style";

export const DetailSectionStyle = styled(SectionStyle)({
  padding: "3rem 0",

  "& .ImageComponent": {
    "& .MuiGrid-root": {
      "& .MuiGrid-root": {
        "& img": {
          maxHeight: "225px",
          cursor: "pointer",
        },

        "&:first-child": {
          "& img, .MuiBox-root": {
            borderRadius: "8px 0 0 8px",
          },
        },
        "&:last-child": {
          "& img, .MuiBox-root": {
            borderRadius: "0 8px 8px 0",
          },
        },

        "@media screen and (max-width: 767px)": {
          "& img": {
            display: "none",
          },

          "&:first-child": {
            "& img": {
              display: "block",
              borderRadius: "8px",
            },
          },
        },
      },
    },
  },

  "& .cm-view-calendar": {
    width: "auto",
    flexDirection: "row-reverse",

    "& .MuiFormLabel-root": {
      position: "unset",
      transform: "unset",
    },

    "& .MuiInputBase-root": {
      flexDirection: "row-reverse",
      width: "auto",
    },

    "& .MuiInputBase-input": {
      visibility: "hidden",
      opacity: "0",
      width: "0",
      padding: 0,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      display: "none",
    },
  },

  "@media screen and (max-width: 767px)": {
    padding: "1rem 0 3rem",
  },
});

export const ConnectWrapperStyle = styled("div")({});

export const ActivitiesListStyle = styled(Box)({
  "& .MuiTable-root": {
    "& .MuiTableRow-root": {
      "& .MuiTableCell-root": {
        padding: "0.75rem 0.5rem",

        "& .MuiButton-colorInherit": {
          "&.Mui-disabled": {
            backgroundColor: palette.background.primary,
            color: palette.text.secondary,
            borderColor: palette.text.secondary,
          },
        },
      },

      "&.cm-reserved": {
        "& .MuiTableCell-root": {
          backgroundColor: gray[100],
        },
      },
    },
  },
});

const ProviderDetailTemplate = props => {
  const { guid, locale } = props;
  const [snack, closeSnack, showSnackbar] = SnackState();
  const getUserDetail = useSelector(selectUserDetail);
  const user = useSelector(selectUser);
  const t = useTranslations();
  const [providerDetail, setProviderDetail] = useState();
  const [isApiCall, setIsApiCall] = useState(false);
  const [socialMediaList, setSocialMediaList] = useState([]);
  const [groupByCategoryActivityList, setGroupByCategoryActivityList] = useState();
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressLat: "",
      addressLong: "",
      fullAddress: "",
    },
  });
  const [tabValue, setTabValue] = useState("0");
  const [isCompanyRating, setIsCompanyRating] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (providerDetail?.addressLat !== null) {
      setValue("addressLat", providerDetail?.addressLat);
      setValue("addressLong", providerDetail?.addressLong);
      setValue("fullAddress", providerDetail?.fullAddress);
    }

    const objSocialMediaList = _.map(providerDetail?.socialMedia, (item, index) => {
      return { id: index, mediaName: item.mediaName, redirectLink: item.redirectLink };
    });
    setSocialMediaList(objSocialMediaList);

    const objGroupByCategoryActivityList =
      providerDetail?.providerActivitiesList?.length !== 0
        ? _.groupBy(providerDetail?.providerActivitiesList, "categoryName")
        : null;

    setGroupByCategoryActivityList(objGroupByCategoryActivityList);
  }, [providerDetail?.addressLat]);

  const onSaveHandler = async payload => {
    const res = await saveActivity(payload);
    if (res?.status === "Success") {
      providerDetail.isSaved = true;
      showSnackbar(t(res?.message), "success");
    } else {
      showSnackbar(res?.message, "error");
    }
  };

  useEffect(() => {
    if (providerDetail === null) {
      notFound();
    }
  }, [providerDetail]);

  const getProviderDetailData = async () => {
    if (user?.data?.email) {
      if (getUserDetail?.userUnqGuid) {
        const userGuid = getUserDetail?.userDetailUnqGuid ? getUserDetail?.userDetailUnqGuid : emptyGuid;
        const providerDetail = await getProviderDetails(guid, userGuid, locale);
        if (providerDetail?.status === "Success") {
          setProviderDetail(providerDetail?.data);
          setIsApiCall(true);
        }
      }
    } else {
      const userGuid = getUserDetail?.userDetailUnqGuid ? getUserDetail?.userDetailUnqGuid : emptyGuid;
      const providerDetail = await getProviderDetails(guid, userGuid, locale);
      if (providerDetail?.status === "Success") {
        setProviderDetail(providerDetail?.data);
        setIsApiCall(true);
      }
    }
  };

  useEffect(() => {
    if (!isApiCall || getUserDetail?.userUnqGuid) {
      getProviderDetailData();
    }
  }, [getUserDetail?.userUnqGuid]);

  return !isApiCall || providerDetail === null ? (
    <DetailSectionStyle>
      <ContainerStyle>
        <DetailHeaderSkeleton activityPage={false} />
        <ProviderDetailSkeleton />
      </ContainerStyle>
    </DetailSectionStyle>
  ) : (
    <DetailSectionStyle>
      <ContainerStyle>
        <DetailHeader
          activityPage={false}
          title={providerDetail?.companyName}
          subTitle={providerDetail?.fullAddress}
          companyUnqGUID={providerDetail?.unqGUID}
          onSaveHandler={onSaveHandler}
          isSaved={providerDetail?.isSaved}
          logoLink={providerDetail?.imageList?.find(image => image.imageOrder === 1)?.imageURL ?? null}
        />
        <ProviderImageComponent imageList={providerDetail.imageList} />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8} md={9} mt={3}>
            <TabContextStyle>
              <TabContext value={tabValue}>
                <TabList value={tabValue} onChange={handleTabChange}>
                  <Tab
                    label={
                      <>
                        <Typography variant="body2">{t("providerDetail.overview")}</Typography>
                      </>
                    }
                    value={"0"}
                  />
                  <Tab
                    label={
                      <>
                        <Typography variant="body2">{t("providerDetail.schedule")}</Typography>
                      </>
                    }
                    value={"1"}
                  />
                </TabList>
                <TabPanel value="0">
                  <Section
                    sectionTitle={t("providerDetail.aboutUs")}
                    sectionDescription={providerDetail.companyDescription}
                    readMore={{
                      isReadMore: true,
                      text: providerDetail.companyDescription,
                      textSize: 600,
                      label: t("readMore"),
                      nextMore: providerDetail.companyDescription.length,
                    }}
                  />
                  {isCompanyRating && <CompanyRating isLocation={true} placeId={providerDetail?.placeId} />}
                  {groupByCategoryActivityList !== null && (
                    <Box mt={6} flexWrap={"wrap"}>
                      <Typography variant="h6" mb={3}>
                        {t("providerDetail.ourOffering")}
                      </Typography>
                      {Object.keys(groupByCategoryActivityList).map(categoryName => {
                        return (
                          <ActivitiesListStyle key={categoryName} mb={3}>
                            <Typography variant="subtitle2" mb={3} color={palette.text.primary} fontWeight={500}>
                              {categoryName}
                            </Typography>
                            <TableContainer sx={{ padding: 0 }}>
                              <Table key={categoryName}>
                                <TableBody>
                                  <ProviderActivityTable
                                    activityList={groupByCategoryActivityList[categoryName]}
                                    locale={locale}
                                  />
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </ActivitiesListStyle>
                        );
                      })}
                    </Box>
                  )}
                  {providerDetail?.staffListDTO?.length !== 0 && (
                    <Box mt={6} flexWrap={"wrap"}>
                      <Typography variant="h6" mb={2}>
                        {t("activityDetail.staff")}
                      </Typography>
                      <Box>
                        <ActivityProviderStaffList staffList={providerDetail?.staffListDTO} />
                      </Box>
                    </Box>
                  )}
                  {providerDetail?.additionalSection?.length !== 0 &&
                    providerDetail?.additionalSection?.map(section => <Section key={section.unqGUID} {...section} />)}
                  {providerDetail.addressLat !== null && (
                    <Box mt={6}>
                      <Typography variant="h6" mb={2}>
                        {t("location")}
                      </Typography>
                      <form name="userForm" autoComplete="off">
                        <FormProvider {...{ control, setValue, getValues, errors }}>
                          <ActivityProviderMapLoad name="fullAddress" isMapLoad={setIsCompanyRating} />
                        </FormProvider>
                      </form>
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                        mt={2}
                        color={palette.text.secondary}
                      >
                        <LocationOnOutlined />
                        {providerDetail?.fullAddress}
                      </Typography>
                    </Box>
                  )}
                </TabPanel>
                <TabPanel value="1">
                  <ProviderScheduleTab
                    guid={guid}
                    locale={locale}
                    googleTimeZoneName={providerDetail.googleTimeZoneName}
                  />
                </TabPanel>
              </TabContext>
            </TabContextStyle>
          </Grid>
          <Grid item xs={12} sm={4} md={3} mt={3}>
            <ConnectWrapperStyle>
              {_.filter(socialMediaList, item => item.redirectLink !== "")?.length > 0 && (
                <Typography variant="h6" mb={2}>
                  {t("providerDetail.connect")}
                </Typography>
              )}
              <IconWithLabelList dataList={socialMediaList} />
            </ConnectWrapperStyle>
          </Grid>
        </Grid>
        <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
      </ContainerStyle>
    </DetailSectionStyle>
  );
};

export default ProviderDetailTemplate;
