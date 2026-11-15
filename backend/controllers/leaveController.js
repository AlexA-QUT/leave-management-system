const Leave = require('../models/Leave');

// Employee can submits a leave request and it has validation (LMS-8 & LMS-7)
const createLeave = async (req, res) => {
    const { type, startDate, endDate, reason } = req.body; // grab whats sent from the form
    if (!type || !startDate || !endDate || !reason) { // any field empty = reject
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    if (new Date(endDate) < new Date(startDate)) { // end date cant be before start
        return res.status(400).json({ message: 'End date cannot be before start date' });
    }
    try {
        const leave = await Leave.create({ employee: req.user.id, type, startDate, endDate, reason });
        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Employees see their own requests, managers see everyone's, this is LMS-9
const getLeaves = async (req, res) => {
    try {
        const filter = req.user.role === 'manager' ? {} : { employee: req.user.id }; // manager = ALL, employee = just theirs
        const leaves = await Leave.find(filter).populate('employee', 'name email').sort({ createdAt: -1 }); // adds employee name, newest first
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// THis give the employee the ability to cancle their requests if needed while its pending LMS-10
const cancelLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id); // find the request by id
        if (!leave) return res.status(404).json({ message: 'Request not found' }); // doesnt exist
        if (leave.employee.toString() !== req.user.id) { // only your own requests
            return res.status(403).json({ message: 'You can only cancel your own requests' });
        }
        if (leave.status !== 'Pending') {     // cant cancel once approved/rejected
            return res.status(400).json({ message: 'Only pending requests can be cancelled' });
        }
        await Leave.findByIdAndDelete(leave._id);  // delete it
        res.json({ message: 'Request cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLeave, getLeaves, cancelLeave };  // export so routes can use them