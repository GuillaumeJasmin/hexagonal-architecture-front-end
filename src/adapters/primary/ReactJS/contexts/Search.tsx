import React, { createContext, useContext } from 'react'
import { ISearch } from 'src/core/useCases/Search'
import { assertsIsDefined } from 'src/core/utils/assertions'

const SearchContext = createContext<ISearch | null>(null)

interface SearchProviderProps {
  children: React.ReactNode;
  value: ISearch;
}

export function SearchProvider(props: SearchProviderProps) {
  const { children, value } = props

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const search = useContext(SearchContext)

  assertsIsDefined(search, 'Search feature doesn\'t exist')

  return search
}
