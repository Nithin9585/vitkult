
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "VITKULT_db",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB");
    console.log("DB Name: ", mongoose.connection.name); 
  } catch (error) {
    console.log("Error connecting to DB: ", error);
  }
};
