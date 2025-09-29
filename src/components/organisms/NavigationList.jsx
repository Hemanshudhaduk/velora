"use client";
import { navigationRoutes } from "@/src/constants";
import { MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { NavigationListLink } from "../atoms";

const NavigationList = () => {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <>
      {navigationRoutes
        ?.sort((a, b) => a.id - b.id)
        ?.map(route => (
          <MenuItem key={route.id}>
            <NavigationListLink
              href={route.redirectTo}
              disc={t(route.translationKey)}
              isCurrentPath={`/${pathname.split("/")[2]}` === route.redirectTo ? true : false}
            />
          </MenuItem>
        ))}
    </>
  );
};

export default NavigationList;
