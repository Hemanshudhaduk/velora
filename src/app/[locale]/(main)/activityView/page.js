import { SavePageTemplate } from "@/src/components";
import { ContainerStyle } from "@/src/components/style";

export default async function Page({ params }) {
  const { locale } = params;
  return (
    <ContainerStyle>
      <SavePageTemplate page="activityPage" locale={locale} />
    </ContainerStyle>
  );
}
