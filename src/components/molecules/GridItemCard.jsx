"use client";
import { authorLink } from "@/src/constants";
import palette from "@/src/utils/theme/palette";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthorLinkStyle, AuthorsLinksInner, ProviderCardStyle } from "../style";

const GridItemCard = props => {
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

  const { imageUrl, title, locationText, bottomRight, noImageText, page } = props;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <ProviderCardStyle>
        <Box
          display={{ xs: "block", sm: "block" }}
          width="100%"
          maxWidth="164px"
          maxHeight="164px"
          sx={{ aspectRatio: "1 / 1" }}
        >
          {imageUrl !== undefined && imageUrl !== "" && imageUrl !== null && imageExists ? (
            <CardMedia component="img" image={imageUrl ?? ""} alt="" />
          ) : (
            <Box
              width={150}
              height={150}
              borderRadius={100}
              bgcolor="lightgray"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              margin="auto"
              padding="0.5rem"
              textAlign="center"
            >
              {noImageText}
            </Box>
          )}
        </Box>
        <CardContent>
          {title !== undefined && title !== "" && title !== null ? (
            <Typography
              variant="subtitle2"
              mb={{ xs: 0.5 }}
              fontSize={{ xs: "1rem", sm: "1.125rem" }}
              fontWeight={{ xs: 500 }}
              textAlign={{ xs: "center" }}
              color={palette.text.primary}
            >
              {title}
            </Typography>
          ) : null}
          {locationText !== undefined && locationText !== "" && locationText !== null ? (
            <Box
              display="grid"
              alignItems="flex-start"
              justifyContent={{ sm: "center" }}
              gap={1}
              gridTemplateColumns={"auto auto"}
            >
              {page === "providers" && (
                <>
                  <LocationOnOutlinedIcon />
                  <Typography
                    variant="caption"
                    fontSize={{ xs: "0.875rem", sm: "0.75rem" }}
                    fontWeight={{ sm: 500 }}
                    sx={{
                      overflow: "Hidden",
                      whiteSpace: "nowrap",
                      display: "block",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {locationText}
                  </Typography>
                </>
              )}
              {page === "authors" && (
                <a href={locationText} target="_blank" style={{ textDecoration: "none" }}>
                  <AuthorsLinksInner>
                    <AuthorLinkStyle
                      src={`${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}${authorLink}`}
                      alt={"link"}
                      fill={true}
                    />
                    <Typography
                      sx={{
                        overflow: "Hidden",
                        whiteSpace: "nowrap",
                        display: "block",
                        textOverflow: "ellipsis",
                        lineHeight: "1.8",
                      }}
                      variant="caption"
                      fontSize={{ xs: "0.875rem", sm: "0.75rem" }}
                      fontWeight={{ sm: 500 }}
                    >
                      {locationText}
                    </Typography>
                  </AuthorsLinksInner>
                </a>
              )}
            </Box>
          ) : null}
        </CardContent>
        <CardActions>
          {bottomRight.map((params, i) =>
            params.variant === "view" ? (
              <Button variant="outlined" color="primary" fullWidth key={i} onClick={() => route.push(params.reference)}>
                {params.label}
              </Button>
            ) : null
          )}
        </CardActions>
      </ProviderCardStyle>
    </Grid>
  );
};

export default GridItemCard;
