import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const instrumentSchema = new Schema(
  {
    code: String,
    description: String,
    ubication: String,
    active: Boolean,
    category: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

instrumentSchema.plugin(timezone)
export default model("Instrument", instrumentSchema)
