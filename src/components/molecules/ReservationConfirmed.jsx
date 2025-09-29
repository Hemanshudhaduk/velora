import { Grid, Button as MuiButton, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReservationConfirmedStyle } from "../style/ConfirmedPageStyle";

function ReservationConfirmed() {
  const homePage = "/";
  const t = useTranslations();

  return (
    <ReservationConfirmedStyle>
      <Grid container spacing={{ xs: 2, sm: 4, md: 6, lg: 8 }}>
        <Grid item xs={12} sm={9}>
          <Typography variant="h4" style={{ paddingBottom: "32px", paddingTop: "32px", paddingLeft: "27rem" }}>
            {t("reservationConfirmed.confirmationLabel")}
          </Typography>
          <Typography variant="subtitle1" style={{ paddingBottom: "10px", paddingTop: "-7px", paddingLeft: "31rem" }}>
            {t("reservationConfirmed.activitiesName1")}
          </Typography>
          <Typography variant="subtitle1" style={{ paddingBottom: "59px", paddingTop: "-2rem", paddingLeft: "27rem" }}>
            {t("reservationConfirmed.activitiesName2")}
          </Typography>
          <Grid item lg={12} xs={12} sm={11} textAlign="center">
            <MuiButton href={homePage} variant="outlined">
              {t("reservationConfirmed.backToHome")}
            </MuiButton>
            <MuiButton variant="contained" color="primary">
              {t("reservationConfirmed.ViewComingActivities")}
            </MuiButton>
          </Grid>
        </Grid>
      </Grid>
    </ReservationConfirmedStyle>
  );
}
export default ReservationConfirmed;
