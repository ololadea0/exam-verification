import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    try
    {
        await mongoose.connect(mongoUri, {
            dbName: 'biometric_system',
        });
        console.log(`MongoDB Connected: ${mongoose.connection.name}`.cyan.underline);
    } catch (error)
    {
        console.error(`Error connecting to MongoDB: ${error.message}`.red.underline.bold);
        if (process.env.NODE_ENV === 'production')
        {
            process.exit(1);
        }
        // In development, continue without database
        console.warn('Continuing without database connection in development mode'.yellow);
    }
};

export default connectDB;