import { getDownloads } from '@/server/data/get-downloads';
import Downloads from './page';
import NoSsrWrapper from '@/components/no-ssr-wrapper';

export async function DownloadsLayout() {
  const downloads = await getDownloads();

  return (
    <main className="grid items-start gap-4 p-4 sm:px-8 sm:py-0 md:gap-8">
      <NoSsrWrapper>
        <Downloads items={downloads} />
      </NoSsrWrapper>
    </main>
  );
}

export default DownloadsLayout;
