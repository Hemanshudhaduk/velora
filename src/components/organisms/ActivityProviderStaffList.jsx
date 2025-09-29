"use client";

import palette from "@/src/utils/theme/palette";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";
import ViewMore from "../molecules/ViewMoreComponent";

const StaffCard = dynamic(() => import("../molecules/StaffCard"));
const ActivityProviderStaffList = props => {
  const { staffList } = props;
  const [staffView, setStaffView] = useState(staffList?.slice(0, 2));
  const t = useTranslations();
  const getStaffCount = async pageSize => {
    setStaffView(staffList?.slice(0, pageSize));
  };

  return (
    <>
      {staffView &&
        staffView.map(staff => {
          return <StaffCard key={staff.userDetailUnqGUID} {...staff} />;
        })}
      {staffView?.length < staffList?.length ? (
        <ViewMore
          title={
            <Typography variant="body1" fontWeight={600} color={palette.text.secondary} textAlign="center">
              {t("activityDetail.viewMoreStaff")}
            </Typography>
          }
          defaultPageSize={2}
          pageSize={7}
          clickHandler={getStaffCount}
        />
      ) : null}
    </>
  );
};

export default ActivityProviderStaffList;
