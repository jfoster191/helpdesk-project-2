const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
    comment: String,
    rating: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true}
}, {
    timestamps: true
});

const caseSchema = new Schema({
    subject: {type: String, required: true},
    comment: [String],
    status: {type: String, enum: ['New', 'Open', 'In Progress', 'Resolved']},
    caseNum: Number,
    dueDate: Date,
    highPriority: {type: Boolean, default: false},
    survey: [surveySchema],
    requestor: {type: Schema.Types.ObjectId, ref: 'requestor'},
    asignee: {type: Schema.Types.ObjectId, ref: 'asignee'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Case', caseSchema);