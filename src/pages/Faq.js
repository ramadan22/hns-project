import { React, useEffect, useState } from '../libraries'
import { Navbar, Footer } from '../components/molecule'
import DataStatic from '../static/Data'
import { FaChevronDown } from '../components/icons'

import { connect } from 'react-redux'
import { FaqListDataAction } from '../modules/actions'

const Faq = ({ FaqListDataAction, FaqListData }) => {
  const [toggleStatus, setToggleStatus] = useState(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    FaqListDataAction()
    setLoad(true)
  }, [FaqListDataAction])

  const handleToggle = (evt) => {
    const attribute = evt.currentTarget.getAttribute("data-value")
    const status = parseInt((toggleStatus !== attribute && attribute))
    setToggleStatus(status)
  }

  return (
    <>
      <Navbar BreadData={"Home,Faq"} />
      <div className="lg:container mx-auto lg:px-10 px-5 flex flex-wrap">
        <h3 className="text-3xl text-left text-yellow-500 font-bold">{DataStatic.TitleFaqPage}</h3>
        <div className="mt-3">
          {load && FaqListData.loadingFaqList === false && FaqListData.dataFaqList &&
            FaqListData.dataFaqList.map((res, index) => {
              return (<div key={res.id} className="w-full text-left cursor-pointer my-4" data-value={res.id} onClick={handleToggle}>
                <div className="w-full flex flex-wrap items-center">
                  <p className="sm:text-base text-sm">{res.title}</p>
                  <FaChevronDown className="ml-auto" />
                </div>
                <div className={`block bg-gray-300 p-3 mt-3 sm:text-base text-sm ${toggleStatus !== null ? ((toggleStatus === res.id) ? "block" : "hidden") : ((index === 0) ? "block" : "hidden")}`}>{ res.content }</div>
              </div>)
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  FaqListData: state.FaqData
})

const mapDispatchToProps = {
  FaqListDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq)