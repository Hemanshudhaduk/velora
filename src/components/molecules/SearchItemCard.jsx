"use client"
  
import palette from "@/src/utils/theme/palette";
import { CalendarTodayOutlined } from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Typography } from "@mui/material";
import { ContentBoxStyle, SearchActivityCardStyle } from "../style";

const SearchItemCard = props => {
  const { title, calenderText, locationText, itemEvent } = props;

  return (
    <SearchActivityCardStyle onClick={itemEvent} sx={{ marginBottom: "0.5rem", cursor: "pointer" }}>
      <ContentBoxStyle display="flex" flexDirection="column" gap={1} justifyContent="space-between">
        {title !== undefined && title !== "" && title !== null ? (
          <Typography variant="body1">{title}</Typography>
        ) : null}
        {calenderText !== undefined && calenderText !== "" && calenderText !== null ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarTodayOutlined color="secondary" sx={{ fontSize: "1rem" }} />
            <Typography variant="body2" color={palette.text.secondary}>
              {calenderText}
            </Typography>
          </Box>
        ) : null}
        {locationText !== undefined && locationText !== "" && locationText !== null ? (
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnOutlinedIcon color="secondary" sx={{ fontSize: "1rem" }} />
            <Typography variant="body2" color={palette.text.secondary}>
              {locationText}
            </Typography>
          </Box>
        ) : null}
      </ContentBoxStyle>
    </SearchActivityCardStyle>
  );
};

export default SearchItemCard;
