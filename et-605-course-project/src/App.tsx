import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle, XCircle, Lightbulb, ArrowRight, RefreshCw, GraduationCap, Activity, Terminal, Database, X, Lock } from 'lucide-react';
import { domainContent } from './data/content';
import { Figure } from './components/Figure';

type AppStatus = 'intro' | 'problem' | 'feedback' | 'remediation' | 'kc_complete' | 'course_complete' | 'transition';

const ENCOURAGING_MESSAGES = [
  "You're on a hot streak! 🔥",
  "Keep going, just a little bit left! 🚀",
  "You're doing amazing, keep it up! 🌟",
  "Math is your superpower! 🦸‍♀️",
  "Every mistake is a stepping stone to success! 💡",
  "You're crushing these angles! 📐",
  "Brilliant work! Let's tackle the next one. 🧠",
  "You're getting sharper every minute! ⚔️",
  "Nothing can stop you now! 🚂",
  "You're a geometry genius in the making! 🎓",
  "Awesome effort! Ready for another? 🎯",
  "You're unlocking new brain levels! 🔓",
  "Fantastic focus! Keep that energy going. ⚡",
  "You're making this look easy! 😎",
  "One step closer to 100% mastery! 📈",
  "Your dedication is paying off! 🏆",
  "Geometry has nothing on you! 💪",
  "Keep that momentum rolling! 🌊",
  "You're building a solid foundation! 🏗️",
  "Stellar progress! Let's keep moving. 🌠",
  "You've got this! Believe in yourself. ✨"
];

