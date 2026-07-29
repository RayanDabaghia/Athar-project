// import React from 'react';

// export default function Step1Intro({ camp, agreementChecked, setAgreementChecked, onContinue }) {
//   return (
//     <div className="space-y-6">
//       {/* Dashed Greeting Box */}
//       <div className="border border-dashed border-[#FCC21B]/80 rounded-2xl p-4 text-center text-xs leading-relaxed text-gray-200">
//         Thank You For Your Interest In Our Campaign.<br />
//         Please Read The Information Below Before Continuing.
//       </div>

//       {/* Section 1: About */}
//       <div className="space-y-2">
//         <div className="flex items-center gap-2 text-[#FCC21B] font-bold text-sm">
//           <div className="w-5 h-5 rounded-full bg-[#FCC21B] text-[#0A3A45] flex items-center justify-center text-xs font-extrabold">i</div>
//           <span>About This Campaign</span>
//         </div>
//         <p className="text-xs text-gray-300 leading-relaxed pl-7">
//           {camp.about || 'Join Us In Planting 500 Trees To Improve Air Quality And Create A Healthier Environment For Future Generations.'}
//         </p>
//       </div>

//       {/* Section 2: Responsibilities */}
//       <div className="space-y-2">
//         <div className="flex items-center gap-2 text-[#FCC21B] font-bold text-sm">
//           <i className="fa-solid fa-briefcase text-base"></i>
//           <span>Your Responsibilities</span>
//         </div>
//         <div className="text-xs text-gray-300 space-y-1.5 pl-7 leading-relaxed">
//           <p>Follow The Team Leader Instructions.</p>
//           <p>Respect The Environment And Protect Trees.</p>
//           <p>Complete Assigned Tasks.</p>
//           <p>Cooperate With Other Volunteers.</p>
//         </div>
//       </div>

//       {/* Section 3: Notes */}
//       <div className="space-y-2">
//         <div className="flex items-center gap-2 text-[#FCC21B] font-bold text-sm">
//           <div className="w-5 h-5 rounded-full bg-[#FCC21B] text-[#0A3A45] flex items-center justify-center text-xs font-extrabold">!</div>
//           <span>Important Notes</span>
//         </div>
//         <div className="text-xs text-gray-300 space-y-1.5 pl-7 leading-relaxed">
//           <p>Wear Comfortable Clothes And Closed Shoes.</p>
//           <p>Arrive On Time.</p>
//           <p>Bring Water If Needed.</p>
//           <p>Stay In The Assigned Area.</p>
//         </div>
//       </div>

//       {/* Agreement Checkbox */}
//       <div className="pt-2">
//         <label className="flex items-center gap-3 cursor-pointer text-xs text-gray-200 select-none">
//           <input
//             type="checkbox"
//             checked={agreementChecked}
//             onChange={(e) => setAgreementChecked(e.target.checked)}
//             className="w-4 h-4 accent-[#FCC21B] rounded border-gray-400 cursor-pointer"
//           />
//           <span>I have read and understood the campaign guidlines.</span>
//         </label>
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={onContinue}
//         disabled={!agreementChecked}
//         className="w-full bg-[#FCC21B] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A3A45] font-bold py-3.5 rounded-2xl shadow-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 text-sm mt-4 cursor-pointer"
//       >
//         <span>Continue To Test</span>
//         <i className="fa-solid fa-arrow-right"></i>
//       </button>
//     </div>
//   );
// }

export default function Step1Intro({ camp, agreementChecked, setAgreementChecked, onStartQuiz, onClose }) {
  return (
    <div className="bg-[#0A3A45] text-white rounded-[28px] p-6 md:p-8 w-full max-w-lg mx-auto relative shadow-2xl border border-white/10 font-poppins">

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
          <span className="text-[10px] text-white font-bold">Introduction</span>
        </div>

        <div className="w-8 h-[2px] bg-gray-500 mb-4"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-600 text-gray-300 font-bold text-xs flex items-center justify-center">2</div>
          <span className="text-[10px] text-gray-400 font-medium">Test</span>
        </div>

        <div className="w-8 h-[2px] bg-gray-500 mb-4"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-600 text-gray-300 font-bold text-xs flex items-center justify-center">3</div>
          <span className="text-[10px] text-gray-400 font-medium">Result</span>
        </div>
      </div>

      {/* Top Banner Notice */}
      <div className="border border-dashed border-[#FCC21B] rounded-2xl p-3.5 text-center mb-6 bg-[#08313A]/50">
        <p className="text-xs font-semibold text-gray-200">
          Thank You For Your Interest In Our Campaign.
        </p>
        <p className="text-[11px] text-gray-300 mt-0.5">
          Please Read The Information Below Before Continuing.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-4 text-xs leading-relaxed text-gray-200">

        {/* About This Campaign */}
        <div>
          <div className="flex items-center gap-2 font-bold text-[#FCC21B] text-sm mb-1">
            <i className="fa-solid fa-circle-info"></i>
            <span>About This Campaign</span>
          </div>
          <p className="text-gray-300 pl-6 dir-rtl">
            {camp?.about || camp?.description || 'تهدف من خلال هذه الحملة البيئية إلى زراعة أكثر من 1000 شجرة في المناطق المتضررة وتحسين المظهر العام للمدينة.'}
          </p>
        </div>

        {/* Your Responsibilities */}
        <div>
          <div className="flex items-center gap-2 font-bold text-[#FCC21B] text-sm mb-1">
            <i className="fa-solid fa-briefcase"></i>
            <span>Your Responsibilities</span>
          </div>
          <ul className="space-y-1.5 pl-6 text-gray-300">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Follow The Team Leader Instructions.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Respect The Environment And Protect Trees.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Complete Assigned Tasks.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Cooperate With Other Volunteers.</li>
          </ul>
        </div>

        {/* Important Notes */}
        <div>
          <div className="flex items-center gap-2 font-bold text-[#FCC21B] text-sm mb-1">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>Important Notes</span>
          </div>
          <ul className="space-y-1.5 pl-6 text-gray-300">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Wear Comfortable Clothes And Closed Shoes.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Arrive On Time.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Bring Water If Needed.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FCC21B] rounded-full"></span> Stay In The Assigned Area.</li>
          </ul>
        </div>

      </div>

      {/* Checkbox Agreement */}
      <div className="mt-6 pt-2 border-t border-white/10 flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agreementChecked}
          onChange={(e) => setAgreementChecked(e.target.checked)}
          className="w-4 h-4 accent-[#FCC21B] rounded cursor-pointer"
        />
        <label htmlFor="agree" className="text-xs text-gray-200 cursor-pointer font-medium">
          I have read and understood the campaign guidelines.
        </label>
      </div>

      {/* Continue Button */}
      <div className="mt-6">
        <button
          onClick={onStartQuiz}
          disabled={!agreementChecked}
          className={`w-full font-bold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-wider ${agreementChecked
              ? 'bg-[#FCC21B] hover:bg-yellow-400 text-[#0A3A45] cursor-pointer'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-60'
            }`}
        >
          <span>Continue To Test</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  );
}