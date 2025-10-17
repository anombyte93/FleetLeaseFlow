import { CostChart } from '../cost-chart';

export default function CostChartExample() {
  const data = [
    { month: 'Jan', cost: 4200 },
    { month: 'Feb', cost: 3800 },
    { month: 'Mar', cost: 5100 },
    { month: 'Apr', cost: 4600 },
    { month: 'May', cost: 5400 },
    { month: 'Jun', cost: 4900 },
  ];

  return <CostChart data={data} />;
}
