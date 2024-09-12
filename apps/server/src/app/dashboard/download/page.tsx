import { getDownloads } from '@/server/data/get-downloads';
import NoSsrWrapper from '@/components/no-ssr-wrapper';
import Downloads from './downloads';

async function DownloadsPage() {
  const downloads = await getDownloads();

  return (
    <main className="mb-16 grid items-start gap-4 p-4 sm:px-8 sm:py-0 md:gap-8">
      <NoSsrWrapper>
        <Downloads items={downloads} />
      </NoSsrWrapper>
    </main>
  );
}

export default DownloadsPage;
