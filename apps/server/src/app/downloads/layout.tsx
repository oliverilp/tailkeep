import { getProgresses } from '@/server/data/get-progresses';
import Downloads from './page';
import NoSsrWrapper from '@/components/no-ssr-wrapper';

export async function DownloadsLayout() {
  const progressList = await getProgresses();

  return (
    <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <NoSsrWrapper>
        <Downloads items={progressList} />
      </NoSsrWrapper>
    </main>
  );
}

export default DownloadsLayout;
