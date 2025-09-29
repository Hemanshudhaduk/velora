"use client";
import palette from "@/src/utils/theme/palette";
import { Typography, styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { ContainerStyle, CustomImgStyle, SectionStyle } from "../style";

function CustomCarousel({ customerReviews }) {
  const CustomerReviewSecStyle = styled(SectionStyle)(() => ({
    backgroundColor: palette.background.secondary,
  }));

  return (
    <CustomerReviewSecStyle>
      <ContainerStyle>
        <Carousel animation="slide" navButtonsAlwaysInvisible stopAutoPlayOnHover duration={800}>
          {customerReviews?.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Carousel>
      </ContainerStyle>
    </CustomerReviewSecStyle>
  );
}
function Item(props) {
  const CustomerReviewContentStyle = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "128px",

    "& img": {
      borderRadius: "16px",
      maxWidth: "328px",
      maxHeight: "328px",
      objectFit: "cover",
      width: "35% !important",
    },

    "& #carouselContent": {
      width: "65%",
    },

    "@media screen and (max-width:1199px)": {
      gap: "96px",

      "& img": {
        maxWidth: "328px",
        maxHeight: "328px",
        width: "30% !important",
      },

      "& #carouselContent": {
        width: "70%",

        "& .MuiTypography-h5": {
          fontSize: "1.375rem",
          lineHeight: 1.75,
        },
      },
    },

    "@media screen and (max-width:991px)": {
      gap: "48px",

      "& #carouselContent": {
        "& .MuiTypography-h5": {
          fontSize: "1.125rem",
          lineHeight: 1.5,
        },
      },
    },

    "@media screen and (max-width:767px)": {
      flexWrap: "wrap",
      gap: "64px",

      "& img": {
        width: "100% !important",
        maxWidth: "256px",
        maxHeight: "256px",
        margin: "auto",
      },

      "& #carouselContent": {
        width: "100%",
      },
    },
  }));

  return (
    <CustomerReviewContentStyle>
      <CustomImgStyle src={props.item.imageUrl} alt={props.item.name} fill={true} />
      <div id="carouselContent">
        <Typography variant="h5" fontWeight={600} mb={{ xs: 2, sm: 4 }}>
          {props.item.feedback}
        </Typography>
        <Typography variant="subtitle2" fontWeight={500} color={palette.text.primary}>
          {props.item.name}
        </Typography>
        <Typography variant="body1" color={palette.text.secondary}>
          {props.item.designation}
        </Typography>
      </div>
    </CustomerReviewContentStyle>
  );
}

export default CustomCarousel;
