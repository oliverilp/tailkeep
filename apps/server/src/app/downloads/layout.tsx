import { getProgressesAction } from '@/server/data/get-progresses';
import Downloads from './downloads';

export async function Dashboard() {
  const progressList = await getProgressesAction();

  return (
    <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Downloads items={progressList} />
    </main>
  );
}

export default Dashboard;
