const express = require('express');
const { createLeave, getLeaves, cancelLeave } = require('../controllers/leaveController'); // the 3 leave actions
const { protect } = require('../middleware/authMiddleware'); // login check from the starter
const router = express.Router();

// GET = list requests, POST = submit a new one (both need to be logged in)
router.route('/').get(protect, getLeaves).post(protect, createLeave);

// DELETE = cancel a request by its id
router.delete('/:id', protect, cancelLeave);

module.exports = router; // server.js uses this