import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import { NextSeo } from "next-seo";
import "../styles/index.css";
import SEO from "next-seo.config";
import { Layout } from "components/layout";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="mahmoudabdelwahab.com">
      <NextSeo {...SEO} />
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PlausibleProvider>
  );
}
export default MyApp;
