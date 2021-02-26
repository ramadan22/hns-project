import { React, Link, useState, useEffect } from '../../libraries'
import DataStatic from '../../static/Data'

const NavLeftMyAccount = ({ activeNav }) => {
  const [buttonStatus, setButtonStatus] = useState(false)

  useEffect(() => {
    if(activeNav === "myHistoryRfp" || activeNav === "myHistoryNonRfp")
      setButtonStatus(true)
  }, [activeNav])

  const buttonStatusClick = () => {
    setButtonStatus(!buttonStatus)
  }

  return (
      <>
        <Link to="/my-account">
          <div className={`px-3 py-2 lg:text-lg text-xs mb-3 ${activeNav === "myAccount" ? "bg-gray-300" : ""}`}>{DataStatic.NavLeftMyAccount.Text1}</div>
        </Link>
        <div className="px-3 py-2 mb-3 lg:text-lg text-xs flex flex-wrap cursor-pointer">
          <p className="w-full" onClick={buttonStatusClick}>Request For Proposal</p>
          <div className={`w-full ${buttonStatus ? "show" : "hidden"}`}>
            <Link className="w-full" to="/my-history-rfp">
              <div className={`pl-4 py-1 mt-5 lg:text-base text-xs mb-3 ${activeNav === "myHistoryRfp" ? "bg-gray-300" : ""}`}>Meeting Spaces</div>
            </Link>
            <Link className="w-full" to="/my-history-gts">
              <div className={`pl-4 py-1 lg:text-base text-xs ${activeNav === "myHistoryNonRfp" ? "bg-gray-300" : ""}`}>Ground Transport Services</div>
            </Link>
          </div>
        </div>
        <Link to="/billing-info">
          <div className={`px-3 py-2 lg:text-lg text-xs mb-3 ${activeNav === "billingInfo" ? "bg-gray-300" : ""}`}>{DataStatic.NavLeftMyAccount.Text3}</div>
        </Link>
        <Link to="/contact">
          <div className={`px-3 py-2 lg:text-lg text-xs mb-3 ${activeNav === "contact" ? "bg-gray-300" : ""}`}>{DataStatic.NavLeftMyAccount.Text4}</div>
        </Link>
      </>
  )
}

export default NavLeftMyAccount