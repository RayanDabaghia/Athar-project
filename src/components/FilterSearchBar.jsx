import { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * قسم فلتر واحد قابل للطي (City أو Campaign Count)
 * يستخدم جوا نفس العلبة (مش علبة منفصلة لحاله)
 */
const FilterSection = ({ label, isOpen, onToggle, options, selected, onSelect, showDivider }) => {
    return (
        <div className={`px-5 py-4 ${showDivider ? 'border-b border-primary2' : ''}`}>
            <button
                onClick={onToggle}
                className="flex items-center gap-2 w-full font-inter font-medium text-base text-white"
            >
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                {label}
            </button>

            {isOpen && (
                <ul className="flex flex-col gap-3 mt-3 max-h-56 overflow-y-auto">
                    {options.map((option) => (
                        <li key={option}>
                            <button
                                onClick={() => onSelect(option)}
                                className={`font-inter text-sm text-left w-full transition
                  ${selected === option ? 'text-primary2 font-semibold' : 'text-white/90 hover:text-primary2'}`}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

/**
 * شريط البحث + زر الفلاتر (كومبوننت موحّد)
 * @param {string} searchValue - قيمة البحث الحالية
 * @param {function} onSearchChange - عند تغيير نص البحث
 * @param {function} onFilterApply - بترجع { city, campaignCount } عند اختيار فلتر
 */
const SearchFilterBar = ({ searchValue, onSearchChange, onFilterApply }) => {
    const wrapperRef = useRef(null);

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null); // "city" | "count" | null

    const [cities, setCities] = useState([]);
    const [campaignCounts, setCampaignCounts] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(true);

    const [selectedCity, setSelectedCity] = useState('All Cities');
    const [selectedCount, setSelectedCount] = useState('All');

    // ------------------------------------------------------------------
    // 🔗 نقطة الربط مع الباك اند: بس يجهز الـ API بدلي محتوى الفنكشن هون
    // ------------------------------------------------------------------
    useEffect(() => {
        const fetchFilterOptions = async () => {
            setLoadingFilters(true);
            try {
                // TODO: استبدال الداتا الوهمية بـ:
                // const res = await fetch("/api/filters/cities");
                // const citiesData = await res.json();
                // const res2 = await fetch("/api/filters/campaign-counts");
                // const countsData = await res2.json();

                const mockCities = ['All Cities', 'Damascus', 'Aleppo', 'Homs', 'Hama', 'Lattakia', 'Al Hassaka', 'Al Raqqa', 'Tartous'];
                const mockCounts = ['All', '1-5 campaign', '6-10 campaign', '10-25 campaign', '+25 campaign'];

                setCities(mockCities);
                setCampaignCounts(mockCounts);
            } catch (error) {
                console.error('Error fetching filter options:', error);
            } finally {
                setLoadingFilters(false);
            }
        };

        fetchFilterOptions();
    }, []);

    // إغلاق الـ dropdown لما تضغطي بره الكومبوننت
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFilterMenuOpen(false);
                setOpenSection(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleFilterMenu = () => {
        setIsFilterMenuOpen((prev) => !prev);
        setOpenSection(null);
    };

    const toggleSection = (section) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        onFilterApply?.({ city, campaignCount: selectedCount });
    };

    const handleSelectCount = (count) => {
        setSelectedCount(count);
        onFilterApply?.({ city: selectedCity, campaignCount: count });
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
                    placeholder="Search Organization"
                    className="w-full outline-none font-inter text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                />
            </div>

            {/* زر الفلاتر */}
            <button
                onClick={toggleFilterMenu}
                className="flex items-center justify-center gap-2 bg-primary text-white font-inter font-medium rounded-full px-6 py-3 hover:bg-primary/90 transition whitespace-nowrap shadow-md"
            >
                <SlidersHorizontal size={18} />
                Filters
            </button>

            {/* علبة واحدة فيها القسمين فوق بعض */}
            {isFilterMenuOpen && (
                <div className="absolute top-full right-0 mt-3 z-20 bg-primary rounded-[26px] w-full sm:w-64 overflow-hidden shadow-lg">
                    {loadingFilters ? (
                        <div className="text-white font-inter text-sm px-5 py-4">
                            Loading filters...
                        </div>
                    ) : (
                        <>
                            <FilterSection
                                label="City"
                                isOpen={openSection === 'city'}
                                onToggle={() => toggleSection('city')}
                                options={cities}
                                selected={selectedCity}
                                onSelect={handleSelectCity}
                                showDivider
                            />
                            <FilterSection
                                label="Campaign Count"
                                isOpen={openSection === 'count'}
                                onToggle={() => toggleSection('count')}
                                options={campaignCounts}
                                selected={selectedCount}
                                onSelect={handleSelectCount}
                                showDivider={false}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchFilterBar;