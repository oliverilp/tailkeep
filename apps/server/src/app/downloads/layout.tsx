import { getProgressesAction } from '@/server/data/get-progresses';
import Downloads from './downloads';
import Header from './header';
import Sidenav from './sidenav';

export async function Dashboard() {
  const progressList = await getProgressesAction();

  return (
    <div className="bg-muted/40 flex min-h-screen w-full">
      <Sidenav />
      <div className="flex grow flex-col sm:gap-4 sm:py-4">
        <Header />
        <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Downloads items={progressList} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
