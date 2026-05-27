import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCcw, Headphones, Star, TrendingUp, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nexora — Your Premium Marketplace',
  description: 'Discover millions of products from trusted sellers. Fast shipping, secure payments.',
};

// ── Static Data (will be replaced with API calls in Phase 3) ─────

const FEATURED_CATEGORIES = [
  { name: 'Electronics', icon: '⚡', slug: 'electronics', gradient: 'from-blue-500 to-cyan-500', count: '12,400+' },
  { name: 'Fashion', icon: '👗', slug: 'fashion', gradient: 'from-pink-500 to-rose-500', count: '89,200+' },
  { name: 'Home & Living', icon: '🏡', slug: 'home-living', gradient: 'from-amber-500 to-orange-500', count: '34,100+' },
  { name: 'Sports', icon: '🏃', slug: 'sports', gradient: 'from-green-500 to-emerald-500', count: '8,700+' },
  { name: 'Beauty', icon: '💄', slug: 'beauty', gradient: 'from-purple-500 to-fuchsia-500', count: '21,300+' },
  { name: 'Books', icon: '📚', slug: 'books', gradient: 'from-indigo-500 to-blue-500', count: '44,600+' },
];

const TRUST_FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'text-blue-500' },
  { icon: ShieldCheck, title: 'Buyer Protection', desc: '100% secure payments', color: 'text-green-500' },
  { icon: RefreshCcw, title: 'Easy Returns', desc: '30-day return policy', color: 'text-purple-500' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here to help', color: 'text-orange-500' },
];

const STATS = [
  { value: '2M+', label: 'Products', icon: TrendingUp },
  { value: '500K+', label: 'Sellers', icon: Star },
  { value: '10M+', label: 'Customers', icon: Zap },
  { value: '4.9★', label: 'Avg Rating', icon: Star },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="container-nexora relative py-24 md:py-36">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
              <Zap className="h-3.5 w-3.5" />
              Over 2 million products available today
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl text-balance">
              Shop Smarter.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Live Better.
              </span>
            </h1>

            <p className="mb-10 text-lg text-slate-300 md:text-xl max-w-2xl mx-auto text-pretty">
              Nexora connects millions of buyers with top-rated sellers worldwide.
              Discover unbeatable deals with AI-powered recommendations built just for you.
            </p>

            {/* Search bar */}
            <div className="mx-auto mb-8 max-w-2xl">
              <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-1.5 shadow-2xl">
                <input
                  type="search"
                  placeholder="Search for products, brands, categories..."
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none text-base"
                  aria-label="Search products"
                />
                <button
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-100"
                  id="hero-search-btn"
                >
                  Search
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Popular tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Wireless Earbuds', 'Running Shoes', 'Coffee Maker', 'Gaming Chair', 'Skincare Set'].map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="border-b bg-muted/30">
        <div className="container-nexora">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-8 px-6">
                <span className="text-3xl font-extrabold text-foreground md:text-4xl">{value}</span>
                <span className="mt-1 text-sm font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="py-20">
        <div className="container-nexora">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">Browse by</p>
              <h2 className="text-3xl font-bold text-foreground">Shop Categories</h2>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl p-px card-hover"
                id={`category-${cat.slug}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative rounded-2xl border border-border bg-card p-6 text-center group-hover:border-transparent transition-colors duration-300">
                  <div className="mb-3 text-4xl">{cat.icon}</div>
                  <h3 className="font-semibold text-foreground text-sm">{cat.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS PLACEHOLDER ────────────────── */}
      <section className="bg-muted/30 py-20">
        <div className="container-nexora">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">Hand-picked for you</p>
              <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
            </div>
            <Link
              href="/products?sort=trending"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Product skeleton grid (replaced with real data in Phase 3) */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="aspect-square animate-shimmer bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 skeleton" />
                  <div className="h-3 w-1/2 skeleton" />
                  <div className="h-5 w-1/3 skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST / VALUE PROPS ──────────────────────────── */}
      <section className="py-20">
        <div className="container-nexora">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
              >
                <div className={`mb-4 rounded-xl bg-muted p-3 transition-colors group-hover:bg-primary/5`}>
                  <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="py-12">
        <div className="container-nexora">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left md:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold md:text-4xl">
                  Start selling on Nexora
                </h2>
                <p className="mt-2 max-w-lg text-indigo-100">
                  Join 500K+ sellers earning more. Set up your store in minutes with zero listing fees.
                </p>
              </div>
              <div className="flex flex-shrink-0 gap-3">
                <Link
                  href="/register?type=seller"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:scale-[1.02]"
                  id="cta-become-seller"
                >
                  Become a Seller <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
