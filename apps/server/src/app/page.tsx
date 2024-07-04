import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/dashboard');
  } else {
    return redirect('/login');
  }

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     Homepage
  //   </main>
  // );
}
