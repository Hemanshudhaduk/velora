"use client";
import { mobileValidation } from "@/src/constants";
import { Box, Button, Grid, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ModalState } from "../atoms";
import { CustomImgStyle } from "../style";
import ImageDetailsDialog from "./ImageDetailsDialog";

export const ActivityImageComponentStyle = styled(Box)({
  position: "relative",

  "& img": {
    cursor: "pointer",
  },

  "& .cm-main-img": {
    height: "100%",
    borderRadius: "8px 0 0 8px",
    overflow: "hidden",
    "@media screen and (max-width:767px)": {
      borderRadius: "8px",
    },
  },

  "& .cm-img-list": {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    gap: "0.5rem",
    height: "100%",
    borderRadius: "0 8px 8px 0",
    overflow: "hidden",

    "& li": {
      maxHeight: "calc(50% - 4px)",
      width: "100%",
      maxWidth: "calc(50% - 4px)",
      height: "100%",
    },
  },

  "& .cm-more-btn": {
    position: "absolute",
    right: "1.5rem",
    bottom: "1rem",

    "@media screen and (max-width:767px)": {
      right: "1.5rem",
      bottom: "1.5rem",
    },
  },
});

const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

const ActivityImageComponent = props => {
  const { imageList } = props;
  const [open, openImagePopUp, closeImagePopUp] = ModalState();
  const t = useTranslations();
  const [index, setIndex] = useState(0);

  return (
    <ActivityImageComponentStyle>
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} sm={6} sx={{ height: "339px" }}>
          <div className="cm-main-img">
            {imageList.find(x => x.imageOrder === 1)?.imageURL === undefined ? (
              <Box width="100%" height="100%" bgcolor="lightgray" />
            ) : (
              <CustomImgStyle
                src={`${BLOB_DOMAIN}/${imageList.find(x => x.imageOrder === 1).imageURL}`}
                alt=""
                onClick={() => {
                  openImagePopUp();
                  setIndex(0);
                }}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ height: "339px" }} display={{ xs: "none", sm: "block" }}>
          <ul className="cm-img-list">
            <li>
              {imageList.find(x => x.imageOrder === 2)?.imageURL === undefined ? (
                <Box width="100%" height="100%" bgcolor="lightgray" />
              ) : (
                <CustomImgStyle
                  src={`${BLOB_DOMAIN}/${imageList.find(x => x.imageOrder === 2).imageURL}`}
                  alt=""
                  onClick={() => {
                    openImagePopUp();
                    setIndex(1);
                  }}
                />
              )}
            </li>
            <li>
              {imageList.find(x => x.imageOrder === 3)?.imageURL === undefined ? (
                <Box width="100%" height="100%" bgcolor="lightgray" />
              ) : (
                <CustomImgStyle
                  src={`${BLOB_DOMAIN}/${imageList.find(x => x.imageOrder === 3).imageURL}`}
                  alt=""
                  onClick={() => {
                    openImagePopUp();
                    setIndex(2);
                  }}
                />
              )}
            </li>
            <li>
              {imageList.find(x => x.imageOrder === 4)?.imageURL === undefined ? (
                <Box width="100%" height="100%" bgcolor="lightgray" />
              ) : (
                <CustomImgStyle
                  src={`${BLOB_DOMAIN}/${imageList.find(x => x.imageOrder === 4).imageURL}`}
                  alt=""
                  onClick={() => {
                    openImagePopUp();
                    setIndex(3);
                  }}
                />
              )}
            </li>
            <li>
              {imageList.find(x => x.imageOrder === 5)?.imageURL === undefined ? (
                <Box width="100%" height="100%" bgcolor="lightgray" />
              ) : (
                <CustomImgStyle
                  src={`${BLOB_DOMAIN}/${imageList.find(x => x.imageOrder === 5).imageURL}`}
                  alt=""
                  onClick={() => {
                    openImagePopUp();
                    setIndex(4);
                  }}
                />
              )}
            </li>
          </ul>
        </Grid>
      </Grid>
      {!mobileValidation.test(navigator.userAgent) && imageList.length > 5 ? (
        <Button
          className="cm-more-btn"
          variant="outlined"
          onClick={() => {
            openImagePopUp();
            setIndex(5);
          }}
        >
          +{imageList.length - 5} {t("activityDetails.photos")}
        </Button>
      ) : mobileValidation.test(navigator.userAgent) && imageList.length > 1 ? (
        <Button
          className="cm-more-btn"
          variant="outlined"
          onClick={() => {
            openImagePopUp();
            setIndex(1);
          }}
        >
          +{imageList.length - 1} {t("activityDetails.photos")}
        </Button>
      ) : null}

      <ImageDetailsDialog open={open} closeModal={closeImagePopUp} images={imageList} index={index} />
    </ActivityImageComponentStyle>
  );
};
export default ActivityImageComponent;
