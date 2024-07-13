import React from 'react';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Login from './login';

async function LoginPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/dashboard');
  }

  const isDemo = process.env.DEMO_MODE === 'true';

  return (
    <div className="h-full w-full">
      <Login isDemo={isDemo} />
    </div>
  );
}

export default LoginPage;
