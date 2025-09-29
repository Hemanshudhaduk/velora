"use client";
import { getUserAccountDetailsByGuid } from "@/src/api/settings";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { redirectToSignIn } from "@/src/utils";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SettingForm } from "../organisms";
import { ContainerStyle } from "../style";

function SettingsTemplate() {
  const t = useTranslations();
  const route = useRouter();
  const pathname = usePathname();
  const [userDetailData, setUserDetailData] = useState([]);
  const getUserDetails = useSelector(selectUserDetail);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user?.data?.email) {
      redirectToSignIn(route, pathname);
    }
    if (getUserDetails?.userUnqGuid) {
      GetUserAccountDetails();
    }
  }, [getUserDetails]);

  const GetUserAccountDetails = async () => {
    setLoading(true);
    const userUnqGuid = getUserDetails?.userUnqGuid;
    const userAccountDetails = await getUserAccountDetailsByGuid(userUnqGuid);
    if (userAccountDetails?.data) {
      setUserDetailData(userAccountDetails.data);
      setLoading(false);
    }
  };

  return (
    <ContainerStyle>
      <SettingForm userDetailData={userDetailData} sendPhoneError loading={loading} />
    </ContainerStyle>
  );
}

export default SettingsTemplate;
