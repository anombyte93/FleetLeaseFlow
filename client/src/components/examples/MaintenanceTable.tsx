import { MaintenanceTable } from '../maintenance-table';

export default function MaintenanceTableExample() {
  const records = [
    {
      id: '1',
      vehicleId: 'vehicle-1',
      maintenanceType: 'oil_change',
      description: 'Regular oil and filter change',
      cost: '89.99',
      serviceDate: new Date('2024-09-15'),
      nextDueDate: new Date('2024-12-15'),
      nextDueOdometer: 48000,
      status: 'completed' as const,
      performedBy: 'AutoCare Service Center',
      parts: null,
    },
    {
      id: '2',
      vehicleId: 'vehicle-1',
      maintenanceType: 'inspection',
      description: 'Annual safety inspection',
      cost: '150.00',
      serviceDate: new Date('2024-10-01'),
      nextDueDate: new Date('2025-10-01'),
      nextDueOdometer: null,
      status: 'scheduled' as const,
      performedBy: null,
      parts: null,
    },
  ];

  return <MaintenanceTable records={records} />;
}
