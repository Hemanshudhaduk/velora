import { CustomImg } from "@/src/components";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

const NotFound = () => {
  const t = useTranslations();
  return (
    <Box display="flex" flexDirection="column" height="100vh" textAlign="center" justifyContent="center">
      <Container maxWidth="md">
        <CustomImg
          src="/images/errorimg.svg"
          alt="404"
          width={500}
          height={500}
          style={{ width: "100%", maxWidth: "500px", maxHeight: "500px" }}
        />
        <Typography align="center" variant="h1" mb={4}>
          {t("systemPage.opps")}
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          {t("systemPage.notFound")}
        </Typography>
        <Button color="primary" variant="contained" href={`/${t("languageCode")}`} disableElevation component={Link}>
          {t("systemPage.goBackToHome")}
        </Button>
      </Container>
    </Box>
  );
};

NotFound.layout = "Blank";
export default NotFound;
