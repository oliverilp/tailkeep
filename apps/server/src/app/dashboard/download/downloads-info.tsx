import React from 'react';
import { Clock, Download, Check, TriangleAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { QueueInfo } from '@/schemas/queue-info';
import { cn } from '@/lib/utils';

interface DownloadsInfoProps {
  queueInfo: QueueInfo;
}

function DownloadsInfo({
  queueInfo: { queue, active, finished, failed }
}: DownloadsInfoProps) {
  const cards = [
    {
      title: 'Queue',
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      value: queue,
      description: 'Waiting for processing.'
    },
    {
      title: 'Active',
      icon: <Download className="h-4 w-4 text-muted-foreground" />,
      value: active,
      description: 'In progress.'
    },
    {
      title: 'Finished',
      icon: <Check className="h-4 w-4 text-muted-foreground" />,
      value: finished,
      description: 'Completed successfully.'
    },
    {
      title: 'Failed',
      icon: <TriangleAlert className="h-4 w-4 text-muted-foreground" />,
      value: failed,
      description: 'Did not finish.'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
      {cards.map((card, index) => (
        <Card
          className={cn('hidden sm:block', { block: index <= 1 })}
          key={card.title}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DownloadsInfo;
