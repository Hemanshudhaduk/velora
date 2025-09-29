import palette from "@/src/utils/theme/palette";
import { Typography } from "@mui/material";
import { CoFounderDetailsStyle, CustomImgStyle } from "../style";
function CoFounderDetails(props) {
  const { src, name, designation, description, linkedInUrl } = props;
  const blobUrl = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
  return (
    <CoFounderDetailsStyle>
      <CustomImgStyle src={src} alt="userImage" />
      <Typography variant="subtitle2" fontWeight={500} mt={2.5} mb={0} color={palette.text.primary}>
        {name}
      </Typography>
      <Typography variant="body1" mb={1} color={palette.background.tagSelected}>
        {designation}
      </Typography>
      <Typography variant="body1" mb={2} color={palette.text.secondary}>
        {description}
      </Typography>
      <CustomImgStyle src={`${blobUrl}/Holistikah/Logo/LinkedinLogo.png`} alt={"linkedIn"} redirectTo={linkedInUrl} />
    </CoFounderDetailsStyle>
  );
}

export default CoFounderDetails;
