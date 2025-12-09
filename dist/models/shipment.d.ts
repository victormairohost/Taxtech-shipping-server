import { Model } from "mongoose";
import { ShipmentTypes, ShipmentStatus } from "../interfaces/shipment.interface.js";
interface ShipmentDocument extends ShipmentTypes {
    canUpdate(): boolean;
    canDelete(): boolean;
}
interface ShipmentModel extends Model<ShipmentDocument> {
    doesTrackingNumberExist(trackingNumber: string): Promise<boolean>;
    findByStatus(status: ShipmentStatus): Promise<ShipmentDocument[]>;
}
declare const Shipment: ShipmentModel;
export { Shipment };
