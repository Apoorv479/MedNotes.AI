import { useState } from 'react';
import { Upload, Type, Image as ImageIcon, Sparkles } from 'lucide-react';
import { SUBJECTS } from '../constants/subjects';
import { generateNote } from '../api/notesApi';
import toast from 'react-hot-toast';

const GenerateForm = ({ onNotesGenerated, setLoading }) => {
  const [mode, setMode] = useState('topic'); // topic | pdf | image
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'topic' && !topic) return toast.error("Please enter a topic");
    if ((mode === 'pdf' || mode === 'image') && !file) return toast.error("Please upload a file");

    setLoading(true);
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('mode', mode);
    
    if (mode === 'topic') {
      formData.append('topic', topic);
    } else {
      formData.append('file', file);
    }

    try {
      const res = await generateNote(formData);
      onNotesGenerated(res.data.note);
      toast.success("Notes Generated Successfully! ");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate notes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      {/* 1. Subject Selector */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Subject</label>
        <select 
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {SUBJECTS.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
      </div>

      {/* 2. Mode Tabs (Big Buttons for Mobile) */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { id: 'topic', icon: Type, label: 'Topic' },
          { id: 'pdf', icon: Upload, label: 'PDF' },
          { id: 'image', icon: ImageIcon, label: 'Image' }
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => { setMode(m.id); setFile(null); }}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
              mode === m.id 
              ? 'bg-blue-600 text-white shadow-md transform scale-105' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <m.icon size={20} className="mb-1" />
            <span className="text-xs font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      {/* 3. Inputs based on Mode */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'topic' ? (
          <input
            type="text"
            placeholder="e.g. Chronic Pulpitis..."
            className="w-full p-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
            <input 
              type="file" 
              accept={mode === 'pdf' ? ".pdf" : "image/*"}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
            <p className="text-xs text-gray-400 mt-2">
              {file ? `Selected: ${file.name}` : `Upload ${mode.toUpperCase()} File`}
            </p>
          </div>
        )}

        {/* 4. Generate Button (Sticky bottom feel) */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Sparkles size={20} />
          Generate Super Notes
        </button>
      </form>
    </div>
  );
};

export default GenerateForm;