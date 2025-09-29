import { getHomePageDetail } from "@/src/api/home";
import { AboutUsTemplate } from "@/src/components";
import { AboutUsPageSeo, SeoTemplate } from "@/src/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("aboutUsModule");
  const { activityCategoryDetails } = await getHomePageDetail(params);
  const categoryKeywords = activityCategoryDetails?.map(category => category.name);
  const seoTemplate = SeoTemplate(AboutUsPageSeo());
  seoTemplate.title = t("seoTitle");
  seoTemplate.description = t("seoDescription");
  return {
    ...seoTemplate,
    keywords: categoryKeywords,
  };
}

const AboutUs = async () => {
  return <AboutUsTemplate />;
};
export default AboutUs;
