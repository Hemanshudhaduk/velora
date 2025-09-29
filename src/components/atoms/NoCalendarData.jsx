import palette from "@/src/utils/theme/palette";
import { Box, Typography } from "@mui/material";

const NoCalendarData = props => {
  const { t, number } = props;
  return (
    <Box p={4} textAlign="center" bgcolor={palette.background.secondary}>
      <Typography variant="caption" color={palette.text.secondary} fontWeight={500}>
        {number <= 1 ? t("bookService.noSlotsForSingleStaff") : t("bookService.noSlotsForMultipleStaff")}
      </Typography>
    </Box>
  );
};
export default NoCalendarData;
