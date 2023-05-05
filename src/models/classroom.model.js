const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema(
  {
    name: String,
    image: String,
    startTime: Date,
    endTime: Date,
    schedule: String,
    studentTotal: Number,
    location: String,
    leaders: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: [true, "Please provide your leaders!"],
      },
    ],
    supports: [{ type: Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;
