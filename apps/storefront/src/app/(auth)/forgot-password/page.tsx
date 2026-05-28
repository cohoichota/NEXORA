'use client';

import { Button } from '@nexora/ui';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for forgot password
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-indigo-500/5 ring-1 ring-slate-200 dark:ring-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reset password</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          {isSent
            ? 'We have sent a reset link to your email.'
            : 'Enter your email to receive a password reset link.'}
        </p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 rounded-xl text-md shadow-lg shadow-indigo-500/20"
          >
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      ) : (
        <div className="space-y-5">
          <Button
            variant="outline"
            className="w-full py-6 rounded-xl text-md"
            onClick={() => setIsSent(false)}
          >
            Try another email
          </Button>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Remember your password?{' '}
        <Link
          href="/login"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
