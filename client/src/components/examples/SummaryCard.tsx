import { SummaryCard } from '../summary-card';
import { Truck } from 'lucide-react';

export default function SummaryCardExample() {
  return (
    <SummaryCard
      title="Total Assets"
      value="124"
      icon={Truck}
      trend={{ value: 5.2, isPositive: true }}
    />
  );
}
