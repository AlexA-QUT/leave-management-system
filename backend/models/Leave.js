const mongoose = require('mongoose');

// This is a  single leave request made by an employee
const leaveSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links the request to the user who made it
    type: { type: String, enum: ['Annual', 'Personal'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    // Every request starts as its pnding until a manager approves or rejects it
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    managerComment: { type: String }, //adding this in as optional choice from the manager for this
}, { timestamps: true }); // timestamps adds a created and updated at time to review

module.exports = mongoose.model('Leave', leaveSchema);