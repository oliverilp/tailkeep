import { ListVideo } from 'lucide-react';
import React from 'react';

function Subscriptions() {
  return (
    <main className="grid h-full w-full place-items-center">
      <div className="flex w-full flex-col items-center">
        <ListVideo className="mb-2 h-12 w-12 text-muted-foreground" />
        <div className="font-semibold">Subscriptions page</div>
        <div className="text-muted-foreground">
          This feature is coming soon™.
        </div>
      </div>
    </main>
  );
}

export default Subscriptions;
