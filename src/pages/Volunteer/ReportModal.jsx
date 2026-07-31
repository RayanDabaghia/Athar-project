import { useState } from 'react';

const BASE_URL = 'http://127.0.0.1:8000';

export default function ReportModal({ isOpen, onClose, campaignId, organizationId }) {
  const [reportType, setReportType] = useState('campaign');
  const [nameInput, setNameInput] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const getToken = () => localStorage.getItem('token') || localStorage.getItem('auth_token');

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setEvidenceFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setEvidenceFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const token = getToken();
    const formData = new FormData();

    formData.append('report_type', reportType);
    formData.append('reason', reason);
    formData.append('description', description);

    // إرسال المعرف أو النص المطلوب البحث عنه
    const targetValue = nameInput || (reportType === 'campaign' ? campaignId : organizationId);

    if (reportType === 'campaign') {
      formData.append('campaign_id', targetValue || '1');
    } else {
      formData.append('organization_id', targetValue || '1');
    }

    // إرسال الملفات بأمان للباك إند
    evidenceFiles.forEach((file) => {
      formData.append('evidence[]', file);
    });

    try {
      const response = await fetch(`${BASE_URL}/api/reports/submit`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.status === 'success') {
        setSuccessMessage(result.message || 'Report submitted successfully!');
        setTimeout(() => {
          onClose();
          setSuccessMessage('');
          setNameInput('');
          setReason('');
          setDescription('');
          setEvidenceFiles([]);
        }, 2000);
      } else {
        console.error('Validation Errors:', result.errors);
        alert(result.message || 'Validation error, please check your inputs.');
      }
    } catch (error) {
      console.error('Report submission error:', error);
      alert('Connection error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-poppins">
      <div className="relative w-full max-w-lg my-auto bg-[#0B3B48] text-white rounded-[28px] p-6 md:p-8 shadow-2xl border border-white/10">

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-300 hover:text-white text-base transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Report issue</h2>
          <div className="w-8 h-1 bg-[#FFC300] rounded-full mt-1"></div>
        </div>

        {successMessage ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFC300] text-[#0B3B48] text-3xl font-black flex items-center justify-center mx-auto shadow-md">
              <i className="fa-solid fa-check"></i>
            </div>
            <p className="text-sm font-semibold text-white">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Toggle Switch Tabs */}
            <div className="flex justify-center mb-4">
              <div className="bg-[#072B35] p-1 rounded-full flex border border-white/10 w-full max-w-xs">
                <button
                  type="button"
                  onClick={() => setReportType('campaign')}
                  className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${reportType === 'campaign' ? 'bg-white text-[#0B3B48] shadow-md' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  Campaign
                </button>
                <button
                  type="button"
                  onClick={() => setReportType('organization')}
                  className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${reportType === 'organization' ? 'bg-white text-[#0B3B48] shadow-md' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  Organization
                </button>
              </div>
            </div>

            {/* Campaign/Organization Name Input */}
            <div>
              <label className="block text-[11px] font-semibold mb-1 text-gray-200">
                {reportType === 'campaign' ? 'Campaign Name / ID' : 'Organization Name / ID'}
              </label>
              <input
                type="text"
                required
                placeholder={reportType === 'campaign' ? 'Enter The Campaign Name' : 'Enter The Organization Name'}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-transparent border border-[#FFC300]/40 focus:border-[#FFC300] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-400/60 transition-all"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-[11px] font-semibold mb-1 text-gray-200">Reason</label>
              <input
                type="text"
                required
                placeholder="Enter The Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-transparent border border-[#FFC300]/40 focus:border-[#FFC300] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-400/60 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-semibold mb-1 text-gray-200">Description</label>
              <textarea
                rows="2"
                required
                placeholder="Enter The Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-transparent border border-[#FFC300]/40 focus:border-[#FFC300] rounded-xl p-2.5 text-xs text-white outline-none placeholder:text-gray-400/60 transition-all resize-none"
              ></textarea>
            </div>

            {/* Upload Evidence */}
            <div>
              <label className="block text-[11px] font-semibold mb-1 text-gray-200">Upload Evidence</label>

              {evidenceFiles.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {evidenceFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#072B35] border border-[#FFC300]/60 rounded-xl px-3 py-2 text-xs">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                          <i className="fa-regular fa-file text-[#FFC300] text-[10px]"></i>
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-white text-[11px] truncate">{file.name}</p>
                          <p className="text-[9px] text-gray-400">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-300 hover:text-white text-xs ml-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="border-2 border-dashed border-[#FFC300]/50 hover:border-[#FFC300] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-white/5 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white text-[#0B3B48] flex items-center justify-center text-lg font-bold mb-2 shadow-sm">
                  <i className="fa-solid fa-plus"></i>
                </div>
                <p className="text-[11px] text-gray-200 font-medium">Drag & drop your documents or click to upload</p>
                <p className="text-[9px] text-gray-400 mt-1">PDF, JPG, PNG (Max 4MB)</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#FFC300] hover:bg-yellow-400 text-[#0B3B48] font-bold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-[#FFC300] hover:bg-[#FFC300]/10 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}