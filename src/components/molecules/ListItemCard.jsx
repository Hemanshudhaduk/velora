"use client";
import palette from "@/src/utils/theme/palette";
import { CalendarTodayOutlined } from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActivityCardStyle, ContentBoxStyle, CustomImgStyle, ImageBoxStyle } from "../style";

const ListItemCard = props => {
  const route = useRouter();
  const [imageExists, setImageExists] = useState(true);

  useEffect(() => {
    const checkImageExists = async () => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          setImageExists(false);
        }
      } catch (error) {
        setImageExists(false);
      }
    };

    checkImageExists();
  }, []);
  const {
    imageUrl,
    title,
    calenderText,
    locationText,
    priceText,
    bottomRight,
    noImageText,
    style,
    divStyle,
    imgStyle,
  } = props;

  return (
    <>
      <ActivityCardStyle>
        {/* Left side: Image */}
        <Grid container display="flex" gap="20px" flexDirection={{ xs: "column", sm: "row" }} style={style}>
          <ImageBoxStyle
            maxWidth={style === undefined ? { xs: "100%", sm: "200px" } : "100%"}
            minWidth={style === undefined ? { xs: "100%", sm: "200px" } : "100%"}
            display={{ xs: "block", sm: "block" }}
            sx={divStyle}
          >
            {imageUrl !== undefined && imageUrl !== "" && imageUrl !== null && imageExists ? (
              <CustomImgStyle
                src={imageUrl ?? ""}
                priority={true}
                alt="Activity_Image_Holistikah"
                width={style === undefined ? 200 : undefined}
                height={style === undefined ? 164 : undefined}
                sx={imgStyle}
              />
            ) : (
              <Box
                sx={imgStyle}
                width={style === undefined ? { xs: "100%", sm: "200px" } : "100%"}
                height={"164px"}
                bgcolor="lightgray"
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="0.5rem"
                textAlign="center"
                borderRadius={2}
              >
                {noImageText}
              </Box>
            )}
          </ImageBoxStyle>
          {/* Right side: Text and Buttons */}
          <ContentBoxStyle maxWidth={"100%"}>
            {title !== undefined && title !== "" && title !== null ? (
              <Typography
                variant="subtitle2"
                mb={2}
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.125rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              >
                {title}
              </Typography>
            ) : null}
            {calenderText !== undefined && calenderText !== "" && calenderText !== null ? (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <CalendarTodayOutlined color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                  color={palette.text.secondary}
                >
                  {calenderText}
                </Typography>
              </Box>
            ) : null}
            {locationText !== undefined && locationText !== "" && locationText !== null ? (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocationOnOutlinedIcon color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                  color={palette.text.secondary}
                >
                  {locationText}
                </Typography>
              </Box>
            ) : null}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap={{ xs: "wrap", sm: "nowrap" }}
              mt={2}
              minHeight={48}
            >
              <Typography
                variant="h6"
                lineHeight={1.33}
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {priceText !== undefined && priceText !== "" && priceText !== null ? priceText : null}
              </Typography>
              {bottomRight.map((params, i) =>
                params.variant === "view" ? (
                      <Button variant="outlined" color="primary" key={i} onClick={() => route.push(params.reference)}>
                    {params.label}
                  </Button>
                ) : null
              )}
            </Box>
          </ContentBoxStyle>
        </Grid>
      </ActivityCardStyle>
    </>
  );
};

export default ListItemCard;
