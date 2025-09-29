import { holipediaTopicList } from "@/src/constants/commonValues";
import palette from "@/src/utils/theme/palette";
import { East } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Grid, List, ListItem, Typography } from "@mui/material";
import { sanitize } from "isomorphic-dompurify";
import { useTranslations } from "next-intl";
import { Scroller } from "../../atoms";
import { ContainerStyle, LinkStyle } from "../../style";
import { AccessBarsSecStyle, ArticleSecStyle } from "../../style/HolipediaDetailsStyle";

const HolipediaDetails = ({ holipediaDetailsData }) => {
  const t = useTranslations();
  const fetchHolipediaTopicList = holipediaTopicList?.map(item => {
    const { id, key, titleTranslationKey } = item;
    const modifiedItem = {
      id,
      key,
      title: t(titleTranslationKey),
    };
    return modifiedItem;
  });
  return (
    <>
      {holipediaDetailsData?.activityTopicDetails?.map(topicDetails => {
        return (
          <>
            <AccessBarsSecStyle>
              <ContainerStyle>
                <Typography variant="h5" mb={0.5}>
                  {topicDetails.topicTitle}
                </Typography>
                {topicDetails.about && (
                  <Typography
                    variant="body1"
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(topicDetails.about),
                    }}
                  />
                )}
                <ButtonGroup>
                  <Button variant="outlined" color="primary" href={`/providers?topic=${topicDetails.unqGUID}`}>
                    {t("holipediaModule.findProviders")}
                  </Button>
                  <Button variant="outlined" color="primary" href={`/activity?topic=${topicDetails.unqGUID}`}>
                    {t("holipediaModule.findActivities")}
                  </Button>
                </ButtonGroup>
              </ContainerStyle>
            </AccessBarsSecStyle>
            <ArticleSecStyle>
              <ContainerStyle>
                <Grid container spacing={4}>
                  {/* Left Side Menu */}
                  <Grid item xs={0} sm={3} display={{ xs: "none", sm: "block" }}>
                    <div id="ArticleSidebar">
                      <Typography variant="body2" fontWeight={600} mb={{ xs: 2, sm: 3 }} color={palette.text.primary}>
                        {t("holipediaModule.content")}
                      </Typography>
                      <List disablePadding>
                        {fetchHolipediaTopicList
                          ?.sort((a, b) => a.id - b.id)
                          ?.map(item =>
                            item.key === "symptoms" ? (
                              holipediaDetailsData?.activitySymptoms &&
                              holipediaDetailsData?.activitySymptoms?.length ? (
                                <ListItem key={item.key} disablePadding>
                                  <Scroller redirectId={item.key}>
                                    <Typography variant="body1" fontWeight={600} color={palette.text.secondary}>
                                      {item.title}
                                    </Typography>
                                  </Scroller>
                                </ListItem>
                              ) : null
                            ) : topicDetails[item.key] ? (
                              <ListItem key={item.key} disablePadding>
                                <Scroller redirectId={item.key}>
                                  <Typography variant="body1" fontWeight={600} color={palette.text.secondary}>
                                    {item.title}
                                  </Typography>
                                </Scroller>
                              </ListItem>
                            ) : null
                          )}
                      </List>
                    </div>
                  </Grid>
                  {/* Right Side Content */}
                  <Grid item xs={12} sm={9}>
                    {fetchHolipediaTopicList
                      ?.sort((a, b) => a.id - b.id)
                      ?.map(item =>
                        item.key === "symptoms" ? (
                          holipediaDetailsData?.activitySymptoms && holipediaDetailsData?.activitySymptoms?.length ? (
                            <>
                              <Box id="symptoms" key={item.key} mb={2} pb={6}>
                                <Typography variant="h6" mb={2}>
                                  {t("holipediaModule.symptoms")}
                                </Typography>
                                <Typography variant="body1">{t("holipediaModule.symptomsSubTitle")}</Typography>
                                {holipediaDetailsData?.activitySymptoms.length ? (
                                  <Box mt={4}>
                                    <Typography variant="body1" mb={3}>
                                      {t("holipediaModule.symptomsDescription")}
                                    </Typography>
                                    <List disablePadding>
                                      {holipediaDetailsData?.activitySymptoms?.map((symptom, index) => (
                                        <ListItem key={index} disablePadding>
                                          <LinkStyle
                                            href={`/activity?symptoms=${symptom.unqGUID}`}
                                            disc={
                                              <>
                                                <Typography
                                                  variant="body1"
                                                  fontWeight={600}
                                                  color={palette.text.secondary}
                                                >
                                                  {symptom.symptomTitle}
                                                </Typography>
                                                <East />
                                              </>
                                            }
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Box>
                                ) : (
                                  ""
                                )}
                              </Box>
                            </>
                          ) : null
                        ) : topicDetails[item.key] ? (
                          <Box id={item.key} key={item.key} mb={2} pb={2}>
                            <Typography variant="h6" mb={2}>
                              {item.title}
                            </Typography>
                            {item.key === "filmTips" ? (
                              <iframe
                                style={{ width: "100%", aspectRatio: "16/9" }}
                                src={topicDetails[item.key]}
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <Typography
                                variant="body1"
                                component="div"
                                dangerouslySetInnerHTML={{
                                  __html: sanitize(topicDetails[item.key]),
                                }}
                              />
                            )}
                          </Box>
                        ) : null
                      )}
                  </Grid>
                </Grid>
              </ContainerStyle>
            </ArticleSecStyle>
          </>
        );
      })}
    </>
  );
};

export default HolipediaDetails;
