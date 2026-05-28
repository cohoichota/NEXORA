'use client';

import type { Product } from '@nexora/shared-types';
import { Button } from '@nexora/ui';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

import { apiClient } from '@/lib/api/client';

interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState<string>('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, categoryId],
    queryFn: () =>
      apiClient.get<ProductsResponse>(
        `/products?page=${page}&limit=12${categoryId ? `&categoryId=${categoryId}` : ''}`,
      ),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shop Products</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Browse our latest collection of premium products
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-4">
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
          >
            <option value="">All Categories</option>
            {/* Hardcoded for demo, normally fetched from /categories */}
            <option value="cat_1">Electronics</option>
            <option value="cat_2">Fashion</option>
            <option value="cat_3">Home & Living</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl h-80"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-2xl">
          <p className="text-red-600 dark:text-red-400 font-medium">Failed to load products.</p>
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400">No products found for this category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.data.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 xl:aspect-h-8 xl:aspect-w-7 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl hover:shadow-indigo-500/10 group-hover:border-indigo-200 dark:group-hover:border-indigo-900/50">
                  <img
                    src={product.images[0]?.url || 'https://via.placeholder.com/400'}
                    alt={product.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.isAvailable && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {data && data.meta.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Page {page} of {data.meta.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
                disabled={page === data.meta.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
