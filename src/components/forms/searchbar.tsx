import {FunctionComponent, ReactElement, useState} from 'react'
import {Search} from '@/components/icons/search'

interface SearchBarProperties {
  search: string
  placeholder: string
  onChange: (text) => void
}
const SearchBar: FunctionComponent<SearchBarProperties> = ({search, placeholder, onChange}) => {
  return (
    <div className="flex text-gray-800 bg-gray-50 container mx-auto border border-gray-200 rounded-md">
      <div className="flex">
        <Search className="m-auto h-4 w-4 fill-current" />
      </div>
      <input
        name="search"
        placeholder={placeholder}
        className="text-xl flex-1 bg-transparent h-12 px-5 rounded-full focus:outline-none"
        onChange={e => onChange(e.target.value)}
        value={search}
      />
    </div>
  )
}

export {SearchBar}
