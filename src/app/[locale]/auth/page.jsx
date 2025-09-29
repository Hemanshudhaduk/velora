"use client";
import { resetPassword } from "@/src/utils";
import { useEffect } from "react";
import FuseSplashScreen from "./fuseSplashScreen";

const Auth = () => {
  if (typeof window !== "undefined") {
    if (window?.location?.href?.includes("AADB2C90118")) resetPassword();
  }
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);

  return (
    <div>
      <FuseSplashScreen />
    </div>
  );
};
export default Auth;
