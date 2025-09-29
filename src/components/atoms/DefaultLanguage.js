"use client";
import { NumberOfCountry } from "@/src/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DefaultLanguage = () => {
  const router = useRouter();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("defaultLanguage") &&
      localStorage.getItem("defaultCountry")
    ) {
      const findLocale = NumberOfCountry.find(item => item.country === localStorage.getItem("defaultCountry"));
      const locale = findLocale !== undefined ? findLocale.locale : "/en";
      router.push(locale);
      localStorage.setItem("defaultLanguage", locale);
    }
  }, [router]);
  return null;
};

export default DefaultLanguage;
