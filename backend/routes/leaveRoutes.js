const express = require('express');
const { createLeave, getLeaves, cancelLeave, decideLeave } = require('../controllers/leaveController'); // the 3 leave actions
const { protect, managerOnly } = require('../middleware/authMiddleware'); // login check + manager check
const router = express.Router();

// GET = list requests, POST = submit a new one (both need to be logged in)
router.route('/').get(protect, getLeaves).post(protect, createLeave);

// DELETE = cancel a request by its id
router.delete('/:id', protect, cancelLeave);

// PUT = manager approves or rejects
router.put('/:id/decision', protect, managerOnly, decideLeave);

module.exports = router; // server.js uses this