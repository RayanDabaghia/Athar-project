import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Navbar from '../../components/Volunteer/VolunteerNavbar';
import Footer from '../../components/Volunteer/VoulnteerFooter';
import SearchFilterBar from '../../components/FilterSearchBar';
import OrganizationCard from '../../components/Organization/OrganizationCard';

// تحويل خيار "1-5 campaign" إلخ إلى نطاق أرقام قابل للمقارنة
const matchesCampaignRange = (count, rangeLabel) => {
    if (!rangeLabel || rangeLabel === 'All') return true;
    if (rangeLabel === '+25 campaign') return count > 25;

    const [min, max] = rangeLabel.replace(' campaign', '').split('-').map(Number);
    return count >= min && count <= max;
};

const OrganizationsPage = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({ city: 'All Cities', campaignCount: 'All' });
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrganizations = async () => {
            setLoading(true);
            setApiError('');
            try {
                const params = {};

                if (searchTerm.trim()) {
                    params.search = searchTerm.trim();
                }
                if (activeFilters.city && activeFilters.city !== 'All Cities') {
                    params.city = activeFilters.city; // ⚠️ عم نبعتها متل ما هي بقائمة الفلتر، منجرب هل الباك اند بيقبلها هيك
                }
                const response = await axios.get('/volunteer/organizations', { params });
                const data = response.data;

                const mapped = data.organizations.map((org) => ({
                    id: org.id,
                    name: org.org_name,
                    description: org.org_description,
                    logo: org.logo_url,
                    location: org.address, // ⚠️ معلّق مؤقتاً لحد ما الباك اند يضيف حقل city صحيح
                    campaignsCount: org.campaigns_count,
                }));

                setOrganizations(mapped);

            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        setApiError('You must be logged in to view organizations');
                    } else if (error.response.status === 404) {
                        setApiError('No organizations found');
                    } else {
                        setApiError('Something went wrong, please try again');
                    }
                } else {
                    setApiError('Something went wrong, please try again');
                }
            } finally {
                setLoading(false);
            }
        };
        const timeoutId = setTimeout(() => {
            fetchOrganizations();
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, activeFilters.city]);
    const filteredOrganizations = useMemo(() => {
        return organizations.filter((org) =>
            matchesCampaignRange(org.campaignsCount, activeFilters.campaignCount)
        );
    }, [organizations, activeFilters.campaignCount]);

    const handleOrganizationClick = (id) => {
        navigate(`/organizations/${id}`);

    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F7F9FA]">
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10">
                <div className="text-center mb-8">
                    <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-primary relative inline-block">
                        Organization
                        <span className="block w-10 h-1 bg-primary2 mx-auto ml-2 mt-2 rounded-full" />
                    </h1>
                    <p className="font-inter text-gray-500 mt-3">
                        Discover and explore organizations available on Athar.
                    </p>
                </div>

                <div className="mb-8">
                    <SearchFilterBar
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                        onFilterApply={(filters) => setActiveFilters(filters)}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {loading ? (
                        <p className="text-center text-gray-400 font-inter py-10">Loading...</p>
                    ) : apiError ? (
                        <p className="text-center text-red-500 font-inter py-10">{apiError}</p>
                    ) : filteredOrganizations.length > 0 ? (
                        filteredOrganizations.map((org) => (
                            <OrganizationCard
                                key={org.id}
                                organization={org}
                                onClick={() => handleOrganizationClick(org.id)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-400 font-inter py-10">
                            No organizations found.
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrganizationsPage;