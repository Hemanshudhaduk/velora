import palette from "@/src/utils/theme/palette";
import { Box, Typography } from "@mui/material";

function TitleContentUnit({ title, content1, content2 }) {
  return (
    <Box mt={3} mb={3}>
      {title && (
        <Typography color={palette.text.primary} variant="h6" mb={2}>
          {title}
        </Typography>
      )}
      {content1 && (
        <Typography variant="body1" color={palette.text.secondary}>
          {content1}
        </Typography>
      )}
      {content2 && (
        <Typography variant="body1" color={palette.text.secondary} mt={0.5}>
          {content2}
        </Typography>
      )}
    </Box>
  );
}

export default TitleContentUnit;
