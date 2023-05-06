const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: '/image/default-classroom.png'
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: Date,
        schedule: String,
        studentTotal: {
            type: Number,
            default: 20
        },
        location: {
            type: String,
            default: 'Phòng CLB HIT, tầng 9, tòa A1'
        },
        leaders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        supports: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        description: String,
    },
    {
        timestamps: true,
    }
);

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;


