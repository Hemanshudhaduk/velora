import { Box, Chip, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ActivitySymptomList } from "../atoms";
import { ActivityProviderStaffList, IconWithLabelList } from "../organisms";
import ActivityProviderMap from "./ActivityProviderMap";
import Section from "./Section";

const SummaryDetails = props => {
  const { summaryData } = props;
  const {
    activityLocation,
    additionalSections,
    symptomList,
    topicList,
    instructions,
    languageName,
    staffList,
    cancellationPolicy,
    summary,
    companyName,
    companyDescription,
    companyUnqGUID,
    companyPhoneNumber,
    activityType,
    website,
    etsy,
    facebook,
    instagram,
    linkedin,
    pinterest,
    tiktok,
    twitter,
    vimeo,
    youtube,
    addressLong,
    addressLat,
    placeId,
  } = summaryData;
  const socialMediaList = [
    { id: 0, mediaName: "CompanyPhoneNumber", redirectLink: companyPhoneNumber },
    { id: 1, mediaName: "Website", redirectLink: website },
    { id: 2, mediaName: "Etsy", redirectLink: etsy },
    { id: 3, mediaName: "Facebook", redirectLink: facebook },
    { id: 4, mediaName: "Instagram", redirectLink: instagram },
    { id: 5, mediaName: "Linkedin", redirectLink: linkedin },
    { id: 6, mediaName: "Pinterest", redirectLink: pinterest },
    { id: 7, mediaName: "Tiktok", redirectLink: tiktok },
    { id: 8, mediaName: "Twitter", redirectLink: twitter },
    { id: 9, mediaName: "Vimeo", redirectLink: vimeo },
    { id: 10, mediaName: "Youtube", redirectLink: youtube },
  ];
  const t = useTranslations();
  return (
    <>
      <Section
        sectionTitle={t("activityDetail.summary")}
        sectionDescription={summary}
        readMore={{ isReadMore: true, text: summary, textSize: 600, label: t("readMore"), nextMore: summary.length }}
      />
      <Box display="flex" flexWrap="wrap" gap={1} mt={{ sm: 3 }} pb={3}>
        {topicList?.length !== 0 && topicList?.map(topic => <Chip key={topic.unqGUID} label={topic.topicName} />)}
      </Box>
      {symptomList?.length !== 0 && (
        <Box mt={3} flexWrap="wrap">
          <Typography variant="h6" mb={3}>
            {t("activityDetail.knownToHelp")}
          </Typography>
          <Box display="flex" flexWrap="wrap" alignItems="center" gap={1} mt={3} pb={3}>
            <ActivitySymptomList symptomList={symptomList} />
          </Box>
        </Box>
      )}
      {additionalSections.length !== 0 &&
        additionalSections.map(section => <Section key={section.unqGUID} {...section} />)}
      {instructions && (
        <Section
          sectionTitle={t("activityDetail.instructions")}
          sectionDescription={instructions}
          readMore={{
            isReadMore: true,
            text: instructions,
            textSize: 600,
            label: t("readMore"),
            nextMore: instructions.length,
          }}
        />
      )}
      {languageName && <Section sectionTitle={t("activityDetail.primaryLanguage")} sectionDescription={languageName} />}
      {staffList.length !== 0 && (
        <Box mt={3} pb={3}>
          <Typography variant="h6" mb={2}>
            {t("activityDetail.staff")}
          </Typography>
          <ActivityProviderStaffList staffList={staffList} />
        </Box>
      )}
      {cancellationPolicy ? (
        <Section
          sectionTitle={t("activityDetail.cancellationPolicy")}
          sectionDescription={cancellationPolicy}
          readMore={{
            isReadMore: true,
            text: cancellationPolicy,
            textSize: 600,
            label: t("readMore"),
            nextMore: cancellationPolicy.length,
          }}
        />
      ) : (
        <Box mt={6} flexWrap="wrap">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={10}>
              <Typography variant="h6" mb={3}>
                {t("activityDetail.cancellationPolicy")}
              </Typography>
              <Typography variant="body1">{t("activityDetail.cancellationPolicyHeader")}</Typography>
              {activityType === "Event" ? (
                <ul>
                  <li>{t("activityDetail.cancellationPolicyEventPara1")}</li>
                  <li>{t("activityDetail.cancellationPolicyEventPara2")}</li>
                  <li>{t("activityDetail.cancellationPolicyEventPara3")}</li>
                </ul>
              ) : (
                <ul>
                  <li>{t("activityDetail.cancellationPolicyPara1")}</li>
                  <li>{t("activityDetail.cancellationPolicyPara2")}</li>
                  <li>{t("activityDetail.cancellationPolicyPara3")}</li>
                </ul>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
      <ActivityProviderMap
        companyName={companyName}
        companyDescription={companyDescription}
        companyUnqGUID={companyUnqGUID}
        fullAddress={activityLocation}
        longitude={addressLong}
        latitude={addressLat}
        isLocation={activityLocation === "Call" || activityLocation === "Online" ? false : true}
        placeId={placeId}
      />
      <IconWithLabelList dataList={socialMediaList} />
    </>
  );
};

export default SummaryDetails;
