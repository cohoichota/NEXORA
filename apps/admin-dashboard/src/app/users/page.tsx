'use client';

import type { User } from '@nexora/shared-types';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@nexora/ui';
import { useEffect, useState } from 'react';

import { apiClient } from '@/lib/api/client';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<{ users: User[] }>('/users')
      .then((res) => setUsers(res.users))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <Button>Add User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Platform Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading users...</p>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800">
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                      ID
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                      Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                      Email
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                      Role
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-500">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800"
                      >
                        <td className="p-4 align-middle">{user.id}</td>
                        <td className="p-4 align-middle font-medium">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="p-4 align-middle">{user.email}</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
