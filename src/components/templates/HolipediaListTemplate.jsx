"use client";
import { fetchData } from "@/src/api/holipedia";
import { HeroImgComponent, UseDebounceSearch } from "@/src/components";
import { HolipediaImages } from "@/src/constants";
import { alphabet } from "@/src/constants/commonValues";
import palette from "@/src/utils/theme/palette";
import { East, Search } from "@mui/icons-material";
import {
  Box,
  Grid,
  Icon,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ContainerStyle, LinkStyle, ListSecStyle } from "../style";

const HolipediaListTemplate = ({ params }) => {
  const { locale } = params;
  const [data, setData] = useState();
  const [symptomSearch, setSymptomSearch] = useState("");
  const [topicSearch, setTopicSearch] = useState("");
  const [skeleton, setSkeleton] = useState(true);
  const [isSearchFunctionalityActive, setIsSearchFunctionalityActive] = useState(false);
  const t = useTranslations();

  const topicData = async (topicValue, symptomValue) => {
    const topicListDataPromise = await fetchData(params, topicValue, symptomValue);
    const updatedTopicList = topicListDataPromise?.activityTopicListWithLocalizationDTOs?.map(item => {
      return {
        unqGUID: item.unqGUID,
        name: item.name,
        titleName: item.topicTitle,
        redirectTo: `/holipedia/${item.unqGUID}`,
      };
    });
    const dataList = { itemList: updatedTopicList };
    setData(dataList);
    setSkeleton(false);
  };

  useEffect(() => {
    topicData(topicSearch, symptomSearch);
  }, []);

  const debouncedSearchTopic = UseDebounceSearch(topicSearch, 1000);
  const debouncedSearchSymptom = UseDebounceSearch(symptomSearch, 1000);

  useEffect(() => {
    if (isSearchFunctionalityActive) {
      setSkeleton(true);
      topicData(topicSearch, symptomSearch);
    }
  }, [debouncedSearchSymptom, debouncedSearchTopic]);

  return (
    <ContainerStyle>
      <Box display={{ xs: "none", sm: "block" }}>
        <HeroImgComponent
          primary={t("holipediaModule.desktopTitle")}
          secondary={t("holipediaModule.desktopDescriptionsPara1")}
          src={HolipediaImages?.url}
          alt={"logo"}
          mt={3}
          mb={2}
        />
        <br />
        <Typography color={palette.text.secondary} variant={"body1"} width={"inherit"}>
          {t("holipediaModule.desktopDescriptionsPara2")}
        </Typography>
      </Box>
      <Box display={{ xs: "block", sm: "none" }}>
        <HeroImgComponent
          primary={t("holipediaModule.title")}
          secondary={t("holipediaModule.descriptions")}
          src={HolipediaImages?.url}
          alt={"logo"}
          mt={3}
          mb={2}
        />
      </Box>
      <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} justifyContent="center" paddingTop={8}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label={t("holipediaModule.searchByMethodName")}
            onChange={e => {
              if (!isSearchFunctionalityActive) {
                setIsSearchFunctionalityActive(true);
              }
              setTopicSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <Icon>
                    <Search />
                  </Icon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label={t("holipediaModule.searchBySymptom")}
            onChange={e => {
              if (!isSearchFunctionalityActive) {
                setIsSearchFunctionalityActive(true);
              }
              setSymptomSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <Icon>
                    <Search />
                  </Icon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <ListSecStyle>
        <Grid container spacing={6}>
          {!skeleton
            ? alphabet
                .find(item => item.locale === locale)
                ?.letters?.split("")
                ?.map(letter => (
                  <Grid item key={letter} xs={12} sm={6} md={4}>
                    <Typography variant="h6">{letter}</Typography>
                    <List>
                      {data?.itemList &&
                        Array.isArray(data?.itemList) &&
                        data?.itemList
                          .filter(item => item.titleName.charAt(0).toUpperCase() === letter)
                          ?.sort((a, b) => a.titleName.localeCompare(b.titleName))
                          .map((item, index) => (
                            <ListItem key={index} disablePadding>
                              <LinkStyle
                                color="secondary"
                                href={item.redirectTo}
                                disc={
                                  <>
                                    <ListItemText primary={item.titleName} primaryTypographyProps={{}} />
                                    <East />
                                  </>
                                }
                              />
                            </ListItem>
                          ))}
                    </List>
                  </Grid>
                ))
            : alphabet
                .find(item => item.locale === locale)
                ?.letters?.split("")
                ?.map(letter => (
                  <Grid item key={letter} xs={12} sm={6} md={4}>
                    <Typography variant="h6">{letter}</Typography>
                    <List>
                      <ListItem>
                        <Skeleton width="60%" />
                      </ListItem>
                    </List>
                  </Grid>
                ))}
        </Grid>
      </ListSecStyle>
    </ContainerStyle>
  );
};

export default HolipediaListTemplate;
