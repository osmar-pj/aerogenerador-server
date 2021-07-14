import { Schema, model, Types } from "mongoose";
import timezone from 'mongoose-timezone'

const deviceSchema = new Schema(
  {
    esp: String,
    place: String,
    description: String,
    sensors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Sensor'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

deviceSchema.plugin(timezone)
export default model("Device", deviceSchema)
