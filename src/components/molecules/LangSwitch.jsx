"use client";
import { Languages } from "@/src/constants/commonValues";
import palette from "@/src/utils/theme/palette";
import LanguageIcon from "@mui/icons-material/Language";
import { Button, Menu, MenuItem, Typography as MuiTypography } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const LangSwitch = ({ iconFirst }) => {
  const t = useTranslations();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="text" disableRipple={true} onClick={handleClick}>
        {iconFirst ? (
          <>
            <LanguageIcon />
            <MuiTypography>{t("language")}</MuiTypography>
          </>
        ) : (
          <>
            <MuiTypography>{t("language")}</MuiTypography>
            <LanguageIcon />
          </>
        )}
      </Button>
      <Menu
        sx={{ mt: "40px" }}
        id="languageMenu"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Languages?.map((language, index) => (
          <MenuItem key={index}>
            <Link
              href={`${pathName}?${searchParams}`}
              locale={language.value}
              style={{ color: palette.text.primary, textDecoration: "none" }}
            >
              {language.flagName}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LangSwitch;
