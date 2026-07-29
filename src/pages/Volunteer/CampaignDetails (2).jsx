
import { useState, useEffect } from 'react';
import JoinModal from './JoinModal';
import DonateModal from './DonateModal';
import ReportModal from './ReportModal';
import Navbar from '../../components/Volunteer/VolunteerNavbar';
import Footer from '../../components/Volunteer/VoulnteerFooter';

const BASE_URL = 'http://127.0.0.1:8000';

export default function CampaignDetails() {
  const [campaignData, setCampaignData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [agreementChecked, setAgreementChecked] = useState(false);

  // Quiz States
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizTimer, setQuizTimer] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submissionResult, setSubmissionResult] = useState({
    userScore: 0,
    passingScore: 70,
    isPassed: false,
  });

  const [applicationDetails, setApplicationDetails] = useState(null);
  const [hasFailedQuiz, setHasFailedQuiz] = useState(false);

  const getToken = () => localStorage.getItem('token') || localStorage.getItem('auth_token');

  const getStorageUrl = (path) => {
    if (!path) return 'https://placehold.co/600x400';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${BASE_URL}/${path.replace(/^\/?(storage\/)?/, 'storage/')}`;
  };

  const getCampaignId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pathParts = window.location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    return (lastPart && !isNaN(lastPart)) ? lastPart : (urlParams.get('id') || 1);
  };

  useEffect(() => {
    fetchCampaignDetails(getCampaignId());
  }, []);

  // 🟢 تحديث دالة الجلب لتستقبل متغيّر يمنع الشاشة البيضاء الشاملة عند إعادة التحديث
  const fetchCampaignDetails = async (id, isSilent = false) => {
    try {
      if (!isSilent) setLoading(true); // تشغيل التحميل الشامل فقط أول مرة عند فتح الصفحة

      const token = getToken();
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${BASE_URL}/api/campaigns/${id}`, { headers });
      const result = await response.json();

      if (response.ok && (result.status === 'success' || result.data)) {
        setCampaignData(result.data || result);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  // Timer Effect for Quiz
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && quizTimer > 0) {
      interval = setInterval(() => setQuizTimer((prev) => prev - 1), 1000);
    } else if (quizTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert('Time is up!');
      handleSubmitQuiz();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, quizTimer]);

  const openJoinModal = () => {
    if (hasFailedQuiz) return;
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  const closeJoinModal = () => {
    setIsModalOpen(false);
    setIsTimerRunning(false);
  };

  const handleStartQuiz = async () => {
    setCurrentStep(2);
    if (questions.length === 0) {
      const campaignId = getCampaignId();
      const token = getToken();
      try {
        const response = await fetch(`${BASE_URL}/api/campaigns/${campaignId}/quiz`, {
          headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        setQuestions(result?.questions || result?.data || []);
        setCurrentQuestionIndex(0);
        setQuizTimer(600);
        setIsTimerRunning(true);
      } catch (error) {
        console.error('Quiz Error:', error);
      }
    } else {
      setIsTimerRunning(true);
    }
  };

  const handleSelectOption = (qId, optionKey) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    const token = getToken();
    if (!token) return alert('Please login first!');

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/api/campaigns/${getCampaignId()}/submit-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers: userAnswers })
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        const data = result?.data || {};
        const score = data.score !== undefined ? data.score : 0;
        const passingScore = data.passing_score !== undefined ? data.passing_score : 70;
        const passed = data.passed !== undefined ? data.passed : (score >= passingScore);

        setSubmissionResult({ userScore: score, passingScore, isPassed: passed });
        setIsTimerRunning(false);
        setCurrentStep(3);
      } else {
        alert(result?.message || 'Failed to submit test.');
      }
    } catch (e) {
      alert('Connection error!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResultAction = async () => {
    if (submissionResult.isPassed) {
      const token = getToken();
      try {
        const res = await fetch(`${BASE_URL}/api/my-applications`, {
          headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok && result?.data && result.data.length > 0) {
          setApplicationDetails(result.data[0]);
        }
      } catch (e) {
        console.error(e);
      }
      setCurrentStep(4);
    } else {
      setHasFailedQuiz(true);
      closeJoinModal();
    }
  };

  // استخراج البيانات
  const camp = campaignData?.campaign_details || {};
  const org = campaignData?.organization || {};
  const contact = campaignData?.contact_us || {};
  const featured = campaignData?.featured_campaigns || [];

  // تحديد نوع الحملة ديناميكياً من الباك إند
  const isDonation = (camp?.category || '').toLowerCase() === 'donation';

  // حسابات التبرع
  const goal = parseFloat(camp?.donation_goal || 10000);
  const raised = parseFloat(camp?.raised_amount || 0);
  const donors = camp?.donors_count || 0;
  const daysLeft = camp?.days_left !== undefined ? camp?.days_left : 0;
  const progressPercent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  // حسابات التطوع
  const needed = parseInt(camp?.volunteers_needed) || 0;
  const registered = parseInt(camp?.volunteers_registered) || 0;
  const remaining = parseInt(camp?.volunteers_remaining) || Math.max(0, needed - registered);
  const volunteerPercent = needed > 0 ? Math.min(100, Math.round((registered / needed) * 100)) : 0;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0A3A45]"></div>
          <p className="text-sm font-medium text-[#0A3A45]">Loading Campaign Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] font-poppins text-[#0A3A45] min-h-screen flex flex-col justify-between antialiased">

      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-6 w-full flex-grow space-y-8">

        {/* Back Button */}
        <div>
          <button onClick={() => window.history.back()} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0A3A45] hover:bg-[#FCC21B] hover:text-white transition-all cursor-pointer border border-gray-100">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>

        {/* HERO CARD: Switches Dynamically */}
        <div className="bg-white rounded-[28px] shadow-[0_10px_30px_rgba(10,58,69,0.06)] border border-gray-100 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-stretch">

          <div className="flex-1 flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-[#0A3A45]">{camp.title}</h1>

              {/* Badge */}
              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FCC21B] text-[#0A3A45] text-[11px] font-bold shadow-sm uppercase tracking-wider">
                <i className={isDonation ? "fa-solid fa-hand-holding-dollar text-xs" : ((camp.type || '').toLowerCase() === 'remote' ? 'fa-solid fa-laptop text-xs' : 'fa-solid fa-location-dot text-xs')}></i>
                <span>{isDonation ? 'Donation' : (camp.type || 'On-Ground')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img src={getStorageUrl(org.logo_url)} className="w-9 h-9 rounded-full object-cover border border-gray-200" alt="Org Logo" />
              <span className="font-medium text-[15px] text-[#5C6B73]">{org.name}</span>
            </div>

            {/* IF DONATION: Show 4 Financial Boxes */}
            {isDonation ? (
              <>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="border border-[#FCC21B] rounded-2xl p-3.5 text-center bg-white shadow-sm">
                    <p className="text-xs text-[#5C6B73] font-semibold">Donation Goal</p>
                    <p className="text-lg font-bold text-[#0A3A45] mt-0.5">${goal.toLocaleString()}</p>
                  </div>
                  <div className="border border-[#FCC21B] rounded-2xl p-3.5 text-center bg-white shadow-sm">
                    <p className="text-xs text-[#5C6B73] font-semibold">Raised Amount</p>
                    <p className="text-lg font-bold text-[#0A3A45] mt-0.5">${raised.toLocaleString()}</p>
                  </div>
                  <div className="border border-[#FCC21B] rounded-2xl p-3.5 text-center bg-white shadow-sm">
                    <p className="text-xs text-[#5C6B73] font-semibold">Donors</p>
                    <p className="text-lg font-bold text-[#0A3A45] mt-0.5">{donors}</p>
                  </div>
                  <div className="border border-[#FCC21B] rounded-2xl p-3.5 text-center bg-white shadow-sm">
                    <p className="text-xs text-[#5C6B73] font-semibold">Days Left</p>
                    <p className="text-lg font-bold text-[#0A3A45] mt-0.5">{daysLeft}</p>
                  </div>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-bold text-[#0A3A45]">
                    <span>${raised.toLocaleString()}</span>
                    <span>${goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-[#E5E9EB] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#0A3A45] h-3 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
              </>
            ) : (
              /* IF VOLUNTEER: Show Date, Location, Time & Volunteer Metrics */
              <>
                <div className="h-[1.5px] bg-[#FCC21B] w-full my-1"></div>
                <div className="grid grid-cols-3 text-center items-center py-1">
                  <div className="px-2"><p className="text-[12px] text-[#5C6B73] font-normal mb-1">Date</p><p className="font-semibold text-[14px] text-[#0A3A45]">{camp.date}</p></div>
                  <div className="px-2 border-x border-[#FCC21B]"><p className="text-[12px] text-[#5C6B73] font-normal mb-1">Location</p><p className="font-semibold text-[14px] text-[#0A3A45] truncate">{camp.location}</p></div>
                  <div className="px-2"><p className="text-[12px] text-[#5C6B73] font-normal mb-1">Time</p><p className="font-semibold text-[14px] text-[#0A3A45]">{camp.time}</p></div>
                </div>
                <div className="h-[1.5px] bg-[#FCC21B] w-full my-1"></div>
                <div className="grid grid-cols-3 text-center items-center py-1">
                  <div><p className="text-[12px] text-[#5C6B73] font-normal mb-1">Volunteer Needed</p><p className="font-semibold text-[15px] text-[#0A3A45]">{needed}</p></div>
                  <div className="border-x border-[#FCC21B] px-2"><p className="text-[12px] text-[#5C6B73] font-normal mb-1">Registered</p><p className="font-semibold text-[15px] text-[#0A3A45]">{registered}</p></div>
                  <div><p className="text-[12px] text-[#5C6B73] font-normal mb-1">Remaining</p><p className="font-semibold text-[15px] text-[#0A3A45]">{remaining}</p></div>
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <div className="w-full bg-[#E5E9EB] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#0A3A45] h-2.5 rounded-full transition-all duration-500" style={{ width: `${volunteerPercent}%` }}></div>
                  </div>
                  <span className="text-[13px] font-bold text-[#0A3A45]">{volunteerPercent}%</span>
                </div>
              </>
            )}
          </div>

          {/* Banner Image */}
          <div className="relative w-full lg:w-[460px] min-h-[260px] rounded-[24px] overflow-hidden border-4 border-[#0A3A45] shrink-0 bg-gray-100 shadow-md">
            <img src={getStorageUrl(camp.image_url)} className="w-full h-full object-cover" alt="Campaign Banner" />
            <div className="absolute bottom-3 right-3 bg-[#0A3A45]/90 text-white px-3 py-1.5 rounded-full text-[12px] flex items-center gap-1.5 shadow-md">
              <i className="fa-solid fa-star text-[#FCC21B]"></i>
              <span className="font-bold">{camp.rating || 5}</span>
              <span className="text-[#9BB0B5] font-light">| {camp.reviews_count || 100} Reviews</span>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: Dynamic Content Switch */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          <div className="lg:col-span-2 bg-white rounded-[28px] shadow-[0_10px_30px_rgba(10,58,69,0.06)] border border-gray-100 p-6 md:p-8 flex flex-col justify-between h-full">

            {isDonation ? (
              /* Donation Benefits & Jar */
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-[#0A3A45]">How Your Donation Helps:</h3>
                      <ul className="space-y-2 mt-3 text-xs text-gray-600 leading-relaxed whitespace-pre-line">{camp.donation_benefits}</ul>
                    </div>
                    {camp.donation_impact && (
                      <div>
                        <h3 className="text-base font-bold text-[#0A3A45] mb-3">Donation Impact</h3>
                        <div className="space-y-2 text-xs font-semibold text-[#0A3A45]">
                          {camp.donation_impact.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center"><span className="w-10 font-extrabold">{item.amount}</span><span className="text-gray-600 font-normal">{item.label}</span></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center py-4">
                    <div className="w-48 h-56 rounded-3xl bg-[#FCC21B]/10 border-2 border-dashed border-[#FCC21B] flex flex-col items-center justify-center text-center p-4">
                      <div className="w-16 h-16 rounded-full bg-[#FCC21B] text-[#0A3A45] flex items-center justify-center text-3xl font-black mb-3 shadow-md"><i className="fa-solid fa-box-open"></i></div>
                      <p className="text-xs font-extrabold text-[#0A3A45] tracking-wider uppercase">DONATE</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex justify-center mt-auto">
                  <button onClick={() => setIsDonateOpen(true)} className="bg-[#0A3A45] hover:bg-opacity-95 text-white font-semibold px-12 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-md transition-all cursor-pointer">
                    <i className="fa-solid fa-hand-holding-dollar text-sm text-[#FCC21B]"></i><span>Donate Now</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Volunteer Tabs & Map */
              <div>
                <div className="border-b-2 border-[#FCC21B] pb-3 flex space-x-12 text-sm font-semibold">
                  {['about', 'requirements', 'location'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`capitalize transition-colors cursor-pointer ${activeTab === tab ? 'text-[#0A3A45] font-bold relative pb-3 border-b-2 border-[#0A3A45] -mb-[14px]' : 'text-gray-500 hover:text-[#0A3A45]'}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'about' && (
                  <div className="mt-6 space-y-6 text-gray-600 text-sm leading-relaxed">
                    <p>{camp.about}</p>
                    <div>
                      <h4 className="font-bold text-[#0A3A45] text-base mb-3">What You Will Do :</h4>
                      <ul className="space-y-2 list-none pl-1 text-gray-600">
                        {(camp.requirements || '').split('\n').map((line, idx) => line.trim() && <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full inline-block"></span><span>{line.replace(/^•\s*/, '')}</span></li>)}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="mt-6 space-y-4 text-gray-600 text-sm leading-relaxed">
                    <h4 className="font-bold text-[#0A3A45] text-base">Requirements & Criteria:</h4>
                    <p className="whitespace-pre-line text-gray-700">{camp.responsibilities}</p>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-[#0A3A45] text-sm mb-2">Meeting Point</h4>
                      <div className="flex items-center gap-2 text-xs">
                        <i className="fa-solid fa-map-location-dot text-[#0A3A45] text-sm"></i>
                        <span className="font-semibold text-[#0A3A45]">{camp.meeting_point || camp.location}</span>
                      </div>
                    </div>
                    <div className="relative w-full h-[220px] rounded-[20px] overflow-hidden border border-gray-200 shadow-inner mt-3">
                      <iframe title="Map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(camp.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
                    </div>
                  </div>
                )}

                <div className="pt-8 flex justify-center mt-auto">
                  <button onClick={openJoinModal} disabled={hasFailedQuiz} className={`${hasFailedQuiz ? 'bg-gray-400 cursor-not-allowed opacity-75' : 'bg-[#0A3A45] hover:bg-opacity-95 cursor-pointer'} text-white font-semibold px-10 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-md transition-all`}>
                    <i className={hasFailedQuiz ? "fa-solid fa-ban text-sm" : "fa-solid fa-right-to-bracket text-sm"}></i>
                    <span>{hasFailedQuiz ? 'Test Failed - Cannot Reapply' : 'Join This Campaign'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Organization Sidebar */}
          <div className="bg-white rounded-[28px] shadow-[0_10px_30px_rgba(10,58,69,0.06)] border border-gray-100 p-6 md:p-8 flex flex-col justify-between h-full">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-[#0A3A45]">About The Organization</h3>
                <div className="w-8 h-1 bg-[#FCC21B] rounded-full mt-1"></div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-12 h-12 rounded-full border border-gray-200 overflow-hidden shrink-0">
                  <img src={getStorageUrl(org.logo_url)} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-[#0A3A45] text-sm">{org.name}</span>
              </div>
              <p className="text-xs text-[#5C6B73] leading-relaxed">{camp.about}</p>
              <div className="space-y-2.5 text-xs text-[#5C6B73] pt-1">
                <div className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-[#FCC21B]"></i><span>{org.address}</span></div>
                {org.website_url && <div className="flex items-center gap-2"><i className="fa-solid fa-globe text-[#FCC21B]"></i><a href={org.website_url} target="_blank" rel="noreferrer" className="text-[#5C6B73] hover:underline truncate">{org.website_url.replace(/^https?:\/\//, '')}</a></div>}
              </div>
            </div>
            <div className="pt-6 mt-auto">
              <button onClick={() => org.id && (window.location.href = `/organization-details?id=${org.id}`)} className="w-full bg-[#0A3A45] hover:bg-opacity-95 text-white text-xs font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
                <i className="fa-solid fa-bars-staggered"></i><span>View Organization</span>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Featured Campaigns & Contact Us */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-2">

          <div className="lg:col-span-2 bg-white rounded-[28px] shadow-[0_10px_30px_rgba(10,58,69,0.06)] border border-gray-100 p-6 md:p-8 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#0A3A45]">Featured Campaigns</h2>
                  <a href="/campaigns" className="text-xs text-[#5C6B73] hover:text-[#0A3A45] transition-colors">view all</a>
                </div>
                <div className="w-8 h-1 bg-[#FCC21B] rounded-full mt-1"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {featured.map((item) => (
                  <div key={item.id} className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex flex-col items-center text-center justify-between space-y-3 max-w-[240px] mx-auto w-full h-full">
                    <div className="w-full h-28 rounded-[40px] overflow-hidden border-[3px] border-[#0A3A45] bg-white flex items-center justify-center p-1 shrink-0">
                      <img src={getStorageUrl(item.image_url)} className="w-full h-full object-contain rounded-[32px]" alt={item.title} />
                    </div>
                    <div className="w-full text-left space-y-1 pt-1">
                      <h3 className="font-bold text-[13px] text-[#0A3A45] leading-tight line-clamp-1">{item.title}</h3>
                      <div className="w-8 h-[2px] bg-[#FCC21B] rounded-full"></div>
                    </div>
                    <div className="text-[11px] text-[#5C6B73] space-y-2 w-full text-left pt-1">
                      <p className="flex items-center gap-2"><i className="fa-solid fa-hands-holding-child text-[#FCC21B] text-xs"></i><span className="font-medium text-gray-700 truncate">{item.org_name}</span></p>
                      <p className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-[#FCC21B] text-xs"></i><span className="text-gray-500 truncate">{item.location}</span></p>
                    </div>

                    {/* Toggling Rating Section */}
                    <div className="flex items-center gap-1.5 text-[11px] w-full text-left pt-0.5">
                      <i className="fa-solid fa-star text-[#FCC21B] text-xs"></i>
                      <span className="font-bold text-[#0A3A45]">{item.rating || 5}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-[#5C6B73] font-light">{item.reviews_count || 100} Reviews</span>
                    </div>

                    <button onClick={() => window.location.href = `/campaigns/${item.id}`} className="w-full bg-[#0A3A45] hover:bg-opacity-95 text-white text-[12px] font-semibold py-2.5 rounded-2xl transition shadow-md cursor-pointer mt-1">See details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[28px] shadow-[0_10px_30px_rgba(10,58,69,0.06)] border border-gray-100 p-6 md:p-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-lg font-bold text-[#0A3A45]">Contact Us</h2>
              <div className="w-8 h-1 bg-[#FCC21B] rounded-full mt-1"></div>
            </div>
            <div className="space-y-8 text-xs font-medium my-auto py-6">
              <div className="flex items-center gap-4"><div className="w-11 h-11 rounded-full bg-[#0A3A45] text-white flex items-center justify-center shrink-0 shadow-sm"><i className="fa-solid fa-phone text-sm"></i></div><div><p className="font-bold text-[#0A3A45] text-sm">Call us</p><p className="text-[#5C6B73]">{contact.phone}</p></div></div>
              <div className="flex items-center gap-4"><div className="w-11 h-11 rounded-full bg-[#0A3A45] text-white flex items-center justify-center shrink-0 shadow-sm"><i className="fa-solid fa-envelope text-sm"></i></div><div><p className="font-bold text-[#0A3A45] text-sm">Mail Us</p><p className="text-[#5C6B73]">{contact.email}</p></div></div>
              <div className="flex items-center gap-4"><div className="w-11 h-11 rounded-full bg-[#0A3A45] text-white flex items-center justify-center shrink-0 shadow-sm"><i className="fa-solid fa-location-dot text-sm"></i></div><div><p className="font-bold text-[#0A3A45] text-sm">Visit Us</p><p className="text-[#5C6B73]">{contact.address}</p></div></div>
            </div>
            <div className="pt-2 mt-auto">
              <button onClick={() => setIsReportOpen(true)} className="w-full bg-[#0A3A45] hover:bg-opacity-95 text-white text-xs font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <i className="fa-solid fa-circle-exclamation text-xs"></i><span>Report Issue</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        campaign={camp}
        // 🟢 استدعاء التحديث صامتاً حتى لا يُدمّر المودال أثناء تعامل المستخدم معه
        onDonateSuccess={() => fetchCampaignDetails(getCampaignId(), true)}
      />
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        campaignId={camp?.id || getCampaignId()}
        organizationId={org?.id}
      />
      {isModalOpen && (
        <JoinModal
          isOpen={isModalOpen}
          onClose={closeJoinModal}
          currentStep={currentStep}
          camp={camp}
          org={org}
          agreementChecked={agreementChecked}
          setAgreementChecked={setAgreementChecked}
          onStartQuiz={handleStartQuiz}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          userAnswers={userAnswers}
          quizTimer={quizTimer}
          isSubmitting={isSubmitting}
          onSelectOption={handleSelectOption}
          onPrevQuestion={handlePrevQuestion}
          onNextQuestion={handleNextQuestion}
          submissionResult={submissionResult}
          onResultAction={handleResultAction}
          applicationDetails={applicationDetails}
        />
      )}
    </div>
  );
}

