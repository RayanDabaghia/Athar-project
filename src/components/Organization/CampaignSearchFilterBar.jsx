import { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

const STATUS_OPTIONS = ['All Campaigns', 'Upcoming Campaigns', 'Current Campaigns', 'Completed Campaigns'];

const CampaignSearchFilterBar = ({ searchValue, onSearchChange, onStatusChange }) => {
    const wrapperRef = useRef(null);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All Campaigns');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setIsFilterOpen(false);
        onStatusChange?.(status);
    };

    return (
        <div ref={wrapperRef} className="relative flex flex-col sm:flex-row items-stretch gap-3 w-full">
            {/* شريط البحث */}
            <div className="flex items-center gap-3 border-2 border-primary rounded-full px-5 py-3 bg-white flex-1 shadow-md">
                <Search size={20} className="text-primary flex-shrink-0" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search Campaigns"
                    className="w-full outline-none font-inter text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                />
            </div>

            {/* زر الفلاتر */}
            <button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="flex items-center justify-center gap-2 bg-primary text-white font-inter font-medium rounded-full px-6 py-3 hover:bg-primary/90 transition whitespace-nowrap shadow-md"
            >
                <SlidersHorizontal size={18} />
                Filters
                {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* قائمة الفلترة (بدون أقسام، مباشرة) */}
            {isFilterOpen && (
                <div className="absolute top-full right-0 mt-3 z-20 bg-primary rounded-[26px] w-full sm:w-64 px-5 py-4 shadow-lg">
                    <ul className="flex flex-col gap-4">
                        {STATUS_OPTIONS.map((status) => (
                            <li key={status}>
                                <button
                                    onClick={() => handleSelectStatus(status)}
                                    className={`font-inter text-sm text-left w-full transition
                    ${selectedStatus === status ? 'text-primary2 font-semibold' : 'text-white/90 hover:text-primary2'}`}
                                >
                                    {status}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CampaignSearchFilterBar;