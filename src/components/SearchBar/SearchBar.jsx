import { useRef, useState } from 'react'
import './SearchBar.css'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const inputRef = useRef(null)

  function handleChange({ target }) {
    const nextValue = target?.value ?? ''

    setValue(nextValue)
    onSearch?.(nextValue)
  }

  function handleClear() {
    setValue('')
    onSearch?.('')
    setTouched(false)
    inputRef.current?.focus()
  }

  const isEmpty = touched && value.trim().length === 0

  return (
    <div className="searchBar">
      <label htmlFor="product-search" className="searchBarLabel">
        Search products
      </label>
      <div className="searchBarRow">
        <input
          id="product-search"
          ref={inputRef}
          type="text"
          role="searchbox"
          value={value}
          placeholder="Search by product name or category..."
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          aria-describedby={isEmpty ? 'search-hint' : undefined}
        />
        {value && (
          <button type="button" onClick={handleClear} className="searchBarClear" aria-label="Clear search">
            Clear search
          </button>
        )}
      </div>
      {isEmpty && (
        <p id="search-hint" className="searchBarHint" role="status">
          Showing all products. Type a name to filter.
        </p>
      )}
    </div>
  )
}
