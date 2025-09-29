import { API, EndPoint } from "@/src/utils/common";

export async function fetchData(params, topicValue, symptomValue) {
  const { locale } = params;
  try {
    const response = await API.get(
      `${EndPoint.holipediaModule.getTopicList}?languageCode=${locale}&topicText=${topicValue}&symptomText=${symptomValue}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function fetchTopicDetailsData(params) {
  const { locale, slug } = params;
  try {
    const response = await API.get(
      `${EndPoint.holipediaModule.getTopicDetails}?languageCode=${locale}&TopicGUID=${slug}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
