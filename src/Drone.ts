import * as mongoose from "mongoose";


export interface Drone {

    id: string;

    latitude: number;
    longitude: number;
}

export const DroneSchema = new mongoose.Schema({
    id: String,
    latitude: Number,
    longitude: Number,
});

export const DroneModel = mongoose.model("drone", DroneSchema);
