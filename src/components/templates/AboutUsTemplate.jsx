import { CoFounderDetails, HeroImgComponent, TypographyList } from "@/src/components";
import { ContainerStyle } from "@/src/components/style";
import { AboutUsBottomSecStyle, AboutUsMiddleSecStyle } from "@/src/components/style/AboutUsStyle";
import { AboutUSGrid1, AboutUSGrid2, AboutUsImages, OurTeam } from "@/src/constants";
import { coFounderDetails } from "@/src/constants/commonValues";
import { Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

function AboutUsTemplate() {
  const t = useTranslations();
  const fetchCoFounderDetails = coFounderDetails?.map(coFounderDetail => {
    const { id, name, designationTranslationKey, descriptionTranslationKey, imageUrl, linkedInUrl } = coFounderDetail;
    const modifiedCoFounderDetail = {
      id,
      name,
      designation: t(designationTranslationKey),
      description: t(descriptionTranslationKey),
      imageUrl,
      linkedInUrl,
    };
    return modifiedCoFounderDetail;
  });

  return (
    <>
      <ContainerStyle>
        <HeroImgComponent
          primary={t("aboutUsModule.aboutUsHeading")}
          secondary={t("aboutUsModule.aboutUsDescription")}
          primaryTypographyProps={{
            variant: "h3",
            width: "70%",
            mb: 5,
          }}
          secondaryTypographyProps={{
            variant: "subtitle1",
            width: "70%",
          }}
          src={AboutUsImages?.url}
          alt={AboutUsImages?.alt}
          mt={6}
          mb={3}
        />
      </ContainerStyle>
      <AboutUsMiddleSecStyle>
        <ContainerStyle>
          <Typography variant="h4" fontWeight="600">
            {t("aboutUsModule.aboutUs")}
          </Typography>
          <Grid container spacing={{ xs: 1, sm: 4, md: 8 }}>
            <Grid item xs={12} sm={6}>
              <TypographyList typographyArray={AboutUSGrid1} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TypographyList typographyArray={AboutUSGrid2} />
            </Grid>
          </Grid>
        </ContainerStyle>
      </AboutUsMiddleSecStyle>
      <AboutUsBottomSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 4.5, sm: 6, md: 12 }}>
            <Grid item xs={12} sm={6} md={4.5}>
              <Typography
                variant="h4"
                fontWeight={600}
                fontSize={{ xs: "1.875rem", sm: "2.25rem" }}
                marginBottom={{ xs: "0.75rem", sm: "1.25rem" }}
              >
                {t("aboutUsModule.ourTeam")}
              </Typography>
              <TypographyList typographyArray={OurTeam} />
            </Grid>
            <Grid item xs={12} sm={6} md={7.5}>
              <Grid container spacing={{ xs: 3, sm: 3, md: 4 }}>
                {fetchCoFounderDetails
                  ?.sort((a, b) => a.id - b.id)
                  ?.map(item => (
                    <Grid item lg={6} xs={12} key={item.id}>
                      <CoFounderDetails
                        src={item.imageUrl}
                        name={item.name}
                        designation={item.designation}
                        description={item.description}
                        linkedInUrl={item.linkedInUrl}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </ContainerStyle>
      </AboutUsBottomSecStyle>
    </>
  );
}

export default AboutUsTemplate;
