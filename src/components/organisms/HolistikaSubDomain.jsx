"use client";

import { getProviderGuidFromDomain } from "@/src/api/provider";
import { emptyGuid } from "@/src/constants";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CommonSnackBar, SnackState } from "../atoms";

const HolistikaSubDomain = () => {
  const t = useTranslations();
  const [snack, closeSnack, showSnack] = SnackState();
  const router = useRouter();
  const getProvider = async subdomain => {
    const response = await getProviderGuidFromDomain(subdomain);
    if (response?.data !== emptyGuid && response?.data) {
      const url = `${window.location.protocol}//${window.location.hostname.replace(`${subdomain}.`, "")}${
        window.location.port === "" || window.location.port === null || window.location.port === undefined
          ? ""
          : `:${window.location.port}`
      }/providers/${response.data}`;
      window.location.href = url;
    } else {
      const path = window.location.pathname + window.location.search + window.location.hash;
      const mainDomain = `${window.location.protocol}//${window.location.hostname.split(".").slice(1).join(".")}${
        window.location.port ? `:${window.location.port}` : ""
      }${path}`;
      const redirectUrl = `${mainDomain}?snackMessage=${encodeURIComponent(t("subDomainErrorMessage"))}&snackType=error`;
      window.location.href = redirectUrl;
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostName = window.location.hostname;
      const domainParts = hostName.split(".");
      if (domainParts.length > 2 && process.env.NEXT_PUBLIC_ENV.toLowerCase() === "production" && domainParts[0] !== "www") {
        getProvider(domainParts[0]);
      }
      if (domainParts.length > 1 && process.env.NEXT_PUBLIC_ENV.toLowerCase() === "development" && domainParts[0] !== "www") {
        getProvider(domainParts[0]);
      }
      if (
        domainParts.length > 2 &&
        process.env.NEXT_PUBLIC_ENV.toLowerCase() === "production" &&
        domainParts[0] === "www"
      ) {
        const path = window.location.pathname + window.location.search + window.location.hash;
        const mainDomain = `${window.location.protocol}//${window.location.hostname.split(".").slice(1).join(".")}${
          window.location.port ? `:${window.location.port}` : ""
        }${path}`;
        window.location.href = mainDomain;
      }
      if (
        domainParts.length > 1 &&
        process.env.NEXT_PUBLIC_ENV.toLowerCase() === "development" &&
        domainParts[0] === "www"
      ) {
        const path = window.location.pathname + window.location.search + window.location.hash;
        const mainDomain = `${window.location.protocol}//${window.location.hostname.split(".").slice(1).join(".")}${
          window.location.port ? `:${window.location.port}` : ""
        }${path}`;
        window.location.href = mainDomain;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const snackMessage = urlParams.get("snackMessage");
      const snackType = urlParams.get("snackType");
      if (snackMessage && snackType) {
        showSnack(decodeURIComponent(snackMessage), snackType);
        const newUrl = window.location.origin + window.location.pathname;
        router.replace(newUrl);
      }
    }
  }, []);

  return (
    <>
      <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp duration={5000} />
    </>
  );
};
export default HolistikaSubDomain;
