import { React, Link, useState, useEffect } from '../libraries'

import { Navbar, Footer, ThumbnailHistory, FooterHistoryRfp, NavLeftMyAccount } from '../components/molecule'
import { TitleSection } from '../components/atom'
import { FaChevronDown, FaSearch } from '../components/icons'
import DataStatic from '../static/Data'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'

const HistoryRfp = () => {
  const [listHistoryRfp, setListHistoryRfp] = useState([])
  const [runReset, setRunReset] = useState(false)
  const [param, setParam] = useState({
    placeName: "",
    status: ""
  })
  

  const handleChange = (event) => {
    setParam({
      ...param,
      [event.target.name]: event.target.value
    })
  }

  const getHistoryRfp = () => {
    const tokenLogin = getData("tokenLogin")
    Api.get(`/transactions/api/v2/myRfp/fetch${param.status !== "" || param.placeName !== "" ? "?isrfp=1"+(param.status !== "" ? "&status="+param.status : "")+(param.placeName !== "" ? "&placeName="+param.placeName : "") : ""}`, {headers: { 'User-Token': `${tokenLogin}` }})
      .then(res => {
        setListHistoryRfp(res.data.data.items)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }

  const handleResetFilter = () => {
    setParam({
      ...param,
      ['placeName']: "",
      ['status']: ""
    })
    setRunReset(true)
  }

  useEffect(() => {
    if(runReset){
      getHistoryRfp()
      setRunReset(false)
    }
  }, [runReset])

  useEffect(() => {
    getHistoryRfp()
  }, [])

  const handleFilter = () => {
    getHistoryRfp()
  }

  return (
    <>
      <Navbar />
      <div className="lg:container lg:mx-auto lg:px-10 px-5 flex flex-wrap md:mb-20 sm:mb-16 mb-10">
        <div className="xl:w-3/12 md:w-4/12 w-full text-left sm:pr-5 pr-0">
          <NavLeftMyAccount activeNav="myHistoryRfp" />
        </div>
        <div className="xl:w-9/12 md:w-8/12 w-full xl:pl-16 lg:pl-10 md:pl-6 pl-0 md:mt-0 mt-5 md:border-l border-0 border-gray-300 border-solid">
          <div className="py-6">
            <div className="w-full">
              <TitleSection Text="Search Venue" Type="x-large" />
              <div className="w-full flex flex-wrap items-center mt-5">
                <div className="xl:w-1/5 lg:w-2/6 w-1/3 xl:mb-0 mb-3 relative">
                  <select onChange={handleChange} name="status" defaultValue={`${param.status}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline lg:text-base text-sm">
                    <option value="" selected={param.status === ""}>Status - All</option>
                    <option value="Completed">Completed</option>
                    <option value="Approved">Approved</option>
                    <option value="Under Approval">Under Approval</option>
                    <option value="Turned Down">Turned Down</option>
                    <option value="Waiting Approval">Waiting Approval</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaChevronDown className="text-sm" />
                  </div>
                </div>
                <div className="xl:w-2/5 lg:w-4/6 w-2/3 xl:px-5 md: xl:mb-0 mb-3 lg:pl-5 pl-4">
                  <div className="relative">
                    <input type="search" name="placeName" onChange={handleChange} value={param.placeName} className="w-full placeholder-black shadow rounded border-0 py-2 pl-10 pr-3 placeholder-gray-400 focus:outline-none lg:text-base text-sm" placeholder="Venue Name" />
                    <div className="absolute pin-r pin-t top-0 left-0 ml-3 mt-3 text-purple-lighter">
                      <FaSearch className="text-gray-300" />
                    </div>
                  </div>
                  {/* <InputSearch Type="button-left" /> */}
                </div>
                <div className="xl:w-1/5 md:w-1/2 xl:mb-0 lg:pr-0 pr-2 mb-3 relative">
                  <button onClick={handleResetFilter} className="block appearance-none w-full bg-white rounded-md border border-solid border-black px-4 py-2 pr-8 leading-tight focus:outline-none focus:shadow-outline lg:text-base text-sm">
                    Reset Fillter
                  </button>
                </div>
                <div className="xl:w-1/5 md:w-1/2 lg:pl-5 pl-2 xl:mb-0 mb-3">
                  <button onClick={handleFilter} className="w-full py-1 rounded-md border border-solid border-black focus:outline-none active:bg-gray-200 lg:text-base text-sm">Filters Applied</button>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="w-full">
                {listHistoryRfp.length > 0 ? (
                  listHistoryRfp.map((res, index) => {
                    return <ThumbnailHistory allData={res} key={index} />
                  })
                ) : ("")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 mb-10 pb-10 border-b border-solid border-gray-300">
        <FooterHistoryRfp />
      </div>
      <Footer />
    </>
  )
}

export default HistoryRfp
