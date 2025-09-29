import palette from "@/src/utils/theme/palette";
import { Button as MuiButton, Typography as MuiTypography } from "@mui/material";
import { HomeStaticPartStyle } from "../style";

const HomeStaticPart = props => {
  const { title, subTitle, btnText, gap, href, imageUrl } = props;
  const subTitleVariant = href === "/activity" ? "subtitle1" : "body1";
  const titleVariant = href === "/aboutus" ? "h5" : "h1";

  return (
    <>
      <HomeStaticPartStyle gap={gap} imageUrl={imageUrl}>
        <MuiTypography component={"h1"} variant={titleVariant}>
          {title}
        </MuiTypography>
        <MuiTypography variant={subTitleVariant} color={palette.text.secondary}>
          {subTitle}
        </MuiTypography>
        <MuiButton
          href={href}
          variant="contained"
          color="primary"
          sx={{ width: { xs: titleVariant === "h5" ? "100%" : "auto", sm: "auto" } }}
        >
          {btnText}
        </MuiButton>
      </HomeStaticPartStyle>
    </>
  );
};

export default HomeStaticPart;
