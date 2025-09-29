import { getActivityDetailForSummary } from "@/src/api/bookService";
import { SummaryTemplate } from "@/src/components";

const page = async ({ params }) => {
  const { guid } = params;
  const response = await getActivityDetailForSummary({ guid: guid });
  if (response?.status === "NotFound") {
    return notFound();
  }
  return <SummaryTemplate locale={params.locale} activityDetail={response?.data} />;
};
export default page;
