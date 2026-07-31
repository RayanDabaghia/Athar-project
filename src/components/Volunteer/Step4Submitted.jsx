// import React from 'react';

// export default function Step4Submitted({ applicationDetails, camp, org }) {
//   return (
//     <div className="space-y-6 text-center">
//       <div className="space-y-1 pt-2">
//         <h3 className="font-bold text-xl text-white">Request Submitted!</h3>
//         <p className="text-xs text-gray-300">Your Participation Request Has Been Sent To The Organization.</p>
//       </div>

//       <div className="border border-[#FCC21B] rounded-2xl p-5 text-left bg-black/20 space-y-4">
//         <h4 className="text-xs font-bold text-[#FCC21B] tracking-wide border-b border-[#FCC21B]/30 pb-2">
//           Applications Status
//         </h4>

//         <div className="space-y-3.5 text-xs">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-xl bg-[#FCC21B]/10 flex items-center justify-center shrink-0">
//               <i className="fa-solid fa-desktop text-[#FCC21B] text-sm"></i>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-400">Current Status</p>
//               <p className="font-bold text-white">{applicationDetails?.status || 'Pending , Under Review'}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 pt-1 border-t border-white/5">
//             <div className="w-8 h-8 rounded-xl bg-[#FCC21B]/10 flex items-center justify-center shrink-0">
//               <i className="fa-solid fa-building text-[#FCC21B] text-sm"></i>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-400">Organization</p>
//               <p className="font-bold text-white">{applicationDetails?.organization_name || org.name || 'The Life Organization'}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 pt-1 border-t border-white/5">
//             <div className="w-8 h-8 rounded-xl bg-[#FCC21B]/10 flex items-center justify-center shrink-0">
//               <i className="fa-solid fa-copy text-[#FCC21B] text-sm"></i>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-400">Campaign</p>
//               <p className="font-bold text-white">{applicationDetails?.campaign_title || camp.title || 'Tree Planting Campaign'}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 pt-1 border-t border-white/5">
//             <div className="w-8 h-8 rounded-xl bg-[#FCC21B]/10 flex items-center justify-center shrink-0">
//               <i className="fa-solid fa-location-dot text-[#FCC21B] text-sm"></i>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-400">Location</p>
//               <p className="font-bold text-white">{applicationDetails?.location || camp.location || 'Aleppo, The Public Park'}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 pt-1 border-t border-white/5">
//             <div className="w-8 h-8 rounded-xl bg-[#FCC21B]/10 flex items-center justify-center shrink-0">
//               <i className="fa-solid fa-calendar-days text-[#FCC21B] text-sm"></i>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-400">Submitted On</p>
//               <p className="font-bold text-white">
//                 {new Date().toLocaleDateString('en-ZA')}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="pt-2">
//         <button
//           type="button"
//           onClick={() => window.location.href = '/my-campaigns'}
//           className="w-full bg-[#FCC21B] hover:bg-yellow-400 text-[#0A3A45] font-bold py-3.5 rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
//         >
//           <span>Go To My Campaigns</span>
//           <i className="fa-solid fa-arrow-right"></i>
//         </button>
//       </div>
//     </div>
//   );
// }


export default function Step4Submitted({ applicationDetails, camp, org, onClose }) {
  const status = applicationDetails?.status || 'under_review';

  return (
    <div className="bg-[#0A3A45] text-white rounded-[28px] p-6 md:p-8 w-full max-w-lg mx-auto relative shadow-2xl border border-white/10 font-poppins text-center">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-300 hover:text-white text-lg transition-colors cursor-pointer"
        aria-label="Close"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* Top Banner Notice */}
      <div className="border border-dashed border-[#FCC21B] rounded-2xl p-3.5 mb-6 bg-[#08313A]/50">
        <p className="text-xs font-semibold text-gray-200">
          Your Request Has Been Submitted Successfully!
        </p>
      </div>

      {/* Main Icon */}
      <div className="w-16 h-16 rounded-full bg-[#FCC21B] text-[#0A3A45] text-3xl font-bold flex items-center justify-center mx-auto my-4 shadow-lg">
        <i className="fa-solid fa-[#FCC21B] fa-clock-rotate-left text-2xl"></i>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Application Under Review</h2>
      <p className="text-xs text-gray-300 max-w-xs mx-auto mb-6">
        The organization team will evaluate your application and notify you soon.
      </p>

      {/* Application Summary Box */}
      <div className="border border-[#FCC21B] rounded-2xl p-4 my-4 bg-[#08313A]/60 text-left text-xs space-y-2.5">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-gray-400">Campaign:</span>
          <span className="font-semibold text-white truncate max-w-[180px]">{camp?.title || 'Tree Planting Campaign'}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-gray-400">Organization:</span>
          <span className="font-semibold text-white">{org?.name || 'The Lifa Organization'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Status:</span>
          <span className="px-3 py-1 rounded-full bg-[#FCC21B] text-[#0A3A45] font-bold text-[10px] uppercase">
            {status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Close Action Button */}
      <div className="mt-6">
        <button
          onClick={onClose}
          className="w-full bg-[#FCC21B] hover:bg-yellow-400 text-[#0A3A45] font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md cursor-pointer uppercase tracking-wider"
        >
          Done
        </button>
      </div>

    </div>
  );
}