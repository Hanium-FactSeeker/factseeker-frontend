import DefaultHeader from '@/components/header/DefaultHeader';

export default function DefaultGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
