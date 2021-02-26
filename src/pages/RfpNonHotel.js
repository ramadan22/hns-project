import { React, useEffect, useState, useHistory, DatePicker } from '../libraries'
import { connect } from 'react-redux'
import { PanelTitleStep, WarningForm } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import { FaPlus, FaChevronDown } from '../components/icons'
import { Api } from '../helpers/api'
import { LocationCityAction, LocationCountryAction, RfpFormPost } from '../modules/actions'
import { Transition } from 'react-transition-group'
import { dateNow } from '../utils/dateNow'

const RfpNonHotel = ({ LocationCityAction, LocationCity, LocationCountryAction, LocationCountry, RfpFormPost, Params }) => {
  let DateNow = dateNow()
  const history = useHistory()
  const [warningF, setWarningF] = useState(false)
  const [warningF2, setWarningF2] = useState(false)
  const [listLocation, setListLocation] = useState([])
  const [listLocationCountry, setListLocationCountry] = useState([])
  const [showDropdownLocation, setShowDropdownLocation] = useState(null)
  const [showDropdownLocationCountry, setShowDropdownLocationCountry] = useState(null)
  const [startDate, setStartDate] = useState(DateNow)
  const [companyTypeList, setCompanyTypeList] = useState([])
  const [countForm, setCountForm] = useState([
    '0'
  ])
  const [params, setParams] = useState(
    {
      contact: {
        salutation: "Mr",
        firstname: "Franck",
        lastname: "Brown",
        companyName: "PT Semua hanya titipan",
        eventName: "Company Outing",
        email: "franckbrown@semuahanyatitipan.com",
        phone: "62834723943"
      }
    }
  )

  const [paramsArray, setParamsArray] = useState([
    {
      type: "", // Transport
      itemName: "", // Bus
      pricePerItems: 0, // 1250
      description: "",
      quantity: 0, // 2
      date: "", // 2020-12-24
      countryCode: "", // SG
      countryName: "", // Singapore
      cityName: "" // Singapore
    }
  ])

  const handleLocation = (event) => {
    let newArr = [...paramsArray]
    newArr[event.target.getAttribute('data-index')].cityName = event.target.value
    setParamsArray(newArr)
    setWarningF(false)
    setShowDropdownLocation(null)
  }

  const handleInputChangeCountry = (evt) => {
    let newArr = [...paramsArray]
    newArr[evt.target.getAttribute('data-index')].countryName = evt.target.value
    setParamsArray(newArr);
    if (evt.target.value.length > 1) {
      LocationCountryAction(evt.target.value)
      setShowDropdownLocationCountry('entered')
    } else {
      setListLocationCountry([])
    }
  }

  const handleLocationCountry = (event) => {
    let newArr = [...paramsArray]
    newArr[event.target.getAttribute('data-index')].countryCode = event.target.getAttribute('data-value')
    newArr[event.target.getAttribute('data-index')].countryName = event.target.value
    setParamsArray(newArr)
    setWarningF2(false)
    setShowDropdownLocationCountry(null)
  }

  useEffect(() => {
    Api.get(`/supplier/api/v1/company/type`)
    .then(res => {
      setCompanyTypeList(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [])

  const handleInputChange = (evt) => {
    let newArr = [...paramsArray];
    newArr[evt.target.getAttribute('data-index')].cityName = evt.target.value;
    setParamsArray(newArr);
    if (evt.target.value.length > 1) {
      LocationCityAction(evt.target.value)
      setShowDropdownLocation('entered')
    } else {
      setListLocation([])
    }
  }

  const handleChangeDesc = (event) => {
    let newArr = [...paramsArray];
    newArr[event.target.getAttribute('data-index')].description = event.target.value;
    setParamsArray(newArr);
  }

  const handleChangeQuantity = (event) => {
    let newArr = [...paramsArray];
    newArr[event.target.getAttribute('data-index')].quantity = event.target.value;
    setParamsArray(newArr);
  }

  const handleChangePrice = (event) => {
    let newArr = [...paramsArray];
    newArr[event.target.getAttribute('data-index')].pricePerItems = event.target.value;
    setParamsArray(newArr);
  }

  const handleChangeItemName = (event) => {
    let newArr = [...paramsArray];
    newArr[event.target.getAttribute('data-index')].itemName = event.target.value;
    setParamsArray(newArr);
  }

  const handleChangeType = (event) => {
    let newArr = [...paramsArray];
    newArr[event.target.getAttribute('data-index')].type = event.target.value;
    setParamsArray(newArr);
  }

  const handleDate = (value, index) => {
    let dateFormatValue = new Intl.DateTimeFormat().format(new Date(value))
    dateFormatValue = dateFormatValue.split('/')
    let newArr = [...paramsArray]
    newArr[0].date = dateFormatValue[2]+"-"+dateFormatValue[0]+"-"+dateFormatValue[1]
    setParamsArray(newArr)
  }

  useEffect(() => {
    if (LocationCity.dataLocationCity !== null) {
      setListLocation(LocationCity.dataLocationCity.items)
    }
  }, [LocationCity.dataLocationCity])
  
  useEffect(() => {
    if (LocationCountry.dataLocationCountry !== null) {
      setListLocationCountry(LocationCountry.dataLocationCountry.items)
    }
  }, [LocationCountry.dataLocationCountry])

  const handleAddForm = () => {
    setCountForm(countForm => [...countForm, `${(countForm.length-1) + 1}`])
    setParamsArray([...paramsArray, {
      type: "", // Transport
      itemName: "", // Bus
      pricePerItems: 0, // 1250
      description: "",
      quantity: 0, // 2
      date: "", // 2020-12-24
      countryCode: "", // SG
      countryName: "", // Singapore
      cityName: "" // Singapore
    }])
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

  const handleSubmit = () => {
    RfpFormPost(paramsArray)
    history.push('/non-hotel-contact-information')
  }

  useEffect(() => {
    RfpFormPost(paramsArray)
  }, [])
  
  useEffect(() => {
    console.log(paramsArray)
  }, [paramsArray])

  return (
    <>
      <Navbar Type="rfp" />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <PanelTitleStep Text="1. Create RFP Non Hotel" />
        <form onSubmit={handleSubmit}>
          {countForm.map((res, indexForm) => {
            return (
              <div key={indexForm}>
                <div className="w-full flex flex-wrap text-left px-4 mt-2 mb-4">
                  <div className="w-1/3 pr-5">
                    <p className="font-bold">Country *</p>
                    <div className="relative mt-2">
                      {warningF2 ? (<WarningForm />) : ('')}
                      <input type="text" onChange={handleInputChangeCountry} required data-index={`${indexForm}`} value={`${paramsArray[indexForm].countryName}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />
                      {listLocationCountry.length > 0 ? (
                        <Transition timeout={250} in={true} appear>
                          <div className="shadow-lg w-full rounded bg-white absolute border boder-gray-400 border-solid z-10 overflow-y-auto" style={{ height: `${listLocationCountry.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocationCountry] }}>
                            {listLocationCountry.map((res, index) => {
                              return (<button type="button" data-value={`${res.countryCode}`} value={`${res.countryName}`} key={index} data-index={`${indexForm}`} onClick={handleLocationCountry} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.countryName}`}</button>)
                            })}
                          </div>
                        </Transition>
                      ) : ('')}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
                    </div>
                  </div>
                  <div className="w-1/3 pr-5">
                    <p className="font-bold">City *</p>
                    <div className="relative mt-2">
                      {warningF ? (<WarningForm />) : ('')}
                      <input type="text" onChange={handleInputChange} required data-index={`${indexForm}`} value={`${paramsArray[indexForm].cityName}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />
                      {listLocation.length > 0 ? (
                        <Transition timeout={250} in={true} appear>
                          <div className="shadow-lg w-full rounded bg-white absolute border boder-gray-400 border-solid z-10 overflow-y-auto" style={{ height: `${listLocation.length > 4 ? '160px' : 'auto'}`, ...defaultStyleDropdownLocation, ...transitionStylesDropdownLocation[showDropdownLocation] }}>
                            {listLocation.map((res, index) => {
                              return (<button type="button" data-value={`${res.cityId}`} value={`${res.cityName}`} key={index} data-index={`${indexForm}`} onClick={handleLocation} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.cityName}`}</button>)
                            })}
                          </div>
                        </Transition>
                      ) : ('')}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 mt-2 mb-4">
                  <div className="border-2 border-solid border-gray rounded shadow w-full flex flex-wrap text-left p-10 mt-2 mb-4">
                    <div className="w-1/2 pr-8 mb-4">
                      <p className="font-bold">Type RFP Non Hotel</p>
                      <select name="name" onChange={handleChangeType} required data-index={`${indexForm}`} value={`${paramsArray[indexForm].type}`} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3">
                            <option hidden></option>
                            {companyTypeList.length > 0 ? 
                              companyTypeList.map((res, index) => {
                                return <option key={index} value={`${res.type}`}>{`${res.type}`}</option>
                              })
                            : ""}
                      </select>
                    </div>
                    <div className="w-1/2 pl-8 mb-4">
                      <p className="font-bold">Date</p>
                      <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={paramsArray[indexForm].date !== "" ? Date.parse(paramsArray[indexForm].date) : Date.parse(startDate)}
                        onChange={date => handleDate(date)}
                        minDate={new Date()}
                        className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" required />
                    </div>
                    <div className="w-1/2 pr-8 mb-4">
                      <p className="font-bold">Input Item Name</p>
                      <input type="text" name="itemName" required onChange={handleChangeItemName} data-index={`${indexForm}`} value={paramsArray[indexForm].itemName} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                    </div>
                    <div className="w-1/2 pl-8 mb-4">
                      <p className="font-bold">Price</p>
                      <input type="number" name="price" required onChange={handleChangePrice} data-index={`${indexForm}`} value={paramsArray[indexForm].price} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                    </div>
                    <div className="w-1/2 pr-8 mb-4">
                      <p className="font-bold">Quantity</p>
                      <input type="number" name="quantity" required onChange={handleChangeQuantity} data-index={`${indexForm}`} value={paramsArray[indexForm].quantity} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                    </div>
                    <div className="w-1/2 pl-8 mb-4">
                      <p className="font-bold">Description</p>
                      <input type="text" name="description" required onChange={handleChangeDesc} data-index={`${indexForm}`} value={paramsArray[indexForm].description} className="border border-solid border-gray rounded w-full h-8 mt-2 py-1 px-3" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="text-left">
            <button type="button" className="focus:outline-none w-auto font-bold flex" onClick={handleAddForm}><FaPlus className="inline mr-1 my-auto text-sm" /> Add More</button>
          </div>
          <div className="w-full border-b-2 border-dotted border-teal-200 mt-5 mb-3"></div>
          <div className="w-full flex justify-end mb-10">
            <span className="my-auto mr-5">Continue to the next step</span>
            <button type="submit" className="text-center w-40 py-2 text-black uppercase text-sm ml-5 flex justify-center rounded" style={{ backgroundColor: "#fed500" }}>
              Next Step
            </button>
          </div>
        </form>
        <PanelTitleStep Text="2. Your Contact Information" />
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  LocationCity: state.Location,
  LocationCountry: state.LocationCountry,
  Params: state.Params.dataParamsRfpNonHotel
})

const mapDispatchToProps = {
  LocationCityAction,
  LocationCountryAction,
  RfpFormPost
}

export default connect(mapStateToProps, mapDispatchToProps)(RfpNonHotel)