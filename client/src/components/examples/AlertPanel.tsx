import { AlertPanel } from '../alert-panel';

export default function AlertPanelExample() {
  const alerts = [
    {
      id: '1',
      type: 'renewal' as const,
      severity: 'warning' as const,
      message: '3 vehicles need registration renewal within 30 days',
      count: 3,
      dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'maintenance' as const,
      severity: 'critical' as const,
      message: '5 maintenance tasks are overdue',
      count: 5,
    },
  ];

  return <AlertPanel alerts={alerts} />;
}
