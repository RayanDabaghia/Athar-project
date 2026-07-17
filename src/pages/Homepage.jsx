
import '../App.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhyChooseAthar from '../components/WhyChooseAthar'
import StateSection from '../components/StateSection'
import FeaturedCampaigns from '../components/FeaturedCampaigns'
import WhatweOffer from '../components/WhatweOffer'
import HowItWorks from '../components/HowItWorks'
import JoinBanner from '../components/JoinBanner'
import Footer from '../components/Footer'
function Homepage() {
    return (
        <>

            <div className=" w-full min-h-screen bg-[#F7F9FA] flex flex-col overflow-x-hidden">
                <Navbar />
                <Hero />
                <WhyChooseAthar />
                <StateSection className="mt-[-150px]" />
                <FeaturedCampaigns />
                <WhatweOffer />
                <HowItWorks />
                <JoinBanner />
                <Footer />
            </div>
        </>
    )

}

export default Homepage
