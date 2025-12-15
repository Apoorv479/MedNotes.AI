import { useState, useEffect } from 'react';
import { LibraryBig, Search, BookOpen } from 'lucide-react';

const LIBRARY_MESSAGES = [
  " Opening your digital bookshelf...",
  " Searching through saved records...",
  " Dusting off the textbooks...",
  " Retrieving patient history...",
  " Organizing your dental notes...",
  " Turning the pages...",
];

const LibraryLoader = () => {
  const [message, setMessage] = useState(LIBRARY_MESSAGES[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LIBRARY_MESSAGES.length;
      setMessage(LIBRARY_MESSAGES[i]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-6 text-center animate-in fade-in h-[50vh]">
      
      {/* 1. Animated Icons */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="flex gap-2 relative z-10">
            <BookOpen className="w-12 h-12 text-indigo-400 animate-bounce delay-100" />
            <LibraryBig className="w-14 h-14 text-indigo-600 animate-bounce" />
            <Search className="w-10 h-10 text-indigo-400 animate-bounce delay-75" />
        </div>
      </div>
      
      {/* 2. Changing Text */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800">Loading Library</h3>
        <p className="text-indigo-600 font-medium text-sm transition-all duration-300 min-h-[20px]">
          {message}
        </p>
      </div>

      {/* 3. Simple Loading Bar */}
      <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-indigo-500 animate-[progress_2s_ease-in-out_infinite] rounded-full"></div>
      </div>
      
    </div>
  );
};

export default LibraryLoader;