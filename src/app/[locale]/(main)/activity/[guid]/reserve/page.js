import { getActivityWithNextAvailability } from "@/src/api/bookService";
import { BookServiceTemplate } from "@/src/components";
import "@/src/utils/momentLocale";
import { notFound } from "next/navigation";

async function BookService({ params }) {
  const { guid } = params;
  const response = await getActivityWithNextAvailability({ guid: guid });
  if (response?.status === "NotFound") {
    return notFound();
  }
  // return <BookServiceTemplate guid={guid} activityDetails={response?.data} />;
}
export default BookService;
