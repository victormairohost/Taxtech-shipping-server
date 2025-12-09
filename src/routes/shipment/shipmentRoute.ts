// src/routes/shipment.routes.ts
import express from "express";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
  getShipmentsByStatus
} from "../../controllers/shipment.js";

const router = express.Router();

// POST /api/shipments - Create shipment
router.post("/", createShipment);

// GET /api/shipments - Get all shipments
router.get("/", getAllShipments);

// GET /api/shipments/status/:status - Get shipments by status
router.get("/status/:status", getShipmentsByStatus);

// GET /api/shipments/:id - Get single shipment
router.get("/:id", getShipmentById);

// PUT /api/shipments/:id - Update shipment
router.put("/:id", updateShipment);

// DELETE /api/shipments/:id - Delete shipment
router.delete("/:id", deleteShipment);

export default router;