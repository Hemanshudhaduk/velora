import { getSubscriptionProductWithAddOn } from "@/src/api/practitioner";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import PractitionerPricingSection from "../organisms/PractitionerPricingSection";
import { ContainerStyle, PractitionersPricingSecStyle } from "../style";

const PractitionerTemplate = async props => {
  const t = useTranslations();
  const savedData = {
    languageCode: props.languageCode,
    currencyCode: t("languageCode") === "en" ? "eur" : "sek",
  };
  const subscriptionProductPricing = await getSubscriptionProductWithAddOn(savedData);
  return (
    <PractitionersPricingSecStyle>
      <ContainerStyle>
        <Typography variant="h5" mb={{ xs: 4, sm: 8 }} textAlign="center">
          {t("practitionersModule.pricing.title")}
        </Typography>
        <PractitionerPricingSection
          languageCode={props.languageCode}
          practitionersPricingList={subscriptionProductPricing?.data ?? []}
        />
      </ContainerStyle>
    </PractitionersPricingSecStyle>
  );
};
export default PractitionerTemplate;
