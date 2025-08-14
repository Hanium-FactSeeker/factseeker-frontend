import Footer from '@/components/footer';
import DefaultHeader from '@/components/header/DefaultHeader';
import ReportTitle from '@/components/report/molecules/ReportTitle';
import ContentEvidence from '@/components/report/organisms/ContentEvidence';
import ContentInfo from '@/components/report/organisms/ContentInfo';

interface ReportProps {
  params: {
    url: string;
  };
}
const Page = ({ params }: ReportProps) => {
  const originalUrl = decodeURIComponent(params.url);
  return (
    <div className="">
      <DefaultHeader isLoggedIn={false} initialSearch={originalUrl} />
      <main className="bg-gray-light flex w-full flex-col items-center justify-center p-4">
        <ReportTitle />
        <ContentInfo />
        <ContentEvidence />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
