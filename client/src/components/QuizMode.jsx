import { useState, useEffect } from 'react';
import { getAllNotes } from '../api/notesApi';
import { RefreshCw, CheckCircle, XCircle, Eye, BrainCircuit } from 'lucide-react';
import QuizLoader from './QuizLoader';

const QuizMode = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Load Data & Shuffle
  useEffect(() => {
    fetchAndPrepareQuiz();
  }, []);

  const fetchAndPrepareQuiz = async () => {
    setLoading(true);
    try {
      const res = await getAllNotes();
      const allNotes = res.data;
      
      let pool = [];
      allNotes.forEach(note => {
        if (note.content.viva_questions) {
          note.content.viva_questions.forEach(vq => {
            pool.push({
              q: vq.q,
              a: vq.a,
              subject: note.subject,
              topic: note.content.title
            });
          });
        }
      });

      // Fisher-Yates Shuffle (Randomize order)
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      setQuestions(pool);
    } catch (error) {
      console.error("Quiz load failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  
if (loading) return <QuizLoader />;

  if (questions.length === 0) return (
    <div className="text-center mt-20 text-gray-400 p-6">
      <BrainCircuit size={64} className="mx-auto mb-4 opacity-30" />
      <h3 className="text-xl font-bold">No Questions Found</h3>
      <p>Generate some notes first to build your quiz bank!</p>
    </div>
  );

  const currentQ = questions[currentIndex];

  return (
    <div className="h-[80vh] flex flex-col justify-center px-4">
      
      {/* --- PROGRESS BAR --- */}
      <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span className="text-purple-500">{currentQ.subject}</span>
      </div>

      {/* --- FLASHCARD --- */}
      <div className="relative group perspective-1000 w-full aspect-[4/5] max-h-[500px]">
        <div className={`relative w-full h-full duration-500 preserve-3d transition-all ${showAnswer ? '' : ''}`}>
          
          {/* CARD FACE */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-xl border-2 border-purple-50 p-8 flex flex-col justify-between items-center text-center">
            
            <div className="mt-4">
              <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {currentQ.topic}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
                {currentQ.q}
              </h2>
            </div>

            {!showAnswer ? (
               // REVEAL BUTTON
              <button 
                onClick={() => setShowAnswer(true)}
                className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <Eye size={20} /> Show Answer
              </button>
            ) : (
               // ANSWER REVEALED AREA
              <div className="w-full animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-4 text-left">
                  <p className="text-sm font-semibold text-green-800">Answer:</p>
                  <p className="text-gray-700 text-sm mt-1">{currentQ.a}</p>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  Next Question →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- REFRESH BUTTON (Bottom) --- */}
      <div className="mt-8 text-center">
        <button 
          onClick={fetchAndPrepareQuiz}
          className="text-gray-400 text-xs flex items-center justify-center gap-1 mx-auto hover:text-purple-600"
        >
          <RefreshCw size={12} /> Reshuffle Questions
        </button>
      </div>

    </div>
  );
};

export default QuizMode;