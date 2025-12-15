import { useState } from 'react';
import GenerateForm from '../components/GenerateForm';
import NotesView from '../components/NotesView';
import Library from '../components/Library';
import Loader from '../components/Loader';
import QuizMode from '../components/QuizMode';
import { Sparkles, LibraryBig, GraduationCap } from 'lucide-react'; // Updated icons for better illustration

const HomePage = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'library' | 'quiz' | 'view_note'
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);


// 1. Handle Note Generation (Update this)
  const handleNoteGenerated = (note) => {
    setLoading(false); 
    setSelectedNote(note);
    setCurrentView('view_note');
  };

  // 2. Handle Library Note Click
  const handleLibraryNoteClick = (note) => {
    setSelectedNote(note);
    setCurrentView('view_note');
  };

  // 3. Back Navigation Logic (Update this)
  const handleBack = () => {
    setLoading(false); 
    setSelectedNote(null);
    setCurrentView('home'); // 
  };

  if (currentView === 'view_note' && selectedNote) {
    return <NotesView note={selectedNote} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      
      {/* --- Top Header (Updated Text) --- */}
      <div className="bg-white/80 backdrop-blur-md p-5 shadow-sm sticky top-0 z-20 flex justify-between items-center border-b border-gray-100">
        <div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2">
            Dental Companion AI 
            </h1>
            <p className="text-xs font-semibold text-gray-400 mt-1">
                Your Pocket Professor 
            </p>
        </div>
      </div>

      {/* --- Main Content Area (Covers 70% of screen) --- */}
      <div className="flex-1 flex flex-col p-4 pb-28 max-w-md mx-auto w-full">
        {loading ? (
          <div className="mt-20"><Loader text="Reading books & creating notes..." /></div>
        ) : (
          <>
            {currentView === 'home' && (
              // Added min-h-[70vh] and flex-col justify-center to fill screen
              <div className="flex-1 flex flex-col justify-center min-h-[70vh] animate-in fade-in slide-in-from-bottom-4">
                 
                 {/* Card Container for 70% feel */}
                 <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-6 border border-white flex flex-col justify-center h-full">
                    <div className="mb-8 text-center">
                        <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                            <Sparkles className="text-blue-600 w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">Create Notes</h2>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">
                            Upload your PDF, Topic, or Photo and let AI handle the rest.
                        </p>
                    </div>
                    
                    {/* The Form */}
                    <GenerateForm 
                        setLoading={setLoading} 
                        onNotesGenerated={handleNoteGenerated} 
                    />
                 </div>
              </div>
            )}

            {currentView === 'library' && (
              <div className="animate-in fade-in pt-4">
                <Library onNoteSelect={handleLibraryNoteClick} />
              </div>
            )}
            
            {currentView === 'quiz' && (
              <div className="animate-in fade-in flex-1 flex flex-col justify-center">
                <QuizMode />
              </div>
            )}
          </>
        )}
      </div>

      {/* --- Bottom Navigation Bar (More Attractive Icons) --- */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center p-4 z-30 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] rounded-t-3xl">
        
        {/* 1. HOME (CREATE) */}
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
            currentView === 'home' 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
            : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          <Sparkles size={22} strokeWidth={currentView === 'home' ? 2.5 : 2} />
          {currentView === 'home' && <span className="text-xs font-bold">Create</span>}
        </button>

        {/* 2. QUIZ (NEW) */}
        <button 
          onClick={() => setCurrentView('quiz')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
            currentView === 'quiz' 
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-105' 
            : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          <GraduationCap size={24} strokeWidth={currentView === 'quiz' ? 2.5 : 2} />
          {currentView === 'quiz' && <span className="text-xs font-bold">Quiz</span>}
        </button>

        {/* 3. LIBRARY */}
        <button 
          onClick={() => setCurrentView('library')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
            currentView === 'library' 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
            : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          <LibraryBig size={22} strokeWidth={currentView === 'library' ? 2.5 : 2} />
          {currentView === 'library' && <span className="text-xs font-bold">Library</span>}
        </button>

      </div>
    </div>
  );
};

export default HomePage;