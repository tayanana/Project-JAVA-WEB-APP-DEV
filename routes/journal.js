const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');
console.log('🧪 JournalEntry model:', JournalEntry);
const { authenticateToken } = require('../middleware/authMiddleware');



// Create a new journal entry
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('🔐 Authenticated user:', req.user); // DEBUG server fail
    const { text } = req.body;
    const entry = new JournalEntry({
      username: req.user.username,
      text,
      date: new Date()
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save journal entry' });
  }
});

// Get all journal entries for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ username: req.user.username }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

module.exports = router;

