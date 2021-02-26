import { React, Link } from '../../libraries'

import { FaChevronDown } from '../icons'
import DataStatic from '../../static/Data'
import {
  IconShare,
  IconSignout,
  IconMyrfp,
  IconUser,
  IconHelpCenter
} from '../../assets/images'

export const DropdownAccount = (props) => {
  const { MemberName } = props

  return (
    <div className="flex flex-wrap group relative z-10 items-center cursor-pointer text-center text-yellow-500">
      <p className="w-full">{`${MemberName}`} <FaChevronDown className="text-white inline ml-3 text-xs" /></p>
      <div className="w-48 absolute hidden group-hover:block pt-10 z-20 top-0 right-0">
        <div className="w-full bg-backgroundNavbar opacity-75 border border-solid border-white flex flex-wrap ml-auto pt-4 pb-2">
          <Link to="/my-history-rfp" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300"><img src={IconMyrfp} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text1}</Link>
          <Link to="/my-account" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300"><img src={IconUser} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text2}</Link>
          <Link to="" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300"><img src={IconShare} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text3}</Link>
          <Link to="" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300"><img src={IconHelpCenter} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text4}</Link>
          <Link to="" className="w-full text-sm border-t border-gray-300 border-solid text-left text-white mt-2 py-2 px-3 hover:bg-blue-300"><img src={IconSignout} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text5}</Link>
        </div>
      </div>
    </div>
  )
}

DropdownAccount.defaultProps = {
  MemberName: ''
}