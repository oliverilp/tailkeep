import { redirect } from 'next/navigation';

function Dashboard() {
  redirect('/dashboard/downloads');
}

export default Dashboard;
