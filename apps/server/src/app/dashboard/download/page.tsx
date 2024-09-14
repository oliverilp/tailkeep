import { getDownloads } from '@/server/data/get-downloads';
import { getQueueInfo } from '@/server/data/get-queue-info';
import NoSsrWrapper from '@/components/no-ssr-wrapper';
import Downloads from './downloads';

async function DownloadsPage() {
  const [downloads, queueInfo] = await Promise.all([
    getDownloads(),
    getQueueInfo()
  ]);
  const dashboardData = { queueInfo, downloads };

  return (
    <main className="mb-16 grid items-start gap-4 p-4 sm:px-8 sm:py-0 md:gap-8">
      <NoSsrWrapper>
        <Downloads dashboardData={dashboardData} />
      </NoSsrWrapper>
    </main>
  );
}

export default DownloadsPage;
