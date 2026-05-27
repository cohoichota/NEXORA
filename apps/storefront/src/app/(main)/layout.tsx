import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/layout/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] animate-fade-in">
        {children}
      </main>
      <Footer />
    </>
  );
}
