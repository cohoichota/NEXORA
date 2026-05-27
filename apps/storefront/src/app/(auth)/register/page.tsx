'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@nexora/ui';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await apiClient.post<{ user: any; tokens: any }>('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      setAuth(response.user, response.tokens);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-indigo-500/5 ring-1 ring-slate-200 dark:ring-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create an account</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Join Nexora to start shopping
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium border border-red-200 dark:border-red-500/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white outline-none"
              placeholder="Jane"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white outline-none"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Email address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white outline-none"
            placeholder="••••••••"
          />
          <p className="mt-1.5 text-xs text-slate-500">Must be at least 8 characters long.</p>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-6 rounded-xl text-md shadow-lg shadow-indigo-500/20"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
          Sign in
        </Link>
      </div>
    </div>
  );
}
