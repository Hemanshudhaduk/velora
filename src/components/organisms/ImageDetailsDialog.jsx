"use client"

import { Circle, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { CustomImgStyle } from "../style";
import { ImageModalStyle } from "../style/ImageModalStyle";

const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

export default function ImageDetailsDialog({ open, closeModal, images, index }) {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    closeModal();
  };

  return (
    <ImageModalStyle open={open} onClose={handleClose} fullWidth className="cm-image-modal">
      <IconButton onClick={handleClose} disableRipple id="close-btn">
        <Close />
      </IconButton>
      <Carousel
        slidesToScroll
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        indicatorContainerProps={{ className: "cm-indicator-wrapper" }}
        indicatorIcon={<Circle />}
        activeIndicatorIconButtonProps={{ className: "cm-active" }}
        index={index ?? 0}
        changeOnFirstRender
        className="cm-carousel-wrapper"
      >
        {images?.map((image, index) => (
          <CustomImgStyle
            key={index}
            src={`${BLOB_DOMAIN}/${image.imageURL}`}
            alt={""}
            style={{ width: "100%", height: "100%", maxWidth: "100%" }}
          />
        ))}
      </Carousel>
    </ImageModalStyle>
  );
}
