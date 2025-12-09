import { Document } from "mongoose";
export declare enum ShipmentStatus {
    PENDING = "pending",
    IN_TRANSIT = "in_transit",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export interface ShipmentTypes extends Document {
    trackingNumber: string;
    senderName: string;
    receiverName: string;
    origin: string;
    destination: string;
    status: ShipmentStatus;
    createdAt: Date;
    updatedAt: Date;
}
