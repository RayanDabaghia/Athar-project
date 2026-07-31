// import React from 'react';

// export default function Step3Result({ submissionResult, onAction }) {
//   const { userScore, passingScore, isPassed } = submissionResult;

//   return (
//     <div className="space-y-6 text-center">
//       {/* Dashed Notice */}
//       <div className="border border-dashed border-[#FCC21B]/80 rounded-2xl p-3.5 flex items-center gap-3 text-left">
//         <div className="w-9 h-9 rounded-xl bg-[#FCC21B]/10 flex items-center justify-center shrink-0">
//           <i className="fa-regular fa-envelope text-[#FCC21B] text-lg"></i>
//         </div>
//         <p className="text-[11px] text-gray-200 leading-relaxed">
//           Your Request Will Be Reviewed By The Organization.<br />You Will Receive A Notification Once A Decision Is Made.
//         </p>
//       </div>

//       {/* Dynamic Circle Icon */}
//       <div className="w-16 h-16 rounded-full bg-[#FCC21B] text-[#0A3A45] mx-auto flex items-center justify-center text-3xl font-extrabold shadow-lg">
//         <i className={isPassed ? 'fa-solid fa-check' : 'fa-solid fa-xmark'}></i>
//       </div>

//       {/* Titles */}
//       <div className="space-y-1">
//         <h3 className="font-bold text-xl text-white">
//           {isPassed ? 'Congratulations!' : 'Test Not Passed'}
//         </h3>
//         <p className="text-xs text-gray-300">
//           {isPassed ? 'You Have Passed The Test Successfully.' : 'Unfortunately, You Did Not Reach The Required Passing Score.'}
//         </p>
//       </div>

//       {/* Score Grid */}
//       <div className="border border-[#FCC21B]/80 rounded-2xl p-4 grid grid-cols-2 text-center items-center divide-x divide-[#FCC21B]/50 bg-black/10">
//         <div>
//           <p className="text-[11px] text-gray-300 mb-1">your Score</p>
//           <p className={`text-2xl font-bold ${isPassed ? 'text-[#FCC21B]' : 'text-red-500'}`}>
//             {userScore}%
//           </p>
//         </div>
//         <div>
//           <p className="text-[11px] text-gray-300 mb-1">Passing Score</p>
//           <p className="text-2xl font-bold text-white">{passingScore}%</p>
//         </div>
//       </div>

//       {/* Bottom Text */}
//       <div className="flex items-center gap-3 text-left px-1">
//         <i className={isPassed ? 'fa-solid fa-gift text-[#FCC21B] text-2xl shrink-0' : 'fa-solid fa-triangle-exclamation text-[#FCC21B] text-2xl shrink-0'}></i>
//         <p className="text-xs font-semibold text-gray-200 leading-snug">
//           {isPassed
//             ? 'Great Job! You Are Now Qualified To Join This Campaign.'
//             : 'Review The Campaign Guidelines And Try Again.'}
//         </p>
//       </div>

//       {/* Action Button */}
//       <div className="pt-2">
//         <button
//           type="button"
//           onClick={onAction}
//           className="w-full bg-[#FCC21B] hover:bg-yellow-400 text-[#0A3A45] font-bold py-3.5 rounded-2xl text-xs transition shadow-lg cursor-pointer"
//         >
//           {isPassed ? 'Send Participation request' : 'Back to guidlines'}
//         </button>
//       </div>
//     </div>
//   );
// }


