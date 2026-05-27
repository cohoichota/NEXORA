import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-[calc(100vh-4rem)] animate-fade-in">
        {children}
      </main>
      <Footer />
    </>
  );
}
