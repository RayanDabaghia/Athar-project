// import React from 'react';

// export default function Step2Quiz({
//   questions,
//   currentQuestionIndex,
//   userAnswers,
//   quizTimer,
//   isSubmitting,
//   onSelectOption,
//   onPrev,
//   onNext
// }) {
//   const formatTimer = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const currentQ = questions[currentQuestionIndex];

//   return (
//     <div className="space-y-6">
//       <div className="border border-dashed border-[#FCC21B]/80 rounded-2xl p-3.5 text-center text-xs leading-relaxed text-gray-200">
//         Answer The Following Questions To Qualify For The Campaign.
//       </div>

//       {/* Timer & Counter */}
//       <div className="flex items-center justify-between text-xs font-semibold px-1">
//         <span className="text-white text-sm">
//           Question {questions.length > 0 ? currentQuestionIndex + 1 : 0} Of {questions.length}
//         </span>
//         <div className="flex items-center gap-1.5 text-[#FCC21B]">
//           <i className="fa-solid fa-stopwatch text-sm"></i>
//           <span className="font-bold tracking-wider">{formatTimer(quizTimer)}</span>
//         </div>
//       </div>

//       {questions.length === 0 ? (
//         <div className="text-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FCC21B] mx-auto mb-2"></div>
//           <p className="text-xs text-gray-300">Loading test questions...</p>
//         </div>
//       ) : (
//         <>
//           <h4 className="text-sm md:text-base font-semibold text-white leading-relaxed min-h-[48px]">
//             {currentQ?.question_text || currentQ?.question || ''}
//           </h4>

//           {/* Options */}
//           <div className="space-y-3">
//             {(currentQ?.options || [
//               { key: 'a', text: currentQ?.option_a },
//               { key: 'b', text: currentQ?.option_b },
//               { key: 'c', text: currentQ?.option_c },
//               { key: 'd', text: currentQ?.option_d },
//             ]).map((opt) => {
//               const optKey = opt.key || opt.id || opt;
//               const optText = opt.text || opt;
//               const qId = currentQ?.id || currentQuestionIndex;
//               const isChecked = String(userAnswers[qId]).toLowerCase() === String(optKey).toLowerCase();

//               return optText ? (
//                 <label
//                   key={optKey}
//                   onClick={() => onSelectOption(qId, optKey)}
//                   className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
//                     isChecked ? 'border-[#FCC21B] bg-black/30' : 'border-[#FCC21B]/30 bg-black/10 hover:border-[#FCC21B]/60'
//                   }`}
//                 >
//                   <div className={`w-5 h-5 rounded-md border border-[#FCC21B] flex items-center justify-center shrink-0 ${isChecked ? 'bg-[#FCC21B] text-[#0A3A45]' : 'bg-transparent'}`}>
//                     {isChecked && <i className="fa-solid fa-check text-xs"></i>}
//                   </div>
//                   <span className="text-xs text-gray-200 select-none">{optText}</span>
//                 </label>
//               ) : null;
//             })}
//           </div>

//           {/* Nav Buttons */}
//           <div className="flex items-center justify-between gap-4 pt-4">
//             <button
//               type="button"
//               onClick={onPrev}
//               className={`w-1/2 border border-[#FCC21B] text-white hover:bg-[#FCC21B]/10 font-bold py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${currentQuestionIndex === 0 ? 'invisible' : 'visible'}`}
//             >
//               <i className="fa-solid fa-arrow-left"></i>
//               <span>Previous</span>
//             </button>

//             <button
//               type="button"
//               onClick={onNext}
//               disabled={isSubmitting}
//               className="w-1/2 bg-[#FCC21B] hover:bg-yellow-400 text-[#0A3A45] font-bold py-3 rounded-2xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
//             >
//               <span>{isSubmitting ? 'Submitting...' : currentQuestionIndex === questions.length - 1 ? 'Submit Application' : 'Next'}</span>
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


