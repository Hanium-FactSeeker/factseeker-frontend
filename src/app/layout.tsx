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
  title: 'factseeker',
  description: 'To detect the fake news in South korea',
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
