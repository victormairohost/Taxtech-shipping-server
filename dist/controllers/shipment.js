import mongoose from "mongoose";
import { Shipment } from "../models/shipment.js";
import HTTP_STATUS_CODE from "../utils/statusCodes.js";
import { CustomError } from "../utils/helpers.js";
import { ShipmentStatus } from "../interfaces/shipment.interface.js";
import { successResponse, errorResponse } from "../utils/responses.js";
// Reusable input validator
const validateRequired = (body, fields) => {
    fields.forEach(field => {
        if (!body[field] || body[field].trim() === "") {
            throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, `${field} is required and cannot be empty`);
        }
    });
};
// Validate ObjectId
const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, "Invalid ID format");
    }
};
// 1. CREATE SHIPMENT
export const createShipment = async (req, res) => {
    try {
        validateRequired(req.body, ["senderName", "receiverName", "origin", "destination"]);
        const shipment = await Shipment.create({
            senderName: req.body.senderName,
            receiverName: req.body.receiverName,
            origin: req.body.origin,
            destination: req.body.destination,
        });
        return successResponse(res, HTTP_STATUS_CODE.CREATED, "Shipment created successfully", shipment);
    }
    catch (err) {
        if (err instanceof CustomError) {
            return errorResponse(res, err.statusCode, err.message);
        }
        return errorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, "Error creating shipment");
    }
};
// 2. GET ALL SHIPMENTS
// @ts-ignore
export const getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find().sort({ createdAt: -1 });
        return successResponse(res, HTTP_STATUS_CODE.OK, "Shipments fetched successfully", { count: shipments.length, shipments });
    }
    catch {
        return errorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, "Error fetching shipments");
    }
};
// 3. GET SHIPMENT BY ID
export const getShipmentById = async (req, res) => {
    try {
        validateObjectId(req.params.id);
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) {
            throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Shipment not found");
        }
        return successResponse(res, HTTP_STATUS_CODE.OK, "Shipment fetched successfully", shipment);
    }
    catch (err) {
        if (err instanceof CustomError) {
            return errorResponse(res, err.statusCode, err.message);
        }
        return errorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, "Error fetching shipment");
    }
};
// 4. UPDATE SHIPMENT
export const updateShipment = async (req, res) => {
    try {
        validateObjectId(req.params.id);
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) {
            throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Shipment not found");
        }
        // Block if status is delivered/cancelled
        if (!shipment.canUpdate()) {
            throw new CustomError(HTTP_STATUS_CODE.FORBIDDEN, "Cannot update delivered or cancelled shipment");
        }
        // Body must include status
        if (!req.body.status) {
            throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, "Status is required");
        }
        // Validate enum
        const validStatuses = Object.values(ShipmentStatus);
        if (!validStatuses.includes(req.body.status)) {
            throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, `Invalid status. Allowed: ${validStatuses.join(", ")}`);
        }
        shipment.status = req.body.status;
        await shipment.save();
        return successResponse(res, HTTP_STATUS_CODE.OK, "Shipment status updated successfully", shipment);
    }
    catch (err) {
        console.error("UPDATE ERROR:", err);
        if (err instanceof CustomError) {
            return errorResponse(res, err.statusCode, err.message);
        }
        return errorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, "Error updating shipment");
    }
};
// 5. DELETE SHIPMENT
export const deleteShipment = async (req, res) => {
    try {
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
    }
    catch (err) {
        if (err instanceof CustomError) {
            return errorResponse(res, err.statusCode, err.message);
        }
        return errorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, "Error deleting shipment");
    }
};
//# sourceMappingURL=shipment.js.map