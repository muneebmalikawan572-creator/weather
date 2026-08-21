import { useState } from 'react'

export default function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="city-input" className="search-label">
        Log a city
      </label>
      <div className="search-row">
        <input
          id="city-input"
          type="text"
          name="city"
          placeholder="e.g. Lahore, Tokyo, Cairo…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          autoComplete="off"
        />
        <button type="submit" disabled={disabled}>
          {disabled ? 'Reading…' : 'Read sky'}
        </button>
      </div>
    </form>
  )
}
