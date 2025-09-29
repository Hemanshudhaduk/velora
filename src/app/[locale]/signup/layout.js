import ThemeRegistry from "@/src/utils/theme/ThemeRegistry";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";

export default async function RootLayout({ children, params }) {
  const locale = useLocale();
  let messages;
  try {
    messages = (await import(`@/lang/${params.locale}.json`))?.default;
  } catch (error) {
    notFound();
  }

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <ThemeRegistry options={{ key: "mui-theme" }}>{children}</ThemeRegistry>
    </NextIntlClientProvider>
  );
}
