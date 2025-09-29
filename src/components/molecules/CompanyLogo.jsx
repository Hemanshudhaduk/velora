import { companyDetails } from "@/src/constants";
import { CustomImgStyle, LogoLinkStyle } from "../style";

export default function CompanyLogo() {
  return (
    <LogoLinkStyle
      href={companyDetails.redirectTo}
      disc={<CustomImgStyle src={companyDetails.Image} priority alt={companyDetails.alt} />}
    />
  );
}
