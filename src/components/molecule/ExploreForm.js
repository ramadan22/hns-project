import { React, useState, useEffect, useHistory } from '../../libraries'
import { FaChevronRight, FaChevronDown, FaSearch } from '../icons'
import { WarningForm } from '../atom'
import { connect } from 'react-redux'
import { LocationCityAction } from '../../modules/actions'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import { Transition } from 'react-transition-group'
import { Api } from '../../helpers/api'

const ExploreForm = ({ 
  LocationCityAction, 
  LocationCity, AllParam, Status }) => {
  const history = useHistory()
  const [dropdown1, setDropdown1] = useState(false)
  const [dropdown2, setDropdown2] = useState(false)
  const [range1Max, setRange1Max] = useState(0)
  const [range1, setRange1] = useState({ min: AllParam[5] !== "" && AllParam[5] !== undefined ? parseInt(AllParam[5]) : 0, max: AllParam[6] !== "" && AllParam[6] !== undefined ? parseInt(AllParam[6]) : 1000 })
  const [range2Max, setRange2Max] = useState(0)
  const [range2, setRange2] = useState({ min: AllParam[7] !== "" && AllParam[7] !== undefined ? parseInt(AllParam[7]) : 0, max: AllParam[8] !== "" && AllParam[8] !== undefined ? parseInt(AllParam[8]) : 1000 })
  // const [locationName, setLocationName] = useState(`${AllParam[4] !== "" && AllParam[4] !== undefined ? AllParam[4] : ""}`)
  const [locationName, setLocationName] = useState(``)
  const [listLocation, setListLocation] = useState([])
  const [warningF, setWarningF] = useState(false)
  const [showDropdownLocation, setShowDropdownLocation] = useState(null)
  const [attendeesList, setAttendeesList] = useState([])
  const [eventList, setEventList] = useState([])
  const [dropdownLocationClick, setDropdownLocationClick] = useState(false)
  const [locationNameTwo, setLocationNameTwo] = useState(`${AllParam[4] !== "" && AllParam[4] !== undefined ? AllParam[4] : ""}`)

  const [homeParam, setHomeParam] = useState({})

  const [avabilityValues, setAvabilityValues] = useState({
    page: 1,
    perPage: 6,
    eventsId: AllParam[0] !== "" && AllParam[0] !== undefined ? AllParam[0] : "",
    minAttendees: AllParam[1] !== "" && AllParam[1] !== undefined ? AllParam[1] : "",
    maxAttendees: AllParam[2] !== "" && AllParam[2] !== undefined ? AllParam[2] : "",
    location: AllParam[3] !== "" && AllParam[3] !== undefined ? AllParam[3] : "",
    cityName: locationName,
    minPriceMeetingRoom: range1.min,
    maxPriceMeetingRoom: range1.max,
    minPriceRoom: range2.min,
    maxPriceRoom: range2.max,
    keyword: AllParam[9] !== "" && AllParam[9] !== undefined ? AllParam[9] : ""
  })

  useEffect(() => {
    Api.get(`/supplier/api/v1/homeParameter`)
      .then((response) => {
        setHomeParam(response.data.data)
        setRange1Max(response.data.data.room.maxPrice)
        setRange2Max(response.data.data.venue.maxPrice)
        setRange1({
          ...range1,
          min: response.data.data.room.minPrice,
          max: response.data.data.room.maxPrice
        })

        setRange2({
          ...range2,
          min: response.data.data.venue.minPrice,
          max: response.data.data.venue.maxPrice
        })
        // setHomeParam(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const handleInputChangeKeyword = (evt) => {
    setAvabilityValues({
      ...avabilityValues, 
      keyword: evt.target.value
    })
  }

  const handleInputChange = (evt) => {
    setLocationName(evt.target.value)
    setAvabilityValues({
      ...avabilityValues, 
      location: ''
    })
    if(evt.target.value.length > 1){
      LocationCityAction(evt.target.value)
      setShowDropdownLocation('entered')
    } else {
      setListLocation([])
    }
  }

  const handleLocation = (event) => {
    setListLocation([])
    setLocationName('')
    setLocationNameTwo(event.target.value)
    setDropdownLocationClick(false)
    setAvabilityValues({
      ...avabilityValues, 
      location: event.target.getAttribute('data-value')
    })
    setWarningF(false)
    setShowDropdownLocation(null)
  }

  const handleChangeRange1 = (value) => {
    setRange1(value)
    setAvabilityValues({
      ...avabilityValues, 
      minPriceMeetingRoom: value.min,
      maxPriceMeetingRoom: value.max
    })
  }

  const handleChangeRange2 = (value) => {
    setRange2(value)
    setAvabilityValues({
      ...avabilityValues, 
      minPriceRoom: value.min,
      maxPriceRoom: value.max
    })
  }

  const handleClickDropdown1 = (event) => {
    if(event.currentTarget.getAttribute("data-element") === "parent"){
      setDropdown1(!dropdown1)
      setDropdown2(false)
    } else {
      setDropdown1(false)
    }
  }

  const handleClickDropdown2 = (event) => {
    if(event.currentTarget.getAttribute("data-element") === "parent"){
      setDropdown2(!dropdown2)
      setDropdown1(false)
    } else {
      setDropdown2(false)
    }
  }

  const handleChangeExplore = (event) => {
    if(event.target.getAttribute('name') === "attendees"){
      const sliceAttendees = event.target.value.split('-')
      setAvabilityValues({
        ...avabilityValues, 
        minAttendees: sliceAttendees[0],
        maxAttendees: sliceAttendees[1]
      })
    } else {
      setAvabilityValues({...avabilityValues, [event.target.getAttribute('name')]: event.target.value})
    }
  }

  useEffect(() => {
    if(LocationCity.dataLocationCity !== null){
      setListLocation(LocationCity.dataLocationCity.items)
    }
  }, [LocationCity.dataLocationCity, avabilityValues.location])
  
  useEffect(() => {
    Api.get('/supplier/api/v1/events/fetch')
    .then(response => {
      setEventList(response.data.data.items)
    })
    .catch(function (error) {
        console.log(error)
    })
  }, [])

  useEffect(() => {
    Api.get('/master/api/v1/attendees/fetch')
    .then(response => {
      setAttendeesList(response.data.data)
    })
    .catch(function (error) {
        console.log(error)
    })
  }, [])

  const handleDropdown = () => {
    setDropdownLocationClick(!dropdownLocationClick)
  }

  const defaultStyle = {
    transition: `max-height 0.5s, opacity 2s`,
    maxHeight: '0px',
    opacity: '0',
    overflow: 'hidden'
  }

  const defaultStyleEl = {
    transition: `all 0.3s ease-in-out`,
    marginBottom: '0px'
  }

  const transitionStyles = {
    entered:  { opacity: '1', maxHeight: '60px'},
    close: { opacity: '0', maxHeight: '0px'},
    marginBot: { marginBottom: '15px' },
    rotateStyle: { transform: 'rotate(90deg)' }
  }

  const defaultStyleDropdownLocation = {
    transition: `all 0.2s ease`,
    marginTop: '-50px',
    display: 'none',
    opacity: '0'
  }

  const transitionStylesDropdownLocation = {
    entering: { opacity: '0' },
    entered:  { opacity: '1', marginTop: '10px', display: 'block' },
  }

  const handleSubmitVenue = (event) => {
    event.preventDefault()
    setListLocation([])
    LocationCityAction(null)
    setDropdownLocationClick(false)
    if(avabilityValues.location === '' && locationName !== ''){
      setWarningF(true)
    } else {
      if(Status === "Deals")
        history.push(`/deals-search/eventid=${avabilityValues.eventsId}&minattendees=${avabilityValues.minAttendees}&maxattendees=${avabilityValues.maxAttendees}&location=${avabilityValues.location}&locationname=${locationNameTwo}&minpricemeetingroom=${avabilityValues.minPriceMeetingRoom}&maxpricemeetingroom=${avabilityValues.maxPriceMeetingRoom}&minpriceroom=${avabilityValues.minPriceRoom}&maxpriceroom=${avabilityValues.maxPriceRoom}&keyword=${avabilityValues.keyword}`)
      else 
        history.push(`/venue-search/eventid=${avabilityValues.eventsId}&minattendees=${avabilityValues.minAttendees}&maxattendees=${avabilityValues.maxAttendees}&location=${avabilityValues.location}&locationname=${locationNameTwo}&minpricemeetingroom=${avabilityValues.minPriceMeetingRoom}&maxpricemeetingroom=${avabilityValues.maxPriceMeetingRoom}&minpriceroom=${avabilityValues.minPriceRoom}&maxpriceroom=${avabilityValues.maxPriceRoom}&keyword=${avabilityValues.keyword}`)
    }
  }

  return (
    <div className="lg:container lg:mx-auto lg:px-10 px-5 explore-form lg:pt-3 pt-0 lg:pb-6 pb-3">
      <form onSubmit={handleSubmitVenue}>
        <div className="flex flex-wrap w-12/12">
          <div className="sm:w-4/12 w-full mb-5">
            <div className="relative">
              <input type="search" name="keyword" onChange={handleInputChangeKeyword} value={avabilityValues.keyword} className="block appearance-none w-full bg-white border border-gray-400 md:text-base text-sm hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline placeholder-black" placeholder="Keyword" />
              <div className="absolute pin-r pin-t top-0 right-0 lg:mr-3 mr-2 lg:mt-3 mt-2 text-gray-500">
                <FaSearch className="h-4" />
              </div>
            </div>
          </div>
          <div className="lg:w-3/12 sm:w-4/12 w-full sm:pl-3 pl-0 sm:mb-0 mb-5">
            <div className={`w-full px-3 shadow bg-white border border-gray-400 hover:border-gray-500 leading-tight rounded cursor-pointer`} style={{ ...defaultStyleEl, ...transitionStyles[`${dropdown1 ? 'marginBot' : ''}`]}}>
              <p className="w-full flex flex-wrap items-center pt-2 lg:text-base text-sm" data-element="parent" onClick={handleClickDropdown1}>Pricing Meeting Room <FaChevronRight style={{ transition: 'transform 0.5s', ...transitionStyles[`${dropdown1 ? 'rotateStyle' : ''}`] }} className="inline ml-auto text-sm" /></p>
              <Transition timeout={100} in={true} appear>
                <div className={`w-full flex flex-wrap pb-2`} style={{ ...defaultStyle, ...transitionStyles[`${dropdown1 ? 'entered' : 'close'}`] }}>
                  <p className="w-full text-blue-500 mt-3 mb-1 text-left text-sm">${range1.min} - ${range1.max}</p>
                  <InputRange
                    draggableTrack
                    maxValue={range1Max}
                    minValue={0}
                    onChange={(value) => handleChangeRange1(value)}
                    value={range1} />
                </div>
              </Transition>
            </div>
          </div>
          <div className="lg:w-3/12 sm:w-4/12 w-full sm:pl-3 pl-0 sm:mb-0 mb-5">
            <div className={`w-full px-3 shadow bg-white border border-gray-400 hover:border-gray-500 leading-tight rounded cursor-pointer`} style={{ ...defaultStyleEl, ...transitionStyles[`${dropdown2 ? 'marginBot' : ''}`] }}>
              <p className="w-full flex flex-wrap items-center pt-2 lg:text-base text-sm" data-element="parent" onClick={handleClickDropdown2}>Pricing Accomodation <FaChevronRight style={{ transition: 'transform 0.5s', ...transitionStyles[`${dropdown2 ? 'rotateStyle' : ''}`] }} className="inline ml-auto text-sm" /></p>
              <Transition timeout={100} in={true} appear>
                <div className={`w-full flex flex-wrap pb-2`} style={{ ...defaultStyle, ...transitionStyles[`${dropdown2 ? 'entered' : 'close'}`] }}>
                  <p className="w-full text-blue-500 mt-3 mb-1 text-left text-sm">${range2.min} - ${range2.max}</p>
                  <InputRange
                    draggableTrack
                    maxValue={range2Max}
                    minValue={0}
                    onChange={(value) => handleChangeRange2(value)}
                    value={range2} />
                </div>
              </Transition>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="lg:w-4/12 sm:w-6/12 w-full flex flex-wrap">
            <div className="sm:w-1/2 w-full sm:pr-2 pr-0 sm:mb-0 mb-5">
              <div className='inline-block relative w-full'>
                {eventList.length > 0 ? (
                  <>
                    <select onChange={handleChangeExplore} name="eventsId" defaultValue={avabilityValues.eventsId} className="block appearance-none w-full bg-white border border-gray-400 md:text-base text-sm hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                      <option hidden value="">Event Type</option>
                      {eventList.map((res) => {
                        return <option key={`${res.eventsId}`} value={`${res.eventsId}`}>{`${res.eventsName}`}</option>
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="text-sm" />
                    </div>
                  </>
                ) : ('')}
              </div>
            </div>
            <div className="sm:w-1/2 w-full sm:pl-1 pl-0 sm:mb-0 mb-5 relative">
              {warningF ? (<WarningForm />) : ('')}
                <input type="text" readOnly value={`${locationNameTwo}`} onClick={handleDropdown} className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Location" />
                <div data-dropdown="exept" className={`shadow-xl w-full rounded bg-white absolute px-3 pt-3 border boder-gray-400 border-solid z-10 overflow-y-auto rounded-md ${dropdownLocationClick ? "block" : "hidden"}`}>
                  <input type="text" onChange={handleInputChange} value={`${locationName}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Keyword" />  
                  {listLocation.length > 0 ? (
                    <Transition timeout={250} in={true} appear>
                      <div className="relative shadow-lg w-full rounded bg-white border boder-gray-400 border-solid border-t-0 z-10 overflow-y-auto" style={{  height: `${listLocation.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocation]}}>
                        {listLocation.map((res, index) => {
                          return (<button type="button" data-value={`${res.cityId}`} value={`${res.cityName}`} key={index} onClick={handleLocation} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.cityName}`}</button>)
                        })}
                      </div>
                    </Transition>
                  ) : (<p className="w-full text-left px-4 py-2 text-gray-500">Search Result</p>)}
                </div>
              {/* {warningF ? (
                <WarningForm />
              ) : ('')}
              <input type="text" onChange={handleInputChange} value={`${locationName}`} className="block appearance-none w-full bg-white border border-gray-400 md:text-base text-sm hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Location" />
              {listLocation.length > 0 ? (
                <Transition timeout={500} in={true} appear>
                  <div className="shadow-lg w-full rounded bg-white absolute border boder-gray-400 border-solid z-10 overflow-y-auto" style={{  height: `${listLocation.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocation]}}>
                    {listLocation.map((res, index) => {
                      return (<button type="button" data-value={`${res.cityId}`} value={`${res.cityName}`} key={index} onClick={handleLocation} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.cityName}`}</button>)
                    })}
                  </div>
                </Transition>
              ) : ('')} */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
            </div>
          </div>
          <div className="lg:w-3/12 sm:w-3/12 w-full sm:pl-3 pl-0 sm:mb-0 mb-5">
            <div className="inline-block relative w-full">
              {attendeesList.length > 0 ?
               <>
                <select name="attendees" onChange={handleChangeExplore} defaultValue={`${avabilityValues.minAttendees}-${avabilityValues.maxAttendees}`} className="block appearance-none w-full bg-white border border-gray-400 md:text-base text-sm hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option hidden value="">Attendees</option>
                  {attendeesList.map((res) => {
                    return <option value={`${res.min}-${res.max}`} key={res.id}>{res.title}</option>
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaChevronDown className="text-sm" />
                </div>
                </>
              : ('')}
            </div>
          </div>
          <div className="lg:block hidden w-1/12"></div>
          <div className="lg:w-4/12 sm:w-3/12 w-full sm:mb-0 mb-5">
            <button className="sm:w-9/12 w-full h-full py-1 uppercase rounded-md bg-yellow-400 text-white lg:text-base md:text-sm text-xs focus:outline-none">Explore Now!</button>
          </div>
        </div>
      </form>
    </div>
  )
}

ExploreForm.defaulProps = {
  Status: ""
}

const mapStateToProps = (state) => ({
  LocationCity: state.Location,
})

const mapDispatchToProps = {
  LocationCityAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreForm)