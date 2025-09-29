import { GetProviderSeoDetails } from "@/src/api/ProviderDetails";
import { ProviderDetailTemplate } from "@/src/components";
import { SeoTemplate } from "@/src/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("activityProviderSeo");
  const { guid, locale } = params;
  const providerSeoDetails = await GetProviderSeoDetails(guid, locale);
  const titleObject = {};
  let mapTopicDetail = providerSeoDetails?.data?.activityTopicSeoDetails?.map(item => item.name);
  titleObject.title = `${providerSeoDetails?.data?.activityProvideSeoDetails[0]?.name} | ${
    providerSeoDetails?.data?.activityCategorySeoDetails[0]?.name
      ? providerSeoDetails?.data?.activityCategorySeoDetails[0]?.name + " " + t("in")
      : ""
  }  ${providerSeoDetails?.data?.activityProvideSeoDetails[0]?.city}`;

  if (providerSeoDetails?.data?.activityTopicSeoDetails?.length === 0) {
    titleObject.description =
      providerSeoDetails?.data?.activityProvideSeoDetails[0]?.description?.length > 160
        ? providerSeoDetails?.data?.activityProvideSeoDetails[0]?.description?.substring(0, 160) + "..."
        : providerSeoDetails?.data?.activityProvideSeoDetails[0]?.description;
  } else if (providerSeoDetails?.data?.activityTopicSeoDetails?.length === 1) {
    titleObject.description = `${t("topicDescription")} ${t("in")} ${
      providerSeoDetails?.data?.activityProvideSeoDetails[0]?.city
    }! ${t("topicDescription1")} ${providerSeoDetails?.data?.activityTopicSeoDetails[0]?.name}.`;
  } else if (providerSeoDetails?.data?.activityTopicSeoDetails?.length === 2) {
    titleObject.description = `${t("topicDescription")} ${t("in")} ${
      providerSeoDetails?.data?.activityProvideSeoDetails[0]?.city
    }! ${t("topicDescription1")} ${mapTopicDetail?.join(t("and"))}.`;
  } else if (
    providerSeoDetails?.data?.activityTopicSeoDetails?.length >= 3 &&
    providerSeoDetails?.data?.activityTopicSeoDetails?.length <= 6
  ) {
    titleObject.description = `${t("topicDescription")} ${t("in")} ${
      providerSeoDetails?.data?.activityProvideSeoDetails[0]?.city
    }! ${t("topicDescription1")} ${mapTopicDetail?.slice(0, mapTopicDetail?.length - 1).join(", ")} ${t("and")} ${
      mapTopicDetail[mapTopicDetail?.length - 1]
    }.`;
  } else if (mapTopicDetail) {
    titleObject.description = `${t("topicDescription1")} ${mapTopicDetail
      ?.slice(0, mapTopicDetail?.length - 1)
      ?.join(", ")} ${t("and")} ${mapTopicDetail[mapTopicDetail?.length - 1]}.`;
  }
  titleObject.metadataBase = new URL("https://holistickah.com/en/providers");
  const seoTemplate = SeoTemplate(titleObject);
  if (mapTopicDetail?.length < 10) {
    const mapSymptomDetails = providerSeoDetails?.data?.activitySymptomSeoDetails?.map(item => item.name);
    const sliceSymptomData = mapSymptomDetails?.slice(0, 10 - mapTopicDetail?.length - 1);
    mapTopicDetail = mapTopicDetail.concat(sliceSymptomData).join(", ");
  }
  return {
    ...seoTemplate,
    keywords: mapTopicDetail,
  };
}

const Page = async ({ params }) => {
  const { guid, locale } = params;

  return <ProviderDetailTemplate guid={guid} locale={locale} />;
};

export default Page;
