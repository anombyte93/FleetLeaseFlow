import { VehicleDistributionChart } from '../vehicle-distribution-chart';

export default function VehicleDistributionChartExample() {
  const data = [
    { name: 'Trucks', value: 48 },
    { name: 'Vans', value: 32 },
    { name: 'Cars', value: 28 },
    { name: 'Equipment', value: 16 },
  ];

  return <VehicleDistributionChart data={data} />;
}
