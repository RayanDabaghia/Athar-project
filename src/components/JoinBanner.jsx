import logoImg from "../images/logo.png"; // تأكدي من تحميل شعار الدائرة الطائرة وتسميته هنا
import dotsImg from "../images/dots.png"
const JoinBanner = () => {
    return (
        <section className="w-full flex justify-center px-6 py-12 bg-[#F7F9FA]">
            {/* الحاوية الرئيسية للبانر - أبعاد الفيجما والزوايا الدائرية الكبيرة */}
            <div className="w-full max-w-[1200px] bg-[#0A3A45] rounded-[32px] min-h-[328px] relative flex flex-col md:flex-row items-center justify-between px-12 py-8 overflow-visible">

                {/* تأثير الدوائر والنقاط الصفراء بالخلفية باستخدام Tailwind الذكي */}
                <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
                    {/* الدائرة الصفراء الكبيرة على اليمين */}
                    <div className="absolute right-[-100px] top-[-48px] w-[500px] h-[500px] bg-[#F4C542] rounded-full opacity-90"></div>
                    {/* الدائرة الصفراء الصغيرة على اليسار فوق */}
                    <div className="absolute left-[-130px] top-[-140px] w-[240px] h-[240px] bg-[#F4C542] rounded-full opacity-90"></div>
                </div>
                <div className="absolute left-[70%] bottom-0 w-[360px] h-[200px] opacity-30 pointer-events-none hidden md:block z-0">
                    <img
                        src={dotsImg}
                        alt="dots grid"
                        className="w-full h-full object-contain"
                    />
                </div>
                {/* القسم الأيسر: النصوص والزر (مرفوعين بـ relative ليظهروا فوق ألوان الخلفية) */}
                <div className="relative z-10 flex flex-col items-start gap-6 max-w-[500px]">
                    <h2 className="text-white text-[36px] md:text-[42px] font-normal font-adlam leading-tight text-left">
                        Start Your Journey of <br /> Change Today
                    </h2>

                    {/* الزر التفاعلي القابل للضغط مع تأثير الـ Hover */}
                    <button className="border-2 border-[#FFC107] text-[#FFC107] bg-transparent font-outfit font-semibold px-6 py-3 rounded-[12px] text-[16px] hover:bg-[#FFC107] hover:text-[#0A3A45] transition-all duration-300">
                        Join Now for Free
                    </button>
                </div>

                {/* القسم الأيمن: شعار الدائرة الطائر بالـ absolute بالملي متل الفيجما */}
                {/* أبعاد اللوغو من لقطة الشاشة: Width: 175px, Height: 183px */}
                <div className="absolute -top-[60px] right-[10%] w-[175px] h-[183px] z-20">
                    <img
                        src={logoImg}
                        alt="logo"
                        className="w-full h-full object-contain drop-shadow-xl animate-bounce-slow"
                    />
                </div>

                {/* شبكة النقاط النقش الأصفر (يمكنك وضعها كخلفية أو صورة إضافية لو رغبتِ) */}
                <div className="absolute right-[25%] bottom-4 opacity-30 pointer-events-none hidden md:block">
                    {/* هنا لو عندك صورة النقاط النقاط فيكِ تحطيها، حالياً صممنا الألوان الأساسية لتكون نظيفة */}
                </div>

            </div>
        </section>
    );
};

export default JoinBanner;