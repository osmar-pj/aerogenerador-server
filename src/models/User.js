import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import timezone from 'mongoose-timezone'

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    dni: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    devices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Device"
      }
    ],
    active: {
      type: Boolean,
      default: 0
    },
    date_active: {
      type: Date,
      default: new Date()
    },
    date_expire: {
      type: Date,
      default: new Date()
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

userSchema.plugin(timezone)
export default model("User", userSchema);
