import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'
import OrgFeaturedCampaign from '../../components/Organization/OrgFeaturedCampaign'


import Navbar from '../../components/Volunteer/VolunteerNavbar'
import Footer from '../../components/Volunteer/VoulnteerFooter'
import OrganizationDetails from '../../components/Organization/OrganizationDetails'
import StateSection from '../../components/StateSection'

const OrganizationDetailsPage = () => {
    const { id } = useParams()

    const [organization, setOrganization] = useState(null)
    const [loading, setLoading] = useState(true)
    const [apiError, setApiError] = useState('')

    useEffect(() => {
        const fetchOrganizationDetails = async () => {
            setLoading(true)
            setApiError('')
            try {
                const response = await axios.get(`/volunteer/organizations/${id}`)
                const org = response.data.data.organization

                setOrganization({
                    id: org.id,
                    name: org.org_name,
                    description: org.org_description,
                    logo: org.logo_url,
                    location: org.address,
                    email: org.email,
                    phone: org.phone,
                    website: org.website_url,
                })

            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        setApiError('You must be logged in to view this organization')
                    } else if (error.response.status === 404) {
                        setApiError('Organization not found')
                    } else {
                        setApiError('Something went wrong, please try again')
                    }
                } else {
                    setApiError('Something went wrong, please try again')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchOrganizationDetails()
    }, [id])
    return (
        <div className="min-h-screen flex flex-col bg-[#F7F9FA]">
            <Navbar />

            <main className="flex-1">
                {loading ? (
                    <p className="text-center text-gray-400 font-inter py-20">Loading...</p>
                ) : apiError ? (
                    <p className="text-center text-red-500 font-inter py-20">{apiError}</p>
                ) : (
                    <>
                        <OrganizationDetails organization={organization} />

                        <div className="-mt-32 relative z-0">
                            <StateSection />
                        </div>

                        <OrgFeaturedCampaign organizationId={organization.id} />
                    </>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default OrganizationDetailsPage