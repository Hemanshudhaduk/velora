"use client";
import { getArticlesList } from "@/src/api/contentFullApi";
import { DefaultViewMoreCountArticles, SearchDefaultItemCount, SearchNextItemCount } from "@/src/constants";
import palette from "@/src/utils/theme/palette";
import { Close, SearchOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ListItemUserCardSkeleton } from "../skeletons";
import ListItemUserCard from "./ListItemUserCard";

const ArticleSearchBox = page => {
  const t = useTranslations();
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [viewLimit, setViewLimit] = useState({ ...DefaultViewMoreCountArticles });
  const [isSkeleton, setIsSkeleton] = useState(true);
  const locale = useLocale();

  const handleDrawerToggle = () => {
    setShowDrawer(!showDrawer);
    setSearchText("");
    setViewLimit({ ...DefaultViewMoreCountArticles });
    setSearchResult([]);
  };

  const handleArticleSearch = async () => {
    if (searchText !== "") {
      setIsSkeleton(true);
      const response = await getArticlesList(
        {
          pageNumber: viewLimit.articlesLimit / SearchNextItemCount - 1,
          rowsPerPage: SearchDefaultItemCount + 1,
          locale: locale,
          filterColumns: { search: searchText },
        },
        true
      );
      if (response) {
        if (searchResult.length > 0) searchResult.splice(searchResult.length - 1, 1);
        response.items?.map(item =>
          searchResult.push({
            href: `/articles/${item.sys.id}`,
            imageUrl: `${
              item.fields?.mainPicture?.fields?.file?.url === null ||
              item.fields?.mainPicture?.fields?.file?.url === undefined ||
              item.fields?.mainPicture?.fields?.file?.url === ""
                ? ""
                : `https:${item.fields.mainPicture.fields.file.url}`
            }`,
            noImageText: t("noPictureText"),
            tag: item.fields?.category?.fields?.categoryName,
            title: item.fields?.mainHeader,
            description: item.fields?.articleSummary,
            bottomImageUrl: `${
              item.fields?.author?.fields?.picture?.fields?.file?.url === null ||
              item.fields?.author?.fields?.picture?.fields?.file?.url === undefined ||
              item.fields?.author?.fields?.picture?.fields?.file?.url === ""
                ? ""
                : `https:${item.fields.author.fields.picture.fields.file.url}`
            }`,
            bottomImageTitle: item.fields?.author?.fields?.name,
            bottomImageDescription: moment(item.fields?.publishDate)
              ?.locale(t("languageCode"))
              ?.format(`ddd, DD MMM yyyy`),
          })
        );
        setSearchResult(searchResult);
      } else {
        setSearchResult([]);
      }
    } else {
      setSearchResult([]);
    }
    setIsSkeleton(false);
  };

  useEffect(() => {
    searchResult.splice(0, searchResult.length);
    setViewLimit({ ...DefaultViewMoreCountArticles });
    handleArticleSearch();
  }, [searchText]);
  useEffect(() => {
    handleArticleSearch();
  }, [viewLimit.articlesLimit]);

  return (
    <>
      <Button variant="outlined" color="inherit" disableRipple onClick={() => handleDrawerToggle()}>
        {t("content.searchArticles")}
      </Button>
      <Drawer
        open={showDrawer}
        anchor="right"
        PaperProps={{ sx: { width: "100%", maxWidth: { sm: "383px" }, paddingBottom: "1rem" } }}
        onClose={handleDrawerToggle}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("search")}</Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ padding: "0" }}>
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
              setSearchText(e.target.value);
            }}
            placeholder={t("search")}
            onKeyDown={e => {
              e.stopPropagation();
            }}
          />
        </Box>
        <>
          {searchText !== "" ? (
            <Grid container spacing={1} pt={2} px={2}>
              {searchResult
                ?.filter((item, index) => index < viewLimit.articlesLimit)
                .map((item, index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                    <ListItemUserCard
                      key={index}
                      size={12}
                      href={item.href}
                      imageUrl={item.imageUrl}
                      tag={item.tag}
                      title={item.title}
                      description={item.description}
                      noImageText={item.noImageText}
                      bottomImageUrl={item.bottomImageUrl}
                      bottomImageTitle={item.bottomImageTitle}
                      bottomImageDescription={item.bottomImageDescription}
                    ></ListItemUserCard>
                  </Grid>
                ))}
              {isSkeleton ? <ListItemUserCardSkeleton pageSize={3} size={12} /> : null}
              {searchResult?.length > viewLimit.articlesLimit ? (
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ marginLeft: "8px", marginTop: "16px" }}
                  color="primary"
                  onClick={() => {
                    setViewLimit({ ...viewLimit, articlesLimit: viewLimit.articlesLimit + SearchNextItemCount });
                  }}
                >
                  {t("viewMore")}
                </Button>
              ) : null}
              {searchResult?.length < 1 && (
                <Typography variant="subtitle2">{t("content.noResultFor", { text: searchText })}</Typography>
              )}
            </Grid>
          ) : null}
        </>
      </Drawer>
    </>
  );
};
export default ArticleSearchBox;
