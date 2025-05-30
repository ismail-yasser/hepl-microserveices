const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');
const authMiddleware = require('../middleware/authMiddleware');

// Make these routes public for testing purposes
// GET all help requests/offers
router.get('/', helpController.getAllHelp);

// Search help by query, tags, and course
router.get('/search', helpController.searchHelp);

// Find help match (must come before /:id route)
router.get('/match', helpController.findHelpMatch);

// Get specific help request/offer
router.get('/:id', helpController.getHelpById);

// Protect other routes with JWT middleware
router.use(authMiddleware);

// Create help request
router.post('/request', helpController.createHelpRequest);

// Create help offer
router.post('/offer', helpController.createHelpOffer);

// Update a help request/offer
router.put('/:id', helpController.updateHelp);

// Delete a help request/offer
router.delete('/:id', helpController.deleteHelp);

// Add a response to a help request
router.post('/:id/responses', helpController.addResponse);

// Update the status of a help request
router.put('/:id/status', helpController.updateStatus);

// Assign a helper to a request
router.post('/:id/assign', helpController.assignHelper);

// Schedule a meeting for a help request
router.post('/:id/meeting', helpController.scheduleMeeting);

// Rate a help response
router.post('/:id/responses/:responseId/rate', helpController.rateResponse);

// Upload a file attachment
router.post('/:id/attachments', helpController.uploadAttachment);

module.exports = router;
