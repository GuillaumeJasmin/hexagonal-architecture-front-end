import React, { useState, useEffect } from 'react'
import { useSearch } from '../../contexts/Search'
import { useObservableData } from 'src/core/utils/useObservable'

export function Home() {
  const search = useSearch()
  const results = useObservableData(search.results$)
  const [searchQuery, onChangeSearchQuery] = useState('')

  useEffect(() => {
    search.search(searchQuery)
  }, [search, searchQuery])

  return (
    <>
      <input
        value={searchQuery}
        onChange={(event) => onChangeSearchQuery(event.target.value)}
      />
      {results.map(item => (
        <article>
          <div>{item.firstName} {item.lastName}</div>
          <img src={item.profilePictureURL} alt={item.lastName} />
        </article>
      ))}
    </>
  )
}
