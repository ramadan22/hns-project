import { React, useState, DatePicker, useEffect, useHistory, useRef, Link  } from '../libraries'
import { BgBlur } from '../assets/images'
import InputRange from 'react-input-range'
import DataStatic from '../static/Data'
import { FaChevronDown } from '../components/icons'
import { connect } from 'react-redux'
import { dateNow } from '../utils/dateNow'
import { Api } from '../helpers/api'
import { ThumbnailLoading } from '../components/molecule/loading'
import { WarningForm } from '../components/atom'
import { Transition } from 'react-transition-group'
import { LocationCityAction, LocationCityActionDeafult } from '../modules/actions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/SliderBanner.css"
import {
  TitleSection,
  Paragraph
} from '../components/atom'
import {
  Navbar,
  ContainerLastNewsAndFaq,
  Thumbnail,
  MostSearched,
  Footer
} from '../components/molecule'

import '../assets/styles/Responsive.css'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const Home = ({ LocationCityAction, LocationCityActionDeafult, LocationCity, CartDataList }) => {
  let DateNow = dateNow()
  const scrollProduct = useRef(null)
  const history = useHistory()
  const [aboutUs, setAboutUs] = useState({})
  const [range1, setRange1] = useState({ min: 0, max: 0 })
  const [range1Max, setRange1Max] = useState(0)
  const [range2, setRange2] = useState({ min: 0, max: 0 })
  const [range2Max, setRange2Max] = useState(0)
  const [startDate, setStartDate] = useState(DateNow)
  const [list, setList] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  const [warningF, setWarningF] = useState(false)
  const [buttonLoadMore, setButtonLoadMore] = useState(false)
  const [totalProduct, setTotalProduct] = useState(false)
  const [listLocation, setListLocation] = useState([])
  const [defaultLocation, setDefaultLocation] = useState([])
  const [locationNameTwo, setLocationNameTwo] = useState('')
  const [dropdownLocationClick, setDropdownLocationClick] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [countryName, setCountryName] = useState('')
  const [showDropdownLocation, setShowDropdownLocation] = useState(null)
  const [attendeesList, setAttendeesList] = useState([])
  const [eventList, setEventList] = useState([])
  const [mostSearchedList, setMostSearchedList] = useState([])
  const [param, setParam] = useState({ page: 1, perPage: 6 })
  const [listCart, setListCart] = useState([])
  const [bannerData, setBannerData] = useState([])
  const [nonHotelForm, setNonHotelForm] = useState(false)
  const [companyType, setCompanyType] = useState([])
  const [companyTypeId, setCompanyTypeId] = useState('')

  const [homeParam, setHomeParam] = useState({})

  const OpenMore = () => {
    setParam({...param, page:param.page+1})
  }

  const executeScroll = () => scrollToRef(scrollProduct)

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

  useEffect(() => {
    Api.get(`/master/api/v1/banner/fetch?status=1`)
      .then((response) => {
        setBannerData(response.data.data.items)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    Api.get(`/master/api/v1/aboutUs/fetch`)
      .then((response) => {
        setAboutUs(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    Api.get(`/supplier/api/v1/company/type?notIn[]=Hotel&orderBy=sequence&sort=asc`)
    .then(res => {
      setCompanyType(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [])

  useEffect(() => {
    setLoadProduct(true)
    Api.get(`/supplier/api/v1/availibility?isTopVenue=1&page=${param.page}&perPage=${param.perPage}`)
      .then((response) => {
        setTotalProduct(response.data.data.total)
        setList(list => [...list, ...response.data.data.items])
        setLoadProduct(false)
        if(list.length > 0){
          executeScroll()
        }
      })
      .catch(function (error) {
        setLoadProduct(false)
        console.log(error)
      })
  }, [param])

  useEffect(() => {
    setListCart(CartDataList.length > 0 ? CartDataList : [])
  }, [CartDataList])

  useEffect(() => {
    if(list.length < totalProduct){
      setButtonLoadMore(true)
    } else {
      setButtonLoadMore(false)
    }
  }, [list, totalProduct])

  const [avabilityValues, setAvabilityValues] = useState({
    eventid: '',
    minattendees: '',
    maxattendees: '',
    location: '',
    minpricemeetingroom: range1.min,
    maxpricemeetingroom: range1.max,
    minpriceroom: range2.min,
    maxpriceroom: range2.max,
    keyword: ''
  })

  const handleDropdown = () => {
    setDropdownLocationClick(!dropdownLocationClick)
  }

  const handleInputChange = (evt) => {
    // setLocationNameTwo(evt.target.value)
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

  useEffect(() => {
    LocationCityActionDeafult()
  }, [])

  useEffect(() => {
    if(LocationCity.dataLocationCity !== null){
      setListLocation(LocationCity.dataLocationCity.items)
    }
  }, [LocationCity.dataLocationCity])

  useEffect(() => {
    if(LocationCity.dataLocationDefault !== null){
      setDefaultLocation(LocationCity.dataLocationDefault.items)
    }
  }, [LocationCity.dataLocationDefault])

  useEffect(() => {
    console.log("defaultLocation", defaultLocation)
    if(defaultLocation.length > 0){
      setCountryCode(defaultLocation[0].countryCode)
      setCountryName(defaultLocation[0].countryName)
      setLocationNameTwo(defaultLocation[0].cityName)
      setAvabilityValues({
        ...avabilityValues,
        location: defaultLocation[0].cityId
      })
    }
  }, [defaultLocation])

  const handleLocation = (event) => {
    setListLocation([])
    setLocationName('')
    setCountryCode(event.target.getAttribute('data-code'))
    setCountryName(event.target.getAttribute('data-name'))
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
      minpricemeetingroom: value.min,
      maxpricemeetingroom: value.max
    })
  }

  const handleChangeRange2 = (value) => {
    setRange2(value)
    setAvabilityValues({
      ...avabilityValues, 
      minpriceroom: value.min,
      maxpriceroom: value.max
    })
  }

  useEffect(() => {
    if(Object.keys(homeParam).length > 0){
      setAvabilityValues({
        ...avabilityValues, 
        minpricemeetingroom: homeParam.room.minPrice,
        maxpricemeetingroom: homeParam.room.maxPrice,
        minpriceroom: homeParam.venue.minPrice,
        maxpriceroom: homeParam.venue.maxPrice
      })
    }
  }, [homeParam])
  

  const handleChangeDatePicker = (value) => {
    setStartDate(value)
  }

  const handleChangeExplore = (event) => {
    if(event.target.getAttribute('name') === "attendees"){
      const sliceAttendees = event.target.value.split('-')
      setAvabilityValues({
        ...avabilityValues, 
        minattendees: sliceAttendees[0],
        maxattendees: sliceAttendees[1]
      })
    } else {
      let splitValue = event.target.value.split("~")
      console.log(splitValue)
      if(splitValue[0] === ""){
        setNonHotelForm(false)
        setAvabilityValues({...avabilityValues, [event.target.getAttribute('name')]: splitValue[1]})
      } else {
        setNonHotelForm(true)
        setCompanyTypeId(splitValue[1])
        setAvabilityValues({...avabilityValues, [event.target.getAttribute('name')]: splitValue[0]})
      }
    }

  }

  const handleSubmitVenue = (event) => {
    setListLocation([])
    LocationCityAction(null)
    LocationCityActionDeafult()
    setDropdownLocationClick(false)
    if(avabilityValues.eventid !== "non-hotel"){
      if(avabilityValues.location === '' && locationName !== ''){
        setWarningF(true)
      } else {
        history.push(`/venue-search/eventid=${avabilityValues.eventid}&minattendees=${avabilityValues.minattendees}&maxattendees=${avabilityValues.maxattendees}&location=${avabilityValues.location}&locationname=${locationNameTwo}&minpricemeetingroom=${avabilityValues.minpricemeetingroom}&maxpricemeetingroom=${avabilityValues.maxpricemeetingroom}&minpriceroom=${avabilityValues.minpriceroom}&maxpriceroom=${avabilityValues.maxpriceroom}&keyword=${avabilityValues.keyword}`)
      }
    } else {
      if(avabilityValues.location === '' && locationNameTwo !== ''){
        setWarningF(true)
      } else {
        history.push('/event-requirements', {
          location: avabilityValues.location,
          countryCode: countryCode,
          countryName: countryName,
          locationName: locationNameTwo,
          companyTypeId: companyTypeId
        })
      }
    }
  }

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

  useEffect(() => {
    Api.get('/master/api/v1/city/fetch?isHighlight=1')
      .then(response => {
        setMostSearchedList(response.data.data.items)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    setTimeout(()=>{
      document.addEventListener('click', handleDocumentClick);
     }, 1000)
  }, [])

  useEffect(() => {
    console.log("avabilityValues", avabilityValues)
  }, [avabilityValues])

  const handleDocumentClick = (evt) => {
    // console.log(evt.parentElement)
    // if(evt.parentElement.getAttribute("data-dropdown") === "exept"){
    //   setDropdownLocationClick(false)
    // }
  }

  const defaultStyleDropdownLocation = {
    transition: `all 0.2s ease`,
    display: 'none',
    opacity: '0'
  }

  const transitionStylesDropdownLocation = {
    entering: { opacity: '0' },
    entered:  { opacity: '1', display: 'block' },
  }

  const handleClickMostSearched = (value) => {
    history.push(`/venue-search/eventid=&minattendees=&maxattendees=&location=&locationname=&minpricemeetingroom=&maxpricemeetingroom=&minpriceroom=&maxpriceroom=&keyword=${value}`)
  }

  const handleClickPeople = (value) => {
    let splitValue = value.split(",")
    history.push(`/venue-search/eventid=&minattendees=${splitValue[0]}&maxattendees=${splitValue[1]}&location=&locationname=&minpricemeetingroom=0&maxpricemeetingroom=0&minpriceroom=&maxpriceroom=&keyword=`)
  }

  const handleClickLoaction = (value) => {
    let splitValue = value.split(",")
    history.push(`/venue-search/eventid=&minattendees=&maxattendees=&location=${splitValue[0]}&locationname=${splitValue[1]}&minpricemeetingroom=0&maxpricemeetingroom=0&minpriceroom=&maxpriceroom=&keyword=`)
  }

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 6000,
    appendDots: dots => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px"
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        
      </div>
    )
  }

  const handleCounter = () => {
    history.push(`/venue-search/eventid=&minattendees=0&maxattendees=0&location=&locationname=&minpricemeetingroom=0&maxpricemeetingroom=0&minpriceroom=0&maxpriceroom=0&keyword=`)
  }

  return (
    <>
      <Navbar Type="home" NavActive={"home"} />
      <div className="relative w-full pb-10" style={{ minHeight: "680px" }}>
      {/* <div className="relative w-full pb-10"> */}
        <div className="relative w-full">
          {bannerData.length > 0 ? (
            <Slider {...settings}>
                {bannerData.map((res, index) => {
                  return(
                    <div key={index}>
                      <div className="banner-slider" style={{ backgroundImage: `url(${res.image})`, height: "680px", width: "100%", backgroundSize: "cover", backgroundPosition: "center center" }}></div>
                      {/* <div style={{ backgroundImage: `url(${res.image})`, height: "1080px", width: "100%", backgroundSize: "cover", backgroundPosition: "center center" }}></div> */}
                    </div>
                  )
                })}
            </Slider>
          ) : ('')}
        </div>
        <div className="lg:container mx-auto xl:px-10 px-5 absolute sm:inset-0 top-0 flex flex-wrap pt-32 text-left">
          <div className="md:w-2/5 w-full lg:pr-10 pr-5">
            <p className="text-white lg:text-2xl text-lg">Discover 20,000 spaces to meet and work.</p>
            <div className="w-full flex flex-wrap mt-3">
              <div className={`${nonHotelForm ? "w-full" : "lg:w-5/12 w-full"} lg:pr-2 pr-0`}>
                <div className='inline-block relative w-full'>
                  <select name="eventid" onChange={handleChangeExplore} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" hidden>Event Type</option>
                    {eventList.length > 0 ?
                      (eventList.map((res, index) => {
                        return <option key={index} value={`~${res.eventsId}`} key={res.eventsId}>{res.eventsName}</option>
                      })) : ('')}
                    {companyType.length > 0 ?
                      (companyType.map((res, index) => {
                        return <option key={index} value={`non-hotel~${res.companyTypeId}`} key={res.companyTypeId}>{res.type}</option>
                      })) : ('')}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaChevronDown className="text-sm" />
                  </div>
                </div>
              </div>
              {!nonHotelForm ? 
                <div className="lg:w-7/12 w-full lg:pl-2 pl-0 lg:mt-0 mt-4">
                  <div className='inline-block relative w-full'>
                    <select name="attendees" onChange={handleChangeExplore} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                      <option hidden value="">Attendees</option>
                      {attendeesList.length > 0 ?
                        (attendeesList.map((res) => {
                          return <option value={`${res.min}-${res.max}`} key={res.id}>{res.title}</option>
                        })) : ('')}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="text-sm" />
                    </div>
                  </div>
                </div>
              : ""}
            </div>
            
            <div className="w-full flex flex-wrap mt-4">
              <div className="w-7/12 pr-2 hidden">
                <div className="inline-block relative w-full bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight">
                  <DatePicker dateFormat="dd/MM/Y" selected={Date.parse(startDate)} onChange={(value) => handleChangeDatePicker(value)} className="block px-4 py-2 pr-8 appearance-none w-full focus:outline-none" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
                </div>
              </div>
              <div className="w-full relative">
                {warningF ? (<WarningForm />) : ('')}
                <input type="text" readOnly value={`${locationNameTwo}`} onClick={handleDropdown} className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Location" />
                <div data-dropdown="exept" className={`shadow-xl w-full rounded bg-white absolute px-3 py-3 border boder-gray-400 border-solid z-10 overflow-y-auto rounded-md ${dropdownLocationClick ? "block" : "hidden"}`}>
                  <input type="text" onChange={handleInputChange} value={`${locationName}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Where is your event?" />  
                  {listLocation.length > 0 ? (
                    <Transition timeout={250} in={true} appear>
                      <div className="relative shadow-lg w-full rounded bg-white border boder-gray-400 border-solid border-t-0 z-10 overflow-y-auto" style={{  height: `${listLocation.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocation]}}>
                        {listLocation.map((res, index) => {
                          return (<button type="button" data-code={res.countryCode} data-name={res.countryName}  data-value={`${res.cityId}`} value={`${res.cityName}`} key={index} onClick={handleLocation} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.cityName}`}</button>)
                        })}
                      </div>
                    </Transition>
                  ) : (
                    <p className="px-4 py-3 text-gray-500">Search Result</p>
                  )}
                </div>
                {/* {listLocation.length > 0 ? (
                  <Transition timeout={250} in={true} appear>
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
            
            {!nonHotelForm ?
              <>
                <div className="w-full flex flex-wrap mt-4 px-5 py-5 bg-white rounded-md">
                  <p className="w-full">Budget for Meeting Space</p>
                  <p className="w-full text-blue-500 mt-3 mb-1">${range1.min} - ${range1.max}</p>
                  <InputRange
                    draggableTrack
                    minValue={0}
                    value={range1}
                    maxValue={range1Max}
                    onChange={(value) => handleChangeRange1(value)} />
                </div>
                <div className="w-full flex flex-wrap mt-4 px-5 py-5 bg-white rounded-md">
                  <p className="w-full">Budget for Accommodation</p>
                  <p className="w-full text-blue-500 mt-3 mb-1">${range2.min} - ${range2.max}</p>
                  <InputRange
                    draggableTrack
                    minValue={0}
                    value={range2}
                    maxValue={range2Max}
                    onChange={(value) => handleChangeRange2(value)} />
                </div>
              </>
            : ""}
            <div className="mt-5 w-full flex text-center">
              <button className="px-6 rounded-md text-sm text-white py-1 uppercase w-full" style={{ backgroundColor: "#fed500" }} onClick={handleSubmitVenue}>Find Space</button>
            </div>
          </div>
          <div className="md:w-3/5 w-full md:mt-0 mt-5 md:pl-16 pl-0">
            <p className="text-white lg:text-2xl text-lg">Find a conference venue</p>
            <div className="class-box w-full relative sm:mt-5 mt-2">
              {/* <img src={BgBlur} className="w-full h-full object-cover obsolute z-10 opacity-50" alt="blur" style={{ filter: "blur(5px)" }} /> */}
              <div className="md:inset-0 top-0 flex flex-wrap lg:px-5 px-2 lg:py-6 py-3 z-0">
                <div className="w-full mb-4">
                  <p className="text-yellow-400 uppercase">Attendees</p>
                </div>
                {attendeesList.length > 0 &&
                  (attendeesList.map((res) => {
                    return <div key={res.id} className="lg:w-1/4 text-white lg:text-sm text-sm lg:pr-0 lg:mb-5 mb-3 pr-4 cursor-pointer" onClick={(value) => handleClickPeople(`${res.min},${res.max}`)}>{res.title}</div>
                  }))
                }
                <div className="w-full mt-5 mb-4">
                  <p className="text-yellow-400 uppercase">Location</p>
                </div>
                {mostSearchedList.length > 0 &&
                  mostSearchedList.map((res, index) => {
                    return <div key={index} className="lg:w-1/4 text-white lg:text-sm text-sm lg:pr-0 pr-4 uppercase lg:mb-5 mb-3 cursor-pointer" onClick={(value) => handleClickLoaction(`${res.cityId},${res.cityName}`)}>{res.cityName}</div>
                  })
                }
              </div>
            </div>
          </div>

          {/* <div className="md:w-3/5 w-full md:mt-0 mt-5">
            <p className="text-white lg:text-2xl text-lg">Find a conference venue</p>
            <div className="relative sm:mt-5 mt-2">
              <img src={BgBlur} className="w-full h-full object-cover obsolute z-10 opacity-50" alt="blur" style={{ filter: "blur(5px)" }} />
              <div className="absolute md:inset-0 top-0 flex flex-wrap lg:px-5 px-2 lg:py-6 py-3 z-0">
                <div className="w-full mb-1">
                  <p className="text-yellow-400 uppercase">People</p>
                </div>
                {attendeesList.length > 0 &&
                  (attendeesList.map((res) => {
                    return <div key={res.id} className="lg:w-1/4 text-white lg:text-sm text-sm lg:pr-0 pr-4 cursor-pointer" onClick={(value) => handleClickPeople(`${res.min},${res.max}`)}>{res.title}</div>
                  }))
                }
                <div className="w-full mt-5 mb-1">
                  <p className="text-yellow-400 uppercase">Location</p>
                </div>
                {mostSearchedList.length > 0 &&
                  mostSearchedList.map((res, index) => {
                    return <div key={index} className="lg:w-1/4 text-white lg:text-sm text-sm lg:pr-0 pr-4 uppercase lg:mb-1 mb-3 cursor-pointer" onClick={(value) => handleClickLoaction(`${res.cityId},${res.cityName}`)}>{res.cityName}</div>
                  })
                }
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* this is component hide refrense from design v13 */}
      <div className={`lg:container lg:mx-auto px-10 pt-12 pb-12 hidden ${Object.keys(aboutUs).length > 0 ? 'opacity-1' : 'opacity-0'}`}>
        <TitleSection ClassName="w-full justify-center text-2xl font-bold uppercase" Text={`${Object.keys(aboutUs).length > 0 && aboutUs.title}`} />
        <Paragraph ClassName="text-xs mt-2 mb-10 px-64" Text={`${Object.keys(aboutUs).length > 0 && aboutUs.content}`} />
        <Link to="#" className="px-8 shadow rounded text-xs text-white py-3 uppercase w-12/12 hidden" style={{ backgroundColor: "#fed500" }}>Explore Now!</Link>
      </div>
      
      <MostSearched counterMostSearched={(value) => handleClickMostSearched(value)} />
      <div className="lg:container lg:mx-auto lg:px-10 px-5 mt-10 text-left flex flex-wrap">
        <TitleSection Type="x-large" Text="Top Venues" />
        <p className="text-sm ml-5 my-auto text-gray-500">{`${list.length}`} Hotels</p>
        <p className="w-full flex-column text-md mt-6">We found {`${list.length}`} hotels matching your criteria</p>
      </div>
      <div className="lg:container lg:mx-auto lg:px-10 sm:px-5 px-0 container-product flex flex-wrap mb-10 pt-5">
        {list.length > 0 ? (
           list.map((res, index) => {
            return (<div ref={scrollProduct} className="lg:w-1/3 w-1/2 text-left xl:pr-8 px-2 xl:pb-8 pb-4" key={index}>
              <Thumbnail data={res} onCart={Object.keys(listCart).length > 0 ? listCart.filter((res2) => res2.placeId === res.placeId ? true : false) : ""} />
            </div>)
          })
        ) : ('')}
        {loadProduct ? (
          <>
            <ThumbnailLoading /><ThumbnailLoading /><ThumbnailLoading />
          </>
        ) : ('')}
      </div>
      {buttonLoadMore ? (
        <button onClick={OpenMore} className="uppercase px-10 py-2 text-sm text-white mb-10 rounded-md focus:outline-none" style={{ backgroundColor: "#fed500" }}>View More Spaces</button>
      ) : ('')}
      <ContainerLastNewsAndFaq counterLooking={() => handleCounter()} />
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  LocationCity: state.Location,
  CartDataList: state.CartDataList.data,
})

const mapDispatchToProps = {
  LocationCityAction,
  LocationCityActionDeafult
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)