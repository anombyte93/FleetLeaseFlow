import { useState } from "react";
import { VehicleCard } from "@/components/vehicle-card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  //todo: remove mock functionality - fetch real vehicles from API
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
    {
      id: '4',
      registrationNumber: 'GHI-3456',
      make: 'Chevrolet',
      model: 'Silverado',
      year: 2023,
      vin: '1GC4K0EY2PF654321',
      vehicleType: 'truck',
      odometer: 12000,
      leaseContractId: 'contract-4',
      registrationExpiry: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      insuranceExpiry: new Date(Date.now() + 280 * 24 * 60 * 60 * 1000),
      status: 'active' as const,
      contract: {
        id: 'contract-4',
        contractNumber: 'LC-2024-018',
        clientId: 'client-3',
        startDate: new Date('2024-05-01'),
        endDate: new Date('2027-05-01'),
        monthlyPayment: '1350.00',
        residualValue: '28000.00',
        status: 'active' as const,
      },
      maintenanceRecords: [],
    },
  ];

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch = vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vehicles</h1>
        <p className="text-muted-foreground mt-1">Manage and monitor your fleet vehicles</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by registration, make, or model..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-vehicle-search"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" data-testid="button-filter">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No vehicles found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
