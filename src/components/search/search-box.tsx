import React from "react"
import { useSearchBox } from "react-instantsearch"
import { Search as SearchIcon } from "@styled-icons/fa-solid"

const SearchBox = ({
  className,
  onFocus,
  onChange,
  color,
}: {
  className?: string
  onFocus: () => void
  onChange: (string) => void
  color?: string
}) => {
  const { query, refine } = useSearchBox()

  return (
    <div className={className}>
      <input
        className="SearchInput"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => {
          refine(e.target.value)
          onChange(e.target.value)
        }}
        value={query}
        onFocus={onFocus}
      />
      <SearchIcon className="SearchIcon" style={{ color }} />
    </div>
  )
}

export default SearchBox
