import { fetchData } from "@/src/api/symptoms";
import { ProductListTemplate } from "@/src/components";
import { SymptomsImages } from "@/src/constants";
import { SeoTemplate, SymptomsPageSeo } from "@/src/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations("symptomsModule");
  const symptomsDetails = await fetchData(params);
  const symptomsKeywords = symptomsDetails?.activitySymptoms?.map(symptom => symptom.name);
  const seoTemplate = SeoTemplate(SymptomsPageSeo());
  seoTemplate.title = t("seoTitle");
  seoTemplate.description = t("seoDescription");
  return {
    ...seoTemplate,
    keywords: symptomsKeywords,
  };
}

async function Symptoms({ params }) {
  const t = await getTranslations();
  const { locale } = params;
  const symptomListDataPromise = await fetchData(params);
  const updatedSymptomList = symptomListDataPromise?.activitySymptomListWithLocalizationDTOs?.map(item => {
    return {
      unqGUID: item.unqGUID,
      name: item.name,
      titleName: item.symptomTitle,
      redirectTo: `/activity?symptoms=${item.unqGUID}`,
    };
  });
  const symptomData = {
    bannerSrc: SymptomsImages?.url,
    bannerAlt: "logo",
    title: t("symptomsModule.title"),
    description: t("symptomsModule.descriptions"),
    ItemList: updatedSymptomList,
  };
  return <ProductListTemplate data={symptomData} language={locale} />;
}

export default Symptoms;
