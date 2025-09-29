import { useTranslations } from "next-intl";
import { CustomText } from "../atoms";
import { SummaryForm } from "../organisms";
import { ContainerStyle, SummarySectionStyle } from "../style";

function SummaryTemplate({ locale, activityDetail }) {
  const t = useTranslations();
  return (
    <SummarySectionStyle>
      <ContainerStyle>
        <CustomText variant="h5" fontSize={{ xs: 24, sm: 30 }} disc={t("summary.header")} />
        <SummaryForm locale={locale} activityDetail={activityDetail} />
      </ContainerStyle>
    </SummarySectionStyle>
  );
}
export default SummaryTemplate;
