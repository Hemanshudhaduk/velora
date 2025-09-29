import palette from "@/src/utils/theme/palette";
import { Box, Typography } from "@mui/material";
import { ReadMore } from "../organisms";

const Section = props => {
  const { sectionDescription, sectionTitle, readMore } = props;
  return (
    <Box mt={3} pb={3}>
      <Typography variant="h6" mb={3}>
        {sectionTitle}
      </Typography>
      {readMore?.isReadMore ? (
        <ReadMore {...readMore} />
      ) : (
        <Typography variant="body1" color={palette.text.secondary} sx={{ whiteSpace: "pre-wrap" }}>
          {sectionDescription}
        </Typography>
      )}
    </Box>
  );
};

export default Section;
