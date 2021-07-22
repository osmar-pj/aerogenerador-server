import { Schema, model } from "mongoose"
import timezone from 'mongoose-timezone'

const houseSchema = new Schema(
  {
    mac: String,
    values: {
        type: Object
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

houseSchema.plugin(timezone)
export default model("House", houseSchema)