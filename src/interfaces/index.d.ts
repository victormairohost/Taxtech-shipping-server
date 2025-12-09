// import { Document, Types } from "mongoose";

// export interface CustomErrorTypes {
//   statusCode: number;
//   message: string;
// }

// export enum ShipmentStatus {
//   PENDING = 'pending',
//   IN_TRANSIT = 'in_transit',
//   DELIVERED = 'delivered',
//   CANCELLED = 'cancelled'
// }

// export interface ShipmentTypes extends Document {
//   trackingNumber: string;
//   senderName: string;
//   receiverName: string;
//   origin: string;
//   destination: string;
//   status: ShipmentStatus;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface CreateShipmentTypes {
//   trackingNumber: string;
//   senderName: string;
//   receiverName: string;
//   origin: string;
//   destination: string;
//   status?: ShipmentStatus;
// }

// export interface UpdateShipmentTypes {
//   trackingNumber?: string;
//   senderName?: string;
//   receiverName?: string;
//   origin?: string;
//   destination?: string;
//   status?: ShipmentStatus;
// }

// export interface ShipmentQueryTypes {
//   page?: number;
//   limit?: number;
//   status?: ShipmentStatus;
//   trackingNumber?: string;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
// }

// export interface PaginatedResponseTypes<T> {
//   success: boolean;
//   message?: string;
//   data?: T;
//   error?: string;
//   errors?: ValidationErrorTypes[];
//   meta?: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

// export interface ValidationErrorTypes {
//   field: string;
//   message: string;
// }

// export interface ApiResponseTypes<T> {
//   success: boolean;
//   message?: string;
//   data?: T;
//   error?: string;
// }

export * from "./shipment.interface.js";