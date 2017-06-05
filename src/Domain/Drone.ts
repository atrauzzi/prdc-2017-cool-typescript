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

// One of the things I love about TypeScript is how it allows for expressive type annotations like this.
export const DroneModel = mongoose.model<Drone & mongoose.Document>("drone", DroneSchema);

// In this case, the mongoose library will want to return instances of document, but we can generate new types 
// on the fly by combining them in-line.  We know we have a concept of a drone, and we know we have a concept of
// a mongoose document.  Instead of being restricted with having to create a third type, why not combine them?!
