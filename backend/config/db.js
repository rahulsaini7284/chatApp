import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDb Connected: ${result.connection.host}`.blue.underline.bold
    );
  } catch (error) {
    console.log(`${error.message}`.red.underline.bold);
  }
};
export default connectDB;
