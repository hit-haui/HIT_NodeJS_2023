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
        leaders: [{ type: Schema.Types.ObjectId, ref: "User" }],
        supports: [{ type: Schema.Types.ObjectId, ref: "User" }],
        students: [{ type: Schema.Types.ObjectId, ref: "User" }],
        description: String,
    },
    {
        timestamps: true,
    }
);

obj = {
    name: "NodeJS hit",
    image: "/img/img-1.jpg",
    startTime: "01/03/2023",
    dateTime: "01/05/2023",
    schedule: "18h tối thứ 7",
    studentTotal: 10,
    location: "Phòng hit club tầng 9 nhà A1",
    leaders: ['64412e522e94fc77b7aaa13c', '64412ed52a17317a9fe6c89d'],
    supports: ['64412f355173a709085e931e'],
    students: ['64413f6dce2460fa8112b4e5', '64480a44f884a673ce78c5e8'],
    description: "Lớp học nodejs",
}
const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;



