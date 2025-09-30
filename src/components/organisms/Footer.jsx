"use client"
import {
  FooterLegalRoutes,
  footerCompanyRoutes,
  footerResourceRoutes,
  footerSocialRoutes,
} from "@/src/constants/commonValues";
import palette from "@/src/utils/theme/palette";
import { East } from "@mui/icons-material";
import { Button, Divider, Grid, MenuItem, Typography as MuiTypography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  ContainerStyle,
  CustomImgStyle,
  FooterFeatureSecStyle,
  FooterLogoSecStyle,
  FooterWorldOfHolistikaStyle,
  MuiMenuListStyle,
} from "../style";

function Footer(props) {
  let legalList;
  const getLegalList = () => {
    legalList = FooterLegalRoutes();
  };
  getLegalList();
  const t = useTranslations();
  const blobUrl = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
  return (
    <footer
      style={{
        backgroundColor: "#111",
      }}
    >
      <FooterFeatureSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 4, sm: 2 }} justifyContent="space-between">
            <Grid item lg={9} sm={6} xs={12}>
              <MuiTypography component={"h6"} variant="h6" color="white">
                {t("footer.featureYourPractice")}
              </MuiTypography>
              <MuiTypography component={"p"} variant="body1" color="white">
                {t("footer.start30DaysTrial")}
              </MuiTypography>
            </Grid>
            <Grid item lg={3} sm={6} xs={12} textAlign={{ xs: "left", sm: "right" }}>
              <Button href="/" variant="contained" color="primary">
                {t("explore")}
              </Button>
            </Grid>
          </Grid>
          <Divider />
        </ContainerStyle>
      </FooterFeatureSecStyle>
      <FooterLogoSecStyle>
        <ContainerStyle>
          <Grid container spacing={{ xs: 8, sm: 4, md: 6, lg: 8 }} alignItems="flex-start">
            <Grid item xs={12} md={3.25}>
              <CustomImgStyle
                src={`/images/logos/image-1.svg`}
                alt="velora_logo"
                fill={true}
                sx={{ marginBottom: "2rem", maxWidth: "9.5625rem" }}
              />
              <MuiTypography variant="body1" color={palette.text.secondaryContrast}>
                {t("footer.footerInstruction")}
              </MuiTypography>
            </Grid>
            <Grid item xs={12} md={8.75}>
              <Grid container spacing={{ xs: 4, sm: 4, md: 3, lg: 4 }} alignItems="flex-start">
                <Grid item xs={12} sm={6} md={3}>
                  <MuiTypography color={palette.text.secondaryContrast} variant="body1">
                    {t("footer.company")}
                  </MuiTypography>
                  <MuiMenuListStyle>
                    {footerCompanyRoutes
                      ?.sort((a, b) => a.id - b.id)
                      ?.map(route => (
                        <MenuItem key={route.id} disableGutters={true}>
                          <Link href={route.redirectTo}>
                            {t(route.translationKey)}
                            <East />
                          </Link>
                        </MenuItem>
                      ))}
                  </MuiMenuListStyle>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MuiTypography color={palette.text.secondaryContrast} variant="body1">
                    {t("footer.social")}
                  </MuiTypography>
                  <MuiMenuListStyle>
                    {footerSocialRoutes
                      ?.sort((a, b) => a.id - b.id)
                      ?.map(route => (
                        <MenuItem key={route.id} disableGutters={true}>
                          <Link href={route.redirectTo} target="_blank">
                            {t(route.translationKey)}
                            <East />
                          </Link>
                        </MenuItem>
                      ))}
                  </MuiMenuListStyle>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MuiTypography color={palette.text.secondaryContrast} variant="body1">
                    {t("footer.resources")}
                  </MuiTypography>
                  <MuiMenuListStyle>
                    {footerResourceRoutes
                      ?.sort((a, b) => a.id - b.id)
                      ?.map(route => (
                        <MenuItem key={route.id} disableGutters={true}>
                          <Link
                            href={
                              route.redirectTo === "#categories"
                                ? `/${props.locale}${route.redirectTo}`
                                : route.redirectTo
                            }
                          >
                            {t(route.translationKey)}
                            <East />
                          </Link>
                        </MenuItem>
                      ))}
                  </MuiMenuListStyle>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MuiTypography color={palette.text.secondaryContrast} variant="body1">
                    {t("footer.legal")}
                  </MuiTypography>
                  <MuiMenuListStyle>
                    {legalList
                      ?.sort((a, b) => a.id - b.id)
                      ?.map(route => (
                        <MenuItem key={route.id} disableGutters={true}>
                          <Link href={`${blobUrl}${route.redirectTo}`} target="_blank">
                            {t(route.translationKey)}
                            <East />
                          </Link>
                        </MenuItem>
                      ))}
                  </MuiMenuListStyle>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </ContainerStyle>
      </FooterLogoSecStyle>
      <FooterWorldOfHolistikaStyle>
        <ContainerStyle>
          <MuiTypography color={palette.text.secondaryContrast} variant="body1">
            © 2025 Velora — All rights reserved
          </MuiTypography>
        </ContainerStyle>
      </FooterWorldOfHolistikaStyle>
    </footer>
  );
}

export default Footer;
