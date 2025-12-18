import mongoose from "mongoose";
import { Shipment } from "../models/shipment.js";
import HTTP_STATUS_CODE from "../utils/statusCodes.js";
import { CustomError } from "../utils/helpers.js";
import { ShipmentStatus } from "../interfaces/shipment.interface.js";
import { successResponse } from "../utils/responses.js"; // Remove errorResponse import
const validateRequired = (body, fields) => {
    fields.forEach(field => {
        if (!body[field] || body[field].trim() === "") {
            throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, `${field} is required and cannot be empty`);
        }
    });
};
const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, "Invalid ID format");
    }
};
// 1. CREATE SHIPMENT
export const createShipment = async (req, res) => {
    validateRequired(req.body, ["senderName", "receiverName", "origin", "destination"]);
    const shipment = await Shipment.create({
        senderName: req.body.senderName,
        receiverName: req.body.receiverName,
        origin: req.body.origin,
        destination: req.body.destination,
    });
    return successResponse(res, HTTP_STATUS_CODE.CREATED, "Shipment created successfully", shipment);
};
// @ts-ignore
export const getAllShipments = async (req, res) => {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    return successResponse(res, HTTP_STATUS_CODE.OK, "Shipments fetched successfully", { count: shipments.length, shipments });
};
// 3. GET SHIPMENT BY ID
export const getShipmentById = async (req, res) => {
    validateObjectId(req.params.id);
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
        throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Shipment not found");
    }
    return successResponse(res, HTTP_STATUS_CODE.OK, "Shipment fetched successfully", shipment);
};
// 4. UPDATE SHIPMENT
export const updateShipment = async (req, res) => {
    validateObjectId(req.params.id);
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
        throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Shipment not found");
    }
    if (!shipment.canUpdate()) {
        throw new CustomError(HTTP_STATUS_CODE.FORBIDDEN, "Cannot update delivered or cancelled shipment");
    }
    if (!req.body.status) {
        throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, "Status is required");
    }
    const validStatuses = Object.values(ShipmentStatus);
    if (!validStatuses.includes(req.body.status)) {
        throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, `Invalid status. Allowed: ${validStatuses.join(", ")}`);
    }
    shipment.status = req.body.status;
    await shipment.save();
    return successResponse(res, HTTP_STATUS_CODE.OK, "Shipment status updated successfully", shipment);
};
// 5. DELETE SHIPMENT
export const deleteShipment = async (req, res) => {
    validateObjectId(req.params.id);
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
        throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Shipment not found");
    }
    if (!shipment.canDelete()) {
        throw new CustomError(HTTP_STATUS_CODE.FORBIDDEN, "Only pending shipments can be deleted");
    }
    await shipment.deleteOne();
    return successResponse(res, HTTP_STATUS_CODE.OK, "Shipment deleted successfully");
};
//# sourceMappingURL=shipment.js.map