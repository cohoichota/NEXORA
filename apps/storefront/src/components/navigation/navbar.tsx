'use client';

import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Bell,
  Sun,
  Moon,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';

import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';

const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Deals', href: '/deals' },
  { label: 'Sellers', href: '/sellers' },
];

export function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { itemCount, openCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`sticky top-0 z-[var(--z-sticky)] w-full transition-all duration-200 ${
        scrolled
          ? 'border-b border-border/50 bg-background/95 shadow-sm backdrop-blur-md'
          : 'bg-background'
      }`}
    >
      {/* ── Top bar ─────────────────────────────────── */}
      <div className="border-b border-border/40 bg-muted/40 py-1.5 text-xs text-muted-foreground">
        <div className="container-nexora flex justify-between items-center">
          <span>🎉 Free shipping on orders over $50 — Shop now!</span>
          <div className="hidden md:flex gap-4">
            <Link href="/help" className="hover:text-foreground transition-colors">
              Help
            </Link>
            <Link href="/track-order" className="hover:text-foreground transition-colors">
              Track Order
            </Link>
            {!isAuthenticated && (
              <>
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="hover:text-foreground transition-colors font-medium text-primary"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Main nav ─────────────────────────────────── */}
      <div className="container-nexora flex h-16 items-center gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-foreground flex-shrink-0"
          id="nav-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm">
            <span className="text-white text-sm font-black">N</span>
          </div>
          <span className="hidden sm:block">Nexora</span>
        </Link>

        {/* Category dropdown */}
        <button
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors flex-shrink-0"
          id="nav-categories-btn"
        >
          <Menu className="h-4 w-4" />
          Categories
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-border bg-muted/50 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Search products"
              id="nav-search-input"
            />
          </div>
          <button
            type="submit"
            className="hidden md:flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-100"
          >
            Search
          </button>
        </form>

        {/* Nav actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle theme"
              id="nav-theme-toggle"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="hidden sm:flex rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Wishlist"
            id="nav-wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Notifications (authenticated only) */}
          {isAuthenticated && (
            <button
              className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Notifications"
              id="nav-notifications"
            >
              <Bell className="h-5 w-5" />
              <span
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"
                aria-hidden="true"
              />
            </button>
          )}

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={`Cart — ${itemCount} items`}
            id="nav-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-scale-in">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          {/* User / Sign in */}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-lg pl-2 pr-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
              id="nav-user"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                {user?.firstName?.charAt(0) ?? 'U'}
              </div>
              <span className="hidden md:block">{user?.firstName ?? 'Account'}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              id="nav-signin"
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-1 flex md:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            id="nav-mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Desktop secondary nav ────────────────────── */}
      <nav className="hidden md:block border-t border-border/40">
        <div className="container-nexora flex items-center gap-6 py-2">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="/sell"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ─────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden animate-fade-in">
          <div className="container-nexora py-4 flex flex-col gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border pt-4">
              <Link
                href="/login"
                className="flex-1 rounded-xl border border-border py-2.5 text-center text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex-1 rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
