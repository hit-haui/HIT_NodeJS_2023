const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const classroomSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    classCode: {
      type: String,
      require: true,
    },
    image: String,
    startTime: Date,
    endTime: Date,
    schedule: String,
    studentTotal: Number,
    location: String,
    leaders: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
