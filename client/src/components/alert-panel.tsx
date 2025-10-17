import { AlertTriangle, Info, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@shared/schema";

interface AlertPanelProps {
  alerts: Alert[];
}

export function AlertPanel({ alerts }: AlertPanelProps) {
  const getAlertIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-500/20';
      case 'info':
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Alerts & Notifications</h3>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active alerts</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                data-testid={`alert-${alert.type}`}
              >
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.severity)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    {alert.dueDate && (
                      <p className="text-xs mt-1 opacity-80">
                        Due: {new Date(alert.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {alert.type}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
