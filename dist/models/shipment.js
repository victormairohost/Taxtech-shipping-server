// src/models/shipment.ts
import mongoose, { Schema } from "mongoose";
import { ShipmentStatus } from "../interfaces/shipment.interface.js";
const shipmentSchema = new Schema({
    trackingNumber: {
        type: String,
        unique: true,
        trim: true,
        index: true
    },
    senderName: {
        type: String,
        required: [true, "Sender name is required"],
        trim: true,
        minlength: [2, "Sender name must be at least 2 characters"],
        maxlength: [100, "Sender name cannot exceed 100 characters"]
    },
    receiverName: {
        type: String,
        required: [true, "Receiver name is required"],
        trim: true,
        minlength: [2, "Receiver name must be at least 2 characters"],
        maxlength: [100, "Receiver name cannot exceed 100 characters"]
    },
    origin: {
        type: String,
        required: [true, "Origin is required"],
        trim: true,
        minlength: [2, "Origin must be at least 2 characters"],
        maxlength: [200, "Origin cannot exceed 200 characters"]
    },
    destination: {
        type: String,
        required: [true, "Destination is required"],
        trim: true,
        minlength: [2, "Destination must be at least 2 characters"],
        maxlength: [200, "Destination cannot exceed 200 characters"]
    },
    status: {
        type: String,
        enum: {
            values: Object.values(ShipmentStatus),
            message: '{VALUE} is not a valid status'
        },
        default: ShipmentStatus.PENDING,
        index: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: false,
        versionKey: false,
        transform: (_doc, ret) => {
            const { _id, ...rest } = ret;
            return {
                ...rest,
                id: _id.toString(),
            };
        },
    },
});
// Add pre-save middleware to generate tracking number
shipmentSchema.pre("save", async function (next) {
    // Only generate if tracking number doesn't exist
    if (!this.trackingNumber) {
        this.trackingNumber = await generateUniqueTrackingNumber();
    }
    next();
});
// Helper function to generate unique tracking number
async function generateUniqueTrackingNumber() {
    const prefix = "TaxTech-";
    let isUnique = false;
    let trackingNumber = "";
    while (!isUnique) {
        // Generate random 8-digit number
        const randomNum = Math.floor(10000000 + Math.random() * 90000000);
        trackingNumber = `${prefix}${randomNum}`;
        // Check if it exists
        const count = await mongoose.models.Shipment?.countDocuments({
            trackingNumber
        }) || 0;
        isUnique = count === 0;
    }
    return trackingNumber;
}
// Indexes
shipmentSchema.index({ status: 1, createdAt: -1 });
// Static methods
shipmentSchema.statics.doesTrackingNumberExist = async function (trackingNumber) {
    const count = await this.countDocuments({ trackingNumber });
    return count > 0;
};
shipmentSchema.statics.findByStatus = async function (status) {
    return await this.find({ status }).sort({ createdAt: -1 });
};
// Instance methods
shipmentSchema.methods.canUpdate = function () {
    const restrictedStatuses = [ShipmentStatus.DELIVERED, ShipmentStatus.CANCELLED];
    return !restrictedStatuses.includes(this.status);
};
shipmentSchema.methods.canDelete = function () {
    return this.status === ShipmentStatus.PENDING;
};
// Export model
const Shipment = mongoose.model("Shipment", shipmentSchema);
export { Shipment };
//# sourceMappingURL=shipment.js.map