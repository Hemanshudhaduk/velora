import { getHomePageDetail } from "@/src/api/home";
import { DefaultLanguage, HomeTemplate } from "@/src/components";
import { HomepageSeo, SeoTemplate } from "@/src/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("home");
  const { activityCategoryDetails } = await getHomePageDetail(params);
  const categoryKeywords = activityCategoryDetails?.map(category => category.name);
  const seoTemplate = SeoTemplate(HomepageSeo());
  seoTemplate.title = t("seoTitle");
  seoTemplate.description = t("seoDescription");
  return {
    ...seoTemplate,
    keywords: categoryKeywords,
  };
}

export default async function Page({ params }) {
  // await getServerSideProps(NextRequest);
  const homeDataPromise = await getHomePageDetail(params);
  return (
    <>
      <DefaultLanguage />
      <HomeTemplate data={homeDataPromise} />
    </>
  );
}
