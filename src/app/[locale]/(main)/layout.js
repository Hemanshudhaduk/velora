import { Footer, HolistikaSubDomain, NavBar, NavigationEvents } from "@/src/components";
import { MainStyle } from "@/src/components/style";
import { getUserDetailsByIp } from "@/src/utils";
import { NextIntlClientProvider } from "next-intl";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Layout({ children, params }) {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";

  const forwarded = headers().get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
  const data = await getUserDetailsByIp(ip.split(":")[0]);

  let messages;
  try {
    messages = (await import(`@/lang/${params.locale}.json`))?.default;
  } catch (error) {
    notFound();
  }
  return (
    <MainStyle>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <NavBar userLocation={data} />
        {children}
        <Suspense fallback={null}>
          {/* <NavigationEvents userLocation={data} /> */}
          <HolistikaSubDomain />
        </Suspense>
        <Footer locale={params.locale} />
      </NextIntlClientProvider>
    </MainStyle>
  );
}