export default function Step3Result({ submissionResult, onResultAction, onClose }) {
  const isPassed = submissionResult?.isPassed ?? true;
  const userScore = submissionResult?.userScore ?? 90;
  const passingScore = submissionResult?.passingScore ?? 70;

  return (
    <div className="bg-[#0A3A45] text-white rounded-[28px] p-6 md:p-8 w-full relative shadow-2xl border border-white/10 font-poppins">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-300 hover:text-white text-lg transition-colors cursor-pointer"
        aria-label="Close"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* Stepper Header (1 - 2 - 3) */}
      <div className="flex items-center justify-center gap-2 mb-6 pt-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#FCC21B] text-[#0A3A45] font-bold text-xs flex items-center justify-center">1</div>
          <span className="text-[10px] text-gray-300 font-medium">Introduction</span>
        </div>

        <div className="w-8 h-[2px] bg-[#FCC21B] mb-4"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#FCC21B] text-[#0A3A45] font-bold text-xs flex items-center justify-center">2</div>
          <span className="text-[10px] text-gray-300 font-medium">Test</span>
        </div>

        <div className="w-8 h-[2px] bg-[#FCC21B] mb-4"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#FCC21B] text-[#0A3A45] font-bold text-xs flex items-center justify-center">3</div>
          <span className="text-[10px] text-white font-bold">Result</span>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="border border-dashed border-[#FCC21B] rounded-2xl p-3 flex items-center gap-3 mb-6 bg-[#08313A]/50">
        <div className="w-9 h-9 rounded-xl bg-[#FCC21B]/20 flex items-center justify-center shrink-0">
          <i className="fa-regular fa-envelope text-[#FCC21B] text-base"></i>
        </div>
        <p className="text-[11px] leading-tight text-gray-200">
          Your Request Will Be Reviewed By The Organization. You Will Receive A Notification Once A Decision Is Made.
        </p>
      </div>

      {/* Status Icon & Title */}
      <div className="flex flex-col items-center text-center my-4 space-y-2">
        {isPassed ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#FCC21B] flex items-center justify-center text-[#0A3A45] text-3xl font-bold shadow-md">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2 className="text-xl font-bold tracking-wide pt-1">Congratulations!</h2>
            <p className="text-xs text-gray-300 max-w-xs">You Have Passed The Test Successfully.</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-[#FCC21B] flex items-center justify-center text-[#0A3A45] text-3xl font-black shadow-md">
              <i className="fa-solid fa-xmark"></i>
            </div>
            <h2 className="text-xl font-bold tracking-wide pt-1">Test Not Passed</h2>
            <p className="text-xs text-gray-300 max-w-xs">Unfortunately, You Did Not Reach The Required Passing Score.</p>
          </>
        )}
      </div>

      {/* Score Box Container */}
      <div className="border border-[#FCC21B] rounded-2xl p-4 my-5 bg-[#08313A]/40">
        <div className="grid grid-cols-2 text-center divide-x divide-[#FCC21B]">
          <div className="pr-2">
            <p className="text-xs text-gray-300 font-normal mb-1">your Score</p>
            <p className={`text-2xl font-extrabold ${isPassed ? 'text-green-400' : 'text-red-500'}`}>
              {userScore}%
            </p>
          </div>
          <div className="pl-2">
            <p className="text-xs text-gray-300 font-normal mb-1">Passing Score</p>
            <p className="text-2xl font-extrabold text-white">{passingScore}%</p>
          </div>
        </div>
      </div>

      {/* Sub Notice */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-200 my-4">
        {isPassed ? (
          <>
            <i className="fa-solid fa-gift text-[#FCC21B] text-base"></i>
            <span>Great Job! You Are Now Qualified To Join This Campaign.</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-triangle-exclamation text-[#FCC21B] text-base"></i>
            <span>Review The Campaign Guidelines And Try Again.</span>
          </>
        )}
      </div>

<div className="mt-6 flex justify-center">
  <button
    onClick={() => {
      if (isPassed) {
        onResultAction(); // الانتقال للخطوة 4 (حالة الطلب)
      } else {
        onClose(); // إغلاق المودال فوراً ومنع الإعادة
      }
    }}
    className={`w-full font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md cursor-pointer uppercase tracking-wider ${
      isPassed
        ? 'bg-[#FCC21B] hover:bg-yellow-400 text-[#0A3A45]'
        : 'bg-red-500 hover:bg-red-600 text-white'
    }`}
  >
    {isPassed ? 'View Application Status' : 'Close'}
  </button>
</div>
    </div>
  );
}