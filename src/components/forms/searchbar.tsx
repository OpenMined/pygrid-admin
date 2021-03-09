import {FunctionComponent, ReactElement, useState} from 'react'
import {Search} from '@/components/icons/search'

interface SearchBarProperties {
  search: string
  placeholder: string
  onChange: (text) => void
}
const SearchBar: FunctionComponent<SearchBarProperties> = ({search, placeholder, onChange}) => {
  return (
    <div className="flex text-gray-600 bg-gray-50 container mx-auto border-2 border-gray-200 rounded-md hover:border-blue-600 ">
      <div className=" left-0 top-0 mt-3 mr-4">
        <Search className="h-4 w-4 fill-current" />
      </div>
      <input
        type="search"
        name="search"
        placeholder={placeholder}
        className="flex-1 bg-transparent h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        onChange={e => onChange(e.target.value)}
        value={search}
      />
    </div>
  )
}

export {SearchBar}
