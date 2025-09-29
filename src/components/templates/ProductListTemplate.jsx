import { CustomLoader, HeroImgComponent } from "@/src/components";
import { alphabet } from "@/src/constants/commonValues";
import palette from "@/src/utils/theme/palette";
import { East } from "@mui/icons-material";
import { Box, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ContainerStyle, LinkStyle, ListSecStyle } from "../style";

const ProductsPage = ({ data, language }) => {
  const { bannerSrc, bannerAlt, ItemList, description = null, title = null } = data;
  const t = useTranslations();
  return (
    <ContainerStyle>
      <Box display={{ xs: "none", sm: "block" }}>
        <HeroImgComponent
          primary={title === null ? t("holipediaModule.desktopTitle") : title}
          secondary={description === null ? t("holipediaModule.desktopDescriptionsPara1") : description}
          src={bannerSrc}
          alt={bannerAlt}
          mt={3}
          mb={2}
        />
        <br />
        {title === null && (
          <Typography color={palette.text.secondary} variant={"body1"} width={"inherit"}>
            {t("holipediaModule.desktopDescriptionsPara2")}
          </Typography>
        )}
      </Box>
      <Box display={{ xs: "block", sm: "none" }}>
        <HeroImgComponent
          primary={title === null ? t("holipediaModule.title") : title}
          secondary={description === null ? t("holipediaModule.descriptions") : description}
          src={bannerSrc}
          alt={bannerAlt}
          mt={3}
          mb={2}
        />
      </Box>
      {/* <HeroImgComponent primary={title} secondary={description} src={bannerSrc} alt={bannerAlt} mt={3} mb={2} /> */}
      <ListSecStyle>
        <Grid container spacing={6}>
          {alphabet
            .find(item => item.locale === language)
            ?.letters?.split("")
            ?.map(letter => (
              <Grid item key={letter} xs={12} sm={6} md={4}>
                <Typography variant="h6">{letter}</Typography>
                <List>
                  {ItemList && Array.isArray(ItemList) ? (
                    ItemList.filter(item => item.titleName.charAt(0).toUpperCase() === letter)
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
                      ))
                  ) : (
                    <ListItem>
                      <CustomLoader width="60%" />
                    </ListItem>
                  )}
                </List>
              </Grid>
            ))}
        </Grid>
      </ListSecStyle>
    </ContainerStyle>
  );
};

export default ProductsPage;
