"use client";
import palette from "@/src/utils/theme/palette";
import { Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import { ArticleCardStyle, ArticlesColumnFull, OverflowStyle } from "../style/ArticleStyle";
import UserInfoListItem from "./UserInfoListItem";

const ListItemUserCard = props => {
  const [imageExists, setImageExists] = useState(true);
  const router = useRouter();
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
    href,
    imageUrl,
    tag,
    title,
    description,
    noImageText,
    bottomImageUrl,
    bottomImageTitle,
    bottomImageDescription,
  } = props;
  return (
    <>
      <Box
        display={{ xs: "block", sm: "block" }}
        width="100%"
        minHeight={{ xs: "176px", sm: "240px" }}
        maxHeight={{ xs: "176px", sm: "240px" }}
      >
        {imageUrl !== undefined && imageUrl !== "" && imageUrl !== null && imageExists ? (
          <CardMedia component="img" image={imageUrl ?? ""} alt="" sx={{ height: "100%" }} />
        ) : (
          <Box
            width="100%"
            height="100%"
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
      <ArticlesColumnFull>
        <div>
          {tag !== undefined && tag !== "" && tag !== null ? (
            <Typography variant="body2" mb={{ xs: 1 }} fontWeight={{ xs: 600 }} color={palette.text.green}>
              {tag}
            </Typography>
          ) : null}
          {title !== undefined && title !== "" && title !== null ? (
            <OverflowStyle
              datalines={2}
              variant="subtitle2"
              mb={{ xs: 1 }}
              fontSize="18px"
              fontWeight={{ sm: 500 }}
              color={palette.text.primary}
            >
              {title}
            </OverflowStyle>
          ) : null}
          {description !== undefined && description !== "" && description !== null ? (
            <OverflowStyle variant="body1" mb={{ xs: 1.5 }} color={palette.text.secondary} datalines={3}>
              {description}
            </OverflowStyle>
          ) : null}
        </div>
        <UserInfoListItem imageURL={bottomImageUrl} title={bottomImageTitle} description={bottomImageDescription} />
      </ArticlesColumnFull>
    </>
  );
};
export default ListItemUserCard;
