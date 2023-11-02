import mongoose from "mongoose";

export const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Mongodb connection Successful!".bgMagenta);
    } catch (err) {
        console.log("Mongodb connection Failed: " + err.message);
    }
};
