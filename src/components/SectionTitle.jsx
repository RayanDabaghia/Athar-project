const SectionTitle = ({ title, description }) => {
  return (
    <div className="text-center mb-16 py-20">
      <div className="relative w-max mx-auto ">
        <h2 className="text-[40px] font-adlam text-[#0A3A45]">
          {title}
        </h2>

        <div className="absolute left-5 bottom-[-8px] w-[50px] h-[4px] bg-[#FFC107] rounded-full"></div>
      </div>

      {description && (
        <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;