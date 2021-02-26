import { React, useEffect, useState } from '../../libraries'
import { FaChevronDown } from '../icons'

export const SelectOption = (props) => {
  const { Type, Text, ClassName } = props
  const [classOptionWrap, setClassOptionWrap] = useState('')

  useEffect(() => {
    switch(Type){
      case 'Event Type':
        setClassOptionWrap('w-5/12 ml-auto')
        break
      case 'Location':
        setClassOptionWrap('w-7/12 mr-auto pl-3')
        break
      case 'Date':
        setClassOptionWrap('w-7/12 ml-auto')
        break
      case 'Attendees':
        setClassOptionWrap('w-5/12 mr-auto pl-3')
        break
      default:
        setClassOptionWrap('w-full '+ClassName)
    }
  },[Type, ClassName]);

  return (
    <div className={`inline-block relative ${classOptionWrap}`}>
      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option>{Text}</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaChevronDown className="text-sm" />
      </div>
    </div>
  )
}

SelectOption.defaultProps = {
  Type: 'default',
  Text: 'Default Option',
  ClassName: ""
}