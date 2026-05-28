'use client';

import type { User, AuthTokens } from '@nexora/shared-types';
import { Button } from '@nexora/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/auth.store';

export default function SellerLoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await apiClient.post<{ user: User; tokens: AuthTokens }>('/auth/login', {
        email,
        password,
      });

      // Simple check to ensure this is a seller
      if (String(response.user.role) !== 'SELLER') {
        throw new Error('Unauthorized. Seller access required.');
      }

      setAuth(response.user, response.tokens);
      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-xl shadow-indigo-500/5 ring-1 ring-slate-200 dark:ring-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Seller Portal</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Enter your credentials to manage your store
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium border border-red-200 dark:border-red-500/20">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            handleSubmit(e).catch(console.error);
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white outline-none"
              placeholder="seller@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white outline-none"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 rounded-xl text-md shadow-lg shadow-indigo-500/20"
          >
            {isLoading ? 'Signing in...' : 'Sign in to Seller Portal'}
          </Button>
        </form>
      </div>
    </div>
  );
}
