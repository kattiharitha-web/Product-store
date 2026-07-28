import { useRef, useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const inputRef = useRef(null)

  function handleChange(e) {
    const next = e.target.value
    setValue(next)
    onSearch(next.trim())
  }

  function handleClear() {
    setValue('')
    onSearch('')
    setTouched(false)
    inputRef.current?.focus()
  }

  const isEmpty = touched && value.trim().length === 0

  return (
    <div className="search-bar">
      <label htmlFor="product-search" className="search-bar__label">
        Search products
      </label>
      <div className="search-bar__row">
        <input
          id="product-search"
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Search by product name..."
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          aria-describedby={isEmpty ? 'search-hint' : undefined}
        />
        {value && (
          <button type="button" onClick={handleClear} className="search-bar__clear" aria-label="Clear search">
            Clear
          </button>
        )}
      </div>
      {isEmpty && (
        <p id="search-hint" className="search-bar__hint" role="status">
          Showing all products. Type a name to filter.
        </p>
      )}
    </div>
  )
}
