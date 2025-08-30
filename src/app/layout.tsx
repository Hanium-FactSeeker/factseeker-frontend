import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import CustomToaster from '@/components/ui/customToaster';
import AuthInitializer from '@/components/providers/AuthInitializer';
import Footer from '@/components/footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fact-seeker.com/'),
  applicationName: 'FactSeeker',
  title: {
    default: 'FactSeeker',
    template: '%s | FactSeeker',
  },
  description: '대한민국의 정치 분야 가짜뉴스를 AI로 판별하는 팩트체크 서비스',
  keywords: [
    '팩트체크',
    '가짜뉴스',
    '허위정보',
    '정치',
    'AI',
    'FactSeeker',
    '대한민국 정치',
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  colorScheme: 'light dark',
  openGraph: {
    title: '팩트씨커 FactSeeker',
    description:
      '대한민국의 정치 분야 가짜뉴스를 AI로 판별하는 팩트체크 서비스',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthInitializer />
        <CustomToaster />
        <div className="flex min-h-dvh flex-col">
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
