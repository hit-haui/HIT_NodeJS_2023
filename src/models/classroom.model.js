const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const classroomSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: "Bai1B3.png",
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    schedule: {
      type: String,
      default: null,
    },
    studentTotal: {
      type: Number,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    leaders: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    supports: [{ type: Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: String,
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;
