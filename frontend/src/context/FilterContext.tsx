import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

// Interface for the context
interface FilterContextType {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  specialization: string;
  setSpecialization: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  languageSpoken: string;
  setLanguageSpoken: React.Dispatch<React.SetStateAction<string>>;
  yearsOfExperience: string;
  setYearsOfExperience: React.Dispatch<React.SetStateAction<string>>;
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider component
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [specialization, setSpecialization] = useState<string>(searchParams.get('specialization') || '');
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'rating');
  const [sortOrder, setSortOrder] = useState<string>(searchParams.get('sortOrder') || 'desc');
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [languageSpoken, setLanguageSpoken] = useState<string>(searchParams.get('languageSpoken') || '');
  const [yearsOfExperience, setYearsOfExperience] = useState<string>(searchParams.get('yearsOfExperience') || '');

  return (
    <FilterContext.Provider
      value={{
        searchParams,
        setSearchParams,
        specialization,
        setSpecialization,
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
