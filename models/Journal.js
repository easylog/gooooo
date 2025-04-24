// models/Journal.js
const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  client: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPrivate: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
