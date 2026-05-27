import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authentication - Nexora',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Dynamic Background */}
      <div className="hidden md:flex flex-col justify-center items-start p-12 bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] bg-[length:32px_32px]"></div>
        
        <div className="relative z-10 max-w-lg">
          <Link href="/" className="text-4xl font-extrabold tracking-tight mb-8 block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Nexora.
          </Link>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            The next generation of enterprise e-commerce.
          </h1>
          <p className="text-lg text-indigo-200/80 mb-12">
            Join thousands of businesses and customers building the future of digital commerce on a high-performance microservices architecture.
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-900 bg-indigo-500/20 backdrop-blur-md flex items-center justify-center text-xs font-medium">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-sm text-indigo-300">Over 10M+ users joined</p>
          </div>
        </div>
      </div>

      {/* Right side - Forms */}
      <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 text-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
              Nexora
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
