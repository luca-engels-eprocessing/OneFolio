
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            firstname: {
            type: String,
            required: true,
            },
            lastname: {
            type: String,
            required: true,
            },
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
  );
  
  export default mongoose.models.Account || mongoose.model("Account", userSchema);