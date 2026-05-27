'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@nexora/ui';
import type { Product } from '@nexora/shared-types';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem, openCart } = useCartStore();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: () => apiClient.get<Product>(`/products/${params.slug}`),
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex animate-pulse gap-8">
        <div className="w-1/2 h-[500px] bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
        <div className="w-1/2 space-y-6">
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg w-3/4"></div>
          <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/4"></div>
          <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Product not found</h2>
        <p className="mt-2 text-slate-500">The product you are looking for does not exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Determine exact price if variants have price modifiers
    const price = Number(product.price);
    
    addItem({
      id: selectedVariant ? `${product.id}-${selectedVariant}` : product.id,
      productId: product.id,
      name: product.name,
      price,
      quantity,
      image: product.images?.[0]?.url,
      sku: product.sku,
    });
    
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <img
              src={product.images?.[0]?.url || 'https://via.placeholder.com/800'}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {product.name}
          </h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-indigo-600 dark:text-indigo-400 font-medium">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-slate-700 dark:text-slate-300">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-900 dark:text-white">Quantity</span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  -
                </button>
                <span className="px-4 font-medium text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  +
                </button>
              </div>
            </div>

            <Button 
              onClick={handleAddToCart}
              className="w-full max-w-xs py-6 text-lg rounded-xl shadow-xl shadow-indigo-500/20"
              disabled={!product.isAvailable}
            >
              {product.isAvailable ? 'Add to bag' : 'Out of stock'}
            </Button>
            
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free shipping on all continental US orders.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
