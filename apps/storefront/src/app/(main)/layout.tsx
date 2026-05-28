import { CartDrawer } from '@/components/cart/CartDrawer';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/navigation/navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-[calc(100vh-4rem)] animate-fade-in">{children}</main>
      <Footer />
    </>
  );
}
