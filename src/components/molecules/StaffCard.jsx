"use client";
import palette from "@/src/utils/theme/palette";
import { Box, Button, CardContent, CardMedia, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StaffCardStyle } from "../style";

const StaffCard = props => {
  const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
  const { staffName, aboutDescription, imageURL, isCompanyDescription = false, companyGuid } = props;
  const [description, setDescription] = useState("");
  const [isReadMoreVisible, setIsReadMoreVisible] = useState(false);
  const t = useTranslations();
  const route = useRouter();

  const handleClick = () => {
    setDescription(aboutDescription);
    setIsReadMoreVisible(false);
  };

  useEffect(() => {
    if (aboutDescription?.length > 126) {
      setDescription(aboutDescription.substring(0, 126) + "...");
      setIsReadMoreVisible(true);
    } else setDescription(aboutDescription);
  }, [aboutDescription]);

  return (
    <>
      {!isCompanyDescription ? (
        <StaffCardStyle>
          {!isCompanyDescription && <CardMedia src={`${BLOB_DOMAIN}/${imageURL}`} component="img" alt={staffName} />}
          <CardContent>
            <Typography variant="subtitle2" mb={0.5} color={palette.text.primary} fontWeight={500}>
              {staffName}
            </Typography>
            <Typography variant="body1" mb={1} color={palette.text.secondary} sx={{ whiteSpace: "pre-wrap" }}>
              {description}
            </Typography>
            {isReadMoreVisible && (
              <Button variant="text" disableRipple sx={{ padding: 0 }} onClick={handleClick}>
                {t("readMore")}
              </Button>
            )}
          </CardContent>
        </StaffCardStyle>
      ) : (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between" gap={3} my={3}>
            <Typography variant="h6">{staffName}</Typography>
            <Button
              variant="text"
              onClick={() => {
                route.push(`/providers/${companyGuid}`);
              }}
              disableRipple
              sx={{ padding: 0 }}
            >
              {t("activityDetail.viewProvider")}
            </Button>
          </Box>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {description}
          </Typography>
          {isReadMoreVisible && (
            <Button variant="text" disableRipple sx={{ marginTop: 1 }} onClick={handleClick}>
              {t("readMore")}
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default StaffCard;
