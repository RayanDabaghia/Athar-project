
import VolunteerNavbar from '../../components/Volunteer/VolunteerNavbar'
import VolunteerHero from '../../components/Volunteer/VoulnteerHero'
import SmallCampaignCard from '../../components/Volunteer/SmallCampaignCard'
import MyActiveCampaigns from '../../components/Volunteer/MyActiveCampaigns'
import YourImpact from '../../components/Volunteer/YourImpact'
import Notifications from '../../components/Volunteer/Notifications'
import KeepGoing from '../../components/Volunteer/KeepGoing'
import VolunteerFooter from '../../components/Volunteer/VoulnteerFooter'
const VolunteerHomePage = () => {
    return (
        <div className="w-full min-h-screen bg-[#F7F9FA] flex flex-col ">
            <VolunteerNavbar />
            <VolunteerHero />
            <div className="  flex justify-start items-stretch gap-[40px] px-[69px] ">
                <SmallCampaignCard />
                <MyActiveCampaigns />
            </div>
            <div className="flex items-stretch justify-start px-[69px] mt-[40px] gap-[40px] ">
                <YourImpact />
                <Notifications />
                <KeepGoing />
            </div>
            <VolunteerFooter />
        </div>
    )
}

export default VolunteerHomePage