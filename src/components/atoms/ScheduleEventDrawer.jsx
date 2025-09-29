"use client";

import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography as MuiTypography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
const ScheduleEventDrawer = props => {
  const {
    title,
    subTitle,
    btnText = null,
    countBtn = null,
    moreDatesCount,
    activityOccasions,
    googleTimeZoneName,
  } = props;
  const [otherStartDate, setOtherStartDate] = useState(false);
  const t = useTranslations();

  const openDrawer = () => {
    setOtherStartDate(true);
  };

  const closeDrawer = () => {
    setOtherStartDate(false);
  };
  return (
    <>
      {(title || subTitle) && (
        <>
          {title && (
            <MuiTypography variant="body2" mb={0.5}>
              {subTitle && title}
            </MuiTypography>
          )}
          {subTitle && (
            <>
              <MuiTypography variant="body1" mb={0.5}>
                {subTitle}
              </MuiTypography>
            </>
          )}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {countBtn !== null && <MuiTypography variant="body1">{countBtn}</MuiTypography>}
            {btnText !== null && (
              <Button variant="text" disableTouchRipple onClick={openDrawer}>
                {btnText}
              </Button>
            )}
          </Box>
        </>
      )}
      {btnText !== null && (
        <Drawer
          open={otherStartDate}
          anchor="right"
          onClose={closeDrawer}
          PaperProps={{ sx: { width: { xs: "100%" }, maxWidth: { sm: "383px" } } }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
            <MuiTypography variant="h6">{t("activityDetail.dates")}</MuiTypography>
            <IconButton onClick={closeDrawer} sx={{ padding: "0" }}>
              <Close sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
          <Box padding={2}>
            <MuiTypography variant="body1" mb={3}>
              {t("activityDetail.drawerInfo")}
            </MuiTypography>
            <Table border="none">
              <TableHead>
                <TableRow>
                  <TableCell variant="head">{t("activityDetail.occasions")}</TableCell>
                  <TableCell variant="head">{t("showOtherStartDatesPage.date")}</TableCell>
                  <TableCell variant="head" align="right">
                    {t("showOtherStartDatesPage.time")} {`(${googleTimeZoneName})`}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityOccasions.map(row => (
                  <TableRow key={row.occasion}>
                    <TableCell className="MuiTableCell-root MuiTableCell-body">{row.occasion}</TableCell>
                    <TableCell className="MuiTableCell-root MuiTableCell-body">{row.date}</TableCell>
                    <TableCell className="MuiTableCell-root MuiTableCell-body" align="right">
                      {row.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default ScheduleEventDrawer;
