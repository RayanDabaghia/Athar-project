
import locationIcon from '../../images/location.png';
import arrowIcon from '../../images/Icons/arrow-right.png';
import LayersIcon from '../../images/Icons/layers.png.png';
import org from '../../images/org.png.png';

/**
 * كرت عرض منظمة واحدة
 * @param {object} organization - بيانات المنظمة (name, description, logo, location, campaignsCount)
 * @param {function} onClick - عند الضغط على الكرت (للانتقال لصفحة التفاصيل)
 */
const OrganizationCard = ({ organization, onClick }) => {
    const { name, description, location, campaignsCount } = organization;

    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between gap-4 bg-white
                 rounded-[26px] shadow-md px-5 py-4 cursor-pointer 
                 transition hover:shadow-lg hover:-translate-y-0.5 w-full"
        >
            <img
                src={org}
                alt={name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-[40px] object-cover border-[4px] border-primary flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
                <h3 className="font-outfit font-bold text-primary text-base sm:text-lg truncate">
                    {name}
                </h3>
                <p className="font-inter text-gray-500 text-sm mt-1 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
                    <span className="flex items-center gap-1">
                        <img src={locationIcon} alt="location" className="w-4 h-4" />
                        {location}
                    </span>
                    <span className="flex items-center gap-1">
                        <img src={LayersIcon} alt="layers" className="w-4 h-4" />
                        {campaignsCount} Campaign
                    </span>
                </div>
            </div>

            <img src={arrowIcon} alt="arrow" className="w-6 h-6 flex-shrink-0" />
        </div>
    );
};

export default OrganizationCard;