
import { fetchData } from "@/src/api/symptoms";
import { CustomCarousel, OpenNewTabButton, OurStoryTemplate, PractitionerTemplate } from "@/src/components";
import { ContainerStyle, CustomImgStyle } from "@/src/components/style";
import {
  PractitionersFeatureSecStyle,
  PractitionersHeroSecStyle,
  PractitionersHolipreneurSecStyle,
  PractitionersNeedsSecStyle,
  PractitionersPaymentSecStyle,
} from "@/src/components/style/PractitionersStyle";
import { ForPractitionerImages } from "@/src/constants";
import { customerReviews, holipreneurURL, platformItems } from "@/src/constants/commonValues";
import { PractitionerPageSeo, SeoTemplate } from "@/src/seo";
import { gray } from "@/src/utils/theme/colors";
import palette from "@/src/utils/theme/palette";
import { CheckCircleOutline, Circle } from "@mui/icons-material";
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("practitionersModule");
  const symptomsDetails = await fetchData(params);
  const symptomsKeywords = symptomsDetails?.activitySymptoms?.map(symptom => symptom.name)?.slice(0, 10);
  const seoTemplate = SeoTemplate(PractitionerPageSeo());
  seoTemplate.title = t("seoTitle");
  seoTemplate.description = t("seoDescription");
  return {
    ...seoTemplate,
    keywords: symptomsKeywords,
  };
}
const Practitioners = ({ params }) => {
  const t = useTranslations();
  const ourMissionURL = process.env.NEXT_PUBLIC_SIGNUP_URL;
  const ourMissionButtonName = t("practitionersModule.tryForFree");
  const holipreneurButtonName = t("learnMore");

  const fetchPlatformItems = platformItems?.map(item => {
    const { id, titleTranslationKey, descriptionsTranslationKey, imageUrl } = item;
    const modifiedItem = {
      id,
      title: t(titleTranslationKey),
      descriptions: t(descriptionsTranslationKey),
      imageUrl,
    };
    return modifiedItem;
  });
  const fetchCustomerReviews = customerReviews?.map(item => {
    const { id, nameTranslationKey, designationTranslationKey, feedbackTranslationKey, imageUrl } = item;
    const modifiedItem = {
      id,
      name: t(nameTranslationKey),
      designation: t(designationTranslationKey),
      feedback: t(feedbackTranslationKey),
      imageUrl,
    };
    return modifiedItem;
  });
  return (
    <>
      {/* Hero Section Start */}
      <PractitionersHeroSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 2, sm: 4, md: 6, lg: 8 }}>
            <Grid item xs={12} sm={7.75}>
              <Typography variant="h5" mb={3}>
                {t("practitionersModule.title")}
              </Typography>
              <OpenNewTabButton url={`${ourMissionURL}/sign-up`} buttonName={ourMissionButtonName} />
              <Typography variant="body2" mt={1}>
                {t("practitionersModule.tryForFreeDescriptions")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4.25}>
              <Typography variant="body1" mb={{ xs: 2, sm: 3 }}>
                {t("practitionersModule.mission")}
              </Typography>
              <Typography variant="body1">{t("practitionersModule.belief")}</Typography>
            </Grid>
          </Grid>
        </ContainerStyle>
      </PractitionersHeroSecStyle>
      {/* Hero Section End */}

      {/* Feature Section Start */}
      <PractitionersFeatureSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 2, sm: 4, md: 6, lg: 8 }} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 1, md: 0 }}>
              <Typography variant="h5" mb={{ xs: 2, md: 4 }}>
                {t("practitionersModule.featurePracticeTitle")}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutline color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "subtitle2",
                    }}
                    primary={t("practitionersModule.featurePracticeSteps.step1")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutline color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "subtitle2",
                    }}
                    primary={t("practitionersModule.featurePracticeSteps.step2")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutline color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "subtitle2",
                    }}
                    primary={t("practitionersModule.featurePracticeSteps.step3")}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomImgStyle
                src={ForPractitionerImages?.signUpAsProviderImage?.url}
                alt={ForPractitionerImages?.signUpAsProviderImage?.alt}
                fill={true}
              />
            </Grid>
          </Grid>
        </ContainerStyle>
      </PractitionersFeatureSecStyle>
      {/* Feature Section End */}

      {/* Needs Section Start */}
      <ContainerStyle>
        <Grid container spacing={{ xs: 0, md: 12 }} alignItems="center" pt={{ xs: 0, md: 12 }}>
          <Grid item xs={12} sm={10} md={8}>
            <Typography variant="h5" mb={{ xs: 1.75, sm: 2.5 }}>
              {t("practitionersModule.platformTitle")}
            </Typography>
            <Typography variant="subtitle1">{t("practitionersModule.platformDescriptions")}</Typography>
          </Grid>
        </Grid>
      </ContainerStyle>
      <PractitionersNeedsSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 2, sm: 4, md: 6, lg: 8 }} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 1, md: 0 }} mt={{ xs: 4, md: 0 }}>
              <Grid container spacing={4} rowGap={2} justifyContent="flex-start">
                {fetchPlatformItems
                  ?.sort((a, b) => a.id - b.id)
                  ?.map(item => (
                    <Grid key={item.id} item xs={12} sm={6}>
                      <CustomImgStyle src={item.imageUrl} alt={"icon"} fill={true} />
                      <Typography variant="subtitle1" fontWeight="600" color={gray[900]} mt={{ xs: 2, sm: 2.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color={gray[600]} mt={1}>
                        {item.descriptions}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomImgStyle
                id="dashboard"
                src={ForPractitionerImages?.screenMockUpImage?.url}
                alt={ForPractitionerImages?.screenMockUpImage?.alt}
                fill={true}
              />
            </Grid>
          </Grid>
        </ContainerStyle>
      </PractitionersNeedsSecStyle>
      {/* Needs Section End */}

      {/* Online Payment Section Start */}
      <PractitionersPaymentSecStyle>
        <ContainerStyle>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} sm={6} p={{ xs: 3, sm: 6, md: 8 }}>
              <Typography variant="h5" mb={{ xs: 1.75, sm: 2.5 }}>
                {t("practitionersModule.onlinePaymentTitle")}
              </Typography>
              <Typography variant="subtitle1">{t("practitionersModule.onlinePaymentDescriptions")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} px={{ xs: 4, sm: 8, md: 18.375 }}>
              <CustomImgStyle
                unoptimize={true}
                src={ForPractitionerImages?.contentImage?.url}
                alt={ForPractitionerImages?.contentImage?.alt}
                fill={true}
              />
            </Grid>
          </Grid>
        </ContainerStyle>
      </PractitionersPaymentSecStyle>
      {/* Online Payment Section End */}

      {/* Pricing Plan Section Start */}
      <PractitionerTemplate languageCode={params.locale} page="pricingPlanSection" />
      {/* Pricing Plan Section End */}

      {/* Holipreneur Section Start */}
      <PractitionersHolipreneurSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 2, sm: 4, md: 6, lg: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <CustomImgStyle
                src={ForPractitionerImages?.iStock1369338497Image?.url}
                alt={ForPractitionerImages?.iStock1369338497Image?.url}
                fill={true}
              />
            </Grid>
            <Grid item xs={12} md={6} p={{ xs: 0, md: 6, lg: 8 }}>
              <Typography variant="h5" fontWeight={400} color={palette.text.primaryContrast} mb={{ xs: 2, sm: 3 }}>
                <b style={{ fontWeight: 600 }}>{t("practitionersModule.holipreneurScaling.title")}</b>
                {t("practitionersModule.holipreneurScaling.subTitle")}
              </Typography>
              <Typography variant="subtitle1" color={palette.text.secondaryContrast} mb={{ xs: 2, sm: 3 }}>
                {t("practitionersModule.holipreneurScaling.description1")}
              </Typography>
              <Typography variant="subtitle1" color={palette.text.secondaryContrast} mb={{ xs: 2, sm: 3 }}>
                {t("practitionersModule.holipreneurScaling.description2")}
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Circle />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("practitionersModule.holipreneurScaling.step1")}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Circle />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("practitionersModule.holipreneurScaling.step2")}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Circle />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("practitionersModule.holipreneurScaling.step3")}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Circle />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("practitionersModule.holipreneurScaling.step4")}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                color={palette.text.secondaryContrast}
                mt={{ xs: 2, sm: 3 }}
                mb={{ xs: 2, sm: 3 }}
              >
                {t("practitionersModule.holipreneurScaling.description3")}
              </Typography>
              <Typography variant="subtitle1" color={palette.text.secondaryContrast} mb={{ xs: 2, sm: 3 }}>
                {t("practitionersModule.holipreneurScaling.description4")}
              </Typography>
              <Typography variant="subtitle1" color={palette.text.secondaryContrast} mb={{ xs: 2, sm: 3 }}>
                {t("practitionersModule.holipreneurScaling.description5")}
              </Typography>
              <OpenNewTabButton url={holipreneurURL} buttonName={holipreneurButtonName} />
            </Grid>
          </Grid>
        </ContainerStyle>
      </PractitionersHolipreneurSecStyle>
      {/* Holipreneur Section End */}

      {/* Customer Reviews Section Start */}
      <CustomCarousel customerReviews={fetchCustomerReviews} />
      {/* Customer Reviews Section End */}

      {/* Our Story Section Start */}
      <OurStoryTemplate />
      {/* Our Story Section End */}
    </>
  );
};

export default Practitioners;
