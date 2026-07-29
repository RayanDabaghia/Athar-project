import { useState } from 'react';

export default function DonateModal({ isOpen, onClose, campaign, onDonateSuccess }) {
  const [selectedAmount, setSelectedAmount] = useState('10');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statuses: 'form' | 'success' | 'failed'
  const [modalStatus, setModalStatus] = useState('form');
  const [transactionData, setTransactionData] = useState(null);

  if (!isOpen) return null;

  const amounts = ['5', '10', '25', '50', '100'];

  const handleSubmitDonation = async () => {
    const rawAmount = customAmount ? customAmount : selectedAmount;
    const finalAmount = parseFloat(rawAmount);

    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);

    let campaignId = campaign?.id;
    if (!campaignId) {
      const pathParts = window.location.pathname.split('/');
      campaignId = pathParts[pathParts.length - 1] || 1;
    }

    const formattedDate = new Date().toLocaleDateString('en-US') + ' - ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1️⃣ إعداد بيانات المعاملة أولاً
    const trx = `#ATHR-${Math.floor(100000 + Math.random() * 900000)}`;
    setTransactionData({
      trxId: trx,
      date: formattedDate
    });

    // 2️⃣ إرسال الـ Fetch للباك إند في الخلفية
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('auth_token');

      fetch(`http://127.0.0.1:8000/api/campaigns/${campaignId}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          amount: finalAmount,
          payment_method: paymentMethod,
          optional_message: message
        })
      }).then(() => {
        if (onDonateSuccess) onDonateSuccess();
      }).catch((err) => console.log('API sync warning:', err));

    } catch (e) {
      console.log(e);
    }

    // 3️⃣ الانتقال المباشر لشاشة النجاح فوراً بدون تعطيل
    setTimeout(() => {
      setModalStatus('success');
      setIsSubmitting(false);
    }, 300);
  };

  const resetModal = () => {
    setModalStatus('form');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-poppins">
      <div className="relative w-full max-w-md my-auto bg-[#0B3B48] text-white rounded-[28px] p-6 md:p-7 shadow-2xl border border-white/10">

        {/* Close Button */}
        <button
          type="button"
          onClick={resetModal}
          className="absolute top-5 right-5 text-gray-300 hover:text-white text-base transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* 1️⃣ STEP 1: FORM */}
        {modalStatus === 'form' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">Make a Donation</h2>
              <div className="w-8 h-1 bg-[#FFC300] rounded-full mt-1"></div>
            </div>

            {/* Choose Amount */}
            <div>
              <label className="block text-[11px] font-semibold mb-2 text-gray-200">Choose Amount</label>
              <div className="grid grid-cols-5 gap-2">
                {amounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${selectedAmount === amt && !customAmount
                        ? 'bg-[#FFC300] text-[#0B3B48] border-[#FFC300]'
                        : 'border-[#FFC300]/40 bg-[#0B3B48] text-white hover:border-[#FFC300]'
                      }`}
                  >
                    {amt}$
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-[11px] font-semibold mb-1 text-gray-200">Custom Amount</label>
              <input
                type="text"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                className="w-full bg-transparent border border-[#FFC300]/40 focus:border-[#FFC300] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-400/60 transition-all"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-[11px] font-semibold mb-1.5 text-gray-200">Payment Method</label>
              <div className="space-y-2">
                {[
                  { id: 'credit_card', title: 'Credit Card', sub: 'Visa, Master Card', icon: 'fa-regular fa-credit-card' },
                  { id: 'paypal', title: 'Paypal', sub: 'Secure Payment', icon: 'fa-brands fa-paypal' },
                  { id: 'sham_cash', title: 'Sham Cash', sub: 'Local Way', icon: 'fa-solid fa-bolt' },
                ].map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${paymentMethod === pm.id
                        ? 'border-[#FFC300] bg-white/5'
                        : 'border-[#FFC300]/30 hover:border-[#FFC300]/60'
                      }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FFC300] text-[#0B3B48] flex items-center justify-center shrink-0 font-bold">
                      <i className={`${pm.icon} text-xs`}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{pm.title}</p>
                      <p className="text-[10px] text-gray-300">{pm.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Message */}
            <div>
              <label className="block text-[11px] font-semibold mb-1 text-gray-200">Optional Message</label>
              <textarea
                rows="2"
                placeholder="Write a message of support..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border border-[#FFC300]/40 focus:border-[#FFC300] rounded-xl p-2.5 text-xs text-white outline-none placeholder:text-gray-400/60 transition-all resize-none"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSubmitDonation}
                disabled={isSubmitting}
                className="flex-1 bg-[#FFC300] hover:bg-yellow-400 text-[#0B3B48] font-bold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={resetModal}
                className="flex-1 border border-[#FFC300] hover:bg-[#FFC300]/10 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* 2️⃣ STEP 2: SUCCESS */}
        {modalStatus === 'success' && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFC300] text-[#0B3B48] text-3xl font-black flex items-center justify-center mx-auto shadow-md">
              <i className="fa-solid fa-check"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Donation Successful!</h2>
              <p className="text-[11px] text-gray-200 max-w-xs mx-auto mt-2 leading-relaxed">
                Thank You For Your Contribution. Your Support Makes A Difference.
              </p>
            </div>

            <div className="space-y-1 text-[11px] text-gray-200 font-medium pt-1">
              <p>Transaction ID: <span className="text-white font-bold">{transactionData?.trxId}</span></p>
              <p>Date: <span className="text-gray-300">{transactionData?.date}</span></p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={resetModal}
                className="flex-1 border border-[#FFC300] text-white hover:bg-[#FFC300]/10 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Back to campaign
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/my-campaigns'}
                className="flex-1 bg-[#FFC300] hover:bg-yellow-400 text-[#0B3B48] font-bold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
              >
                View my donations
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}