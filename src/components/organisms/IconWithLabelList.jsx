"use client";
import {
  BrowserIcons,
  EtsyIcons,
  FacebookIcons,
  InstagramIcons,
  LinkedinIcons,
  PhoneIcons,
  PinterestIcons,
  TiktokIcons,
  TwitterIcons,
  VimeoIcons,
  YoutubeIcons,
} from "@/src/constants/SocialMediaIcons";
import { Box, styled } from "@mui/material";
import dynamic from "next/dynamic";

const IconWithLabel = dynamic(() => import("../molecules/IconWithLabel"), {
  ssr: false,
});

export const IconWithLabelStyle = styled(Box)({
  "& .MuiTypography-root": {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

const IconWithLabelList = props => {
  const { dataList } = props;
  const iconMap = {
    CompanyPhoneNumber: PhoneIcons.url,
    Website: BrowserIcons.url,
    Etsy: EtsyIcons.url,
    Facebook: FacebookIcons.url,
    Instagram: InstagramIcons.url,
    Linkedin: LinkedinIcons.url,
    Pinterest: PinterestIcons.url,
    Tiktok: TiktokIcons.url,
    Twitter: TwitterIcons.url,
    Vimeo: VimeoIcons.url,
    Youtube: YoutubeIcons.url,
  };
  const defaultIcon = null;

  return (
    <IconWithLabelStyle pb={1.5}>
      {dataList?.map(item => (
        <IconWithLabel
          key={item.id}
          iconLink={iconMap[item.mediaName] || defaultIcon}
          label={item.redirectLink}
          href={item.redirectLink}
          isClickable={item.mediaName === "CompanyPhoneNumber" ? 0 : 1}
        />
      ))}
    </IconWithLabelStyle>
  );
};

export default IconWithLabelList;
