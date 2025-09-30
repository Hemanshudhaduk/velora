import { GetActivitySeoDetails } from "@/src/api/activities";
import DetailPage from "@/src/components/templates/DetailPage";
import { SeoTemplate } from "@/src/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("activityProviderSeo");
  const { guid, locale } = params;
  const activitySeoDetails = await GetActivitySeoDetails(guid, locale);
  const titleObject = {};
  // Ensure we always work with an array to avoid undefined length/index errors
  let mapTopicDetail =
    activitySeoDetails?.data?.activityTopicSeoDetails?.map(item => item?.name)?.filter(Boolean) || [];
  titleObject.title = `${activitySeoDetails?.data?.activityProvideSeoDetails[0]?.name} ${
    activitySeoDetails?.data?.activityProvideSeoDetails[0]?.activityBookingType === "In-Person"
      ? `& ${t("in")} ${activitySeoDetails?.data?.activityProvideSeoDetails[0]?.activityCity}`
      : ""
  } `;

  if (activitySeoDetails?.data?.activityTopicSeoDetails?.length === 0) {
    titleObject.description =
      activitySeoDetails?.data?.activityProvideSeoDetails[0]?.description?.length > 160
        ? activitySeoDetails?.data?.activityProvideSeoDetails[0]?.description?.substring(0, 160) + "..."
        : activitySeoDetails?.data?.activityProvideSeoDetails[0]?.description;
  } else if (activitySeoDetails?.data?.activityTopicSeoDetails?.length === 1) {
    titleObject.description = `${t("topicDescription")} ${
      activitySeoDetails?.data?.activityProvideSeoDetails[0]?.activityBookingType === "In-Person"
        ? `| ${t("in")} ${activitySeoDetails?.data?.activityProvideSeoDetails[0]?.city}`
        : ""
    }! ${t("topicDescription1")} ${activitySeoDetails?.data?.activityTopicSeoDetails[0]?.name}.`;
  } else if (activitySeoDetails?.data?.activityTopicSeoDetails?.length === 2) {
    titleObject.description = `${t("topicDescription")} ${
      activitySeoDetails?.data?.activityProvideSeoDetails[0]?.activityBookingType === "In-Person"
        ? `| ${t("in")} ${activitySeoDetails?.data?.activityProvideSeoDetails[0]?.city}`
        : ""
    }! ${t("topicDescription1")} ${mapTopicDetail?.join(" and ")}.`;
  } else if (
    (activitySeoDetails?.data?.activityTopicSeoDetails?.length ?? mapTopicDetail.length) >= 3 &&
    (activitySeoDetails?.data?.activityTopicSeoDetails?.length ?? mapTopicDetail.length) <= 6
  ) {
    titleObject.description = `${t("topicDescription")} ${
      activitySeoDetails?.data?.activityProvideSeoDetails[0]?.activityBookingType === "In-Person"
        ? `| ${t("in")} ${activitySeoDetails?.data?.activityProvideSeoDetails[0]?.city}`
        : ""
    }! ${t("topicDescription1")} ${mapTopicDetail?.slice(0, mapTopicDetail?.length - 1).join(", ")} ${t("and")} ${
      mapTopicDetail[mapTopicDetail?.length - 1]
    }.`;
  } else {
    // Fallback for any other length; guard against empty array
    if (mapTopicDetail.length === 0) {
      titleObject.description = `${t("topicDescription")}`;
    } else if (mapTopicDetail.length === 1) {
      titleObject.description = `${t("topicDescription1")} ${mapTopicDetail[0]}.`;
    } else {
      titleObject.description = `${t("topicDescription1")} ${mapTopicDetail
        .slice(0, mapTopicDetail.length - 1)
        .join(", ")} ${t("and")} ${mapTopicDetail[mapTopicDetail.length - 1]}.`;
    }
  }
  titleObject.metadataBase = new URL("https://holistickah.com/en/activity");
  const seoTemplate = SeoTemplate(titleObject);
  if (mapTopicDetail?.length < 10) {
    const mapSymptomDetails = activitySeoDetails?.data?.activitySymptomSeoDetails?.map(item => item?.name)?.filter(Boolean);
    const sliceSymptomData = mapSymptomDetails?.slice(0, 10 - mapTopicDetail.length - 1) || [];
    mapTopicDetail = mapTopicDetail.concat(sliceSymptomData).join(", ");
  }
  return {
    ...seoTemplate,
    keywords: mapTopicDetail,
  };
}

const page = async ({ params }) => {
  const { guid, locale } = params;

  return <DetailPage page="activityPage" guid={guid} locale={locale} />;
};

export default page;
