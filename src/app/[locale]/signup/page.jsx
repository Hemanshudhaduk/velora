import { getHomePageDetail } from "@/src/api/home";
import { CustomerSignUp } from "@/src/api/user";
import { SignUpTemplate } from "@/src/components";
import { SeoTemplate, SignUpPageSeo } from "@/src/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("signUp");
  const { activityCategoryDetails } = await getHomePageDetail(params);
  const categoryKeywords = activityCategoryDetails?.map(category => category.name);
  const seoTemplate = SeoTemplate(SignUpPageSeo());
  seoTemplate.title = t("seoTitle");
  seoTemplate.description = t("seoDescription");
  return {
    ...seoTemplate,
    keywords: categoryKeywords,
  };
}

async function page() {
  const apiCalling = async formData => {
    "use server";
    const response = await CustomerSignUp(formData);
    return response;
  };

  return <SignUpTemplate apiCalling={apiCalling} />;
}

export default page;