export default function Step2Quiz({
  questions = [],
  currentQuestionIndex = 0,
  userAnswers = {},
  quizTimer = 600,
  isSubmitting = false,
  onSelectOption,
  onPrev,
  onNext,
  onPrevQuestion,
  onNextQuestion,
  onClose
}) {
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestionIndex];

  // دالة محمية تجلب دالة التراجع المتاحة
  const handlePrevClick = () => {
    if (typeof onPrev === 'function') return onPrev();
    if (typeof onPrevQuestion === 'function') return onPrevQuestion();
  };

  // دالة محمية تجلب دالة التالي المتاحة
  const handleNextClick = () => {
    if (typeof onNext === 'function') return onNext();
    if (typeof onNextQuestion === 'function') return onNextQuestion();
  };

  return (
    <div className="bg-[#0A3A45] text-white rounded-[28px] p-6 md:p-8 w-full max-w-lg mx-auto relative shadow-2xl border border-white/10 font-poppins space-y-6">
      
      {/* Close Button */}
      {onClose && (
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-300 hover:text-white text-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}

      {/* Stepper Header (1 - 2 - 3) */}
      <div className="flex items-center justify-center gap-2 mb-4 pt-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#FCC21B] text-[#0A3A45] font-bold text-xs flex items-center justify-center">1</div>
          <span className="text-[10px] text-gray-300 font-medium">Introduction</span>
        </div>

        <div className="w-8 h-[2px] bg-[#FCC21B] mb-4"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#FCC21B] text-[#0A3A45] font-bold text-xs flex items-center justify-center">2</div>
          <span className="text-[10px] text-white font-bold">Test</span>
        </div>

        <div className="w-8 h-[2px] bg-gray-500 mb-4"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-600 text-gray-300 font-bold text-xs flex items-center justify-center">3</div>
          <span className="text-[10px] text-gray-400 font-medium">Result</span>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="border border-dashed border-[#FCC21B]/80 rounded-2xl p-3.5 text-center text-xs leading-relaxed text-gray-200 bg-[#08313A]/50">
        Answer The Following Questions To Qualify For The Campaign.
      </div>

      {/* Timer & Question Progress */}
      <div className="flex items-center justify-between text-xs font-semibold px-1">
        <span className="text-white text-sm">
          Question {questions.length > 0 ? currentQuestionIndex + 1 : 0} Of {questions.length}
        </span>
        <div className="flex items-center gap-1.5 text-[#FCC21B] bg-[#08313A] px-3 py-1 rounded-full border border-[#FCC21B]/30">
          <i className="fa-solid fa-stopwatch text-sm"></i>
          <span className="font-bold tracking-wider">{formatTimer(quizTimer)}</span>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FCC21B] mx-auto mb-2"></div>
          <p className="text-xs text-gray-300">Loading test questions...</p>
        </div>
      ) : (
        <>
          <h4 className="text-sm md:text-base font-semibold text-white leading-relaxed min-h-[48px] dir-rtl text-right">
            {currentQ?.question_text || currentQ?.question || ''}
          </h4>

          {/* Options */}
          <div className="space-y-3">
            {(currentQ?.options || [
              { key: 'a', text: currentQ?.option_a },
              { key: 'b', text: currentQ?.option_b },
              { key: 'c', text: currentQ?.option_c },
              { key: 'd', text: currentQ?.option_d },
            ]).map((opt) => {
              const optKey = opt?.key || opt?.id || opt;
              const optText = opt?.text || opt;
              const qId = currentQ?.id || currentQuestionIndex;
              const isChecked = String(userAnswers[qId]).toLowerCase() === String(optKey).toLowerCase();

              return optText ? (
                <label
                  key={optKey}
                  onClick={() => onSelectOption && onSelectOption(qId, optKey)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer dir-rtl text-right ${
                    isChecked ? 'border-[#FCC21B] bg-[#FCC21B]/20 text-white font-bold' : 'border-[#FCC21B]/30 bg-[#08313A]/60 text-gray-200 hover:border-[#FCC21B]/60'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border border-[#FCC21B] flex items-center justify-center shrink-0 ${isChecked ? 'bg-[#FCC21B] text-[#0A3A45]' : 'bg-transparent'}`}>
                    {isChecked && <i className="fa-solid fa-check text-xs font-black"></i>}
                  </div>
                  <span className="text-xs select-none">{optText}</span>
                </label>
              ) : null;
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={handlePrevClick}
              className={`w-1/2 border border-[#FCC21B] text-white hover:bg-[#FCC21B]/10 font-bold py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${currentQuestionIndex === 0 ? 'invisible' : 'visible'}`}
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNextClick}
              disabled={isSubmitting}
              className="w-1/2 bg-[#FCC21B] hover:bg-yellow-400 text-[#0A3A45] font-bold py-3 rounded-2xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Submitting...' : currentQuestionIndex === questions.length - 1 ? 'Submit Application' : 'Next'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}