import { VehicleCard } from '../vehicle-card';

export default function VehicleCardExample() {
  const vehicle = {
    id: '1',
    registrationNumber: 'ABC-1234',
    make: 'Ford',
    model: 'F-150',
    year: 2022,
    vin: '1FTFW1E50MFA12345',
    vehicleType: 'truck',
    odometer: 45000,
    leaseContractId: 'contract-1',
    registrationExpiry: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    insuranceExpiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active' as const,
    contract: {
      id: 'contract-1',
      contractNumber: 'LC-2024-001',
      clientId: 'client-1',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2027-01-01'),
      monthlyPayment: '1200.00',
      residualValue: '25000.00',
      status: 'active' as const,
    },
    maintenanceRecords: [],
  };

  return <VehicleCard vehicle={vehicle} />;
}
