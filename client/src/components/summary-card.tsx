import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function SummaryCard({ title, value, icon: Icon, trend, className }: SummaryCardProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {trend && (
            <div className={`text-sm font-medium ${trend.isPositive ? 'text-chart-2' : 'text-destructive'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</p>
        </div>
      </div>
    </Card>
  );
}
