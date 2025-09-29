import { ourStoryImages } from "@/src/constants/commonValues";
import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { HomeStaticPart } from "../molecules";
import { ContainerStyle, CustomImgStyle, OurStoryBottomImgStyle, OurStoryTopImgStyle, SectionStyle } from "../style";
const OurStory = () => {
  const t = useTranslations();
  return (
    <SectionStyle>
      <ContainerStyle>
        <Grid container spacing={{ xs: 1, sm: 3, md: 4, lg: 6 }} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <HomeStaticPart
              gap="24px"
              title={t("practitionersModule.ourStoryTitle")}
              subTitle={t("practitionersModule.ourStoryDescriptions")}
              btnText={t("practitionersModule.ourStoryLabel")}
              href="/aboutus"
            />
          </Grid>
          <Grid item xs={12} md={5} display="flex" justifyContent="center">
            <div>
              <OurStoryTopImgStyle>
                {ourStoryImages
                  ?.slice(0, 3)
                  ?.sort((a, b) => a.id - b.id)
                  ?.map(({ id, url }) => (
                    <CustomImgStyle key={id} src={url} alt={`ourStory${id}`} fill={true} />
                  ))}
              </OurStoryTopImgStyle>
              <OurStoryBottomImgStyle>
                {ourStoryImages
                  ?.slice(3, 6)
                  ?.sort((a, b) => a.id - b.id)
                  ?.map(({ id, url }) => (
                    <CustomImgStyle key={id} src={url} alt={`ourStory${id}`} fill={true} />
                  ))}
              </OurStoryBottomImgStyle>
            </div>
          </Grid>
        </Grid>
      </ContainerStyle>
    </SectionStyle>
  );
};

export default OurStory;
