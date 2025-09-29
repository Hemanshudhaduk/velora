import { fetchData } from "@/src/api/holipedia";
import { HolipediaListTemplate } from "@/src/components";
import { HolipediaPageSeo, SeoTemplate } from "@/src/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("holipediaModule");
  const holipediaDetails = await fetchData(params, "", "");
  const holipediaKeywords = holipediaDetails?.activityTopics?.map(holipedia => holipedia.name).slice(0, 10);
  const seoTemplate = SeoTemplate(HolipediaPageSeo());
  seoTemplate.title = t("seoTitle");
  seoTemplate.description = t("seoDescription");
  return {
    ...seoTemplate,
    keywords: holipediaKeywords,
  };
}

async function Holipedia({ params }) {
  return (
    <>
      <HolipediaListTemplate params={params} />
    </>
  );
}

export default Holipedia;
