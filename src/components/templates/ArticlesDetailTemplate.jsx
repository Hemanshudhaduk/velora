"use client";
import palette from "@/src/utils/theme/palette";
import { ArrowForward } from "@mui/icons-material";
import { Box, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CustomLink } from "../atoms";
import { ListItemUserCard, UserInfoListItem } from "../molecules";
import {
  ArticleDetailContentStyle,
  ArticleDetailsContainer,
  ArticleDetailsStyle,
  OverflowStyle,
} from "../style/ArticleStyle";

const ArticlesDetailTemplate = params => {
  const t = useTranslations();
  const [imageExists, setImageExists] = useState(true);
  const { article, relatedArticles } = params;
  const {
    imageUrl,
    imageSize,
    tag,
    title,
    description,
    noImageText,
    htmlDom,
    bottomImageUrl,
    bottomImageTitle,
    bottomImageDescription,
  } = {
    href: `articles/${article.sys.id}`,
    imageUrl: `${
      article.fields?.mainPicture?.fields?.file?.url === null ||
      article.fields?.mainPicture?.fields?.file?.url === undefined ||
      article.fields?.mainPicture?.fields?.file?.url === ""
        ? ""
        : `https:${article.fields.mainPicture?.fields.file?.url}`
    }`,
    noImageText: t("noPictureText"),
    imageSize: article.fields?.mainPicture?.fields?.file?.details?.image,
    tag: article.fields?.category?.fields?.categoryName,
    title: article.fields?.mainHeader,
    description: article.fields?.articleSummary,
    htmlDom: article.htmlDom,
    bottomImageUrl: `${
      article.fields?.author?.fields?.picture?.fields?.file?.url === null ||
      article.fields?.author?.fields?.picture?.fields?.file?.url === undefined ||
      article.fields?.author?.fields?.picture?.fields?.file?.url === ""
        ? ""
        : `https:${article.fields.author.fields.picture.fields.file?.url}`
    }`,
    bottomImageTitle: article.fields?.author?.fields?.name,
    bottomImageDescription: moment(article.fields?.publishDate)?.locale(t("languageCode"))?.format(`ddd, DD MMM yyyy`),
  };

  const dataList = relatedArticles.items?.map(item => ({
    href: `/articles/${item.sys.id}`,
    imageUrl: `${
      item.fields?.mainPicture?.fields?.file?.url === null ||
      item.fields?.mainPicture?.fields?.file?.url === undefined ||
      item.fields?.mainPicture?.fields?.file?.url === ""
        ? ""
        : `https:${item.fields.mainPicture.fields.file?.url}`
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
        : `https:${item.fields.author.fields.picture.fields.file?.url}`
    }`,
    bottomImageTitle: item.fields?.author?.fields?.name,
    bottomImageDescription: moment(item.fields?.publishDate)?.locale(t("languageCode"))?.format(`ddd, DD MMM yyyy`),
  }));

  useEffect(() => {
    const checkImageExists = async () => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          setImageExists(false);
        }
      } catch (error) {
        setImageExists(false);
      }
    };

    checkImageExists();
  }, []);

  return (
    <Container>
      <ArticleDetailsStyle>
        <CardContent sx={{ padding: "0" }}>
          {tag !== undefined && tag !== "" && tag !== null ? (
            <Typography variant="subtitle2" mb={{ xs: 2 }} fontWeight={{ sm: 600 }} color={palette.text.green}>
              {tag}
            </Typography>
          ) : null}
          {title !== undefined && title !== "" && title !== null ? (
            <Typography variant="h5" mb={{ xs: 2 }} color={palette.text.primary}>
              {title}
            </Typography>
          ) : null}
          {description !== undefined && description !== "" && description !== null ? (
            <OverflowStyle variant="subtitle1" mb={{ xs: 2 }} color={palette.text.secondary}>
              {description}
            </OverflowStyle>
          ) : null}
          <UserInfoListItem imageURL={bottomImageUrl} title={bottomImageTitle} description={bottomImageDescription} />
        </CardContent>
        <Box display={{ xs: "block" }} width="100%" marginTop="32px" minHeight={{ xs: "200px", md: "462px" }}>
          {imageUrl !== undefined && imageUrl !== "" && imageUrl !== null && imageExists ? (
            <CardMedia
              component="img"
              image={imageUrl ?? ""}
              alt=""
              sx={{ height: "100%", borderRadius: "12px" }}
              height={imageSize.height}
              width={imageSize.width}
            />
          ) : (
            <Box
              width="100%"
              minHeight="462px"
              bgcolor="lightgray"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              margin="auto"
              padding="0.5rem"
              textAlign="center"
              borderRadius="12px"
            >
              {noImageText}
            </Box>
          )}
        </Box>
      </ArticleDetailsStyle>
      <ArticleDetailContentStyle dangerouslySetInnerHTML={{ __html: htmlDom }} />
      {dataList.length > 0 && (
        <ArticleDetailsContainer>
          <Grid container style={{ marginBottom: "12px" }}>
            <Grid item lg={6} sm={6} xs={12}>
              <Typography variant="h5">{t("content.relatedArticles")}</Typography>
            </Grid>
            {dataList.length > 3 && (
              <Grid item lg={6} sm={6} xs={12}>
                <CustomLink
                  style={{ display: "flex", justifyContent: "flex-end", color: "#51525C" }}
                  href={`/articles?category=${article.fields.category?.sys.id}`}
                  disc={
                    <Stack direction="row">
                      <Typography variant="p">{t("home.showAll")}</Typography>
                      <ArrowForward />
                    </Stack>
                  }
                />
              </Grid>
            )}
          </Grid>
          <Grid container spacing={2}>
            {dataList !== undefined &&
              dataList !== null &&
              dataList?.map(
                (item, index) =>
                  index < 3 && (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                      <ListItemUserCard
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
                  )
              )}
          </Grid>
        </ArticleDetailsContainer>
      )}
    </Container>
  );
};

export default ArticlesDetailTemplate;
