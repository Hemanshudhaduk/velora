import { getEventBookingSummary } from "@/src/api/activity";
import { Summary } from "@/src/components";
import { ContainerStyle, SummarySectionStyle } from "@/src/components/style";
import "@/src/utils/momentLocale";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const bookingGuid = params.bookingGuid;
  const response = await getEventBookingSummary(bookingGuid);
  if (response?.status === "NotFound") return notFound();
  return (
    <SummarySectionStyle>
      <ContainerStyle>
        <Summary
          eventBookingSummary={response?.data}
          page="eventSummary"
          bookingGuid={bookingGuid}
          locale={params.locale}
        />
      </ContainerStyle>
    </SummarySectionStyle>
  );
};

export default page;
