
import React, { } from 'react'

const SearchFilter = ({handleFilterChange, filterName}) => (
    <div>
        <h2>Filter</h2>
        <div>
            filter shown with: <input onChange={handleFilterChange} value={filterName} />
        </div>
    </div>
)

export default SearchFilter
