import { React, useEffect, useState, useHistory, DatePicker, Link, useLocation } from '../libraries'
import { connect } from 'react-redux'
import { PanelTitleStep, WarningForm } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import { FaPlus, FaMinus, FaChevronLeft, FaSpinner } from '../components/icons'
import { Api } from '../helpers/api'
import { LocationCityAction, LocationCountryAction, GtsDataGet, ModalAction } from '../modules/actions'
import { Transition } from 'react-transition-group'
import { dateNow } from '../utils/dateNow'
import { getData } from '../utils/localStorage'
// import 'rc-time-picker/assets/index.css';
// import moment from 'moment';
// import TimePicker from 'rc-time-picker';
// const format = 'h:mm a';
// const now = moment().hour(0).minute(0);


const DateFormat2 = ({dateTime, status}) => {
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      year: "numeric",
      day: "2-digit",
      month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  return dateFormatValue[0] + " " + dateFormatValue[2] + " " + dateFormatValue[1] + " " + dateFormatValue[3] 
}

const EventSchedulingGts = ({ LoginData, LocationCityAction, LocationCity, LocationCountryAction, LocationCountry, GtsDataGet, gtsData, ModalAction }) => {
  let DateNow = dateNow()
  const history = useHistory()
  const location = useLocation()
  const [spiner, setSpiner] = useState(false)

  const [companyType, setCompanyType] = useState([])
  const [defaultCompanyType, setDefaultCompanyType] = useState('')
  const [defaultCompanyTypeName, setDefaultCompanyTypeName] = useState('')
  const [serviceType, setServiceType] = useState([])
  const [selectServiceType, setSelectServiceType] = useState([])
  const [typeVehicle, setTypeVehicle] = useState([])
  const [schedule, setSchedule] = useState([])

  const [params, setParams] = useState([])

  // useEffect(() => {
  //   console.log(location)
  // }, [location])

  // useEffect(() => {
  //   if(Object.keys(LoginData).length < 1 && location.state)
  //     history.push(`/`);
  // }, [LoginData, history])

  useEffect(() => {
    if(gtsData !== null){
      console.log("gtsData", gtsData)
      setSchedule(gtsData.schedule)
    }
  }, [gtsData])

  useEffect(() => {
    if(gtsData === null)
      GtsDataGet(getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : "")
  }, [])

  useEffect(() => {
    if(schedule.length > 0){
      console.log("schedule", schedule)

      let arraySelectType = []
      setParams([])
      schedule.map((res, index) => {
        arraySelectType.push(1)
        setSelectServiceType(arraySelectType)
      })

      setParams(schedule.map((obj, data) => (
        { ...obj, ['detail']: [{
          companyTypeId: defaultCompanyType,
          isTransport: defaultCompanyTypeName == "Transport" ? "1" : "0",
          pickupTime: "",
          serviceType: defaultCompanyTypeName == "Transport" ? "Point to Point" : "",
          from: "",
          to: "",
          duration: "",
          itemName: "",
          quantity: "",
          remark: ""
        }]}), {}))
    }
  }, [schedule, defaultCompanyType])

  const handleOnchange = (event) => {
    if((event.target.getAttribute("type") === 'type' && event.keyCode === 69 || event.target.getAttribute("type") === 'type' && event.keyCode === 190)){
      event.preventDefault()
      return false
    }
    let dataParams = [...params]

    if(event.target.getAttribute('name') === "serviceType"){
      dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')]["to"] = ""
      dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')]["duration"] = ""
    }

    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')][event.target.getAttribute('name')] = event.target.value
    setParams(dataParams)
  }

  useEffect(() => {
    console.log("default company type name", defaultCompanyTypeName)
  }, [defaultCompanyTypeName])

  useEffect(() => {
    console.log("params", params)
  }, [params])

  useEffect(() => {
    Api.get(`/supplier/api/v1/company/type?notIn[]=Hotel&orderBy=sequence&sort=asc`)
    .then(res => {
      if(res.data.data.items.length > 0){
        if(location.state.companyTypeId !== ""){
          let companyTypeListFilter = res.data.data.items.filter(res2 => res2.companyTypeId === location.state.companyTypeId)
          setDefaultCompanyTypeName(companyTypeListFilter[0].type)
          setDefaultCompanyType(companyTypeListFilter[0].companyTypeId)
        } else {
          let companyTypeListFilter = res.data.data.items.filter(res2 => res2.type === "Transport")
          setDefaultCompanyTypeName(companyTypeListFilter[0].type)
          setDefaultCompanyType(companyTypeListFilter[0].companyTypeId)
        }
        setCompanyType(res.data.data.items)
      }
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [location])

  useEffect(() => {
    Api.get(`/master/api/v1/serviceType/fetch`)
    .then(res => {
      setServiceType(res.data.data)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [])

  useEffect(() => {
    Api.get(`/supplier/api/v1/vehicle/fetch`)
    .then(res => {
      setTypeVehicle(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [])

  const handleChangeServiceType = (event) => {
    let valueSplit = event.target.value.split("~")
    let conValue = valueSplit[0] === "Transport" ? "1" : "0"
    let dataParams = [...params]
    
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].companyTypeId = valueSplit[1]
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].isTransport = conValue

    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].pickupTime = ""
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].serviceType = (conValue == "1" ? "Point to Point" : "")
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].from = ""
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].to = ""
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].duration = ""
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].itemName = ""
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].quantity = ""
    dataParams[event.target.getAttribute('data-index')].detail[event.target.getAttribute('detail-index')].remark = ""
    

    setParams(dataParams)
  }

  const handleAddForm = (event) => {
    let dataParams = [...params]
    dataParams[event.target.getAttribute('data-index')].detail = [...dataParams[event.target.getAttribute('data-index')].detail, {
      companyTypeId: "",
      isTransport: "1",
      pickupTime: "",
      serviceType: "Point to Point",
      from: "",
      to: "",
      duration: "",
      itemName: "",
      quantity: "",
      remark: ""
    }]
    setParams(dataParams)
  }

  const handleRemoveForm = (event) => {
    let dataParams = [...params]
    dataParams[event.target.getAttribute('data-index')].detail = dataParams[event.target.getAttribute('data-index')].detail.reverse().slice(1).reverse()
    setParams(dataParams)
  }

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

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    const UserToken = getData('tokenLogin') ? getData('tokenLogin') : ""
    Api.post(`/supplier/api/v2/gts/schedule`, {guestId: getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : "", schedule : params}, {headers: { 'User-Token': UserToken }})
    .then(res => {
      setSpiner(false)
      GtsDataGet(getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : "")
      history.push(`/contact-information-gts`)
    })
    .catch(function (error) {
      setSpiner(false)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
      console.log(error.response)
    })
  }
  
  return (
    <>
      <Navbar Type="rfp" />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <PanelTitleStep Text="1. EVENT REQUIREMENTS" />
        <PanelTitleStep Text="2. EVENT SCHEDULE" />
        <form onSubmit={handleSubmit}>
          <div className="w-full px-4 mt-2 mb-4">
            {schedule.length > 0 ? 
              schedule.map((res, index) => {
                return (
                  <div key={index} className="border-2 border-solid border-gray rounded shadow w-full flex flex-wrap text-left px-10 py-5 mt-2 mb-10">
                    <p className="w-full text-lg font-bold">DAY {index+1} - <DateFormat2 dateTime={`${res.scheduleDate}`} status={2} /></p>
                    <div className="w-full border-b-2 border-dotted border-teal-200 mt-3 mb-4"></div>
                    {params[index] && params[index].detail.length > 0 ? 
                      Array.from(Array(params[index].detail.length), (e, i) => {
                      return (
                        <>
                          <div className="w-1/2 pr-8 mb-4 relative">
                            <p className="font-bold">Service</p>
                            <select name="isTransport" onChange={handleChangeServiceType} data-index={index} detail-index={i} className="block appearance-none w-full bg-white border border-solid border-gray mt-2 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                              {res.detail[i] ? 
                                <option hidden selected value={`${res.detail[i].typeCompany.type}~${res.detail[i].typeCompany.companyTypeId}`}>{`${res.detail[i].typeCompany.type}`}</option>
                                : 
                                <option hidden selected value={`${defaultCompanyTypeName}~${params[index].detail[i].companyTypeId}`}>{`${defaultCompanyTypeName}`}</option>
                              }
                              {companyType.length > 0 ?
                                (companyType.map((res2) => {
                                  return <option key={res2.companyTypeId} value={`${res2.type}~${res2.companyTypeId}`} key={res2.companyTypeId}>{res2.type}</option>
                                })) : ('')}
                            </select>
                          </div>
                          {params[index].detail[i] && params[index].detail[i].isTransport == "1" ?
                            <>
                              <div className="w-1/2 pl-8 mb-4">
                                <p className="font-bold">Service Type *</p>
                                <select name="serviceType" onChange={handleOnchange} required data-index={index} detail-index={i} defaultValue={`${params[index].detail[i].serviceType}`} className="block appearance-none w-full bg-white border border-solid border-gray mt-2 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                  {res.detail[i] && res.detail[i].length > 0 ? 
                                    <option hidden selected value={`${res.detail[i].serviceType}`}>{`${res.detail[i].serviceType}`}</option>
                                    : 
                                    <option hidden selected value={`Point to Point`}>Point to Point</option>
                                  }
                                  {serviceType.length > 0 ?
                                    (serviceType.map((res2, index) => {
                                      return <option value={res2.name} key={index}>{res2.name}</option>
                                    })) : ('')}
                                </select>
                              </div>
                              <div className="w-1/2 pr-8 mb-4">
                                <p className="font-bold">From *</p>
                                <input type="text" name="from" onChange={handleOnchange} required data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].from : ""} placeholder="Address, Airport, Hotel" className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                              </div>
                              {params[index].detail[i].serviceType == "Point to Point" ? 
                                <div className="w-1/2 pl-8 mb-4">
                                  <p className="font-bold">To *</p>
                                  <input type="text" name="to" onChange={handleOnchange} required data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].to : ""} placeholder="Address, Airport, Hotel" className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                                </div>
                              : ""}
                              {params[index].detail[i].serviceType == "Hourly" ?
                                <div className="w-1/2 pl-8 mb-4">
                                  <p className="font-bold">Duration *</p>
                                  <input type="time" name="duration" onChange={handleOnchange} required data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].duration : ""} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                                </div>
                              : ""}
                              <div className="w-1/2 pr-8 mb-4">
                                <p className="font-bold">Number of Vehicle *</p>
                                <input type="number" name="quantity" onChange={handleOnchange} required data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].quantity : ""} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                              </div> 
                              <div className="w-1/2 pl-8 mb-4">
                                <p className="font-bold">Pickup Time *</p>
                                <input type="time" name="pickupTime" required onChange={handleOnchange} data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].pickupTime : ""} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                              </div>
                            </>
                          : ""}
                          <div className={`w-1/2 mb-4 ${params[index].detail[i] && params[index].detail[i].isTransport == "1" ? "pr-8" : "pl-8"}`}>
                            <p className="font-bold">{params[index].detail[i] && params[index].detail[i].isTransport == "1" ? "Type of Vehicle *" : "Item Name *"}</p>
                            {params[index].detail[i] && params[index].detail[i].isTransport == "1" ?
                            <select name="itemName" onChange={handleOnchange} required data-index={index} detail-index={i} className="block appearance-none w-full bg-white border border-solid border-gray mt-2 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                              {params[index] && params[index].detail.length > 0 ? 
                                <option hidden value={`${params[index].detail[i].itemName}`}>{`${params[index].detail[i].itemName}`}</option> 
                              : <option hidden value="" hidden></option>}
                              {typeVehicle.length > 0 ?
                                (typeVehicle.map((res2, index) => {
                                return <option value={res2.vehicleName} key={index}>{res2.vehicleName}</option>
                                })) : ('')}
                            </select>
                            : <input type="text" name="itemName" onChange={handleOnchange} required data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].itemName : ""} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" /> }
                          </div>

                          {/* if not attraction */}
                          {params[index].detail[i].isTransport != "1" ? 
                              <div className="w-1/2 pr-8 mb-4">
                                <p className="font-bold">Number of Guest *</p>
                                <input type="number" name="quantity" onChange={handleOnchange} required data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].quantity : ""} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                              </div>
                          : ""}

                          <div className="w-1/2 pl-8 mb-4">
                            <p className="font-bold">Additional Comment</p>
                            <input type="text" name="remark" onChange={handleOnchange} data-index={index} detail-index={i} value={params[index] && params[index].detail.length > 0 ? params[index].detail[i].remark : ""} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                          </div>
                          <div className="w-full border-b-2 border-dotted border-teal-200 mt-3 mb-4"></div>
                        </>
                      )})
                    : ""}
                    <div className="text-left flex">
                      <button type="button" className="focus:outline-none w-auto font-bold flex mr-5" onClick={handleAddForm} data-index={index}><FaPlus className="inline mr-1 my-auto" style={{ fontSize: "0.5rem" }} /> Add another Service</button>
                      {params[index] && params[index].detail.length > 1 ? 
                        <button type="button" className="focus:outline-none w-auto font-bold flex mr-5" onClick={handleRemoveForm} data-index={index}><FaMinus className="inline mr-1 my-auto" style={{ fontSize: "0.5rem" }} /> Remove another Service</button>
                      : ""}
                      </div>
                  </div> 
                )
              })
            : ""}
          </div>
          <div className="w-full border-b-2 border-dotted border-teal-200 mt-5 mb-3"></div>
          <div className="w-full flex justify-end mb-10">
            <span className="my-auto mr-5">Continue to the next step</span>
            <Link to="/event-requirements" className="justify-center w-40 py-2 border border-solid border-yellow-500 rounded uppercase text-sm flex"><FaChevronLeft className="inline my-auto mr-1 text-xs" /> Previous Step</Link>
            <button type="submit" className="text-center w-40 py-2 text-black uppercase text-sm ml-5 flex justify-center rounded" style={{ backgroundColor: "#fed500" }}>
              <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Next Step
            </button>
          </div>
        </form>
        <PanelTitleStep Text="3. YOUR CONTACT INFORMATION" />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventSchedulingGts)