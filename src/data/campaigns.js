import treeImg from '../images/tree.png'
import bloodImg from '../images/blood.png'
import foodImg from '../images/food.png'

export const campaigns = [
    {
        id: 1,
        title: "Tree Planting Campaign",
        organization: "AL Ehsan",
        location: "Aleppo, new aleppo",
        rating: 5,
        reviews: 300,
        image: treeImg,
        description: "The Blue Waters Campaign is a community-led environmental initiative aimed at protecting marine ecosystems and reducing water pollution. Implemented along the Syrian coast in Latakia, the campaign engaged volunteers and local organizations in impactful activities such as beach clean-ups and awareness workshops.Through hands-on efforts and educational outreach, participants removed plastic waste from coastal areas while promoting sustainable practices and reducing single-use plastics.",
        stats: [
            { label: "Volunteers", value: "+150" },
            { label: "Trees Planted", value: "+350" },
            { label: "Awareness Events", value: "+30" },
            { label: "Volunteer Hours", value: "+10" },
        ]
    },
    {
        id: 2,
        title: "Blood Donation Campaign",
        organization: "AL Ehsan",
        location: "Aleppo, new aleppo",
        rating: 5,
        reviews: 300,
        image: bloodImg,
        description: "The Blue Waters Campaign is a community-led environmental initiative aimed at protecting marine ecosystems and reducing water pollution. Implemented along the Syrian coast in Latakia, the campaign engaged volunteers and local organizations in impactful activities such as beach clean-ups and awareness workshops.Through hands-on efforts and educational outreach, participants removed plastic waste from coastal areas while promoting sustainable practices and reducing single-use plastics.",
        stats: [
            { label: "Volunteers", value: "+200" },
            { label: "Kg Waste Collected", value: "+350" },
            { label: "Awareness Events", value: "+30" },
            { label: "Volunteer Hours", value: "+10" },
        ]
    },
    {
        id: 3,
        title: "Food Distribution Campaign",
        organization: "AL Ehsan",
        location: "Aleppo, new aleppo",
        rating: 5,
        reviews: 300,
        image: foodImg,
        description: "The Blue Waters Campaign is a community-led environmental initiative aimed at protecting marine ecosystems and reducing water pollution. Implemented along the Syrian coast in Latakia, the campaign engaged volunteers and local organizations in impactful activities such as beach clean-ups and awareness workshops.Through hands-on efforts and educational outreach, participants removed plastic waste from coastal areas while promoting sustainable practices and reducing single-use plastics.",
        stats: [
            { label: "Volunteers", value: "+100" },
            { label: "Kg Waste Collected", value: "+500" },
            { label: "Awareness Events", value: "+20" },
            { label: "Volunteer Hours", value: "+15" },
        ]
    },
]
export const myActiveCampaigns = [
    {
        id: 1,
        title: "Blue Waters Campaign",
        date: "20, May, 2026",
        location: "Aleppo, al zahraa",
        image: treeImg,
        status: "Accepted"
    },
    {
        id: 2,
        title: "Blue Waters Campaign",
        date: "20, May, 2026",
        location: "Aleppo, al zahraa",
        image: bloodImg,
        status: "Pending"
    },
    {
        id: 3,
        title: "Blue Waters Campaign",
        date: "20, May, 2026",
        location: "Aleppo, al zahraa",
        image: foodImg,
        status: "Accepted"
    }
]
export const volunteerImpact = {
    hours: 55,
    joinedCampaigns: 12,
    certificates: 5
}
export const notifications = [
    {
        id: 1,
        type: "campaign",
        message: 'New Campaign " Tree Planting " Is Available Now.',
        time: "2 hours ago"
    },
    {
        id: 2,
        type: "certificate",
        message: "You Have Earned A New Certificate!",
        time: "1 day ago"
    },
    {
        id: 3,
        type: "accepted",
        message: 'Your Request For "Blood Donation Campaign" Has Been Accepted.',
        time: "2 week ago"
    }
]