import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const actuatorSchema = new Schema(
  {
    code: String,
    description: String,
    active: Boolean
  },
  {
    timestamps: true,
    versionKey: false
  }
);

actuatorSchema.plugin(timezone)
export default model("Device", actuatorSchema)
