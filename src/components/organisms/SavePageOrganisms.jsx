import { Typography } from "@mui/material";

const SavePageOrganisms = props => {
  const { t } = props;
  return (
    <div>
      <Typography variant="h4" style={{ paddingBottom: "32px", paddingTop: "32px" }} justifyContent="space-between">
        {t("saved.savedLabel")}
      </Typography>
    </div>
  );
};

export default SavePageOrganisms;
