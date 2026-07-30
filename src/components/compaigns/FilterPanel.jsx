
import FilterSection from "./FilterSection";

const cities = [
  "All Cities",
  "Damascus",
  "Aleppo",
  "Homs",
  "Hama",
  "Lattakia",
  "Al Hassaka",
  "Al Raqqa",
  "Tartous",
];

const statuses = [
  "All Campaigns",
  "Upcoming Campaigns",
  "Current Campaigns",
  "Completed Campaigns",
];

const FilterPanel = ({
  selectedLocation,
  setSelectedLocation,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="w-72 bg-[#0A3A45] rounded-[35px] p-6 shadow-lg">

      <FilterSection
        title="Location"
        options={cities}
        selected={selectedLocation}
        onSelect={setSelectedLocation}
      />

      <div className="my-6"></div>

      <FilterSection
        title="Status"
        options={statuses}
        selected={selectedStatus}
        onSelect={setSelectedStatus}
      />

    </div>
  );
};

export default FilterPanel;