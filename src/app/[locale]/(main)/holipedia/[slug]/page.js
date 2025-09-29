import { fetchData, fetchTopicDetailsData } from "@/src/api/holipedia";
import { HolipediaArticle } from "@/src/components";
import { HolipediaDetailsPageSeo, SeoTemplate } from "@/src/seo";

export async function generateMetadata({ params }) {
  const holipediaDetails = await fetchData(params, "", "");
  const topicDetails = await fetchTopicDetailsData(params);
  const holipediaKeywords = holipediaDetails?.activityTopics?.map(holipedia => holipedia.name).slice(0, 10);
  const match = /<p>(.*?)<\/p>/i.exec(topicDetails?.activityTopicDetails[0]?.about);
  const firstParagraphContent = match ? match[1] : null;
  const descriptionContent = firstParagraphContent?.replace(/<\/?[^>]+(>|$)/g, "");
  const getMetaData = HolipediaDetailsPageSeo();
  getMetaData.description = descriptionContent;
  getMetaData.title = `HOLISTIKAH | ${topicDetails?.activityTopicDetails[0].topicTitle}`;
  const seoTemplate = SeoTemplate(getMetaData);
  return {
    ...seoTemplate,
    keywords: holipediaKeywords,
  };
}

export default async function Page({ params }) {
  const topicDetailsDataPromise = await fetchTopicDetailsData(params);
  return <HolipediaArticle holipediaDetailsData={topicDetailsDataPromise} />;
}
