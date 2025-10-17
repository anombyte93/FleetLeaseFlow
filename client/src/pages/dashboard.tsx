import { Truck, FileText, Wrench, AlertTriangle, Calendar } from "lucide-react";
import { SummaryCard } from "@/components/summary-card";
import { AlertPanel } from "@/components/alert-panel";
import { CostChart } from "@/components/cost-chart";
import { VehicleDistributionChart } from "@/components/vehicle-distribution-chart";
import { VehicleCard } from "@/components/vehicle-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Dashboard() {
  //todo: remove mock functionality - replace with real data from API
  const mockAlerts = [
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
    {
      id: '3',
      type: 'contract' as const,
      severity: 'info' as const,
      message: '2 contracts expiring in next 90 days',
      count: 2,
      dueDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
    },
  ];

  const mockCostData = [
    { month: 'Jan', cost: 4200 },
    { month: 'Feb', cost: 3800 },
    { month: 'Mar', cost: 5100 },
    { month: 'Apr', cost: 4600 },
    { month: 'May', cost: 5400 },
    { month: 'Jun', cost: 4900 },
  ];

  const mockDistributionData = [
    { name: 'Trucks', value: 48 },
    { name: 'Vans', value: 32 },
    { name: 'Cars', value: 28 },
    { name: 'Equipment', value: 16 },
  ];

  const mockVehicles = [
    {
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
    },
    {
      id: '2',
      registrationNumber: 'XYZ-5678',
      make: 'Mercedes',
      model: 'Sprinter',
      year: 2023,
      vin: 'WD3PE8CD5K5123456',
      vehicleType: 'van',
      odometer: 28000,
      leaseContractId: 'contract-2',
      registrationExpiry: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      insuranceExpiry: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'active' as const,
      contract: {
        id: 'contract-2',
        contractNumber: 'LC-2024-002',
        clientId: 'client-1',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2027-03-01'),
        monthlyPayment: '950.00',
        residualValue: '22000.00',
        status: 'active' as const,
      },
      maintenanceRecords: [],
    },
    {
      id: '3',
      registrationNumber: 'DEF-9012',
      make: 'Toyota',
      model: 'Hilux',
      year: 2021,
      vin: 'JTDKB20U197123456',
      vehicleType: 'truck',
      odometer: 67000,
      leaseContractId: 'contract-3',
      registrationExpiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      insuranceExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      status: 'maintenance' as const,
      contract: {
        id: 'contract-3',
        contractNumber: 'LC-2023-015',
        clientId: 'client-2',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2026-06-01'),
        monthlyPayment: '1100.00',
        residualValue: '18000.00',
        status: 'active' as const,
      },
      maintenanceRecords: [],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fleet Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your fleet assets and operations</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles, contracts..."
            className="pl-9"
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Assets"
          value="124"
          icon={Truck}
          trend={{ value: 5.2, isPositive: true }}
        />
        <SummaryCard
          title="Active Contracts"
          value="89"
          icon={FileText}
          trend={{ value: 2.1, isPositive: true }}
        />
        <SummaryCard
          title="Renewals Due (30d)"
          value="8"
          icon={Calendar}
        />
        <SummaryCard
          title="Overdue Maintenance"
          value="5"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CostChart data={mockCostData} />
          <VehicleDistributionChart data={mockDistributionData} />
        </div>
        <div>
          <AlertPanel alerts={mockAlerts} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Vehicles</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
}
