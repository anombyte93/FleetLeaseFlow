import { Wrench } from "lucide-react";
import { MaintenanceTable } from "@/components/maintenance-table";
import { Card } from "@/components/ui/card";

export default function Maintenance() {
  //todo: remove mock functionality - fetch real maintenance records from API
  const mockRecords = [
    {
      id: '1',
      vehicleId: 'vehicle-1',
      maintenanceType: 'oil_change',
      description: 'Regular oil and filter change - ABC-1234',
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
      vehicleId: 'vehicle-2',
      maintenanceType: 'inspection',
      description: 'Annual safety inspection - XYZ-5678',
      cost: '150.00',
      serviceDate: new Date('2024-10-01'),
      nextDueDate: new Date('2025-10-01'),
      nextDueOdometer: null,
      status: 'scheduled' as const,
      performedBy: null,
      parts: null,
    },
    {
      id: '3',
      vehicleId: 'vehicle-3',
      maintenanceType: 'tire_rotation',
      description: 'Tire rotation and balance - DEF-9012',
      cost: '65.00',
      serviceDate: new Date('2024-08-20'),
      nextDueDate: new Date('2024-11-20'),
      nextDueOdometer: 50000,
      status: 'overdue' as const,
      performedBy: 'Tire Express',
      parts: null,
    },
    {
      id: '4',
      vehicleId: 'vehicle-1',
      maintenanceType: 'repair',
      description: 'Brake pad replacement - ABC-1234',
      cost: '320.00',
      serviceDate: new Date('2024-07-10'),
      nextDueDate: null,
      nextDueOdometer: null,
      status: 'completed' as const,
      performedBy: 'AutoCare Service Center',
      parts: 'Front brake pads, Rear brake pads',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Maintenance Records</h1>
        <p className="text-muted-foreground mt-1">Track and manage vehicle maintenance</p>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">All Maintenance Records</h2>
          </div>
          <MaintenanceTable records={mockRecords} />
        </div>
      </Card>
    </div>
  );
}
