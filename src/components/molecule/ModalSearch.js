import { React, useState, useEffect, DatePicker, useHistory } from '../../libraries'
import { Transition } from 'react-transition-group'
import InputRange from 'react-input-range'
import { BgBlur } from '../../assets/images'
import { FaChevronDown } from '../icons'
import { Api } from '../../helpers/api'
import { ModalAction, LocationCityAction } from '../../modules/actions'
import { WarningForm } from '../../components/atom'
import { dateNow } from '../../utils/dateNow'
import { connect } from 'react-redux'
import { BackdropModal } from '../atom'

const ModalSearch = ({ counterProps, ModalAction, LocationCityAction, LocationCity }) => {
  let DateNow = dateNow()
  const history = useHistory()

  const [startDate] = useState(DateNow)
  const [nonHotelForm, setNonHotelForm] = useState(false)
  const [range1, setRange1] = useState({ min: 0, max: 0 })
  const [range2, setRange2] = useState({ min: 0, max: 0 })
  const [listLocation, setListLocation] = useState([])
  const [mostSearchedList] = useState([])
  const [attendeesList, setAttendeesList] = useState([])
  const [locationName, setLocationName] = useState('')
  const [showDropdownLocation, setShowDropdownLocation] = useState(null)
  const [warningF, setWarningF] = useState(false)
  const [eventList, setEventList] = useState([])
  const [companyType] = useState([])
  const [companyTypeId, setCompanyTypeId] = useState('')
  const [defaultLocation, setDefaultLocation] = useState([])

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

  useEffect(() => {
    Api.get('/supplier/api/v1/events/fetch')
      .then(response => {
        setEventList(response.data.data.items)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  // useEffect(() => {
  //   Api.get(`/supplier/api/v1/company/type?notIn[]=Hotel&orderBy=sequence&sort=asc`)
  //   .then(res => {
  //     setCompanyType(res.data.data.items)
  //   })
  //   .catch(function (error) {
  //     console.log(error.response)
  //   })
  // }, [])

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
    if(defaultLocation.length > 0){
      setLocationName(defaultLocation[0].cityName)
      setAvabilityValues({
        ...avabilityValues,
        location: defaultLocation[0].cityId
      })
    }
  }, [defaultLocation])

  // const handleChangeForm = (event) => {
    // setFormRegister({ ...formRegister, [event.target.getAttribute('name')]: event.target.value })
  // }

  // useEffect(() => {
  //   if (formRegister.password !== '' && formRegister.confirmPassword !== '' && formRegister.password === formRegister.confirmPassword) {
  //     setCheckPass('entering')
  //   } else {
  //     setCheckPass('')
  //   }
  // }, [formRegister.password, formRegister.confirmPassword])

  // const submitRegister = (event) => {
    // event.preventDefault()
    // setSpiner(true)
    // Api.post(`/membership/api/v1/member/registerV2`, formRegister)
    //   .then(res => {
    //     console.log(res)
    //     ModalAction({ Type: "success-popup", Message: res.data.message })
    //     setSpiner(false)
    //     counterProps(null)
    //   })
    //   .catch(function (error) {
    //     console.log(error.response)
    //     ModalAction({ Type: "failed-popup", Message: error.response.data.message })
    //     setSpiner(false)
    //     counterProps(null)
    //   })
  // }

  // const handlecounter = () => {
  //   counterProps("login")
  // }

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

  const handleClickPeople = (value) => {
    // let splitValue = value.split(",")
    // history.push(`/venue-search/eventid=&minattendees=${splitValue[0]}&maxattendees=${splitValue[1]}&location=&locationname=&minpricemeetingroom=0&maxpricemeetingroom=0&minpriceroom=&maxpriceroom=&keyword=`)
  }

  const handleClickLoaction = (value) => {
    // let splitValue = value.split(",")
    // history.push(`/venue-search/eventid=&minattendees=&maxattendees=&location=${splitValue[0]}&locationname=${splitValue[1]}&minpricemeetingroom=0&maxpricemeetingroom=0&minpriceroom=&maxpriceroom=&keyword=`)
  }

  const handleLocation = (event) => {
    setLocationName(event.target.value)
    setAvabilityValues({
      ...avabilityValues, 
      location: event.target.getAttribute('data-value')
    })
    setWarningF(false)
    setShowDropdownLocation(null)
  }

  const handleSubmitVenue = (event) => {
    if(avabilityValues.eventid !== "non-hotel"){
      if(avabilityValues.location === '' && locationName !== ''){
        setWarningF(true)
      } else {
        history.push(`/venue-search/eventid=${avabilityValues.eventid}&minattendees=${avabilityValues.minattendees}&maxattendees=${avabilityValues.maxattendees}&location=${avabilityValues.location}&locationname=${locationName}&minpricemeetingroom=${avabilityValues.minpricemeetingroom}&maxpricemeetingroom=${avabilityValues.maxpricemeetingroom}&minpriceroom=${avabilityValues.minpriceroom}&maxpriceroom=${avabilityValues.maxpriceroom}&keyword=${avabilityValues.keyword}`)
      }
    } else {
      if(avabilityValues.location === '' && locationName !== ''){
        setWarningF(true)
      } else {
        history.push('/event-requirements', {
          location: avabilityValues.location,
          locationName: locationName,
          companyTypeId: companyTypeId
        })
      }
    }
  }

  const handleChangeDatePicker = (value) => {
    // setStartDate(value)
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

  const defaultStyle = {
    transition: `all 0.5s ease`,
    marginTop: '-100px',
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, marginTop: '0' },
  }

  const enableSamePass = {
    entering: { opacity: '1' }
  }

  return (
    <>
      <BackdropModal />
      <Transition timeout={100} in={true} appear>
        {(status) => (
          <div style={{ ...defaultStyle, ...transitionStyles[status] }} className="w-full h-full flex flex-wrap absolute z-40 overflow-y-auto py-6" data-key="exept">
            <div className="w-1/3 h-auto bg-white py-8 px-8 mx-auto my-auto flex flex-wrap">
              <div className="w-full mx-auto px-2 inset-0 flex flex-wrap text-left">
                <div className="w-full">
                  <p className="text-2xl mb-5" dangerouslySetInnerHTML={{ __html: "Search unique venues, compare prices, and book now" }}></p>
                  <div className="w-full flex flex-wrap mt-3">
                    <div className={`${nonHotelForm ? "w-full" : "w-6/12"} pr-2`}>
                      <div className='inline-block relative w-full'>
                        <select name="eventid" onChange={handleChangeExplore} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                          <option value="" hidden>Event Type</option>
                          {eventList.length > 0 ?
                            (eventList.map((res) => {
                              return <option value={`~${res.eventsId}`} key={res.eventsId}>{res.eventsName}</option>
                            })) : ('')}
                          {companyType.length > 0 ?
                            (companyType.map((res) => {
                              return <option value={`non-hotel~${res.companyTypeId}`} key={res.companyTypeId}>{res.type}</option>
                            })) : ('')}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <FaChevronDown className="text-sm" />
                        </div>
                      </div>
                    </div>
                    {!nonHotelForm ?
                      <div className="w-6/12 pl-2">
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
                      <input type="text" onChange={handleInputChange} value={`${locationName}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="Location" />
                      {listLocation.length > 0 ? (
                        <Transition timeout={250} in={true} appear>
                          <div className="shadow-lg w-full rounded bg-white absolute border boder-gray-400 border-solid z-10 overflow-y-auto" style={{ height: `${listLocation.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocation] }}>
                            {listLocation.map((res, index) => {
                              return (<button type="button" data-value={`${res.cityId}`} value={`${res.cityName}`} key={index} onClick={handleLocation} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.cityName}`}</button>)
                            })}
                          </div>
                        </Transition>
                      ) : ('')}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
                    </div>
                  </div>

                  {!nonHotelForm ?
                    <>
                      <div className="w-full flex flex-wrap mt-4 pt-3 bg-white rounded-md">
                        <p className="w-full">Pricing Meeting Room</p>
                        <p className="w-full text-blue-500 mt-3 mb-1">${range1.min} - ${range1.max}</p>
                        <InputRange
                          draggableTrack
                          minValue={0}
                          value={range1}
                          maxValue={1000}
                          onChange={(value) => handleChangeRange1(value)} />
                      </div>
                      <div className="w-full flex flex-wrap mt-4 pt-3 bg-white rounded-md">
                        <p className="w-full">Pricing Accommodation</p>
                        <p className="w-full text-blue-500 mt-3 mb-1">${range2.min} - ${range2.max}</p>
                        <InputRange
                          draggableTrack
                          minValue={0}
                          value={range2}
                          maxValue={1000}
                          onChange={(value) => handleChangeRange2(value)} />
                      </div>
                    </>
                    : ""}
                  <div className="mt-5 w-full flex text-center">
                    <button className="px-6 rounded-md text-sm py-1 uppercase w-full" style={{ backgroundColor: "#fed500" }} onClick={handleSubmitVenue}>Explore More</button>
                  </div>
                </div>
                <div className="w-3/5 hidden">
                  <p className="text-2xl">Find a conference venue</p>
                  <div className="relative mt-5">
                    <img src={BgBlur} className="w-full h-full object-cover obsolute z-10 opacity-50" alt="blur" style={{ filter: "blur(5px)" }} />
                    <div className="absolute inset-0 flex flex-wrap px-5 py-6 z-0">
                      <div className="w-full mb-1">
                        <p className="text-yellow-400 uppercase">People</p>
                      </div>
                      {attendeesList.length > 0 &&
                        (attendeesList.map((res) => {
                          return <div key={res.id} className="w-1/4 text-sm cursor-pointer" onClick={(value) => handleClickPeople(`${res.min},${res.max}`)}>{res.title}</div>
                        }))
                      }
                      <div className="w-full mt-5 mb-1">
                        <p className="text-yellow-400 uppercase">Location</p>
                      </div>
                      {mostSearchedList.length > 0 &&
                        mostSearchedList.map((res, index) => {
                          return <div key={index} className="w-1/4 text-white text-sm uppercase mb-1 cursor-pointer" onClick={(value) => handleClickLoaction(`${res.cityId},${res.cityName}`)}>{res.cityName}</div>
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

const mapStateToProps = (state) => ({
  LocationCity: state.Location
})

const mapDispatchToProps = {
  LocationCityAction,
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSearch)