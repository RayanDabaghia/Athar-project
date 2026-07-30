import { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import SearchBar from "../../components/compaigns/SearchBar";
import FilterPanel from "../../components/compaigns/FilterPanel";
import CampaignCard from "../../components/compaigns/CampaignCard";


import { campaigns } from "../../data/campaigns";

const Campaigns1 = () => {
  const [search, setSearch] = useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("All Cities");

  const [selectedStatus, setSelectedStatus] =
    useState("All Campaigns");

  // فلترة الحملات
  const filteredCampaigns = campaigns.filter((camp) => {
    const searchMatch = camp.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const locationMatch =
      selectedLocation === "All Cities" ||
      camp.location === selectedLocation;

    const statusMatch =
      selectedStatus === "All Campaigns" ||
      camp.status === selectedStatus;

    return searchMatch && locationMatch && statusMatch;
  });

  return (
    <div className="w-full min-h-screen bg-[#F7F9FA] flex flex-col">
      <Navbar />

      <SectionTitle
        title="Campaigns"
        description="Discover opportunities to make a positive impact in your community."
      />

      <div className="max-w-[1309px] mx-auto w-full px-4 flex-1">

        {/* Search */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Filter + Cards */}
        <div className="flex gap-8 mt-8">

          {/* Filter */}
          <FilterPanel
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />

          {/* Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((camp) => (
              <CampaignCard
                key={camp.id}
                camp={camp}
              />
            ))}
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Campaigns1;
