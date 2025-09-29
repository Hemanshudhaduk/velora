import { Card, CardHeader, Grid } from "@mui/material";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { OpenNewTabButton } from "../atoms";
import { PractitionerPricingGrid } from "../molecules";

function PractitionerPricingSection({ practitionersPricingList, languageCode }) {
  const t = useTranslations();
  return (
    <Grid container spacing={4} mb={4}>
      {_.map(
        _.filter(practitionersPricingList, item => item.productType === "SubscriptionPlan"),
        item => (
          <PractitionerPricingGrid
            key={item.id}
            addOns={_.filter(practitionersPricingList, item => item.productType === "AddOn")}
            languageCode={languageCode}
            item={item}
          />
        )
      )}
      <Grid item xs={12} sm={6} md={12}>
        <Card>
          <CardHeader
            action={
              <OpenNewTabButton
                url={`${process.env.NEXT_PUBLIC_SIGNUP_URL}/sign-up`}
                buttonName={t("practitionersModule.pricing.getStarted")}
              />
            }
            title={t("practitionersModule.pricing.start30DaysTrial")}
            subheader={t("practitionersModule.pricing.start30DaysTrialDescriptions")}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default PractitionerPricingSection;
