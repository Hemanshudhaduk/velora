"use client";
import { getActivityDetails, saveActivity } from "@/src/api/activities";
import { emptyGuid } from "@/src/constants";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommonSnackBar, SnackState } from "../atoms";
import { DetailHeader } from "../molecules";
import { ActivityDetailsSummary } from "../organisms";
import ActivityImageComponent from "../organisms/ActivityImageComponent";
import { ActivityDetailSkeleton } from "../skeletons";
import { ContainerStyle, SectionStyle } from "../style";

export const DetailSectionStyle = styled(SectionStyle)({
  padding: "3rem 0",

  "@media screen and (max-width: 767px)": {
    padding: "1rem 0 3rem",
  },
});

function DetailPage(props) {
  const { guid, locale } = props;
  const [snack, closeSnack, showSnackbar] = SnackState();
  const getUserDetail = useSelector(selectUserDetail);
  const user = useSelector(selectUser);
  const [activityDetailData, setActivityDetailData] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  const t = useTranslations();

  // save Button Handler
  const onSaveHandler = async payload => {
    const res = await saveActivity(payload);
    if (res.status === "Success") {
      showSnackbar(t(res?.message), "success");
      activityDetailData.isSaved = true;
    } else {
      showSnackbar(res?.message, "error");
    }
  };

  const getActivityDetailData = async () => {
    if (user?.data?.email) {
      if (getUserDetail?.userUnqGuid) {
        const userGuid = getUserDetail?.userDetailUnqGuid ? getUserDetail?.userDetailUnqGuid : emptyGuid;
        const result = await getActivityDetails({ guid: guid, userGuid: userGuid, locale: locale });
        setActivityDetailData(result);
        setIsApiCall(true);
      }
    } else {
      const userGuid = getUserDetail?.userDetailUnqGuid ? getUserDetail?.userDetailUnqGuid : emptyGuid;
      const result = await getActivityDetails({ guid: guid, userGuid: userGuid, locale: locale });
      setActivityDetailData(result);
      setIsApiCall(true);
    }
  };

  useEffect(() => {
    if (!isApiCall || getUserDetail?.userUnqGuid) {
      getActivityDetailData();
    }
  }, [getUserDetail?.userUnqGuid]);

  useEffect(() => {
    if (activityDetailData === null) {
      notFound();
    }
  }, [activityDetailData]);

  return (
    <DetailSectionStyle>
      <ContainerStyle>
        {!isApiCall || activityDetailData === null ? (
          <ActivityDetailSkeleton />
        ) : (
          <>
            <DetailHeader
              activityPage
              title={activityDetailData?.activityName}
              subTitle={activityDetailData?.activityLocation}
              btnText={"Save"}
              activityUnqGUID={activityDetailData?.activityUnqGUID}
              companyUnqGUID={activityDetailData?.companyUnqGUID}
              onSaveHandler={onSaveHandler}
              isSaved={activityDetailData?.isSaved}
            />
            <ActivityImageComponent imageList={activityDetailData?.imageList} />
            <ActivityDetailsSummary summaryData={activityDetailData} locale={locale} />
            <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
          </>
        )}
      </ContainerStyle>
    </DetailSectionStyle>
  );
}

export default DetailPage;
