import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUniFiedTopology: true,
    });
    console.log(`MongoDb Connected : ${connection.connection.host}`);
    console.log(`Sucessfully connected to mongodb 👍 `);
  } catch (error) {
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
