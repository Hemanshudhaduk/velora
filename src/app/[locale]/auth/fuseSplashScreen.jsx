"use client";
import Image from "next/image";
import { Box, styled } from "@mui/material";
import { memo } from "react";

const SplashScreenContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #dee5d9;
  color: #f9fafb;
  z-index: 999999;
  pointer-events: none;
  opacity: 1;
  visibility: visible;
  transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);

  & img {
    width: 120px;
    max-width: 120px;
  }
`;

const SpinnerContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  width: 56px;

  & > div {
    width: 12px;
    height: 12px;
    background-color: #1e96f7;
    border-radius: 100%;
    display: inline-block;
    animation: bounceDelay 1s infinite ease-in-out both;
  }

  .bounce1 {
    animation-delay: -0.32s;
  }

  .bounce2 {
    animation-delay: -0.16s;
  }

  @keyframes bounceDelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const FuseSplashScreen = () => {
  return (
    <SplashScreenContainer>
      <div className="logo">
        <Image
          width="128"
          height="128"
          src={`${process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL}/Holistikah/Logo/Logo-Holistika.svg`}
          alt="logo"
        />
      </div>
      <SpinnerContainer>
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </SpinnerContainer>
    </SplashScreenContainer>
  );
};

export default memo(FuseSplashScreen);
