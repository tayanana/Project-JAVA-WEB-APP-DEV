const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
