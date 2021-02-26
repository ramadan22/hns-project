import { React, useEffect, useState } from '../../libraries'
import { FaSearch } from '../icons'

export const InputSearch = (props) => {
  const { Type } = props

  const [typeSearch, setTypeSearch] = useState('')
  const [placeHolderSearch, setPlaceHolderSearch] = useState('')
  const [buttonSearch, setButtonSearch] = useState('')

  useEffect(() => {
    switch(Type){
      case "Side Search":
        setTypeSearch('rounded bg-gray-200 border-0 focus:outline-none px-3 py-2')
        setPlaceHolderSearch('Search')
        setButtonSearch('bg-yellow-400 text-white p-3')
        break
      case "Footer Search":
        setTypeSearch('rounded shadow text-sm border-0 focus:outline-none px-3 py-2')
        setPlaceHolderSearch('Search')
        setButtonSearch('flex bg-yellow-400 text-xs text-white px-3 h-full')
        break
      case "button-left":
        setTypeSearch('placeholder-black shadow rounded border-0 py-2 pl-10 pr-3')
        setPlaceHolderSearch('Venue Name')
        setButtonSearch('ml-3 mt-3 text-purple-lighter')
        break
      default: 
        setTypeSearch('placeholder-black shadow rounded border-0 py-2 px-3')
        setPlaceHolderSearch('Keyword')
        setButtonSearch('mr-3 mt-3 text-purple-lighter')
    }
  }, [Type])

  return (
    <div className="relative">
      <input type="search" className={`w-full ${typeSearch}`} placeholder={placeHolderSearch} />
      <div className={`absolute pin-r pin-t top-0 ${Type === 'button-left' ? 'left-0' : 'right-0' } ${buttonSearch}`}>
        {Type === "Footer Search" ? <span className="my-auto">EMAIL ME</span> : <FaSearch className="h-4" /> }
      </div>
    </div>
  )
}

InputSearch.defaultProps = {
  type: "default"
}