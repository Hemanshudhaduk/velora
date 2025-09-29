"use client";

import palette from "@/src/utils/theme/palette";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Help } from "../molecules";
import { ContainerStyle, SectionStyle } from "../style";

function HelpPageTemplate() {
  const t = useTranslations();
  return (
    <SectionStyle>
      <ContainerStyle>
        <Box textAlign="center" mb={{ xs: 3, sm: 8 }}>
          <Typography variant="h5" fontWeight={600} mb={2.5}>
            {t("help.getInTouch")}
          </Typography>
          <Typography variant="body1" color={palette.text.secondary}>
            {t("help.getInTouchDescription1")}
          </Typography>
          <Typography variant="body1" color={palette.text.secondary}>
            {t("help.getInTouchDescription2")}
          </Typography>
        </Box>
        <Help />
      </ContainerStyle>
    </SectionStyle>
  );
}
export default HelpPageTemplate;
