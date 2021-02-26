import { React, Link, useState, useEffect } from '../libraries'

import { Navbar, Footer, ThumbnailHistory, FooterHistoryRfp, NavLeftMyAccount } from '../components/molecule'
import { TitleSection } from '../components/atom'
import { FaChevronDown, FaSearch, FaDoorOpen } from '../components/icons'
import DataStatic from '../static/Data'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
const styles = {
  className: 'w-full inline-block px-3 py-2 text-xs font-medium leading-6 text-center text-dark-700 uppercase transition bg-transparent border-2 border-dark-700 rounded-lg ripple hover:bg-dark-100 focus:outline-none;'
}

const HistoryNonRfp = () => {
  const [listHistoryRfp, setListHistoryRfp] = useState([])
  const [loading, setLoading] = useState(true)
  const [param, setParam] = useState({
    placeName: "",
    status: ""
  })

  const [query, setQuery] = useState('')

  const handleChange = (event) => {
    setParam({
      ...param,
      [event.target.name]: event.target.value
    })
  }

  const getHistoryRfp = () => {
    setLoading(true)
    const tokenLogin = getData("tokenLogin")
    Api.get(`/transactions/api/v1/myGts/fetch${param.status !== "" || param.placeName !== "" ? "?isGts=1" + (param.status !== "" ? "&supplierStatus=" + param.status : "") + (param.placeName !== "" ? "&eventName=" + param.placeName : "") : ""}`, { headers: { 'User-Token': `${tokenLogin}` } })
      .then(res => {
        // console.log('response list history', res)
        setListHistoryRfp(res.data.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }

  useEffect(() => {
    getHistoryRfp()
  }, [])

  // useEffect(() => {
  //   const result = listHistoryRfp && listHistoryRfp.supplier.filter(title =>
  //     title.status.toUpperCase().includes(query.toUpperCase())
  //   )
  //   setListHistoryRfp(result)
  // }, [query])

  const handleFilterClick = () => {
    getHistoryRfp()
  }

  const filterByStatus = (status) => {
    // let filterCoffee = [];
    // if (status === "All") {
    //   filterCoffee = this.state.coffees;
    // } else {
    //   filterCoffee = this.state.coffees.filter(
    //     coffee => coffee.origin === name
    //   );
    // }
    setParam({
      ...param,
      status: status,
      placeName: ""
    })
    getHistoryRfp()
    console.log('status', status)
    // this.setState({ filterCoffee });
  }
  // console.log('listHistoryRfp', listHistoryRfp)
  const filterByName = (e) => {
    setQuery(e.target.value)
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 flex flex-wrap mb-20">
        <div className="xl:w-3/12 md:w-4/12 w-full text-left sm:pr-5 pr-0">
          <NavLeftMyAccount activeNav="myHistoryNonRfp" />
        </div>
        <div className="xl:w-9/12 md:w-8/12 w-full xl:pl-16 lg:pl-10 md:pl-6 pl-0 md:mt-0 mt-5 md:border-l border-0 border-gray-300 border-solid">
          <div className="mb-6">
            <TitleSection Text="Search RFP Non-Hotel" Type="x-large" />
            <div className="w-full flex flex-wrap items-center pr-3">
              {/* <div className="w-1.5/4 relative">
                <select onChange={handleChange} name="status" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Status - All</option>
                  <option value="Approved">Approved</option>
                  <option value="Under Approval">Under Approval</option>
                  <option value="Turned Down">Turned Down</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaChevronDown className="text-sm" />
                </div>
              </div> */}
              <div className="w-1/4 relative py-2">
                <select onChange={handleChange} name="status" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Choose Type</option>
                  <option value="Approved">Approved</option>
                  <option value="Under Approval">Under Approval</option>
                  <option value="Turned Down">Turned Down</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaChevronDown className="text-sm" />
                </div>
              </div>
              <div className="w-1.5/4 px-3">
                <div className="relative">
                  <input type="search" name="placeName" onChange={handleChange} value={param.placeName} className="w-full placeholder-black shadow rounded border-0 py-2 pl-10 pr-3 placeholder-gray-400 focus:outline-none" placeholder="Event Name" />
                  <div className="absolute pin-r pin-t top-0 left-0 ml-3 mt-3 text-purple-lighter">
                    <FaSearch className="text-gray-300" />
                  </div>
                </div>
              </div>
              <div className="w-1/4 pl-3">
                <button type="button" onClick={handleFilterClick} className="w-full py-1 rounded-md border border-solid border-black focus:outline-none active:bg-gray-200">Applied</button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center pr-3 mb-6">
            <div className="w-full flex flex-wrap items-center pr-3">
              {/* <div className="w-1/5 pr-6">
                <TitleSection Text="Filter Status" Type="x-large" />
              </div> */}
              <div className={`w-1/5 px-1 py-1`} onClick={() => filterByStatus('Waiting Approval')}>
                <button className={`${styles.className} ${param.status === "Waiting Approval" ? "bg-gray-300" : ""}`}>
                  Waiting confirm
                </button>
              </div>
              <div className="w-1/5 px-1 py-1" onClick={() => filterByStatus('Under Approval')}>
                <button className={`${styles.className} ${param.status === "Under Approval" ? "bg-gray-300" : ""}`}>
                  Under approval
                </button>
              </div>
              <div className="w-1/5 px-1 py-1" onClick={() => filterByStatus('Approved')}>
                <button className={`${styles.className} ${param.status === "Approved" ? "bg-gray-300" : ""}`}>
                  Approved
                </button>
              </div>
              <div className="w-1/5 px-1 py-1" onClick={() => filterByStatus('Turned down')}>
                <button className={`${styles.className} ${param.status === "Turned down" ? "bg-gray-300" : ""}`}>
                  Turned down
                </button>
              </div>
            </div>
          </div>
          {loading ? <p className='text-center'>loading ...</p> : (
            listHistoryRfp.items && listHistoryRfp.items.length > 0 ? (
              listHistoryRfp.items.map(item =>
                <div className='w-full' key={item.gtsId}>
                  {console.log('item', item.rawGtsStatus)}
                  <div className='w-full shadow py-3 px-4 mb-6 rounded-md flex flex-wrap'>
                    <div className="w-1/4 pr-6">
                      <img src={`${Object.keys(item.supplier).length > 0 ? item.supplier[0].companyTypeImage : ''}`} alt="meeting room" class="object-contain w-full h-40" />
                    </div>
                    <div className='w-3/4'>
                      <div className="w-full flex flex-wrap">
                        <div className="w-1/2">
                          <div className="flex flex-wrap title-section text-xl text-gray-700 font-bold block">
                            <h1 className='capitalize'>{item.event.eventName}</h1>
                          </div>
                          {/* <p className="text-left mt-1 mb-4">event sendiri</p> */}
                        </div>
                        <div className="w-1/2 flex items-start">
                          <p className="mt-2 mr-5 font-bold">Your GTS ID : </p>
                          <h3 className="border-4 border-dotted border-gray-400 py-2 bg-gray-100 mb-3 flex-auto font-bold">{item.gtsCode}</h3>
                        </div>
                      </div>
                      <div className='w-full flex flex-wrap items-center mt-1 space-x-0'>
                        <div className='w-4/12 text-left'>
                          <div className='w-full flex flex-wrap items-center'>
                            {/* <FaDoorOpen className="inline mr-2" /> */}
                            <p className='text-gray-700 font-semibold'>Event type : {`${Object.keys(item.supplier).length > 0 ? item.supplier[0].companyTypeName : ''}`}</p>
                          </div>
                          <div className='w-full flex flex-wrap items-center'>
                            <h4 className='text-gray-700 capitalize font-semibold'>{`${item.contact.salutation} ${item.contact.firstname} ${item.contact.lastname}`}</h4>
                          </div>
                          <div className='w-full flex flex-wrap items-center inline-block'>
                            <p className='text-gray-700 font-semibold inline-block'>{item.contact.email}</p>
                          </div>
                          <div className='w-full flex flex-wrap items-center'>
                            <p className='text-gray-700 font-semibold'>{item.contact.phone}</p>
                          </div>
                        </div>
                        <div className='w-4/12 text-left'>
                          <div className='w-full'>
                            {item.supplier.map(sup =>
                              <>
                                <p className='font-bold'>Country: {item.event.countryName}</p>
                                <p className='font-bold'>City: {item.event.city}</p>
                              </>
                            )}
                            <p>Status:</p>
                            <Status status={item.rawGtsStatus} />
                          </div>
                        </div>
                        <div className='w-4/12'>
                          <p className="text-xs">
                            {<DateFormat dateTime={`${item.event.startDate}`} />} - <DateFormat status={1} dateTime={`${item.event.endDate}`} />
                          </p>
                          <Link to={`my-history-non-rfp-detail/${item.gtsCode}`} className="px-6 rounded-md text-sm text-white py-1 uppercase w-11/12" style={{ backgroundColor: "#fed500" }}>View Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <p>List History Not Found</p>
            )
          )}
        </div>
      </div>
      <div className="mt-20 mb-10 pb-10 border-b border-solid border-gray-300">
        <FooterHistoryRfp />
      </div>
      <Footer />
    </>
  )
}

export default HistoryNonRfp

const Status = ({ status }) => {
  return (
    <div>
      {(() => {
        switch (status) {
          case '1 Supplier(s) Approved':
            return <span className='text-green-400'>{status}</span>
          case 'Waiting Approval':
            return <span style={{ color: '4994ce' }}>{status}</span>
          case '2 Supplier(s) Awarded':
            return <span className='text-green-400'>{status}</span>
          default:
            return null
        }
      })()}
    </div>
  )
}
const DateFormat = ({dateTime, status}) => {
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      day: "2-digit",
      month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  if(status === 1)
      return dateFormatValue[0] + " " + dateFormatValue[2]
  else
      return dateFormatValue[1] + " " + dateFormatValue[0]
}


{/* <div className='w-full shadow py-3 px-4 mb-6 rounded-md flex flex-wrap' key={item.addOnRfpDetailId}>
  <div className="w-1/4 pr-6">
    <img src='' onError='' alt="meeting room" className="object-cover w-full h-40" />
  </div>
  <div className="w-3/4">
    <TitleSection Text='Type Rpf Non Hotel' Type="x-large" />
    <p className="text-left mt-1 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, id.</p>
    <div className="w-full flex flex-wrap items-center mt-1">
      <div className="w-5/12 text-left">
        <div className="w-full flex flex-wrap items-center">
          <p>Event type : type</p>
        </div>
        <div className="w-full flex flex-wrap items-center">
          <p>{item.contact.firstname} {item.contact.lastname}</p>
        </div>
        <div className="w-full flex flex-wrap items-center">
          <p><b>{item.contact.email}</b></p>
        </div>
        <div className="w-full flex flex-wrap items-center">
          <p>{item.contact.phone}</p>
        </div>
      </div>
      <div className="w-3/12 text-left">
        <div className="w-full flex flex-wrap items-center">
          <p><b>Country : {item.countryName}</b></p>
        </div>
        <div className="w-full flex flex-wrap items-center">
          <p><b>City : {item.cityName}</b></p>
        </div>
        <div className="w-full">
          <p>Status :<br />
            <span style={{ color: "#4994ce" }}>{item.status}</span>
          </p>
        </div>
      </div>
      <div className="w-4/12">
        <p className="text-xs">date</p>
        <Link to='#' className="px-6 rounded-md text-sm text-white py-1 uppercase w-11/12" style={{ backgroundColor: "#fed500" }}>View Details</Link>
      </div>
    </div>
  </div>
</div> */}