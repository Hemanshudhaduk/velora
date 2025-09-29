import { alwaysIncluded } from "@/src/constants/commonValues";
import { getCurrencyFormatWithLanguage } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import _ from "lodash";
import { useTranslations } from "next-intl";
import CustomListItem from "./CustomListItem";

const PractitionerPricingGrid = ({ item, addOns, languageCode }) => {
  const t = useTranslations();
  return (
    <Grid key={item.id} item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} color={palette.text.secondary} mb={0.5}>
            {item.name}
          </Typography>
          <Typography variant="body1" mb={2}>
            {item.description}
          </Typography>
          <Typography variant="h5" mb={2}>
            {getCurrencyFormatWithLanguage(item.priceCurrency, item.unitAmount, languageCode)} /{" "}
            {item.interval === "day"
              ? t("practitionersModule.pricing.packagePlan.day")
              : t("practitionersModule.pricing.packagePlan.month")}
          </Typography>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemText
                primary={t("practitionersModule.pricing.packagePlan.duration")}
                primaryTypographyProps={{
                  color: palette.text.secondary,
                }}
              />
              <Typography variant="body1" fontWeight="500">
                {isNaN(parseInt(item.metadata.MaxDuration))
                  ? t("practitionersModule.pricing.packagePlan.unlimited")
                  : `${item.metadata.MaxDuration}${
                      _.toLower(item.metadata.MaxDurationUnit) === "h"
                        ? t("practitionersModule.pricing.packagePlan.hour")
                        : t("practitionersModule.pricing.packagePlan.min")
                    }`}
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={t("practitionersModule.pricing.packagePlan.attendance")}
                primaryTypographyProps={{
                  color: palette.text.secondary,
                }}
              />
              <Typography variant="body1" fontWeight="500">
                {isNaN(parseInt(item.metadata.MaxNoOfAttendees))
                  ? t("practitionersModule.pricing.packagePlan.unlimited")
                  : `${item.metadata.MaxNoOfAttendees}`}
              </Typography>
            </ListItem>
          </List>
        </CardContent>
        <CardContent>
          <Typography variant="body1" fontWeight={600} mb={{ xs: 2, sm: 3 }}>
            {t("practitionersModule.pricing.packagePlan.alwaysIncluded")}
          </Typography>
          <List disablePadding>
            {_.map(alwaysIncluded, (item, index) => (
              <CustomListItem key={item.titleTranslationKey} title={t(item.titleTranslationKey)} />
            ))}
          </List>
        </CardContent>
        <CardContent>
          <Typography variant="body1" fontWeight={600} mb={{ xs: 2, sm: 3 }}>
            {t("practitionersModule.pricing.packagePlan.optional")}
          </Typography>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemText
                primary={t("practitionersModule.pricing.packagePlan.onlinePayment")}
                primaryTypographyProps={{
                  color: palette.text.secondary,
                }}
              />
              <Typography variant="body1" fontWeight={500}>
                {t("practitionersModule.pricing.packagePlan.onlinePaymentValue")}
              </Typography>
            </ListItem>
            {_.map(addOns, addOn => (
              <ListItem key={addOn.name} disablePadding>
                <ListItemText
                  primary={addOn.name}
                  primaryTypographyProps={{
                    color: palette.text.secondary,
                  }}
                />
                <Typography variant="body1" fontWeight={500}>
                  {getCurrencyFormatWithLanguage(addOn.priceCurrency, addOn.unitAmount, languageCode)} /
                  {addOn.productId === "6"
                    ? " SMS"
                    : ` ${
                        item.interval === "day"
                          ? t("practitionersModule.pricing.packagePlan.day")
                          : t("practitionersModule.pricing.packagePlan.mon")
                      }`}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PractitionerPricingGrid;
