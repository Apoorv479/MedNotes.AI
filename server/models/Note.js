const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: { type: String, default: "admin" },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  mode: { type: String, enum: ["topic", "pdf", "image"], default: "topic" },
  
  originalText: { type: String },
  
  content: {
    title: String,
    short_notes: [String],
    detailed_notes: {
      definition: String,
      classification: [String],
      etiology: [String],
      clinical_features: [String],
      investigations: [String],
      treatment: [String],
      prognosis: [String],
    },
    viva_questions: [
      {
        q: String,
        a: String,
      },
    ],
    mnemonics: [String],
    tables: [
      {
        title: String,
        columns: [String],
        rows: [[String]],
      },
    ],
  },
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', NoteSchema);