const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search Campaign"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-12 px-5 rounded-full border-2 border-[#0A3A45] outline-none"
      />
    </div>
  );
};

export default SearchBar;