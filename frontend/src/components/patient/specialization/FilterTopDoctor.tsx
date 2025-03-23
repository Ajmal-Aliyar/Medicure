import { useFilter } from '../../../context/FilterContext';

const FilterTopDoctor = () => {
  const {
    sort,
    setSort,
    sortOrder,
    setSortOrder,
    search,
    setSearch,
    languageSpoken,
    setLanguageSpoken,
    yearsOfExperience,
    setYearsOfExperience,
    setSearchParams
  } = useFilter();

  const handleApplyFilters = async () => {
    try {
      const params = new URLSearchParams();

      if (sort) params.append('sort', sort);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (search) params.append('search', search);
      if (languageSpoken) params.append('languageSpoken', languageSpoken);
      if (yearsOfExperience) params.append('yearsOfExperience', yearsOfExperience);

      setSearchParams(params);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  return (
    <div className="my-5 p-4 w-full flex flex-col md:flex-row gap-4 ">
      <input
        type="text"
        placeholder="Search by name.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white shadow-sm outline-none p-2 rounded-lg flex-1"
      />


      <select
        value={languageSpoken}
        onChange={(e) => setLanguageSpoken(e.target.value)}
        className="bg-white shadow-sm outline-none  p-2 rounded-lg"
      >
        <option value="">Language</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Spanish">Spanish</option>
      </select>

      <input
        type="number"
        placeholder="Experience"
        value={yearsOfExperience}
        onChange={(e) => setYearsOfExperience(e.target.value)}
        className="bg-white shadow-sm outline-none p-2 rounded-lg w-48"
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-white shadow-sm outline-none p-2 rounded-lg"
      >
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="yearsOfExperience">Experience</option>
        <option value="fees">Fees</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-white shadow-sm outline-none p-2 rounded-lg"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <button
        onClick={handleApplyFilters}
        className="bg-blue-300 text-white px-6 py-2 rounded-lg hover:bg-blue-400 active:scale-95"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterTopDoctor;
