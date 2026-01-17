import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/bmw-m-series`, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("Database Connected");
    } catch(error) {
        console.log("Database Connection Error:", error.message);
        process.exit(1);
    }
}

export default connectDB;