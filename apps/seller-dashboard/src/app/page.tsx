import { Card, CardContent, CardHeader, CardTitle, Button } from '@nexora/ui';
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboardPage() {
  const metrics = [
    {
      title: 'Monthly Revenue',
      value: '$12,450.00',
      change: '+15% from last month',
      icon: DollarSign,
    },
    {
      title: 'Active Orders',
      value: '24',
      change: '12 pending fulfillment',
      icon: ShoppingCart,
    },
    {
      title: 'Total Products',
      value: '142',
      change: '3 out of stock',
      icon: Package,
    },
    {
      title: 'Store Views',
      value: '3,421',
      change: '+42% from last week',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Here's what's happening with your store today.
          </p>
        </div>
        <Button asChild>
          <Link href="/products/new">Add Product</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Package className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Order #ORD-{3000 + i}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Standard Shipping</p>
                  </div>
                  <div className="ml-auto font-medium text-primary">Pending Fulfillment</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-md" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Wireless Headphones {i}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {120 - i * 10} sales
                    </p>
                  </div>
                  <div className="ml-auto font-medium">${99 + i}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
