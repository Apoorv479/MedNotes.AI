const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Note = require('../models/Note');
const { generateDentalNotes } = require('../services/aiService');

const upload = multer({ storage: multer.memoryStorage() });

// ==========================================
// 1. GENERATE NOTES ROUTE (The Main Feature)
// ==========================================
router.post('/generate', upload.single('file'), async (req, res) => {
  try {
    const { subject, topic, mode } = req.body;
    let baseText = "";
    let imageBuffer = null;
    let mimeType = null;

    console.log(` Generating notes for: ${subject} - ${mode}`);

    // --- CASE 1: PDF Handling ---
    if (mode === 'pdf' && req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      baseText = pdfData.text;
    } 
    
    // --- CASE 2: Image Handling ---
    else if (mode === 'image' && req.file) {
      imageBuffer = req.file.buffer;
      mimeType = req.file.mimetype;
      baseText = "Image content analysis"; // Placeholder
    } 
    
    // --- CASE 3: Topic/Text Handling ---
    else {
      baseText = topic;
    }

    const generatedContent = await generateDentalNotes(
      subject, 
      topic || "Uploaded Content", 
      baseText, 
      imageBuffer, 
      mimeType
    );

    // Save to Database
    const newNote = new Note({
      subject,
      topic: topic || "Generated Note",
      mode,
      originalText: mode === 'pdf' ? baseText.substring(0, 2000) + "..." : baseText,
      content: generatedContent
    });

    const savedNote = await newNote.save();
    console.log(" Note Saved ID:", savedNote._id);

    res.json({ success: true, note: savedNote });

  } catch (error) {
    console.error(" Route Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 2. GET ALL NOTES (Library Page)
// ==========================================
router.get('/', async (req, res) => {
  try {
    const { subject } = req.query;
    let query = {};
    if (subject) query.subject = subject;

    const notes = await Note.find(query).sort({ createdAt: -1 }); // Newest first
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. GET SINGLE NOTE (Detail Page)
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4. DELETE NOTE
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;