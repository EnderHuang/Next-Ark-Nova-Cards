import { ClerkProvider } from '@clerk/nextjs';
import { LazyMotion } from 'framer-motion';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';

import '@/styles/globals.css';
import '@/styles/arknova.css';
import '@/styles/odometer.css';
import '@/styles/clerk.css';

const loadFeatures = () =>
  import('@/lib/framer-features').then((res) => res.default);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src='https://umami.ender-wiggin.com/script.js'
        data-website-id='f2a10fa7-5a6f-4329-9bdf-c239f51b6c52'
      />
      <Script
        strategy='lazyOnload'
        src='https://www.googletagmanager.com/gtag/js?id=G-49MVJ63XFT'
      />
      <Script
        id='google-analytics'
        strategy='lazyOnload'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-49MVJ63XFT', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <LazyMotion features={loadFeatures}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
          </ClerkProvider>
        </ThemeProvider>
      </LazyMotion>
    </>
  );
}

export default appWithTranslation(MyApp);
