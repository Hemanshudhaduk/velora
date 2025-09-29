"use client";
import { UserSliceData } from "@/src/api/user";
import { accountMenu } from "@/src/constants";
import { selectUser, selectUserDetail, userDetail } from "@/src/lib/slice/userSlice";
import { changePassword, redirectToSignIn, signOut } from "@/src/utils";
import { AccountCircleOutlined, Launch } from "@mui/icons-material";
import { Divider, MenuItem, Button as MuiButton, Typography as MuiTypography } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkStyle, ProfileMenuStyle } from "../style";

const Profile = () => {
  const t = useTranslations();
  const route = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const getUserDetail = useSelector(selectUserDetail);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const openUserMenu = Boolean(userAnchorEl);
  const handleOpenUserMenu = event => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
  };

  useEffect(() => {
    if (user.data?.isAuthenticated === true) {
      const userApiCalling = async () => {
        const response = await UserSliceData(user.data.email);
        if (response?.status === "Success") {
          dispatch(userDetail({ userDetail: response.data[0] }));
        }
      };
      userApiCalling();
    }
  }, [user?.data?.email]);

  useEffect(() => {
    if (!user.data.isAuthenticated && localStorage.getItem("isSignedIn")) {
      redirectToSignIn(route, pathname);
    }
  }, [user.data.isAuthenticated]);

  return (
    <>
      {user?.data?.isAuthenticated ? (
        <MuiButton aria-controls="accountMenu" onClick={handleOpenUserMenu}>
          <AccountCircleOutlined />
          <MuiTypography variant="body1" component="p">
            {!getUserDetail?.firstName ? (
              ""
            ) : (
              <>
                {(getUserDetail?.firstName + " " + getUserDetail?.lastName)?.substring(0, 10)}
                {(getUserDetail?.firstName + " " + getUserDetail?.lastName)?.length > 10 ? "..." : ""}
              </>
            )}
          </MuiTypography>
        </MuiButton>
      ) : (
        <MuiButton variant="text" disableRipple={true} onClick={() => redirectToSignIn(route, pathname)}>
          <MuiTypography>{t("signIn")}</MuiTypography>
        </MuiButton>
      )}

      <ProfileMenuStyle
        sx={{ mt: "40px" }}
        id="accountMenu"
        anchorEl={userAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(openUserMenu)}
        onClose={handleCloseUserMenu}
      >
        {getUserDetail?.companyName && (
          <MenuItem onClick={handleCloseUserMenu}>
            <LinkStyle
              href={`${process.env.NEXT_PUBLIC_SIGNUP_URL}/home`}
              disc={
                <>
                  <MuiTypography variant="body1">
                    {getUserDetail?.companyName}
                    <MuiTypography variant="body2" component="span" display="block" mt={0.5}>
                      {t("viewAndManage")}
                    </MuiTypography>
                  </MuiTypography>
                  <Launch />
                </>
              }
            />
          </MenuItem>
        )}
        <Divider />

        {user?.data?.isAuthenticated &&
          accountMenu
            ?.sort((a, b) => a.id - b.id)
            ?.map(route => (
              <MenuItem key={route.id} onClick={handleCloseUserMenu}>
                <LinkStyle
                  href={route.redirectTo}
                  disc={<MuiTypography variant="body1">{t(route.translationKey)}</MuiTypography>}
                />
              </MenuItem>
            ))}
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            changePassword();
          }}
        >
          <LinkStyle href="#" disc={<MuiTypography variant="body1">{t("accountMenu.changePassword")}</MuiTypography>} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
            handleCloseUserMenu();
          }}
        >
          <LinkStyle href="#" disc={<MuiTypography variant="body1">{t("accountMenu.signOut")}</MuiTypography>} />
        </MenuItem>
      </ProfileMenuStyle>
    </>
  );
};

export default Profile;
