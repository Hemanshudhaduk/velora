import { AppBarStyled, ContainerStyle, NavBoxStyle, ToolbarStyled } from "@/src/components/style";
import { Hidden, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import { LangSwitch, LocationDropDown, MobileMenuDrawer, Profile, SearchBox } from "../molecules";
import CompanyLogo from "../molecules/CompanyLogo";
import HolistikaSubDomain from "./HolistikaSubDomain";
import NavigationList from "./NavigationList";
import Addtocart from "../molecules/Addtocart";
import LikeProduct from "../molecules/LikeProduct";

async function NavBar(props) {
  const { userLocation } = props;
  const t = useTranslations();
  return (
    <AppBarStyled
      color="default"
      elevation={8}
      sx={{ position: { sm: "sticky" }, paddingRight: { sm: "0 !important" } }}
    >
      <ContainerStyle>
        <ToolbarStyled disableGutters>
          {/* Logo only shows on desktop/tablet view, hidden on mobile */}
          <Hidden mdDown>
            <CompanyLogo />
          </Hidden>

          <NavBoxStyle sx={{ display: { md: "flex", xs: "none" }, gap: "1rem", justifyContent: "flex-end" }}>
            {/* <NavigationList /> */}
            <MenuItem>
              <SearchBox />
            </MenuItem>
            <MenuItem>
              <Addtocart />
            </MenuItem>
            <MenuItem>
              <LikeProduct />
            </MenuItem>
            {/* <MenuItem>
              <LangSwitch iconFirst="True" />
            </MenuItem> */}
            {/* Add auto complete with userData */}
            <MenuItem>
              <LocationDropDown userLocation={userLocation} />
            </MenuItem>
            <MenuItem>
            {/* add a ADDto cart  */}
            </MenuItem>
            <MenuItem>
              <Profile />
            </MenuItem>
          </NavBoxStyle>
          
          {/* Mobile menu drawer - this contains the logo for mobile view */}
          <MobileMenuDrawer userLocation={userLocation} />
        </ToolbarStyled>
      </ContainerStyle>
    </AppBarStyled>
  );
}

export default NavBar;