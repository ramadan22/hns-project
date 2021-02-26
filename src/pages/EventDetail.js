import { React, Link, DatePicker, useState, useEffect, FormatDate, useHistory } from '../libraries'
import { connect } from 'react-redux'
import { PanelTitleStep } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import { FaChevronLeft, FaChevronDown, FaSpinner } from 'react-icons/fa'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
import { RfpDataGet, ModalAction } from '../modules/actions'

const EventDetail = ({ RfpDataGet, RfpData, ModalAction }) => {
  const history = useHistory()
  const [spiner, setSpiner] = useState(false)
  // const [dateFlex, setDateFlex] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [eventList, setEventList] = useState([])
  const [params, setParams] = useState({
    startDate: "",
    endDate: "",
    eventId: "",
    totalAttendees: 0,
    isFlexibleDate: true,
    flexibleDate: ""
  })

  useEffect(() => {
    RfpDataGet()
    Api.get('/supplier/api/v1/events/fetch')
      .then(response => {
        setParams({...params, ["eventId"]:response.data.data.items[0].eventsId})
        setEventList(response.data.data.items)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    Api.get(`/supplier/api/v2/rfp/fetch${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, { headers: { 'User-Token': getData('tokenLogin') } })
    .then(res => {
      if(Object.keys(res.data.data.events).length > 0){
        let startDate = (new Date(res.data.data.events.startDate) > new Date() ? new Date(res.data.data.events.startDate) : "")
        let endDate = (new Date(res.data.data.events.endDate) > new Date() ? new Date(res.data.data.events.endDate) : "")
        setStartDate(startDate)
        setEndDate(endDate)
        setParams({
          ...params,  
          startDate: FormatDate(res.data.data.events.startDate),
          endDate: FormatDate(res.data.data.events.endDate),
          eventId: res.data.data.events.eventTypeId,
          totalAttendees: res.data.data.events.totalAttendees,
          isFlexibleDate: res.data.data.events.isFlexibleDate,
          flexibleDate: res.data.data.events.isFlexibleDate ? res.data.data.events.flexibleDate : ""
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [])

  const HandleChange = (event) => {
    if(event.target.name !== "isFlexibleDate"){
      setParams({...params, [event.target.name]:event.target.value})
    } else {
      setParams({
        ...params,  
        isFlexibleDate: event.target.value == "true" ? true : false,
        flexibleDate: event.target.value == "true" ? RfpData.events.flexibleDate : ""
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    const UserToken = getData('tokenLogin')
    Api.post(`/supplier/api/v2/rfp/event`, {...params, guestId: getData("guestIdRfp") ? getData("guestIdRfp") : ""}, {headers: { 'User-Token': UserToken }})
    .then(res => {
      RfpDataGet()
      setSpiner(false)
      history.push(`/select-package`)
    })
    .catch(function (error) {
      setSpiner(false)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
    })
  }

  useEffect(() => {
    if(startDate !== ""){
      let changeDate = FormatDate(startDate)
      if(new Date(changeDate) > new Date(endDate)){
        setEndDate(new Date(changeDate))
        setParams({
          ...params, 
          startDate: changeDate,
          endDate: changeDate
        })
      } else {
        setParams({...params, startDate: changeDate})
      }
    } 
  }, [startDate])

  useEffect(() => {
    if(endDate !== "") {
      let changeDate = FormatDate(endDate)
      setParams({...params, endDate: changeDate})
    }
  }, [endDate])

  return (
    <>
      <Navbar Type="rfp" />
        <div className="container mx-auto px-10 flex flex-wrap pb-20">
          <PanelTitleStep Text="1. Select Venue/Hotel" />
          <PanelTitleStep Text="2. Event Details" />
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full pt-5 pb-10 border-b-2 border-dotted border-gray-300 px-4 flex flex-wrap mb-10">
              <div className="w-1/2 pr-16">
                  <p className="font-bold text-left mb-3">Event Dates</p>
                  <div className="flex flex-wrap mb-6">
                    <div className="w-2/5 pr-3">
                      <DatePicker 
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        onChange={date => setStartDate(date)} 
                        minDate={new Date()}
                        // maxDate={endDate !== "" && endDate}
                        className="w-full text-sm text-center border border-solid border-gray-200 py-2 focus:outline-none" 
                        placeholderText="Start date" />
                    </div>
                    <div className="w-2/5 pl-3">
                      <DatePicker 
                        dateFormat="yyyy/MM/dd"
                        selected={endDate}
                        onChange={date => setEndDate(date)} 
                        minDate={startDate !== "" && startDate}
                        className="w-full text-sm text-center border border-solid border-gray-200 py-2 focus:outline-none" 
                        placeholderText="End date" />
                    </div>
                  </div>
                  <p className="font-bold text-left mb-3">Event Type</p>
                  <div className='inline-block relative w-full'>
                    <select name="eventId" onChange={HandleChange} value={params.eventId} defaultValue={params.eventId} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                      {eventList.length > 0 ?
                        (eventList.map((res) => {
                          return <option value={res.eventsId} selected={res.eventsId === params.eventId && true} key={res.eventsId}>{res.eventsName}</option>
                      })) : ('')}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="text-sm" />
                    </div>
                  </div>
              </div>
              <div className="w-1/2 pl-6">
                  <p className="font-bold text-left mb-3">Total Attendees</p>
                  <input type="number" name="totalAttendees" onChange={HandleChange} value={params.totalAttendees} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 mb-6 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />
                  <p className="font-bold text-left mb-3 mt-2">Dates Flexible?</p>
                  <div className="flex flex-wrap">
                      <div className="w-3/12 pr-4 relative">
                          <select onChange={HandleChange} name="isFlexibleDate" defaultValue={params.isFlexibleDate} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value={true} selected={params.isFlexibleDate === true ? true : false }>Yes</option>
                            <option value={false} selected={params.isFlexibleDate === false ? true : false }>No</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 mr-4 flex items-center px-2 text-gray-700">
                            <FaChevronDown className="text-sm" />
                          </div>
                      </div>
                      <input type="text" name="flexibleDate" value={params.flexibleDate} placeholder={params.isFlexibleDate ? "Please specific alternate dates." : ""} onChange={HandleChange} className={`w-9/12 block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${params.isFlexibleDate ? '' : 'bg-gray-300'}`} disabled={params.isFlexibleDate ? false : true} />
                  </div>
              </div>
            </div>
            <div className="w-full flex justify-end mb-10">
              {/* <span className="my-auto mr-5">Continue to the next step</span> */}
              <Link to="/select-venue-hotel" className="justify-center w-40 py-2 border border-solid border-yellow-500 rounded uppercase text-sm flex"><FaChevronLeft className="inline my-auto mr-1 text-xs" /> Previous Step</Link>
              <button type="submit" className="text-center w-40 py-2 text-black uppercase text-sm ml-5 flex justify-center rounded" style={{ backgroundColor: "#fed500" }}>
                <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Next Step
              </button>
            </div>
            <PanelTitleStep Text="3. Select a Package" />
            <PanelTitleStep Text="4. Event Schedule" />
          </form>
        </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  RfpData: state.RfpDataGetReducer.data
})

const mapDispatchToProps = {
  RfpDataGet,
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)