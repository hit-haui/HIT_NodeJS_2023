const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: Date,
    schedule: String,
    studentTotal: {
      type: Number,
      default: 10,
    },
    location: {
      type: String,
      default: "Tang 9 A1",
    },
    leaders: [{ type: Schema.Types.ObjectId, ref: "User" }],
    supports: [{ type: Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: String,
  },
  {
    timestamps: true,
  }
);

const className = mongoose.model("Class", classroomSchema);
module.exports = className;
