import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
function TypographyList(props) {
  const { typographyArray } = props;
  const t = useTranslations();

  return (
    <>
      {typographyArray?.map(item => (
        <Typography key={item.id} variant={item.variant} fontSize={{ xs: "1rem", sm: "1.125rem" }}>
          {t(item.translation)}
        </Typography>
      ))}
    </>
  );
}
export default TypographyList;
