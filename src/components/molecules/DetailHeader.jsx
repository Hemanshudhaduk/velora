"use client";
import { selectUserDetail } from "@/src/lib/slice/userSlice";
import { redirectToSignIn } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { LocationOnOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button as MuiButton, Typography as MuiTypography } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ProviderProfileImgStyle } from "../style";

function DetailHeader(props) {
  const {
    activityPage = false,
    title,
    subTitle,
    logoLink = null,
    onSaveHandler,
    companyUnqGUID,
    activityUnqGUID,
    isSaved,
  } = props;
  const t = useTranslations();
  const route = useRouter();
  const pathname = usePathname();
  const userDetails = useSelector(selectUserDetail);
  const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;

  const onClickHandler = () => {
    if (userDetails?.userUnqGuid) {
      const payload = activityPage
        ? {
            userGuid: userDetails?.userUnqGuid,
            activityGuid: activityUnqGUID,
            companyGuid: companyUnqGUID,
          }
        : { userGuid: userDetails?.userUnqGuid, companyGuid: companyUnqGUID };
      onSaveHandler(payload);
    } else {
      redirectToSignIn(route, pathname);
    }
  };

  return (
    <Box
      display="flex"
      alignItems={{ xs: "flex-start", sm: "center" }}
      flexWrap={{ xs: "wrap", sm: "nowrap" }}
      flexDirection={{ xs: "column", sm: "row" }}
      rowGap={{ xs: 3, sm: 0 }}
      columnGap={1}
      mb={3}
    >
      {(title || subTitle) && (
        <>
          {!activityPage && logoLink !== null && (
            <ProviderProfileImgStyle src={`${BLOB_DOMAIN}/${logoLink}`} alt="logo" borderRadius="50%" />
          )}
          <Box sx={{ flex: { sm: "1 1 0" } }}>
            {title && (
              <MuiTypography variant="h5" mb={{ xs: 1, sm: 0.5 }} fontSize={{ xs: 24, sm: 30 }}>
                {title}
              </MuiTypography>
            )}
            {subTitle && (
              <MuiTypography
                variant="body1"
                display="flex"
                alignItems="center"
                gap={0.5}
                color={palette.text.secondary}
              >
                {activityPage ? (
                  subTitle === "Online" || subTitle === "Call" ? null : (
                    <LocationOnOutlined />
                  )
                ) : (
                  <LocationOnOutlined />
                )}

                {subTitle}
              </MuiTypography>
            )}
          </Box>
        </>
      )}
      <MuiButton
        variant={isSaved ? "contained" : "outlined"}
        color={isSaved ? "primary" : "inherit"}
        sx={{ padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" } }}
        onClick={() => onClickHandler()}
      >
        <FavoriteBorderIcon sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
        {t("save")}
      </MuiButton>
    </Box>
  );
}

export default DetailHeader;
