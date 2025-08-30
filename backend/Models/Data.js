import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    info: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
}, {timestamps: true })

const Data = mongoose.model("Data", dataSchema);
export default Data;