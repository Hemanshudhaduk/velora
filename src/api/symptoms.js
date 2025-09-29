import { API, EndPoint } from "@/src/utils/common";

export async function fetchData(params) {
  const { locale } = params;
  try {
    const response = await API.get(`${EndPoint.symptomModule.getSymptomList}?languageCode=${locale}`);
    return response.data;
  } catch (error) {
    return null;
  }
}
