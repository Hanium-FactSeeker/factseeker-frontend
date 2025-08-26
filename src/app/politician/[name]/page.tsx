import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer';
import PoliticianDetailClient from './PoliticianDetailClient';

type PageProps = { params: { name: string } };

export default function PoliticianDetailPage({ params }: PageProps) {
  const name = decodeURIComponent(params.name || '');

  return (
    <main className="flex w-full flex-col items-center">
      <DefaultHeader isLoggedIn={false} />
      <section className="flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-8 md:px-6 md:py-12">
        <PoliticianDetailClient name={name} />
      </section>
      <Footer />
    </main>
  );
}
