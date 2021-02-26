import { React, useState, useEffect, DatePicker, useHistory, useLocation } from '../libraries'
import { PanelTitleStep, WarningForm } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import { Api } from '../helpers/api'
import { FaChevronDown, FaSpinner } from '../components/icons'
import { GtsDataGet, LocationCityAction, LocationCountryAction, ModalAction } from '../modules/actions'
import { connect } from 'react-redux'
import { getData } from '../utils/localStorage'

import { Transition } from 'react-transition-group'

const EventReq = ({ match, GtsDataGet, gtsData, LoginData, LocationCityAction, LocationCity, LocationCountryAction, LocationCountry, ModalAction }) => {
  const history = useHistory()
  const location = useLocation()
  const [spiner, setSpiner] = useState(false)
  const [warningF, setWarningF] = useState(false)
  const [warningF2, setWarningF2] = useState(false)
  const [listLocation, setListLocation] = useState([])
  const [listLocationCountry, setListLocationCountry] = useState([])
  const [showDropdownLocation, setShowDropdownLocation] = useState(null)
  const [showDropdownLocationCountry, setShowDropdownLocationCountry] = useState(null)
  const [companyTypeList, setCompanyTypeList] = useState([])

  const [locationName, setLocationName] = useState('')
  const [locationNameTwo, setLocationNameTwo] = useState('')
  const [dropdownLocationClick, setDropdownLocationClick] = useState(false)

  const [locationNameCountry, setLocationNameCountry] = useState('')
  const [locationNameTwoCountry, setLocationNameTwoCountry] = useState('')
  const [dropdownLocationClickCountry, setDropdownLocationClickCountry] = useState(false)

  const [countryKey, setCountryKey] = useState('')
  const [cityKey, setCityKey] = useState('')

  useEffect(() => {
    GtsDataGet(getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : "")
  }, [])

  const [params, setParams] = useState(
    {
      guestId: "",
      startDate: "",
      endDate: "",
      eventName: "",
      totalAttendees: "",
      currency: "SGD",
      budget: "",
      countryCode: "",
      countryName: "",
      city: ""
    }
  )

  useEffect(() => {
    if(gtsData){
      setLocationNameTwoCountry(location.state ? location.state.countryName : (gtsData.events.countryName !== undefined ? gtsData.events.countryName : ""))
      setLocationNameTwo(location.state ? location.state.locationName : (gtsData.events.city !== undefined ? gtsData.events.city : ""))
      setParams({
        guestId: gtsData.guestId !== undefined ? gtsData.guestId : "",
        startDate: new Date(gtsData.events.startDate) > new Date() ? (gtsData.events.startDate !== undefined ? gtsData.events.startDate : "") : "",
        endDate: new Date(gtsData.events.endDate) > new Date() ? (gtsData.events.endDate !== undefined ? gtsData.events.endDate : "") : "",
        eventName: gtsData.events.eventName !== undefined ? gtsData.events.eventName : "",
        totalAttendees: gtsData.events.totalAttendees !== undefined ? gtsData.events.totalAttendees : "",
        currency: gtsData.events.currency !== undefined ? gtsData.events.currency : "",
        budget: gtsData.events.budget !== undefined ? gtsData.events.budget : "",
        countryCode: location.state ? location.state.countryCode : (gtsData.events.countryCode !== undefined ? gtsData.events.countryCode : ""),
        countryName: location.state ? location.state.countryName : (gtsData.events.countryName !== undefined ? gtsData.events.countryName : ""),
        city: location.state ? location.state.locationName : (gtsData.events.city !== undefined ? gtsData.events.city : "")
      })
      setCountryKey(gtsData.events.countryName !== undefined ? gtsData.events.countryName : "")
      setCityKey(location.state ? location.state.locationName : (gtsData.events.city !== undefined ? gtsData.events.city : ""))
    }
  }, [gtsData, location.state])

  // useEffect(() => {
  //   if(location.state && location.state.type !== undefined){
  //     setParams({...params, eventName: location.state.type.type})
  //   }
  //   setParams({
  //     ...params,
  //     city: location.state !== undefined ? location.state.locationName : ""
  //   })
  //   setCityKey(location.state !== undefined ? location.state.locationName : "")
  // }, [location.state])

  const handleInputChange = (evt) => {
    if((evt.target.getAttribute("type") === 'type' && evt.keyCode === 69 || evt.target.getAttribute("type") === 'type' && evt.keyCode === 190)){
      evt.preventDefault()
      return false
    }
    if(evt.target.name === 'countryNameDropdown'){
      setLocationNameCountry(evt.target.value)
      setCountryKey(evt.target.value)
      if (evt.target.value.length > 1) {
        LocationCountryAction(evt.target.value)
        setShowDropdownLocationCountry('entered')
      } else {
        setListLocationCountry([])
      }
    } else if(evt.target.name === 'cityDropdown'){
      setLocationName(evt.target.value)
      setCityKey(evt.target.value)
      // if (evt.target.value.length > 1) {
        LocationCityAction(evt.target.value, params.countryCode)
        setShowDropdownLocation('entered')
      // } else {
      //   setListLocation([])
      // }
    } else {
      setParams({
        ...params,
        [evt.target.name]: evt.target.value
      })
    }
  }

  const handleLocationCountry = (event) => {
    setListLocationCountry([])
    setLocationNameCountry('')
    setLocationNameTwoCountry(event.target.value)
    setDropdownLocationClickCountry(false)
    setCountryKey(event.target.value)
    setParams({
      ...params,
      countryName: event.target.value,
      countryCode: event.target.getAttribute('data-value')
    })
    setWarningF2(false)
    setShowDropdownLocationCountry(null)
  }

  const handleLocation = (event) => {
    setListLocation([])
    setLocationName('')
    setLocationNameTwo(event.target.value)
    setDropdownLocationClick(false)
    // setCityKey(event.target.value)
    setParams({
      ...params,
      city: event.target.value
    })
    setWarningF(false)
    setShowDropdownLocation(null)
  }

  const handleDateFrom = (value) => {
    let dateFormatValue = new Intl.DateTimeFormat().format(new Date(value))
    dateFormatValue = dateFormatValue.split('/')
    

    if(new Date(value) < new Date(params.endDate)){
      setParams({
        ...params,
        startDate: dateFormatValue[2]+"-"+dateFormatValue[0]+"-"+dateFormatValue[1]
      })
    }else{
      setParams({
        ...params,
        startDate: dateFormatValue[2]+"-"+dateFormatValue[0]+"-"+dateFormatValue[1],
        endDate: dateFormatValue[2]+"-"+dateFormatValue[0]+"-"+dateFormatValue[1]
      })
    }
  }

  const handleDateTo = (value) => {
    let dateFormatValue = new Intl.DateTimeFormat().format(new Date(value))
    dateFormatValue = dateFormatValue.split('/')
    setParams({
      ...params,
      endDate: dateFormatValue[2]+"-"+dateFormatValue[0]+"-"+dateFormatValue[1]
    })
  }

  useEffect(() => {
    // LocationCityAction("", params.countryCode)
  }, [params.countryCode])

  useEffect(() => {
    if (LocationCity.dataLocationCity !== null) {
      setListLocation(LocationCity.dataLocationCity.items)
      // setShowDropdownLocation('entered')
    }
  }, [LocationCity.dataLocationCity])

  useEffect(() => {
    if (LocationCountry.dataLocationCountry !== null) {
      setListLocationCountry(LocationCountry.dataLocationCountry.items)
    }
  }, [LocationCountry.dataLocationCountry])

  useEffect(() => {
    Api.get(`/supplier/api/v1/company/type`)
    .then(res => {
      setCompanyTypeList(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    const UserToken = getData('tokenLogin') ? getData('tokenLogin') : ""
    Api.post(`/supplier/api/v2/gts/event`, params, {headers: { 'User-Token': UserToken }})
    .then(res => {
      // console.log(res)
      setSpiner(false)
      GtsDataGet(getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : "")
      history.push('/event-schedule-gts', {
        companyTypeId: location.state ? location.state.companyTypeId : ""
      })
    })
    .catch(function (error) {
      setSpiner(false)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
      console.log(error)
    })
  }

  const handleDropdown = () => {
    LocationCityAction('', params.countryCode)
    setShowDropdownLocation('entered')
    setDropdownLocationClickCountry(false)
    setDropdownLocationClick(!dropdownLocationClick)
  }

  const handleDropdownCountry = () => {
    setDropdownLocationClick(false)
    setDropdownLocationClickCountry(!dropdownLocationClickCountry)
  }

  const closeDropdown = () => {
    setListLocationCountry([])
    setLocationNameCountry('')
    setDropdownLocationClickCountry(false)
    setListLocation([])
    setLocationName('')
    setDropdownLocationClick(false)
  }

  useEffect(() => {
    setTimeout(()=>{
      document.addEventListener('click', handleDocumentClick);
     }, 1000)
  }, [])

  const handleDocumentClick = (evt) => {
    if(evt.target.getAttribute("data-dropdown") !== "exept"){
      closeDropdown()
    }
  }

  useEffect(() => {
    console.log("date parse", Date.parse(params.startDate))
  }, [params])

  useEffect(() => {
    console.log("location", location.state)
  }, [location.state])

  const defaultStyleDropdownLocation = {
    transition: `all 0.2s ease`,
    marginTop: '-50px',
    display: 'none',
    opacity: '0'
  }

  const transitionStylesDropdownLocation = {
    entering: { opacity: '0' },
    entered: { opacity: '1', marginTop: '10px', display: 'block' },
  }

  return (
    <>
      <Navbar Type="rfp" />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <PanelTitleStep Text="1. EVENT REQUIREMENTS" />
        <form onSubmit={handleSubmit}>  
          <div className="w-full px-4 mt-2 mb-4">
            <div className="border-2 border-solid border-gray rounded shadow w-full flex flex-wrap text-left p-10 mt-2 mb-4">
              <div className="w-1/2 pr-16 mb-4">
                <p className="font-bold">Name of the event <span>*</span></p>
                <input type="text" name="eventName" required onChange={handleInputChange} value={`${params.eventName}`} placeholder="Ex: Annual Party, Company Lunch, Product Launch" className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3 text-sm" />
              </div>
              <div className="w-1/2 pl-16 mb-4">
                <p className="font-bold">Number of guest <span>*</span></p>
                <input type="number" name="totalAttendees" required onChange={handleInputChange} value={`${params.totalAttendees}`} placeholder="Number of guests" className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3 text-sm" />
              </div>
              <div className="w-1/2 pr-16 mb-4 flex flex-wrap">
                <p className="font-bold w-full">Budget <span>*</span></p>
                <div className="w-1/6 flex relative">
                  <select name="currency" required className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3 text-sm">
                    <option value="SGD">SGD</option>
                  </select>
                  {/* <div className="pointer-events-none absolute inset-y-0 right-0 pt-3 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div> */}
                </div>
                <div className="w-5/6 pl-4">
                  <input type="number" name="budget" required onChange={handleInputChange} value={`${params.budget}`} placeholder="Budget for Ground Transport" className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3 text-sm" />
                </div>
              </div>
              <div className="w-1/2 pl-16 mb-4 flex flex-wrap">
                <p className="font-bold w-full">Event dates <span>*</span></p>
                <div className="w-1/2 pr-5 flex">
                  <p className="w-20 my-auto font-bold text-sm">From</p>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={Date.parse(params.startDate)}
                    onChange={date => handleDateFrom(date)}
                    required
                    minDate={new Date()}
                    // maxDate={params.endDate !== "" && Date.parse(params.endDate)}
                    className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                </div>
                <div className="w-1/2 pl-3 flex">
                  <p className="w-20 pr-2 my-auto text-right font-bold text-sm">To</p>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    required
                    selected={Date.parse(params.endDate)}
                    onChange={date => handleDateTo(date)}
                    minDate={params.startDate !== "" && Date.parse(params.startDate)}
                    className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                </div>
              </div>
              <div className="w-1/2 pr-16 mb-4">
                <p className="font-bold">Country *</p>
                <div className="relative mt-2">
                  {warningF2 ? (<WarningForm />) : ('')}
                  <input data-dropdown="exept" type="text" readOnly value={`${locationNameTwoCountry}`} onClick={handleDropdownCountry} className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Location" />
                  <div data-dropdown="exept" className={`shadow-xl w-full rounded bg-white absolute px-3 py-3 border boder-gray-400 border-solid z-10 overflow-y-auto rounded-md ${dropdownLocationClickCountry ? "block" : "hidden"}`}>
                    <input data-dropdown="exept" type="text" name="countryNameDropdown" onChange={handleInputChange} value={`${locationNameCountry}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Keyword" />  
                    {listLocationCountry.length > 0 ? (
                      <Transition timeout={250} in={true} appear>
                        <div data-dropdown="exept" className="relative shadow-lg w-full rounded bg-white border boder-gray-400 border-solid border-t-0 z-10 overflow-y-auto" style={{  height: `${listLocationCountry.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocationCountry]}}>
                          {listLocationCountry.map((res, index) => {
                            return (<button data-dropdown="exept" type="button" data-value={`${res.countryCode}`} value={`${res.countryName}`} key={index} onClick={handleLocationCountry} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.countryName}`}</button>)
                          })}
                        </div>
                      </Transition>
                    ) : (
                      <p data-dropdown="exept" className="px-4 py-3 text-gray-500">Search Result</p>
                    )}
                  </div>
                  <div data-dropdown="exept" className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
                </div>
              </div>
              <div className="w-1/2 pl-16 mb-4">
                <p className="font-bold">City *</p>
                <div className="relative mt-2">
                  {warningF ? (<WarningForm />) : ('')}
                  <input data-dropdown="exept" type="text" readOnly value={`${locationNameTwo}`} onClick={handleDropdown} className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Location" />
                  <div data-dropdown="exept" className={`shadow-xl w-full rounded bg-white absolute px-3 py-3 border boder-gray-400 border-solid z-10 overflow-y-auto rounded-md ${dropdownLocationClick ? "block" : "hidden"}`}>
                    <input data-dropdown="exept" type="text" name="cityDropdown" onChange={handleInputChange} value={`${locationName}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Keyword" />  
                    {listLocation.length > 0 ? (
                      <Transition timeout={250} in={true} appear>
                        <div data-dropdown="exept" className="relative shadow-lg w-full rounded bg-white border boder-gray-400 border-solid border-t-0 z-10 overflow-y-auto" style={{  height: `${listLocation.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocation]}}>
                          {listLocation.map((res, index) => {
                            return (<button data-dropdown="exept" type="button" data-value={`${res.cityId}`} value={`${res.cityName}`} key={index} onClick={handleLocation} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.cityName}`}</button>)
                          })}
                        </div>
                      </Transition>
                    ) : (
                      <p data-dropdown="exept" className="px-4 py-3 text-gray-500">Search Result</p>
                    )}
                  </div>
                  <div data-dropdown="exept" className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
                </div>
              </div>
              <div className="w-1/2 pr-8 mb-4 hidden">
                <p className="font-bold">Type RFP Non Hotel</p>
                <select name="name" className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3">
                  <option hidden></option>
                  {companyTypeList.length > 0 ?
                    companyTypeList.map((res, index) => {
                      return <option key={index} value={`${res.type}`}>{`${res.type}`}</option>
                    })
                    : ""}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end mb-10">
            <span className="my-auto mr-5">Continue to the next step</span>
            <button type="submit" className="text-center w-40 py-2 text-black uppercase text-sm ml-5 flex justify-center rounded" style={{ backgroundColor: "#fed500" }}>
              <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Next Step
            </button>
          </div>
        </form>
        <PanelTitleStep Text="2. EVENT SCHEDULE" />
        <PanelTitleStep Text="3. Your Contact Information" />
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  LocationCity: state.Location,
  LocationCountry: state.LocationCountry,
  LoginData: state.LoginStatus.LoginData,
  gtsData: state.GtsDataGetReducer.data
})

const mapDispatchToProps = {
  LocationCityAction,
  LocationCountryAction,
  GtsDataGet,
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EventReq)