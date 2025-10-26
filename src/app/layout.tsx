import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import CustomToaster from '@/components/ui/customToaster';
import AuthInitializer from '@/components/providers/AuthInitializer';
import Footer from '@/components/footer';
import Script from 'next/script';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fact-seeker.com/'),
  applicationName: 'FactSeeker',
  title: {
    default: '팩트씨커 FactSeeker',
    template: '%s | FactSeeker',
  },
  description: '대한민국의 정치 분야 가짜뉴스를 AI로 판별하는 팩트체크 서비스',
  keywords: ['팩트체크', '가짜뉴스', '허위정보', '정치', 'AI', 'FactSeeker', '대한민국 정치'],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  colorScheme: 'light dark',
  openGraph: {
    title: '팩트씨커 FactSeeker',
    description: '대한민국의 정치 분야 가짜뉴스를 AI로 판별하는 팩트체크 서비스',
    url: 'https://www.fact-seeker.com/',
    siteName: 'FactSeeker',
    images: [
      {
        url: 'https://www.fact-seeker.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FactSeeker 미리보기 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '팩트씨커 FactSeeker',
    description: '대한민국의 가짜뉴스를 AI로 판별하는 팩트체크 서비스',
    images: ['https://www.fact-seeker.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-PS2MD3WK')`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PS2MD3WK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <AuthInitializer />
        <CustomToaster />
        <div id="modal" />
        <div className="flex min-h-dvh flex-col">
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
