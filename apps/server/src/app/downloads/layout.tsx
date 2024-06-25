import Downloads from './downloads';
import { Example } from './example';
import Header from './header';
import Sidenav from './sidenav';

export function Dashboard() {
  return (
    // <Example />
    <div className="bg-muted/40 flex min-h-screen w-full flex-col">
      <Sidenav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Downloads />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
