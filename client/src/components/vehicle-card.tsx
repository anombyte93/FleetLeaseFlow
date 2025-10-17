import { Car, Calendar, Gauge, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VehicleWithContract } from "@shared/schema";
import { Link } from "wouter";

interface VehicleCardProps {
  vehicle: VehicleWithContract;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
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

  const registrationSoon = isRenewalSoon(vehicle.registrationExpiry);
  const insuranceSoon = isRenewalSoon(vehicle.insuranceExpiry);

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" data-testid={`text-vehicle-${vehicle.registrationNumber}`}>
                {vehicle.registrationNumber}
              </h3>
              <p className="text-sm text-muted-foreground">
                {vehicle.make} {vehicle.model} {vehicle.year}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(vehicle.status)}>
            {vehicle.status}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Odometer:</span>
            <span className="font-medium">{vehicle.odometer.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Registration:</span>
            <span className={`font-medium ${registrationSoon ? 'text-yellow-600 dark:text-yellow-500' : ''}`}>
              {new Date(vehicle.registrationExpiry).toLocaleDateString()}
            </span>
            {registrationSoon && <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Insurance:</span>
            <span className={`font-medium ${insuranceSoon ? 'text-yellow-600 dark:text-yellow-500' : ''}`}>
              {new Date(vehicle.insuranceExpiry).toLocaleDateString()}
            </span>
            {insuranceSoon && <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />}
          </div>
        </div>

        <Link href={`/vehicles/${vehicle.id}`}>
          <Button variant="outline" className="w-full" data-testid={`button-view-vehicle-${vehicle.id}`}>
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
