import { Avatar, Checkbox, Chip, Typography } from "@mui/material";
import { PractitionerCheckboxStyle } from "../style";
const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

const StaffSelectionCheckBox = params => {
  const { t, data, onChangeAdditionalStaff } = params;
  return (
    <PractitionerCheckboxStyle
      key={data.isChecked}
      control={<Checkbox checked={data.isChecked} disabled={data.isMandatory} />}
      labelPlacement="start"
      onChange={e => onChangeAdditionalStaff(e, data)}
      label={
        <>
          <Avatar sx={{ width: 48, height: 48 }} src={`${BLOB_DOMAIN}/${data.imageURL}`} />
          <Typography variant="body1" fontWeight={500}>
            {data.resourceName} {data.isMandatory && <Chip label={t("mandatory")} />}
          </Typography>
          <fieldset></fieldset>
        </>
      }
      classes={{ label: "checkbox-label" }}
    />
  );
};
export default StaffSelectionCheckBox;
