"use client";
import { UserSliceData } from "@/src/api/user";
import { accountMenu } from "@/src/constants";
import { selectUser, selectUserDetail, userDetail } from "@/src/lib/slice/userSlice";
import { changePassword, redirectToSignIn, signOut } from "@/src/utils";
import { AccountCircleOutlined, Close, Launch } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Divider, IconButton, MenuItem, Typography as MuiTypography } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkStyle, MobileNavDrawerStyle } from "../style";
import CompanyLogo from "./CompanyLogo";
import LangSwitch from "./LangSwitch";
import LocationDropDown from "./LocationDropDown";
import SearchBox from "./SearchBox";
import Addtocart from "./Addtocart";
import LikeProduct from "./LikeProduct";

const MobileMenuDrawer = props => {
  const { userLocation } = props;
  const t = useTranslations();
  const route = useRouter();
  const pathname = usePathname();
  const [showDrawer, setShowDrawer] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const getUserDetail = useSelector(selectUserDetail);
  
  const handleDrawerToggle = event => {
    if (showDrawer === false) setShowDrawer(event.currentTarget);
    else {
      setShowDrawer(false);
    }
  };
  
  const handleCloseDrawerToggle = () => {
    setShowDrawer(false);
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

  return (
    <>
      {/* Mobile top bar: logo on left, actions on right */}
      <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Button aria-controls="Menu" onClick={() => showDrawer && handleCloseDrawerToggle()}>
          <CompanyLogo />
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LikeProduct iconFirst="True" handleCloseDrawerToggle={handleCloseDrawerToggle} />
          <Addtocart iconFirst="True" handleCloseDrawerToggle={handleCloseDrawerToggle} />
          <Button aria-controls="Menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </Button>
        </Box>
      </Box>

      <MobileNavDrawerStyle anchor="right" open={showDrawer} onClose={handleCloseDrawerToggle} elevation={0}>
        {/* Drawer header with close button only (no duplicate logo) */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mb: 1 }}>
          <IconButton onClick={handleCloseDrawerToggle} aria-label="Close menu">
            <Close />
          </IconButton>
        </Box>
        {/* Removed navigationRoutes mapping - these were the 4 items you wanted to remove */}
        
        <MenuItem>
          <SearchBox iconFirst="True" handleCloseDrawerToggle={handleCloseDrawerToggle} />
        </MenuItem>
        {/* <MenuItem>
          <LangSwitch iconFirst="True" />
        </MenuItem> */}
        <MenuItem>
          <LocationDropDown userLocation={userLocation} />
        </MenuItem>
        <Divider />
        {user?.data?.isAuthenticated ? (
          <>
            {getUserDetail?.companyName && (
              <>
                <MenuItem onClick={handleCloseDrawerToggle}>
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
                <Divider />
              </>
            )}
            {accountMenu
              ?.sort((a, b) => a.id - b.id)
              ?.map(route => (
                <MenuItem key={route.id} onClick={handleCloseDrawerToggle}>
                  <LinkStyle
                    href={route.redirectTo}
                    disc={<MuiTypography variant="body1">{t(route.translationKey)}</MuiTypography>}
                  />
                </MenuItem>
              ))}
            <MenuItem
              onClick={() => {
                handleCloseDrawerToggle();
                changePassword();
              }}
            >
              <LinkStyle
                href="#"
                disc={<MuiTypography variant="body1">{t("accountMenu.changePassword")}</MuiTypography>}
              />
            </MenuItem>
            <MenuItem
              onClick={() => {
                signOut();
                handleCloseDrawerToggle();
              }}
            >
              <LinkStyle href="#" disc={<MuiTypography variant="body1">{t("accountMenu.signOut")}</MuiTypography>} />
            </MenuItem>
            <MenuItem>
              <Button aria-controls="accountMenu" sx={{ justifyContent: "flex-start" }}>
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
              </Button>
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            <Button variant="text" disableRipple={true} onClick={() => redirectToSignIn(route, pathname)}>
              <MuiTypography>{t("signIn")}</MuiTypography>
            </Button>
          </MenuItem>
        )}
      </MobileNavDrawerStyle>
    </>
  );
};

export default MobileMenuDrawer;