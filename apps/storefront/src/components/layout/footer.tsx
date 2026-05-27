import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Returns', href: '/returns' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Sellers: [
    { label: 'Start Selling', href: '/sell' },
    { label: 'Seller Center', href: '/seller' },
    { label: 'Seller Guidelines', href: '/seller/guidelines' },
    { label: 'Affiliate Program', href: '/affiliate' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, href: 'https://twitter.com/nexora', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/nexora', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/nexora', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@nexora.dev', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-12">
      <div className="container-nexora py-16">

        {/* Top section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="text-white text-sm font-black">N</span>
              </div>
              Nexora
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your trusted marketplace connecting millions of buyers and sellers worldwide.
            </p>
            {/* Social links */}
            <div className="mt-4 flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nexora Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>🔒 Secured by SSL</span>
            <span>·</span>
            <span>💳 Multiple payment methods</span>
            <span>·</span>
            <span>🌍 Worldwide shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
