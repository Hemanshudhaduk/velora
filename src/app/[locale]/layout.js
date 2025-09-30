import ThemeRegistry from "@/src/utils/theme/ThemeRegistry";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { notFound } from "next/navigation";
import StoreProvider from "../StoreProvider";
import Error from "./error";
import "../global.css";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({ children, params }) {
  // Show a 404 error if the user requests an unknown locale
  if (!params.locale) {
    notFound();
  }
  let messages;
  try {
    messages = (await import(`@/lang/${params.locale}.json`))?.default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale} style={{ scrollBehavior: "smooth" }}>
      <body>
        <ThemeRegistry options={{ key: "mui-theme" }}>
          <ErrorBoundary fallback={<Error />}>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
              <StoreProvider>{children}</StoreProvider>
            </NextIntlClientProvider>
          </ErrorBoundary>
        </ThemeRegistry>
      </body>
    </html>
  );
}
