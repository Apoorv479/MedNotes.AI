import { useState, useEffect } from 'react';
import { BrainCircuit, Lightbulb } from 'lucide-react';

const QUIZ_PREP_MESSAGES = [
  " Shuffling your flashcards...",
  " Hiding the answers securely...",
  " Activating Recall Mode...",
  " Mixing Pedo, Ortho, and Surgery questions...",
  " Sharpening your dental memory...",
  " Randomizing the sequence...",
  " Preparing the Viva Board...",
];

const QuizLoader = () => {
  const [message, setMessage] = useState(QUIZ_PREP_MESSAGES[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % QUIZ_PREP_MESSAGES.length;
      setMessage(QUIZ_PREP_MESSAGES[i]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8 text-center animate-in fade-in h-[60vh]">
      
      {/* 1. Animated Brain Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <BrainCircuit className="w-20 h-20 text-purple-600 animate-bounce relative z-10" strokeWidth={1.5} />
      </div>
      
      {/* 2. Rotating Prep Message */}
      <div className="space-y-2 h-16">
        <h3 className="text-2xl font-bold text-gray-800">Get Ready!</h3>
        <p className="text-purple-600 font-medium text-lg transition-all duration-300">
          {message}
        </p>
      </div>

      {/* 3. Static Instructions Box */}
      <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 max-w-xs w-full text-left shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-purple-800 font-bold">
          <Lightbulb size={18} />
          <span>How to Play:</span>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span></span> Read the question carefully.
          </li>
          <li className="flex gap-2">
            <span></span> Speak the answer <b>out loud</b>.
          </li>
          <li className="flex gap-2">
            <span></span> Tap <b>"Show Answer"</b> to verify.
          </li>
          <li className="flex gap-2">
            <span></span>  Be prepared!.
          </li>
        </ul>
      </div>

    </div>
  );
};

export default QuizLoader;