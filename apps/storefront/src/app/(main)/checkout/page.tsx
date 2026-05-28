'use client';

import { Button } from '@nexora/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalAmount = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;

    try {
      // Create the order via the API Gateway (routes to order-service)
      await apiClient.post('/orders', {
        userId: user.id,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: Number(item.price),
        })),
        totalAmount,
        shippingAddress: `${address}, ${city}`,
      });

      // Clear the local cart
      clearCart();

      // Redirect to a success page or profile orders
      router.push('/profile');
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to place order.');
    } finally {
      setIsLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-slate-500 mb-8">Add some items before proceeding to checkout.</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <form
            id="checkout-form"
            onSubmit={(e) => {
              handleCheckout(e).catch(console.error);
            }}
            className="space-y-8"
          >
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              {!user ? (
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-xl mb-4">
                  <p>
                    You must be signed in to checkout.{' '}
                    <Link href="/login" className="font-bold underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      readOnly
                      value={user.email}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method (Mocked) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-semibold mb-2">Payment</h2>
              <p className="text-sm text-slate-500 mb-6">
                Payment processing is handled automatically via Saga choreography in the backend.
              </p>
              <div className="p-4 border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/10 dark:border-indigo-500/30 rounded-xl flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span className="font-medium text-indigo-900 dark:text-indigo-300">
                  Mock Stripe Integration Active
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 mt-10 lg:mt-0">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-4 border-t border-slate-200 dark:border-slate-700">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                form="checkout-form"
                disabled={isLoading || !user}
                className="w-full py-6 text-lg rounded-xl shadow-xl shadow-indigo-500/20"
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
