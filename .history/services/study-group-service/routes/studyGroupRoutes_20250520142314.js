const express = require('express');
const router = express.Router();
const studyGroupController = require('../controllers/studyGroupController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes with JWT middleware
router.use(authMiddleware);

// Create a study group
router.post('/', studyGroupController.createStudyGroup);

// Fetch all study groups
router.get('/', studyGroupController.getStudyGroups);

// Join a study group
router.post('/:id/join', studyGroupController.joinStudyGroup);

module.exports = router;
