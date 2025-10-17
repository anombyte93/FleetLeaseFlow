import { MaintenanceRecord } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MaintenanceTableProps {
  records: MaintenanceRecord[];
}

export function MaintenanceTable({ records }: MaintenanceTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-chart-2/10 text-chart-2';
      case 'scheduled':
        return 'bg-primary/10 text-primary';
      case 'overdue':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getMaintenanceTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Service Date</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No maintenance records found
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id} data-testid={`row-maintenance-${record.id}`}>
                <TableCell className="font-medium">
                  {getMaintenanceTypeLabel(record.maintenanceType)}
                </TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{new Date(record.serviceDate).toLocaleDateString()}</TableCell>
                <TableCell className="font-mono">${parseFloat(record.cost).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
