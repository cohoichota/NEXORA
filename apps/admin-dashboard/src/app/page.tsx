import { Card, CardContent, CardHeader, CardTitle } from '@nexora/ui';
import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1% from last month',
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: '+2350',
      change: '+180.1% from last month',
      icon: Users,
    },
    {
      title: 'Sales',
      value: '+12,234',
      change: '+19% from last month',
      icon: ShoppingCart,
    },
    {
      title: 'Active Now',
      value: '+573',
      change: '+201 since last hour',
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
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
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">New Order #{1000 + i}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      User completed checkout
                    </p>
                  </div>
                  <div className="ml-auto font-medium">Just now</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Platform Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">API Gateway</span>
                <span className="flex items-center gap-2 text-sm text-success">
                  <span className="h-2 w-2 rounded-full bg-success"></span> Healthy
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Database</span>
                <span className="flex items-center gap-2 text-sm text-success">
                  <span className="h-2 w-2 rounded-full bg-success"></span> Healthy
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Search Cluster</span>
                <span className="flex items-center gap-2 text-sm text-success">
                  <span className="h-2 w-2 rounded-full bg-success"></span> Healthy
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
