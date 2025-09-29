"use client";

import { getCurrencyFormatWithLanguage } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ViewMore from "./ViewMoreComponent";

const ProviderActivityTable = props => {
  const { activityList, locale } = props;
  const [activityView, setActivityView] = useState(activityList?.slice(0, 7));
  const route = useRouter();
  const t = useTranslations();
  const getActivityCount = async pageSize => {
    setActivityView(activityList?.slice(0, pageSize));
  };
  return (
    <>
      {activityView?.map((activity, index) => {
        return (
          <TableRow key={index}>
            <TableCell width="12.5%">
              <Typography variant="body1" mb={0.5}>
                {activity.activityDuration}&nbsp;
                {activity.activityDurationUnit === "M" ? "min" : "hr"}
              </Typography>
              <Typography variant="body1" color={palette.text.secondary}>
                {activity.currencyCode === null || activity.currencyCode === undefined || activity.currencyCode === ""
                  ? ""
                  : getCurrencyFormatWithLanguage(activity.currencyCode, activity.price, locale)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" mb={0.5}>
                {activity.activityName}
              </Typography>
              <Typography
                variant="body1"
                color={palette.text.secondary}
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {activity.staffNameList}
              </Typography>
            </TableCell>
            <TableCell width="12.5%" align="center">
              <Button
                variant="outlined"
                onClick={() => {
                  route.push(`/activity/${activity.activityUnqGUID}`);
                }}
              >
                {t("view")}
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
      {activityView?.length < activityList?.length ? (
        <TableRow>
          <TableCell colSpan={3} sx={{ border: "none" }}>
            <ViewMore
              title={
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color={palette.text.secondary}
                  textAlign="center"
                  sx={{ textDecoration: "none" }}
                >
                  {t("providerDetail.viewMore")}
                </Typography>
              }
              defaultPageSize={7}
              pageSize={7}
              clickHandler={getActivityCount}
            />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

export default ProviderActivityTable;
