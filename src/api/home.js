import { API, EndPoint } from "@/src/utils/common";
import { getArticlesList } from "./contentFullApi";

export async function getHomePageDetail(params) {
  const { locale } = params;
  try {
    const response = await API.get(`${EndPoint.homeModule.getHomePageDetail}?languageCode=${locale}`);

    // const articles = await getArticlesList({ locale: locale, rowsPerPage: 4, pageNumber: 0 });
    // response.data.articles = articles.items;
    return response.data;
  } catch (error) {
    return { activityCategoryDetails: [] };
  }
}
