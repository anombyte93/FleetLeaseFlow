import { useRoute, Link } from "wouter";
import { ArrowLeft, Gauge, Calendar, FileText, Wrench, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaintenanceTable } from "@/components/maintenance-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import fleetVehicleUrl from "@assets/generated_images/Fleet_vehicle_hero_image_ca63db69.png";

export default function VehicleDetail() {
  const [, params] = useRoute("/vehicles/:id");

  //todo: remove mock functionality - fetch real vehicle data from API using params.id
  const vehicle = {
    id: params?.id || '1',
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
    tyreInfo: 'Michelin LTX M/S2 - Front: 8mm, Rear: 9mm',
  };

  const contract = {
    id: 'contract-1',
    contractNumber: 'LC-2024-001',
    clientId: 'client-1',
    clientName: 'Acme Logistics Inc.',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2027-01-01'),
    monthlyPayment: '1200.00',
    residualValue: '25000.00',
    status: 'active' as const,
  };

  const maintenanceRecords = [
    {
      id: '1',
      vehicleId: vehicle.id,
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
      vehicleId: vehicle.id,
      maintenanceType: 'tire_rotation',
      description: 'Tire rotation and balance',
      cost: '65.00',
      serviceDate: new Date('2024-08-20'),
      nextDueDate: new Date('2024-11-20'),
      nextDueOdometer: 50000,
      status: 'completed' as const,
      performedBy: 'Tire Express',
      parts: null,
    },
    {
      id: '3',
      vehicleId: vehicle.id,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-chart-2/10 text-chart-2';
      case 'maintenance':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-500';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isRenewalSoon = (date: Date) => {
    const daysUntil = Math.floor((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil >= 0;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold" data-testid="text-vehicle-title">
            {vehicle.registrationNumber}
          </h1>
          <p className="text-muted-foreground">
            {vehicle.make} {vehicle.model} {vehicle.year}
          </p>
        </div>
        <Badge className={getStatusColor(vehicle.status)}>
          {vehicle.status}
        </Badge>
      </div>

      <Card className="overflow-hidden">
        <img
          src={fleetVehicleUrl}
          alt="Vehicle"
          className="w-full h-64 object-cover"
        />
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Gauge className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Vehicle Information</h3>
            </div>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-muted-foreground">VIN</dt>
                <dd className="font-mono text-sm mt-1">{vehicle.vin}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Type</dt>
                <dd className="font-medium mt-1 capitalize">{vehicle.vehicleType}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Odometer</dt>
                <dd className="font-medium mt-1">{vehicle.odometer.toLocaleString()} km</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Tire Condition</dt>
                <dd className="text-sm mt-1">{vehicle.tyreInfo}</dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Renewal Dates</h3>
            </div>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-muted-foreground">Registration Expiry</dt>
                <dd className={`font-medium mt-1 flex items-center gap-2 ${isRenewalSoon(vehicle.registrationExpiry) ? 'text-yellow-600 dark:text-yellow-500' : ''}`}>
                  {new Date(vehicle.registrationExpiry).toLocaleDateString()}
                  {isRenewalSoon(vehicle.registrationExpiry) && (
                    <AlertCircle className="h-4 w-4" />
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Insurance Expiry</dt>
                <dd className={`font-medium mt-1 flex items-center gap-2 ${isRenewalSoon(vehicle.insuranceExpiry) ? 'text-yellow-600 dark:text-yellow-500' : ''}`}>
                  {new Date(vehicle.insuranceExpiry).toLocaleDateString()}
                  {isRenewalSoon(vehicle.insuranceExpiry) && (
                    <AlertCircle className="h-4 w-4" />
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Lease Contract</h3>
            </div>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-muted-foreground">Contract Number</dt>
                <dd className="font-mono text-sm mt-1">{contract.contractNumber}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Client</dt>
                <dd className="font-medium mt-1">{contract.clientName}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Monthly Payment</dt>
                <dd className="font-medium mt-1">${parseFloat(contract.monthlyPayment).toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Contract End</dt>
                <dd className="font-medium mt-1">{new Date(contract.endDate).toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <Tabs defaultValue="maintenance" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Vehicle History</h3>
              <TabsList>
                <TabsTrigger value="maintenance" data-testid="tab-maintenance">
                  <Wrench className="h-4 w-4 mr-2" />
                  Maintenance
                </TabsTrigger>
                <TabsTrigger value="insurance" data-testid="tab-insurance">
                  <FileText className="h-4 w-4 mr-2" />
                  Insurance
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="maintenance" className="mt-4">
              <MaintenanceTable records={maintenanceRecords} />
            </TabsContent>
            <TabsContent value="insurance" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                Insurance records will be displayed here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
