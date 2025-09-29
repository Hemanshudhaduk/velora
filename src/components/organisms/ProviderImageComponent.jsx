"use client";
import { mobileValidation } from "@/src/constants";
import { Box, Button, Grid, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ModalState } from "../atoms";
import { CustomImgStyle } from "../style";
import ImageDetailsDialog from "./ImageDetailsDialog";

const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
export const ProviderImageButtonStyle = styled(Button)({
    position: "absolute",
    right: "1.5rem",
    bottom: "1rem",

    "@media screen and (max-width:767px)": {
      right: "1.5rem",
      bottom: "1.5rem",
    
  },
});

const ProviderImageComponent = props => {
  const imageList = props.imageList?.slice(1);
  const [open, openImagePopUp, closeImagePopUp] = ModalState();
  const t = useTranslations();
  const [index, setIndex] = useState(0);

  return (
    <Box py={1} borderRadius={1} className="ImageComponent" position={'relative'}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          {imageList?.find(x => x.imageOrder === 2)?.imageURL === undefined ? (
            <Box
              width="100%"
              height={225}
              bgcolor="lightgray"
              display="flex"
              justifyContent="center"
              alignItems="center"
            />
          ) : (
            <CustomImgStyle
              src={`${BLOB_DOMAIN}/${imageList?.find(x => x.imageOrder === 2).imageURL}`}
              alt=""
              onClick={() => {
                openImagePopUp();
                setIndex(0);
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4} display={{xs:'none', sm:'block'}}>
          {imageList?.find(x => x.imageOrder === 3)?.imageURL === undefined ? (
            mobileValidation.test(navigator.userAgent) ? null : (
              <Box
                width="100%"
                height={225}
                bgcolor="lightgray"
                display="flex"
                justifyContent="center"
                alignItems="center"
              />
            )
          ) : (
            <CustomImgStyle
              src={`${BLOB_DOMAIN}/${imageList?.find(x => x.imageOrder === 3).imageURL}`}
              alt=""
              onClick={() => {
                openImagePopUp();
                setIndex(1);
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4} display={{xs:'none', sm:'block'}}>
          {imageList?.find(x => x.imageOrder === 4)?.imageURL === undefined ? (
            mobileValidation.test(navigator.userAgent) ? null : (
              <Box
                width="100%"
                height={225}
                bgcolor="lightgray"
                display="flex"
                justifyContent="center"
                alignItems="center"
              />
            )
          ) : (
            <CustomImgStyle
              src={`${BLOB_DOMAIN}/${imageList?.find(x => x.imageOrder === 4).imageURL}`}
              alt=""
              onClick={() => {
                openImagePopUp();
                setIndex(2);
              }}
            />
          )}
        </Grid>
      </Grid>
      {mobileValidation.test(navigator.userAgent) && imageList.length > 1 ? (
        <ProviderImageButtonStyle

          variant="outlined"
          onClick={() => {
            openImagePopUp();
            setIndex(1);
          }}
        >
          +{imageList.length - 1} {t("activityDetails.photos")}
        </ProviderImageButtonStyle>
      ) : null}

      <ImageDetailsDialog open={open} closeModal={closeImagePopUp} images={imageList} index={index ?? 0} />
    </Box>
  );
};
export default ProviderImageComponent;
