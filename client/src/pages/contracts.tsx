import { FileText, Building2, Calendar, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Contracts() {
  //todo: remove mock functionality - fetch real contracts from API
  const mockContracts = [
    {
      id: 'contract-1',
      contractNumber: 'LC-2024-001',
      clientName: 'Acme Logistics Inc.',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2027-01-01'),
      monthlyPayment: '1200.00',
      residualValue: '25000.00',
      status: 'active' as const,
      vehicleCount: 1,
    },
    {
      id: 'contract-2',
      contractNumber: 'LC-2024-002',
      clientName: 'Global Transport Ltd.',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2027-03-01'),
      monthlyPayment: '950.00',
      residualValue: '22000.00',
      status: 'active' as const,
      vehicleCount: 1,
    },
    {
      id: 'contract-3',
      contractNumber: 'LC-2023-015',
      clientName: 'Express Delivery Co.',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2026-06-01'),
      monthlyPayment: '1100.00',
      residualValue: '18000.00',
      status: 'active' as const,
      vehicleCount: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-chart-2/10 text-chart-2';
      case 'expired':
        return 'bg-destructive/10 text-destructive';
      case 'grace':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-500';
      case 'terminated':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lease Contracts</h1>
        <p className="text-muted-foreground mt-1">View and manage lease agreements</p>
      </div>

      <div className="grid gap-4">
        {mockContracts.map((contract) => (
          <Card key={contract.id}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" data-testid={`text-contract-${contract.contractNumber}`}>
                      {contract.contractNumber}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {contract.clientName}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(contract.status)}>
                  {contract.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </p>
                  <p className="font-medium">{new Date(contract.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </p>
                  <p className="font-medium">{new Date(contract.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4" />
                    Monthly Payment
                  </p>
                  <p className="font-medium font-mono">${parseFloat(contract.monthlyPayment).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Vehicles</p>
                  <p className="font-medium">{contract.vehicleCount}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" data-testid={`button-view-contract-${contract.id}`}>
                  View Contract Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
