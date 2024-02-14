import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectDB = async () => {
    const url = `mongodb://127.0.0.1:27017/monsterDB`;
    try {
        const connection = await mongoose.connect(url, {
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (e) {
        console.log("Failed to connect to database", e);
    }
};