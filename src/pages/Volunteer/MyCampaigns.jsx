import { useState, useEffect } from 'react';
import Navbar from '../../components/Volunteer/VolunteerNavbar';
import Footer from '../../components/Volunteer/VoulnteerFooter';
const BASE_URL = 'http://127.0.0.1:8000';

function RateModal({ isOpen, onClose, campaignId, campaignTitle, onRatedSuccess }) {
  const [rating, setRating] = useState(5);
  const [recommend, setRecommend] = useState('yes');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const getToken = () => localStorage.getItem('token') || localStorage.getItem('auth_token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = getToken();

    try {
      const response = await fetch(`${BASE_URL}/api/campaigns/${campaignId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, recommend, feedback })
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        alert(result.message || 'Thank you! Your feedback has been submitted successfully.');
        onClose();
        if (onRatedSuccess) onRatedSuccess();
      } else {
        alert(result.message || 'Failed to submit review.');
      }
    } catch (error) {
      console.error('Rating error:', error);
      alert('Connection error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-poppins">
      <div className="relative w-full max-w-md my-auto bg-[#0B3B48] text-white rounded-[28px] p-6 md:p-8 shadow-2xl border border-white/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-300 hover:text-white text-base transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">Rate Your Experience</h2>
          <div className="w-8 h-1 bg-[#FFC300] rounded-full mt-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-300">Campaign</label>
            <p className="text-sm font-bold text-white truncate">{campaignTitle || 'Campaign Experience'}</p>
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none cursor-pointer transition-transform hover:scale-110"
                >
                  <i className={`fa-solid fa-star ${star <= rating ? 'text-[#FFC300]' : 'text-gray-500'}`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-300">Would you recommend this campaign?</label>
            <div
              onClick={() => setRecommend('yes')}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${recommend === 'yes' ? 'border-[#FFC300] bg-white/5' : 'border-[#FFC300]/30 hover:border-[#FFC300]/60'
                }`}
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${recommend === 'yes' ? 'bg-[#FFC300] border-[#FFC300] text-[#0B3B48]' : 'border-gray-400'}`}>
                {recommend === 'yes' && <i className="fa-solid fa-check text-[10px] font-bold"></i>}
              </div>
              <span className="text-xs font-semibold text-white">Yes, Definitely</span>
            </div>

            <div
              onClick={() => setRecommend('no')}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${recommend === 'no' ? 'border-[#FFC300] bg-white/5' : 'border-[#FFC300]/30 hover:border-[#FFC300]/60'
                }`}
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${recommend === 'no' ? 'bg-[#FFC300] border-[#FFC300] text-[#0B3B48]' : 'border-gray-400'}`}>
                {recommend === 'no' && <i className="fa-solid fa-check text-[10px] font-bold"></i>}
              </div>
              <span className="text-xs font-semibold text-white">No</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Optional Feedback</label>
            <textarea
              rows="3"
              placeholder="Write a feedback of support..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-transparent border border-[#FFC300]/40 focus:border-[#FFC300] rounded-xl p-3 text-xs text-white outline-none placeholder:text-gray-400/60 transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FFC300] hover:bg-yellow-400 text-[#0B3B48] font-bold py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50 text-center"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#FFC300] hover:bg-[#FFC300]/10 text-white font-bold py-3 rounded-xl text-xs transition-all cursor-pointer text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MyCampaigns() {
  const [activeTab, setActiveTab] = useState('all');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isRateOpen, setIsRateOpen] = useState(false);
  const [selectedCampaignForRating, setSelectedCampaignForRating] = useState({ id: null, title: '' });

  const getToken = () => localStorage.getItem('token') || localStorage.getItem('auth_token');

  const fetchTabData = async (tab) => {
    setLoading(true);
    const token = getToken();
    let endpoint = '/api/my-campaigns/all'; // تم التعديل لتطابق المسار الصحيح

    if (tab === 'all') endpoint = '/api/my-campaigns/all';
    else if (tab === 'current') endpoint = '/api/my-campaigns/current';
    else if (tab === 'upcoming') endpoint = '/api/my-campaigns/upcoming';
    else if (tab === 'completed') endpoint = '/api/my-campaigns/completed';
    else if (tab === 'donations') endpoint = '/api/my-campaigns/donations';

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setTableData(result.data || []);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  const renderTableHeaders = () => {
    if (activeTab === 'all') {
      return (
        <>
          <th className="py-4 px-6 text-left">Campaign</th>
          <th className="py-4 px-6 text-left">Location</th>
          <th className="py-4 px-6 text-left">Start Date</th>
          <th className="py-4 px-6 text-left">End Date</th>
        </>
      );
    } else if (activeTab === 'current') {
      return (
        <>
          <th className="py-4 px-6 text-left">Campaign</th>
          <th className="py-4 px-6 text-left">Location</th>
          <th className="py-4 px-6 text-left">Start Date</th>
          <th className="py-4 px-6 text-left">End Date</th>
        </>
      );
    } else if (activeTab === 'upcoming') {
      return (
        <>
          <th className="py-4 px-6 text-left">Campaign</th>
          <th className="py-4 px-6 text-left">Location</th>
          <th className="py-4 px-6 text-left">Status</th>
          <th className="py-4 px-6 text-left">Start Date</th>
        </>
      );
    } else if (activeTab === 'completed') {
      return (
        <>
          <th className="py-4 px-6 text-left">Campaign</th>
          <th className="py-4 px-6 text-left">Location</th>
          <th className="py-4 px-6 text-left">Hours Participated</th>
          <th className="py-4 px-6 text-left">Rating</th>
        </>
      );
    } else if (activeTab === 'donations') {
      return (
        <>
          <th className="py-4 px-6 text-left">Campaign</th>
          <th className="py-4 px-6 text-left">Payment Method</th>
          <th className="py-4 px-6 text-left">Amount</th>
          <th className="py-4 px-6 text-left">Date</th>
        </>
      );
    }
  };

  const renderTableRow = (item, index) => {
    if (activeTab === 'all') {
      return (
        <tr key={index} className="border-b border-[#FFC300]/30 text-xs text-[#0A3A45]">
          <td className="py-4 px-6 font-semibold">{item.campaign}</td>
          <td className="py-4 px-6">{item.location}</td>
          <td className="py-4 px-6">{item.start_date}</td>
          <td className="py-4 px-6">{item.end_date}</td>
        </tr>
      );
    } else if (activeTab === 'current') {
      return (
        <tr key={index} className="border-b border-[#FFC300]/30 text-xs text-[#0A3A45]">
          <td className="py-4 px-6 font-semibold">{item.campaign}</td>
          <td className="py-4 px-6">{item.location}</td>
          <td className="py-4 px-6">{item.start_date}</td>
          <td className="py-4 px-6">{item.end_date}</td>
        </tr>
      );
    } else if (activeTab === 'upcoming') {
      const statusColor =
        item.status === 'Accepted' ? 'text-green-600 font-bold' :
          item.status === 'Pending' ? 'text-yellow-600 font-bold' : 'text-red-600 font-bold';
      return (
        <tr key={index} className="border-b border-[#FFC300]/30 text-xs text-[#0A3A45]">
          <td className="py-4 px-6 font-semibold">{item.campaign}</td>
          <td className="py-4 px-6">{item.location}</td>
          <td className={`py-4 px-6 ${statusColor}`}>{item.status}</td>
          <td className="py-4 px-6">{item.start_date}</td>
        </tr>
      );
    } else if (activeTab === 'completed') {
      return (
        <tr key={index} className="border-b border-[#FFC300]/30 text-xs text-[#0A3A45]">
          <td className="py-4 px-6 font-semibold">{item.campaign}</td>
          <td className="py-4 px-6">{item.location}</td>
          <td className="py-4 px-6">{item.hours_participated}</td>
          <td className="py-4 px-6">
            {item.rating ? (
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className={`fa-solid fa-star text-xs ${star <= item.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                ))}
              </div>
            ) : (
              <button
                onClick={() => {
                  setSelectedCampaignForRating({ id: item.id || 1, title: item.campaign });
                  setIsRateOpen(true);
                }}
                className="px-4 py-1.5 border border-[#0A3A45] text-[#0A3A45] hover:bg-[#0A3A45] hover:text-white rounded-full text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                Rate
              </button>
            )}
          </td>
        </tr>
      );
    } else if (activeTab === 'donations') {
      return (
        <tr key={index} className="border-b border-[#FFC300]/30 text-xs text-[#0A3A45]">
          <td className="py-4 px-6 font-semibold">{item.campaign}</td>
          <td className="py-4 px-6">{item.payment_method}</td>
          <td className="py-4 px-6 font-bold text-green-700">{item.amount}</td>
          <td className="py-4 px-6">{item.date}</td>
        </tr>
      );
    }
  };

  return (
    <div className="bg-[#F8FAFC] font-poppins text-[#0A3A45] min-h-screen flex flex-col justify-between antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A3A45]">My Campaigns</h1>
          <div className="w-12 h-1 bg-[#FFC300] rounded-full mt-1.5"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { id: 'all', label: 'All Campaigns' },
            { id: 'current', label: 'Current' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'donations', label: 'Donations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${activeTab === tab.id
                ? 'bg-[#0A3A45] text-white border-[#0A3A45] shadow-md scale-105'
                : 'bg-white text-[#0A3A45] border-gray-200 hover:border-[#FFC300]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[28px] shadow-[0_10px_30px_rgba(10,58,69,0.06)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A3A45] text-white text-xs font-semibold tracking-wide">
                  {renderTableHeaders()}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-gray-400 text-sm">
                      <div className="flex justify-center items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#FFC300]"></div>
                        Loading campaigns...
                      </div>
                    </td>
                  </tr>
                ) : tableData.length > 0 ? (
                  tableData.map((item, index) => renderTableRow(item, index))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-gray-400 text-xs">
                      No records found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />

      <RateModal
        isOpen={isRateOpen}
        onClose={() => setIsRateOpen(false)}
        campaignId={selectedCampaignForRating.id}
        campaignTitle={selectedCampaignForRating.title}
        onRatedSuccess={() => fetchTabData(activeTab)}
      />
    </div>
  );
}