export default function App() {
  const [sessionId, setSessionId] = useState(() => {
    return typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 15);
  });

  const [kcIndex, setKcIndex] = useState(() => {
    const saved = localStorage.getItem('math_tutor_kcIndex');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [mastery, setMastery] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('math_tutor_mastery');
    return saved ? JSON.parse(saved) : {};
  });
  const [problemIndex, setProblemIndex] = useState(() => {
    const saved = localStorage.getItem('math_tutor_problemIndex');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>(() => {
    const saved = localStorage.getItem('math_tutor_currentDifficulty');
    return (saved as 'easy' | 'medium' | 'hard') || 'easy';
  });
  const [status, setStatus] = useState<AppStatus>(() => {
    const saved = localStorage.getItem('math_tutor_status');
    return (saved as AppStatus) || 'intro';
  });
  
  const [hintLevel, setHintLevel] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  
  const [showLearnerModel, setShowLearnerModel] = useState(false);
  const [logs, setLogs] = useState<{time: string, msg: string}[]>([]);
  const [phaseStartTime, setPhaseStartTime] = useState<number>(Date.now());
  const [showFastReadingWarning, setShowFastReadingWarning] = useState(false);
  
  const [selectedOptionsHistory, setSelectedOptionsHistory] = useState<string[]>([]);
  const [hasConfirmedGuesswork, setHasConfirmedGuesswork] = useState(false);
  const [showGuessworkWarning, setShowGuessworkWarning] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState(ENCOURAGING_MESSAGES[0]);

  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessTarget, setAccessTarget] = useState<'reset' | 'learnerModel' | null>(null);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessError, setAccessError] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [{time: new Date().toLocaleTimeString([], {hour12: false}), msg}, ...prev].slice(0, 50));
  };

  useEffect(() => {
    localStorage.setItem('math_tutor_kcIndex', kcIndex.toString());
    localStorage.setItem('math_tutor_mastery', JSON.stringify(mastery));
    localStorage.setItem('math_tutor_problemIndex', problemIndex.toString());
    localStorage.setItem('math_tutor_status', status);
    localStorage.setItem('math_tutor_currentDifficulty', currentDifficulty);
  }, [kcIndex, mastery, problemIndex, status, currentDifficulty]);

  useEffect(() => {
    addLog(`New session started: ${sessionId}`);
  }, [sessionId]);

  const currentKc = domainContent[kcIndex];
  const currentProblemList = currentKc?.problems[currentDifficulty] || [];
  const currentProblem = currentProblemList[problemIndex % Math.max(1, currentProblemList.length)];

  const resetProblemState = () => {
    setHintLevel(0);
    setAttempts(0);
    setInputValue('');
    setFeedback(null);
    setShowSolution(false);
    setSelectedOptionsHistory([]);
    setHasConfirmedGuesswork(false);
  };

  const handleResetCourse = () => {
    localStorage.clear();
    setKcIndex(0);
    setMastery({});
    setProblemIndex(0);
    setStatus('intro');
    setCurrentDifficulty('easy');
    setLogs([]);
    setSessionId(Math.random().toString(36).substring(2, 9));
    resetProblemState();
    setPhaseStartTime(Date.now());
    addLog('Course reset by developer.');
  };

  const handleAccessSubmit = () => {
    if (accessCodeInput === '1234') {
      setShowAccessModal(false);
      setAccessCodeInput('');
      setAccessError(false);
      if (accessTarget === 'reset') {
        handleResetCourse();
      } else if (accessTarget === 'learnerModel') {
        setShowLearnerModel(true);
      }
    } else {
      setAccessError(true);
    }
  };

  const handleStartPractice = (force = false) => {
    const timeSpent = Date.now() - phaseStartTime;
    if (!force && timeSpent < 10000) {
      setShowFastReadingWarning(true);
      return;
    }
    setShowFastReadingWarning(false);
    setTransitionMsg("Let's practice some questions to strengthen your concept");
    setStatus('transition');
    addLog(`Finished reading ${currentKc.id} in ${Math.round(timeSpent / 1000)}s`);
    
    if ((mastery[currentKc.id] || 0) === 0) {
      setMastery(prev => ({ ...prev, [currentKc.id]: 30 }));
      addLog(`Initial mastery for ${currentKc.id} set to 30% after reading tutorial`);
    }
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    
    if (currentProblem.type === 'multiple-choice' && selectedOptionsHistory.length >= 3 && !hasConfirmedGuesswork) {
      setShowGuessworkWarning(true);
      return;
    }
    
    processSubmit(false);
  };

  const processSubmit = (admittedGuess: boolean) => {
    const timeSpent = Date.now() - phaseStartTime;
    const isCorrect = !admittedGuess && inputValue.trim().toLowerCase() === currentProblem.answer.toString().toLowerCase();
    
    if (isCorrect) {
      setFeedback({ type: 'success', message: 'Correct! Great job.' });
      setShowSolution(true);
      addLog(`Correct answer for ${currentProblem.id} in ${Math.round(timeSpent / 1000)}s`);
      
      // Update mastery
      const currentMastery = mastery[currentKc.id] || 0;
      let points = currentDifficulty === 'easy' ? 20 : currentDifficulty === 'medium' ? 25 : 30;
      if (hintLevel === 1) points -= 5;
      if (hintLevel === 2) points -= 10;
      if (hintLevel === 3) points -= 15;
      if (attempts > 0) points -= 10;
      
      const newMastery = Math.min(100, currentMastery + Math.max(5, points));
      setMastery({ ...mastery, [currentKc.id]: newMastery });
      addLog(`Mastery for ${currentKc.id} updated: ${currentMastery}% -> ${newMastery}%`);
      
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 2 || hintLevel === 3) {
        const currentMastery = mastery[currentKc.id] || 30;
        const newMastery = Math.max(0, currentMastery - 15);
        setMastery(prev => ({ ...prev, [currentKc.id]: newMastery }));
        addLog(`Mastery for ${currentKc.id} decreased: ${currentMastery}% -> ${newMastery}% due to 2 incorrect attempts`);
        
        setStatus('remediation');
        setFeedback(null);
        addLog(`Triggering remediation for ${currentKc.id} after ${newAttempts} attempts`);
      } else {
        if (admittedGuess) {
          setFeedback({ type: 'error', message: "It's okay to guess, but let's try to understand it! Here's a hint." });
          setHintLevel(Math.min(3, hintLevel + 1));
          addLog(`User admitted to guessing on ${currentProblem.id}`);
        } else if (timeSpent < 3000) {
          setFeedback({ type: 'error', message: "Whoa there, speedster! 🏎️ Take a deep breath and read the question carefully before answering." });
          addLog(`Answered too fast (${Math.round(timeSpent / 1000)}s) and incorrectly for ${currentProblem.id}`);
        } else {
          setFeedback({ type: 'error', message: 'Not quite right. Try using a hint!' });
          addLog(`Incorrect answer for ${currentProblem.id} in ${Math.round(timeSpent / 1000)}s. Attempt ${newAttempts}`);
        }
      }
    }
  };

  const handleHint = () => {
    const newLevel = Math.min(3, hintLevel + 1);
    setHintLevel(newLevel);
    addLog(`Requested hint level ${newLevel} for ${currentProblem.id}`);
  };

  const handleNext = () => {
    const currentMastery = mastery[currentKc.id] || 0;
    if (currentMastery >= 100) {
      setStatus('kc_complete');
      addLog(`Mastery threshold reached for ${currentKc.id}`);
    } else {
      if (currentDifficulty === 'easy') {
        setCurrentDifficulty('medium');
        setProblemIndex(0);
      } else if (currentDifficulty === 'medium') {
        setCurrentDifficulty('hard');
        setProblemIndex(0);
      } else {
        setProblemIndex(prev => prev + 1);
      }
      resetProblemState();
      setTransitionMsg(ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)]);
      setStatus('transition');
      addLog(`Moving to next problem in ${currentKc.id}`);
    }
  };

  const handleNextTopic = () => {
    if (kcIndex + 1 < domainContent.length) {
      setKcIndex(prev => prev + 1);
      setProblemIndex(0);
      setCurrentDifficulty('easy');
      resetProblemState();
      setStatus('intro');
      setPhaseStartTime(Date.now());
      addLog(`Advanced to new topic: ${domainContent[kcIndex + 1].id}`);
    } else {
      setStatus('course_complete');
      addLog(`Course completed!`);
    }
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (!currentKc && status !== 'course_complete') return null;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-slate-900 text-slate-300 flex flex-col h-screen overflow-y-auto shrink-0 shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            Math Tutor
          </h1>
          <p className="text-sm mt-2 text-slate-400">Lines and Angles • Grade 7</p>
        </div>
        <div className="flex-1 p-4 space-y-2">
          {domainContent.map((kc, idx) => {
            const kcMastery = mastery[kc.id] || 0;
            const isActive = idx === kcIndex;
            const isPast = idx < kcIndex;
            
            return (
              <div key={kc.id} className={`p-4 rounded-xl transition-colors ${isActive ? 'bg-indigo-900/40 border border-indigo-500/30' : 'hover:bg-slate-800/50 border border-transparent'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium ${isActive ? 'text-indigo-300' : isPast ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {idx + 1}. {kc.title}
                  </span>
                  {kcMastery >= 100 && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${kcMastery >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                    style={{ width: `${kcMastery}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-slate-500 text-right">
                  {Math.round(kcMastery)}% Mastery
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto relative">
        <div className="max-w-3xl w-full mx-auto p-4 md:p-8 pt-12 md:pt-20 pb-24">
          <AnimatePresence mode="wait">
            {status === 'intro' && (
              <motion.div 
                key="intro"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-left"
              >
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-1">Concept Tutorial</h2>
                    <h1 className="text-3xl font-bold text-slate-900">{currentKc.title}</h1>
                  </div>
                </div>
                
                <div className="space-y-10 mb-12">
                  <p className="text-lg text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-xl border border-slate-100">
                    {currentKc.explanation}
                  </p>
                  
                  {currentKc.tutorial?.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      {section.title && <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>}
                      <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {section.text}
                      </div>
                      {section.figure && (
                        <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 my-6">
                          <Figure type={section.figure} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center pt-8 border-t border-slate-100">
                  <button 
                    onClick={() => handleStartPractice(false)} 
                    className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                  >
                    Start Practice <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Fast Reading Warning Modal */}
                <AnimatePresence>
                  {showFastReadingWarning && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center border border-slate-200"
                      >
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">🏎️</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Whoa, speed reader!</h3>
                        <p className="text-slate-600 mb-8">
                          You barely glanced at the material. Are you sure you're ready to tackle the practice problems?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button 
                            onClick={() => setShowFastReadingWarning(false)}
                            className="px-6 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                          >
                            Let me read more
                          </button>
                          <button 
                            onClick={() => handleStartPractice(true)}
                            className="px-6 py-3 rounded-xl font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                          >
                            Yes, I'm ready!
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {status === 'transition' && (
              <motion.div 
                key="transition"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="text-6xl mb-6">✨</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">{transitionMsg}</h2>
                <button 
                  onClick={() => {
                    setStatus('problem');
                    setPhaseStartTime(Date.now());
                  }}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  Let's Go! <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {status === 'problem' && currentProblem && (
              <motion.div 
                key={`problem-${currentProblem.id}`}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Practice Problem</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      currentProblem.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                      currentProblem.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {currentProblem.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-medium text-slate-900 mb-10 leading-snug">{currentProblem.text}</h3>
                  
                  {currentProblem.type === 'multiple-choice' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {currentProblem.options?.map(opt => (
                        <button 
                          key={opt}
                          onClick={() => {
                            setInputValue(opt);
                            if (feedback?.type === 'error') setFeedback(null);
                            if (opt !== selectedOptionsHistory[selectedOptionsHistory.length - 1]) {
                              setSelectedOptionsHistory(prev => [...prev, opt]);
                              addLog(`Selected option: ${opt}`);
                            }
                          }}
                          className={`p-5 rounded-xl border-2 text-left transition-all text-lg ${
                            inputValue === opt 
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm' 
                              : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
                          }`}
                          disabled={showSolution}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-10">
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={e => {
                          const val = e.target.value;
                          if (currentProblem.type === 'numeric' && !/^[0-9.-]*$/.test(val)) {
                            setFeedback({ type: 'error', message: 'Only numeric inputs are allowed for this question.' });
                            addLog(`Blocked non-numeric input attempt: "${val}"`);
                            return;
                          }
                          setInputValue(val);
                          if (feedback?.type === 'error') setFeedback(null);
                        }}
                        placeholder="Type your answer..."
                        className="w-full text-xl p-5 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        disabled={showSolution}
                        onKeyDown={e => e.key === 'Enter' && !showSolution && handleSubmit()}
                      />
                    </div>
                  )}
                  
                  {/* Hints Section */}
                  {hintLevel > 0 && (
                    <div className="mb-10 space-y-3">
                      {currentProblem.hints.slice(0, hintLevel).map((hint, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={idx} 
                          className="flex gap-4 p-5 bg-amber-50 text-amber-900 rounded-xl border border-amber-200/50"
                        >
                          <Lightbulb className="w-6 h-6 text-amber-600 shrink-0" />
                          <p className="text-base leading-relaxed">
                            <span className="font-bold mr-2">Hint {idx + 1}:</span>
                            {hint}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {/* Feedback Section */}
                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`mb-10 p-5 rounded-xl flex items-start gap-4 ${
                        feedback.type === 'success' 
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                          : 'bg-rose-50 text-rose-900 border border-rose-200'
                      }`}
                    >
                      {feedback.type === 'success' ? <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" /> : <XCircle className="w-6 h-6 text-rose-600 shrink-0" />}
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{feedback.message}</p>
                        {showSolution && (
                          <div className="mt-4 pt-4 border-t border-emerald-200/50">
                            <p className="text-base font-medium text-emerald-800 mb-1">Step-by-step Solution:</p>
                            <p className="text-base opacity-90">{currentProblem.solution}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-4">
                    {!showSolution ? (
                      <>
                        <button 
                          onClick={handleHint}
                          disabled={hintLevel >= 3}
                          className="text-base font-medium text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:hover:text-slate-500 flex items-center gap-2 self-start sm:self-center"
                        >
                          <Lightbulb className="w-5 h-5" />
                          {hintLevel >= 3 ? 'No more hints' : 'Need a hint?'}
                        </button>
                        
                        {feedback?.type === 'error' ? (
                          <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
                            <button 
                              onClick={() => {
                                setStatus('intro');
                                setFeedback(null);
                                setPhaseStartTime(Date.now());
                              }}
                              className="bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors text-sm"
                            >
                              Revisit Topic
                            </button>
                            <button 
                              onClick={() => {
                                setProblemIndex(prev => prev + 1);
                                resetProblemState();
                                setTransitionMsg(ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)]);
                                setStatus('transition');
                              }}
                              className="bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors text-sm"
                            >
                              Skip Question
                            </button>
                            <button 
                              onClick={handleSubmit}
                              disabled={!inputValue}
                              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
                            >
                              Try Again
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={handleSubmit}
                            disabled={!inputValue}
                            className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm w-full sm:w-auto"
                          >
                            Check Answer
                          </button>
                        )}
                      </>
                    ) : (
                      <button 
                        onClick={handleNext}
                        className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        Continue <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Guesswork Warning Modal */}
                <AnimatePresence>
                  {showGuessworkWarning && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center border border-slate-200"
                      >
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">🤔</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Are you guessing?</h3>
                        <p className="text-slate-600 mb-8">
                          We noticed you switching between options. Did you solve this or are you just guessing?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button 
                            onClick={() => {
                              setShowGuessworkWarning(false);
                              setHasConfirmedGuesswork(true);
                              processSubmit(true);
                            }}
                            className="px-6 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                          >
                            I was guessing
                          </button>
                          <button 
                            onClick={() => {
                              setShowGuessworkWarning(false);
                              setHasConfirmedGuesswork(true);
                              processSubmit(false);
                            }}
                            className="px-6 py-3 rounded-xl font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                          >
                            I solved it!
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {status === 'remediation' && (
              <motion.div 
                key="remediation"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-10 text-center"
              >
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="w-10 h-10 text-amber-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Let's review this concept</h2>
                <div className="p-8 bg-slate-50 rounded-xl border border-slate-100 mb-10 text-left">
                  <p className="text-lg text-slate-700 leading-relaxed">{currentKc.remediation}</p>
                </div>
                <button 
                  onClick={() => {
                    setProblemIndex(prev => prev + 1);
                    resetProblemState();
                    setTransitionMsg(ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)]);
                    setStatus('transition');
                  }}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  Try Another Problem <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {status === 'kc_complete' && (
              <motion.div 
                key="kc_complete"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center"
              >
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Concept Mastered!</h2>
                <p className="text-xl text-slate-600 mb-10">You've shown a great understanding of <span className="font-semibold text-slate-900">{currentKc.title}</span>.</p>
                <button 
                  onClick={handleNextTopic}
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  Move to Next Topic <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {status === 'course_complete' && (
              <motion.div 
                key="course_complete"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center"
              >
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <GraduationCap className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Course Completed!</h2>
                <p className="text-xl text-slate-600 mb-10">You have mastered all the concepts in Lines and Angles.</p>
                <button 
                  onClick={() => {
                    setKcIndex(0);
                    setMastery({});
                    setProblemIndex(0);
                    setStatus('intro');
                    setPhaseStartTime(Date.now());
                  }}
                  className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-medium hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
                >
                  Restart Course <RefreshCw className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Floating Toggle Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <button
          onClick={() => {
            setAccessTarget('reset');
            setShowAccessModal(true);
          }}
          className="bg-rose-600 text-white p-4 rounded-full shadow-2xl hover:bg-rose-700 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-6 h-6" />
          <span className="font-medium hidden md:inline">Reset Course</span>
        </button>
        <button
          onClick={() => {
            setAccessTarget('learnerModel');
            setShowAccessModal(true);
          }}
          className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          <Activity className="w-6 h-6" />
          <span className="font-medium hidden md:inline">Learner Model</span>
        </button>
      </div>

      {/* Access Code Modal */}
      <AnimatePresence>
        {showAccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center border border-slate-200"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Developer Access</h3>
              <p className="text-slate-600 mb-6">
                Please enter the access code to continue.
              </p>
              <input
                type="password"
                value={accessCodeInput}
                onChange={(e) => setAccessCodeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAccessSubmit()}
                placeholder="Enter code"
                className={`w-full p-4 rounded-xl border-2 text-center text-xl tracking-widest mb-4 focus:outline-none ${
                  accessError ? 'border-rose-300 focus:border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-indigo-500'
                }`}
                autoFocus
              />
              {accessError && (
                <p className="text-rose-500 text-sm mb-4 font-medium">Incorrect access code.</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => {
                    setShowAccessModal(false);
                    setAccessCodeInput('');
                    setAccessError(false);
                  }}
                  className="px-6 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAccessSubmit}
                  className="px-6 py-3 rounded-xl font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors w-full sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learner Model Panel */}
      <AnimatePresence>
        {showLearnerModel && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-screen bg-slate-900 text-slate-300 shadow-2xl z-50 flex flex-col border-l border-slate-800"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Database className="w-5 h-5" />
                Live Learner Model
              </div>
              <button onClick={() => setShowLearnerModel(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Current State */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Current State</h3>
                <div className="bg-slate-800/50 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Session ID:</span> <span className="text-indigo-400 font-mono text-xs truncate max-w-[150px]" title={sessionId}>{sessionId}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="text-indigo-400 font-mono">{status}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Active KC:</span> <span className="text-indigo-400 font-mono">{currentKc?.id || 'none'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Problem:</span> <span className="text-indigo-400 font-mono">{currentProblem?.id || 'none'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Difficulty:</span> <span className="text-indigo-400 font-mono">{currentProblem?.difficulty || 'none'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Attempts:</span> <span className="text-indigo-400 font-mono">{attempts}/3</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Hints Used:</span> <span className="text-indigo-400 font-mono">{hintLevel}/3</span></div>
                </div>
              </div>

              {/* Mastery Probabilities */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">BKT Probabilities P(L)</h3>
                <div className="space-y-3">
                  {domainContent.map(kc => {
                    const m = mastery[kc.id] || 0;
                    return (
                      <div key={kc.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{kc.id.toUpperCase()}</span>
                          <span className={m >= 100 ? 'text-emerald-400' : 'text-slate-300'}>{m.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${m >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                            style={{ width: `${m}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Event Log */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Event Log
                </h3>
                <div className="bg-slate-950 rounded-lg p-3 h-48 overflow-y-auto font-mono text-xs space-y-2 border border-slate-800">
                  {logs.length === 0 ? (
                    <span className="text-slate-600">Waiting for events...</span>
                  ) : (
                    logs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-slate-600 shrink-0">[{log.time}]</span>
                        <span className="text-emerald-400/90">{log.msg}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
