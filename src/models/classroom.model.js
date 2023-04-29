const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const classroomSchema = new Schema(
    {
        name: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: "images/classrom-default.png"
        },
        startTime: {
            type: Date,
            default: Date.now
        },
        endTime: {
            type: Date,
            default: function() {
                var date = new Date(this.startTime);
                date.setFullYear(date.getFullYear() + 1);
                return date;
            }
        },
        schedule: {
            type: String,
            default: null
        },
        studentTotal: {
            type: Number,
            min: [5, "Too little is not enough to open class!"],
            max: [25, "The total number of students exceeds the limit!"],
            default: 15
        },
        location: {
            type: String,
            default: null
        },
        leaders: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        supports: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        students: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps: true,
    }
);

const Classroom = mongoose.model("Classroom", classroomSchema);
module.exports = Classroom;
