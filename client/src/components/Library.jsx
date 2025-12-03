import { useEffect, useState } from 'react';
import { getAllNotes, deleteNote } from '../api/notesApi';
import { Trash2, Search, BookOpen, Calendar } from 'lucide-react';
import LibraryLoader from './LibraryLoader';
import toast from 'react-hot-toast';

const Library = ({ onNoteSelect }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Load Notes on Start
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getAllNotes();
      setNotes(res.data);
    } catch (error) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Delete
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Card click hone se roko
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n._id !== id)); // List se hatao
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Could not delete");
    }
  };

  // 3. Filter Search
  const filteredNotes = notes.filter(n => 
    n.content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );


if (loading) return <LibraryLoader />;

  return (
    <div className="pb-24 px-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-gray-50 pt-4 pb-2 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search topic or subject..." 
            className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Empty State */}
      {notes.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <BookOpen size={48} className="mx-auto mb-2 opacity-50" />
          <p>No notes saved yet.</p>
        </div>
      ) : (
        /* Notes Grid */
        <div className="space-y-3 mt-2">
          {filteredNotes.map((note) => (
            <div 
              key={note._id}
              onClick={() => onNoteSelect(note)}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    {note.subject}
                  </span>
                  <h3 className="font-bold text-gray-800 text-lg mt-2 leading-tight">
                    {note.content.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-2">
                    <Calendar size={12} />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <button 
                  onClick={(e) => handleDelete(e, note._id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;