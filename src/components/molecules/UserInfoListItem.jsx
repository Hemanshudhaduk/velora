"use client";
import palette from "@/src/utils/theme/palette";
import { AccountCircle } from "@mui/icons-material";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StaffCardStyle } from "../style";
const UserInfoListItem = params => {
  const { imageURL, title, description } = params;

  const [imageExists, setImageExists] = useState(true);

  useEffect(() => {
    const checkImageExists = async () => {
      try {
        const response = await fetch(imageURL);
        if (!response.ok) {
          setImageExists(false);
        }
      } catch (error) {
        setImageExists(false);
      }
    };

    checkImageExists();
  }, []);

  return (
    <StaffCardStyle>
      {imageURL !== undefined && imageURL !== "" && imageURL !== null && imageExists ? (
        <CardMedia src={imageURL} component="img" alt={title} />
      ) : (
        <AccountCircle />
      )}
      <CardContent sx={{ paddingBottom: "0px !important" }}>
        <Typography variant="body2" mb={0.5} color={palette.text.primary} fontWeight={800}>
          {title}
        </Typography>
        <Typography variant="body2" color={"#475467"}>
          {description}
        </Typography>
      </CardContent>
    </StaffCardStyle>
  );
};
export default UserInfoListItem;
