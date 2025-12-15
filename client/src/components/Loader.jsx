import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const DENTAL_MESSAGES = [
  " Scanning patient's history...",
  " Injecting local anesthesia...",
  " Reading thick dental textbooks...",
  " Thinking of tough Viva questions...",
  " Polishing the notes...",
  " Removing bacteria from content...",
  " Extracting key information...",
  " Formatting for exam mode...",
];

const Loader = () => {
  const [message, setMessage] = useState(DENTAL_MESSAGES[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % DENTAL_MESSAGES.length;
      setMessage(DENTAL_MESSAGES[i]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-6 text-center animate-in fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800">Generating Super Notes</h3>
        <p className="text-sm text-gray-500 font-medium min-h-[20px] transition-all duration-500">
          {message}
        </p>
      </div>

      <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mt-4">
        <div className="h-full bg-blue-500 animate-progress-bar rounded-full"></div>
      </div>
      
      <p className="text-xs text-gray-400 mt-8">
        Usually takes 10-15 seconds due to AI processing.
      </p>
    </div>
  );
};

export default Loader;