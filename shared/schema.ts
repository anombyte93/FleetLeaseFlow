import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("client"), // 'client' or 'admin'
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
});

// Lease Contracts table
export const leaseContracts = pgTable("lease_contracts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractNumber: text("contract_number").notNull().unique(),
  clientId: varchar("client_id").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  monthlyPayment: decimal("monthly_payment", { precision: 10, scale: 2 }).notNull(),
  residualValue: decimal("residual_value", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("active"), // 'active', 'expired', 'grace', 'terminated'
});

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  registrationNumber: text("registration_number").notNull().unique(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  vin: text("vin").notNull().unique(),
  vehicleType: text("vehicle_type").notNull(), // 'truck', 'van', 'car', 'equipment'
  odometer: integer("odometer").notNull().default(0),
  leaseContractId: varchar("lease_contract_id").notNull(),
  registrationExpiry: timestamp("registration_expiry").notNull(),
  insuranceExpiry: timestamp("insurance_expiry").notNull(),
  status: text("status").notNull().default("active"), // 'active', 'maintenance', 'inactive'
});

// Maintenance Records table
export const maintenanceRecords = pgTable("maintenance_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").notNull(),
  maintenanceType: text("maintenance_type").notNull(), // 'oil_change', 'tire_rotation', 'inspection', 'repair'
  description: text("description").notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  serviceDate: timestamp("service_date").notNull(),
  nextDueDate: timestamp("next_due_date"),
  nextDueOdometer: integer("next_due_odometer"),
  status: text("status").notNull().default("completed"), // 'scheduled', 'completed', 'overdue'
  performedBy: text("performed_by"),
  parts: text("parts"), // JSON string of parts used
});

// Alert/Notification type
export type Alert = {
  id: string;
  type: 'renewal' | 'maintenance' | 'contract' | 'inspection';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  vehicleId?: string;
  contractId?: string;
  dueDate?: Date;
  count?: number;
};

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertLeaseContractSchema = createInsertSchema(leaseContracts).omit({ id: true });
export const insertVehicleSchema = createInsertSchema(vehicles).omit({ id: true });
export const insertMaintenanceRecordSchema = createInsertSchema(maintenanceRecords).omit({ id: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLeaseContract = z.infer<typeof insertLeaseContractSchema>;
export type LeaseContract = typeof leaseContracts.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertMaintenanceRecord = z.infer<typeof insertMaintenanceRecordSchema>;
export type MaintenanceRecord = typeof maintenanceRecords.$inferSelect;

// Extended types for UI
export type VehicleWithContract = Vehicle & {
  contract: LeaseContract;
  maintenanceRecords: MaintenanceRecord[];
};

export type DashboardSummary = {
  totalAssets: number;
  activeContracts: number;
  renewalsDue30Days: number;
  renewalsDue60Days: number;
  renewalsDue90Days: number;
  maintenanceOverdue: number;
  contractExpiriesSoon: number;
  alerts: Alert[];
};
