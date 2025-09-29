"use client";
import { fetchGlobalSearchList } from "@/src/api/activity";
import {
  ActivityDefaultValues,
  DefaultViewMoreCount,
  SearchDefaultItemCount,
  SearchNextItemCount,
  specialCharacterRegex,
} from "@/src/constants";
import palette from "@/src/utils/theme/palette";
import { Close, Search, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Typography as MuiTypography,
  TextField,
  Typography,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchDrawerSkeleton from "../skeletons/SearchDrawerSkeleton";
import SearchItemCard from "./SearchItemCard";

const SearchBox = props => {
  const { page, handleCloseDrawerToggle, iconFirst } = props;
  const t = useTranslations();
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [viewLimit, setViewLimit] = useState({ ...DefaultViewMoreCount });
  const router = useRouter();
  const [isSkeleton, setIsSkeleton] = useState(true);
  const locale = useLocale();

  const handleDrawerToggle = () => {
    setShowDrawer(!showDrawer);
    setSearchText("");
  };

  const closeMenuDrawer = () => {
    setShowDrawer(!showDrawer);
    setSearchText("");
    if (iconFirst) handleCloseDrawerToggle();
  };

  const handleGlobalSearch = async () => {
    if (searchText !== "") {
      setIsSkeleton(true);
      await fetchGlobalSearchList(
        {
          searchText: searchText,
          languageCode: locale ?? ActivityDefaultValues.sortColumns.languageCode,
          size: SearchDefaultItemCount + 1,
          lng: typeof window !== "undefined" && localStorage.getItem("longitude"),
          lat: typeof window !== "undefined" && localStorage.getItem("latitude"),
        },
        setSearchResult,
        t
      );
    } else {
      setSearchResult(null);
    }
    setIsSkeleton(false);
  };

  useEffect(() => {
    handleGlobalSearch();
    setViewLimit({ ...DefaultViewMoreCount });
  }, [searchText]);

  return (
    <>
      <Button variant="text" disableRipple={true} onClick={() => handleDrawerToggle()}>
        <Search />
        <MuiTypography>{t("search")}</MuiTypography>
      </Button>
      <Drawer
        open={showDrawer}
        anchor="right"
        PaperProps={{ sx: { width: "100%", maxWidth: { sm: "383px" }, paddingBottom: "1rem" } }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("search")}</Typography>
          <IconButton onClick={closeMenuDrawer} sx={{ padding: "0" }}>
            <Close sx={{ fontSize: "2rem", color: palette.text.primary }} />
          </IconButton>
        </Box>
        <Divider color={palette.divider.divider} />
        <Box py={3} px={2}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            value={searchText}
            onChange={e => {
              if (!specialCharacterRegex.test(e.target.value)) setSearchText(e.target.value);
            }}
            placeholder={t("search")}
            onKeyDown={e => {
              e.stopPropagation();
            }}
          />
        </Box>
        {isSkeleton ? (
          <SearchDrawerSkeleton size={viewLimit.activityLimit} />
        ) : (
          <>
            {searchResult?.activities?.length > 0 && searchText !== "" ? (
              <Box px={2}>
                <Typography variant="body1" mb={1}>
                  {t("activities")}
                </Typography>
                {searchResult?.activities
                  ?.filter((item, index) => index < viewLimit.activityLimit)
                  .map(item => (
                    <SearchItemCard
                      key={item.unqGUID}
                      title={item.title}
                      calenderText={item.calenderText}
                      locationText={item.locationText}
                      itemEvent={() => {
                        router.push(`/activity/${item.unqGUID}`);
                        closeMenuDrawer();
                      }}
                    />
                  ))}
                {searchResult?.activities.length > viewLimit.activityLimit ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      router.push(`/activity?activityName=${searchText}`);
                      closeMenuDrawer();
                    }}
                  >
                    {t("viewMore")}
                  </Button>
                ) : null}
              </Box>
            ) : null}
            {searchResult?.providers?.length > 0 && searchText !== "" ? (
              <Box pt={2} px={2}>
                <Typography variant="body1" mb={1}>
                  {t("providersList.provider")}
                </Typography>
                {searchResult?.providers
                  ?.filter((item, index) => index < viewLimit.providerLimit)
                  .map(item => (
                    <SearchItemCard
                      key={item.unqGUID}
                      title={item.title}
                      locationText={item.locationText}
                      itemEvent={() => {
                        router.push(`/providers/${item.unqGUID}`);
                        closeMenuDrawer();
                      }}
                    />
                  ))}
                {searchResult?.providers.length > viewLimit.providerLimit ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      router.push(`/providers?providerName=${searchText}`);
                      closeMenuDrawer();
                    }}
                  >
                    {t("viewMore")}
                  </Button>
                ) : null}
              </Box>
            ) : null}
            {searchResult?.supportingType?.length > 0 && searchText !== "" ? (
              <Box pt={2} px={2}>
                <Typography variant="body1" mb={1}>
                  {t("type")}
                </Typography>
                {searchResult?.supportingType
                  ?.filter((item, index) => index < viewLimit.supportedType)
                  .map(item => (
                    <SearchItemCard
                      key={item.unqGUID}
                      title={item.title}
                      itemEvent={() => {
                        router.push(`/activity?supportingType=${item.unqGUID}`);
                        closeMenuDrawer();
                      }}
                    />
                  ))}
                {searchResult?.supportingType.length > viewLimit.supportedType ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setViewLimit({ ...viewLimit, supportedType: viewLimit.supportedType + SearchNextItemCount });
                    }}
                  >
                    {t("viewMore")}
                  </Button>
                ) : null}
              </Box>
            ) : null}
            {searchResult?.category?.length > 0 && searchText !== "" ? (
              <Box pt={2} px={2}>
                <Typography variant="body1" mb={1}>
                  {t("category")}
                </Typography>
                {searchResult?.category
                  ?.filter((item, index) => index < viewLimit.categoryLimit)
                  .map(item => (
                    <SearchItemCard
                      key={item.unqGUID}
                      title={item.title}
                      itemEvent={() => {
                        router.push(`/activity?category=${item.unqGUID}`);
                        closeMenuDrawer();
                      }}
                    />
                  ))}
                {searchResult?.category.length > viewLimit.categoryLimit ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setViewLimit({ ...viewLimit, categoryLimit: viewLimit.categoryLimit + SearchNextItemCount });
                    }}
                  >
                    {t("viewMore")}
                  </Button>
                ) : null}
              </Box>
            ) : null}
            {searchResult?.topic?.length > 0 && searchText !== "" ? (
              <Box pt={2} px={2}>
                <Typography variant="body1" mb={1}>
                  {t("topic")}
                </Typography>
                {searchResult?.topic
                  ?.filter((item, index) => index < viewLimit.topicsAtLimit)
                  .map(item => (
                    <SearchItemCard
                      key={item.unqGUID}
                      title={item.title}
                      itemEvent={() => {
                        router.push(`/activity?topic=${item.unqGUID}`);
                        closeMenuDrawer();
                      }}
                    />
                  ))}
                {searchResult?.topic.length > viewLimit.topicsAtLimit ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setViewLimit({ ...viewLimit, topicsAtLimit: viewLimit.topicsAtLimit + SearchNextItemCount });
                    }}
                  >
                    {t("viewMore")}
                  </Button>
                ) : null}
              </Box>
            ) : null}
            {searchResult?.symptom?.length > 0 && searchText !== "" ? (
              <Box pt={2} px={2}>
                <Typography variant="body1" mb={1}>
                  {t("symptoms")}
                </Typography>
                {searchResult?.symptom
                  ?.filter((item, index) => index < viewLimit.symptomsLimit)
                  .map(item => (
                    <SearchItemCard
                      key={item.unqGUID}
                      title={item.title}
                      itemEvent={() => {
                        router.push(`/activity?symptoms=${item.unqGUID}`);
                        closeMenuDrawer();
                      }}
                    />
                  ))}
                {searchResult?.symptom.length > viewLimit.symptomsLimit ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setViewLimit({ ...viewLimit, symptomsLimit: viewLimit.symptomsLimit + SearchNextItemCount });
                    }}
                  >
                    {t("viewMore")}
                  </Button>
                ) : null}
              </Box>
            ) : null}
          </>
        )}
      </Drawer>
    </>
  );
};
export default SearchBox;
