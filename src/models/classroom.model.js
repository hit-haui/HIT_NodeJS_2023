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
            default: null,
        },
        startTime: {
            type: Date,
            default: () => {
                const now = new Date();
                const day = now.getDate().toString().padStart(2, '0');
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const year = now.getFullYear().toString();
                const formattedDate = `${day}/${month}/${year}`;
                return formattedDate;
            },
        },
        endTime: {
            type: Date,
            default: () => {
                const now = new Date();
                const day = now.getDate().toString().padStart(2, '0');
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const year = (now.getFullYear() + 1).toString();
                const formattedDate = `${day}/${month}/${year}`;
                return formattedDate;
            },
        },
        schedule: {
            type: String,
            default: null,
        },
        studentTotal: {
            type: Number,
            min: 5,
            max: 20,
            default: 10,
        },
        location: {
            type: String,
            default: null,
        },
        leaders: [{ type: Schema.Types.ObjectId, ref: "User" }],
        supports: [{ type: Schema.Types.ObjectId, ref: "User" }],
        students: [{ type: Schema.Types.ObjectId, ref: "User" }],
        description: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;



