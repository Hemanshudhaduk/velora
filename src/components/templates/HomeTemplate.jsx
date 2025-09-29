"use client";
import {
  CustomCard,
  CustomLink,
  CustomLoader,
  HomeStaticPart,
  ListItemUserCard,
  MobileCategoryList,
  OurStoryTemplate,
} from "@/src/components";
import { FeaturePracticeImages, FlowerImage, HealthInOnePlaceImages } from "@/src/constants";
import { ArrowForward, East } from "@mui/icons-material";
import { Button, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useTranslations } from "next-intl";
import HomeActivitySection from "../molecules/HomeActivitySection";
import {
  ArticleSecStyle,
  CategoriesSecStyle,
  ContainerCenterEnd,
  ContainerStyle,
  CustomImgStyle,
  ExploreSecStyle,
  FeatureSecBottomImgStyle,
  FeatureSecStyle,
  FeatureSecTopImgStyle,
  HeroSecStyle,
  LinkEndColoured,
  LinkStyle,
  SymptomsSecStyle,
} from "../style";

const Home = ({ data }) => {
  const t = useTranslations();
  return (
    <>
      <HeroSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
            <Grid item lg={6} sm={6} xs={12}>
              <HomeStaticPart
                gap="24px"
                title={t("home.holisticHealthInOnePlace")}
                subTitle={t("home.holisticHealthInOnePlaceInstruction")}
                btnText={t("home.exploreActivities")}
                href="/activity"
                imageUrl={FlowerImage}
              />
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xs={12}
              gap={4}
              justifyContent={{ xs: "center", sm: "flex-end" }}
              display="flex"
              flexWrap="wrap"
            >
              {HealthInOnePlaceImages?.sort((a, b) => a.id - b.id)?.map(({ id, url, alt }) => (
                <CustomImgStyle key={id} src={url} alt={alt} fill={true} />
              ))}
            </Grid>
          </Grid>
        </ContainerStyle>
      </HeroSecStyle>
      {/* <HomeActivitySection /> */}
      {data.articles?.length > 0 ? (
        <ArticleSecStyle>
          <ContainerStyle>
            <Grid container style={{ marginBottom: "12px" }}>
              <Grid item xs={6}>
                <Typography variant="h5">{t("content.articles")}</Typography>
              </Grid>
              {data.articles?.length > 3 && (
                <ContainerCenterEnd item xs={6}>
                  <LinkEndColoured
                    href="/articles"
                    disc={
                      <Stack direction="row" gap={1}>
                        <Typography variant="p">{t("home.showAll")}</Typography>
                        <ArrowForward />
                      </Stack>
                    }
                  />
                </ContainerCenterEnd>
              )}
            </Grid>
            <Grid container spacing={2}>
              {data.articles?.map(
                (item, index) =>
                  index < 3 && (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                      <ListItemUserCard
                        {...{
                          href: `articles/${item.sys.id}`,
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
                        }}
                      />
                    </Grid>
                  )
              )}
            </Grid>
          </ContainerStyle>
        </ArticleSecStyle>
      ) : null}
      <ExploreSecStyle>
        <ContainerStyle>
          <Typography variant="h2">{t("home.explore")}</Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {data?.activitySupportingTypeDetails?.map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <CustomLink
                    href={`/activity?supportingType=${item.unqGuid}`}
                    disc={
                      <>
                        <CustomImgStyle
                          borderRadius="24px"
                          src={item.imageUrl}
                          key={item.unqGuid}
                          alt="explore"
                          fill={true}
                        />
                        <Typography variant="body1">{item.name}</Typography>
                      </>
                    }
                  ></CustomLink>
                </Grid>
              );
            })}
          </Grid>
        </ContainerStyle>
      </ExploreSecStyle>
      {/* <CategoriesSecStyle>
        <ContainerStyle>
          <Typography id="categories" variant="h2">
            {t("footer.categories")}
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} display={{ xs: "none", sm: "flex" }}>
            {data?.activityCategoryDetails?.map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CustomLink
                    href={`/activity?category=${item.unqGuid}`}
                    disc={<CustomCard title={item.name} src={item.imageUrl} />}
                  />
                </Grid>
              );
            })}
          </Grid>
          <MobileCategoryList categoryList={data?.activityCategoryDetails} />
        </ContainerStyle>
      </CategoriesSecStyle> */}
      {/* <SymptomsSecStyle>
        <ContainerStyle>
          <Typography variant="h2" marginBottom={{ xs: 2, md: 3 }}>
            {t("footer.symptoms")}
          </Typography>
          <Typography variant="body1" marginBottom={{ xs: 4, md: 8 }}>
            {t("home.symptomsInformation")}
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 6 }}>
            {data?.symptomsDetails && Array.isArray(data?.symptomsDetails) ? (
              data?.symptomsDetails?.map((item, index) => (
                <Grid item md={4} xs={12} sm={6} key={index}>
                  <LinkStyle
                    href={`/activity?symptoms=${item.unqGuid}`}
                    disc={
                      <>
                        <Typography variant="body1" fontWeight="600">
                          {item.name}
                        </Typography>
                        <East />
                      </>
                    }
                  />
                </Grid>
              ))
            ) : (
              <Grid item md={4} xs={12} sm={6}>
                <CustomLoader width="60%" />
              </Grid>
            )}
            <Grid item lg={12} xs={12} sm={12} textAlign={{ md: "center" }}>
              <Button variant="contained" color="primary" href="/symptoms">
                {t("home.viewAllSymptoms")}
              </Button>
            </Grid>
          </Grid>
        </ContainerStyle>
      </SymptomsSecStyle> */}
      <FeatureSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 3, sm: 2 }} alignItems="center">
            <Grid item md={6} xs={12}>
              <HomeStaticPart
                gap="24px"
                title={t("footer.featureYourPractice")}
                subTitle={t("footer.start30DaysTrial")}
                btnText={t("learnMore")}
                href="/practitioner"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FeatureSecTopImgStyle>
                {FeaturePracticeImages?.slice(0, 2)
                  ?.sort((a, b) => a.id - b.id)
                  ?.map(({ id, url, alt }) => (
                    <CustomImgStyle key={id} src={url} alt={alt} fill={true} />
                  ))}
              </FeatureSecTopImgStyle>
              <FeatureSecBottomImgStyle>
                {FeaturePracticeImages?.slice(2, 5)
                  ?.sort((a, b) => a.id - b.id)
                  ?.map(({ id, url, alt }) => (
                    <CustomImgStyle key={id} src={url} alt={alt} fill={true} />
                  ))}
              </FeatureSecBottomImgStyle>
            </Grid>
          </Grid>
        </ContainerStyle>
      </FeatureSecStyle>
      <OurStoryTemplate />
    </>
  );
};
export default Home;
