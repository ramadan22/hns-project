import { React, Link, useEffect, useState } from '../libraries'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
import { HandleError, TitleSection } from '../components/atom'
import { 
  Navbar, 
  Footer, 
  ThumbnailHistory, 
  FooterHistoryRfp,
  NavLeftMyAccount
} from '../components/molecule'
import { 
  FaChevronDown, 
  FaChevronLeft 
} from '../components/icons'
import { 
  IconTeam, 
  IconDoor,
  IconLunchic,  
  IconTypedayic 
} from '../assets/images'
import DataStatic from '../static/Data'

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

const HistoryRfpDetail = ({ match }) => {
  const [listHistoryRfp, setListHistoryRfp] = useState({})
  const [statusContent, setStatusContent] = useState(false)

  const handleClick = (event) => {
    event.stopPropagation()
    setStatusContent(!statusContent)
  }

  useEffect(() => {
    const tokenLogin = getData("tokenLogin")
    Api.get(`/transactions/api/v2/myRfp/detail?rfpCode=${match.params.rfpCode}`, {headers: { 'User-Token': `${tokenLogin}` }})
      .then(res => {
        console.log(res)
        setListHistoryRfp(res.data.data)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    console.log(listHistoryRfp)
  }, [listHistoryRfp])

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 flex flex-wrap mb-20">
        <div className="w-1/5 text-left pr-5">
          <NavLeftMyAccount activeNav="myHistoryRfp" />
        </div>
        <div className="w-4/5">
          <div className="w-full pl-16 flex flex-wrap">
            <Link to="/my-history-rfp" className="flex flex-wrap text-teal-500 mr-auto my-auto"><FaChevronLeft className="text-xs inline my-auto mr-1" />Back to My History RFP list</Link>
          </div>
          <div className="pl-16 border-l border-gray-300 border-solid mt-12">
            <div className="w-full">
              {Object.keys(listHistoryRfp).length > 0 ? (
                // listHistoryRfp.map((res, index) => {
                  <ThumbnailHistory allData={listHistoryRfp} Type={true} />
                // })
              ) : ("")}
              <div className="w-full pt-5 pb-5 flex flex-wrap">
                <div className="w-5/6">
                  {Object.keys(listHistoryRfp).length > 0 && listHistoryRfp.place.length > 0 ? 
                    listHistoryRfp.place.map((res, index) => {
                      return (
                        <div className="flex flex-wrap mb-10" key={index}>
                          <div className="w-3/12">
                            <img src={`${res.image}`} onError={HandleError} alt="meeting room" className="object-cover w-full h-40" />
                          </div>
                          <div className="w-6/12 pl-5 flex flex-wrap">
                            <TitleSection Text={`${res.placeName}`} Type="x-large" />
                            <p className="w-full text-left mb-4 text-sm">{`${res.address}`}, {`${res.countryName}`} {`${res.phone !== "" ? "Telephone "+res.phone : ""}`}</p>
                            <div className="w-full flex flex-wrap mt-auto">
                              <div className="w-2/3 text-left">
                                <p className="text-sm">Invoice Number: </p>
                                <h3 className="font-bold text-base">{`${res.invoiceNumber}`}</h3>
                              </div>
                              <div className="w-1/3 flex justify-end">
                                <div className="text-left w-full">
                                  <p className="text-sm">Status: </p>
                                  {res.status === "Approved" ? (
                                      <span style={{  color: "#3ac52e" }}>{res.status}</span>
                                  ) : ("")}
                                  {res.status === "Waiting For Approval" ? (
                                      <span style={{  color: "#4994ce" }}>{res.status}</span>
                                  ) : ("")}
                                  {res.status === "Turned Down" ? (
                                      <span style={{  color: "#d79f9e" }}>{res.status}</span>
                                  ) : ("")}
                                  {res.status === "Under Approval" ? (
                                      <span style={{  color: "#4994ce" }}>{res.status}</span>
                                  ) : ("")}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-3/12 flex">
                            {res.invoiceNumber !== "" ? 
                              <Link to={`${res.rfpPlaceId !== "" ? "/quotation/"+res.rfpPlaceId : "/"}`} className="px-4 font-bold rounded-md text-xs text-black py-1 bg-yellow-400 uppercase ml-auto my-auto">See Quotation</Link> 
                            : ""}
                          </div>
                        </div>
                      )
                    })
                  : ""}
                </div>
              </div>
              <h5 className="font-bold mt-4 mb-4 text-left">1. Package</h5>
              <div className="w-full py-4 px-4 shadow flex flex-wrap">
                <div className="w-2/12 pr-5">
                  <div className="py-6 text-center text-black bg-yellow-400 h-auto shadow">
                  {`${Object.keys(listHistoryRfp).length > 0 ? listHistoryRfp.package.currency : ""}`} {`${Object.keys(listHistoryRfp).length > 0 ? listHistoryRfp.package.price : ""}`}<br /><span className="text-xs">{`${Object.keys(listHistoryRfp).length > 0 ? listHistoryRfp.package.chargeUnit : ""}`}</span>
                  </div>
                </div>
                <div className="w-10/12 text-left">
                  <p className="font-bold mb-2">{`${Object.keys(listHistoryRfp).length > 0 ? listHistoryRfp.package.packageName : ""}`}</p>
                  {Object.keys(listHistoryRfp).length > 0 ? 
                      <div dangerouslySetInnerHTML={{ __html:listHistoryRfp.package.summary }}></div>
                     : ""}
                  <button className="text-sm flex justify-center border-b border-solid border-black text-yellow-600 mt-2 focus:outline-none" onClick={handleClick}>
                    {statusContent ? "View less" : "View more"} <FaChevronDown className="inline text-xs ml-1 my-auto" />
                  </button>
                  <div className={`w-full mt-5 text-teal-400 ${statusContent ? "block" : "hidden"}`}>
                    {Object.keys(listHistoryRfp).length > 0 ? 
                      <div dangerouslySetInnerHTML={{ __html:listHistoryRfp.package.description }}></div>
                     : ""}
                  </div>
                </div>
              </div>
              <h5 className="font-bold mt-4 mb-4 text-left">2. Event Schedule</h5>
              {Object.keys(listHistoryRfp).length > 0 && listHistoryRfp.place[0].schedule.length > 0 ? 
                listHistoryRfp.place[0].schedule.map((res, index) => {
                  return (
                    <div className="w-full py-3 px-3 shadow rounded-sm text-left mb-5" key={index}>
                      <h3 className="border-b-2 border-dotted border-gray-300 pb-3 mb-3">DAY {index+1} - <DateFormat2 dateTime={`${res.scheduleDate}`} status={2} /></h3>
                      <div className="w-full flex flex-wrap px-16">
                        <p className="w-full text-lg font-bold text-blue-500 mb-3">Meeting Package</p>
                        <div className="w-7/12 pr-16 flex flex-wrap">
                          <div className="w-full pl-5">
                            <p className="w-full mb-2 font-bold">Price Type</p>
                            <div className="w-full flex flex-wrap">
                              <div className="w-1/12 flex h-10 pr-2 rounded-sm">
                                <img src={IconTypedayic} alt="Icon typeday" className="w-4 m-auto" />
                              </div>
                              <div className="w-10/12 h-10 rounded-sm pr-3 flex">
                                <span className="my-auto">{`${res.package.pricetypeName}`}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-5/12 flex flex-wrap">
                          <p className="w-full mb-2 font-bold">Total Attendees</p>
                          <div className="w-1/12 h-10 flex pr-2">
                            <img src={IconTeam} className="inline w-4 m-auto" alt="icon team" />
                          </div>
                          <div className="w-10/12 focus:outline-none h-10 flex">
                            <span className="my-auto">{`${res.package.totalAttendees} attendees`}</span>
                          </div>
                        </div>
                        <div className="w-full border-b-2 border-solid border-teal-200 mt-5 mb-3"></div>
                      </div>
                      <div className="w-full flex flex-wrap px-16">
                        <p className="w-full text-lg font-bold text-blue-500 mb-3">Food and Beverage</p>
                        <div className="w-full flex flex-wrap mb-5">
                          <div className="w-7/12 pr-16 flex flex-wrap pl-5">
                            <p className="w-full mb-2 font-bold">Menus</p>
                          </div>
                          <div className="w-5/12 flex flex-wrap">
                            <p className="w-full mb-2 font-bold">Quantity</p>
                          </div>
                          {res.food.length > 0 ? 
                            res.food.map((res2, index2) => {
                              return (<div className="w-full flex flex-wrap" key={index2}>
                                <div className="w-7/12 flex flex-wrap pl-5">
                                  <div className="w-full flex">
                                    <p className="w-full pt-1 my-auto"><img src={IconLunchic} alt="Icon Lunch" className="inline mr-3 w-5" />{`${res2.foodName}`}</p>
                                  </div>
                                </div>
                                <div className="w-5/12 flex flex-wrap">
                                  <div className="w-1/12 h-10 flex pr-2">
                                    <img src={IconTeam} className="inline w-4 m-auto" alt="icon team" />
                                  </div>
                                  <div className="w-10/12 focus:outline-none h-10 flex">
                                    <span className="my-auto">{`${res2.quantity}`} Attendees</span>
                                  </div>
                                </div>
                                {index2 > 0 ? 
                                  <div className="w-full border-b-2 border-dotted border-teal-200 mt-5 mb-5"></div>
                                : ("")}
                              </div>)
                            })
                          : ("")}
                        </div>
                        <div className="w-full border-b-2 border-solid border-teal-200 mt-5 mb-3"></div>
                      </div>
                      <div className="w-full flex flex-wrap px-16">
                      <p className="w-full text-lg font-bold text-blue-500 mb-3">Accommodation</p>
                        <div className="w-full flex flex-wrap mb-5">
                          <div className="w-full flex flex-wrap">
                            <div className="w-7/12 flex flex-wrap pl-5">
                              <p className="w-full mb-2 font-bold">Rooms</p>
                            </div>
                            <div className="w-5/12 flex flex-wrap">
                              <p className="w-full mb-2 font-bold">Quantity</p>
                            </div>
                            {res.accomodation.length > 0 ? 
                              res.accomodation.map((res2, index2) => {
                                return (<div className="w-full flex flex-wrap" key={index2}>
                                  <div className="w-7/12 flex flex-wrap pl-5">
                                    <div className="w-full flex">
                                      <p className="w-full pt-1 my-auto">{`${res2.accomodationTypeName}`}</p>
                                    </div>
                                  </div>
                                  <div className="w-5/12 flex flex-wrap">
                                    <div className="w-1/12 h-10 flex pr-2">
                                      <img src={IconDoor} className="inline w-3 m-auto" alt="icon team" />
                                    </div>
                                    <div className="w-10/12 focus:outline-none h-10 flex">
                                      <span className="my-auto">{`${res2.quantity}`}</span>
                                    </div>
                                  </div>
                                  {index2 > 0 ? 
                                    <div className="w-full border-b-2 border-dotted border-teal-200 mt-5 mb-5"></div>
                                  : ("")}
                                </div>)
                              })
                            : ("")}
                          </div>
                        </div>
                        <div className="w-full border-b-2 border-solid border-teal-200 mt-5 mb-3"></div>
                      </div>
                    </div>
                 )
                })
               : ""}
               {listHistoryRfp.length > 0 ? 
                <div className="mt-10">
                  <p className="text-lg font-bold text-left mb-3">{`${listHistoryRfp[0].meta.wording.footer.title}`}</p>
                  <div className="w-full text-left" dangerouslySetInnerHTML={{ __html:listHistoryRfp[0].meta.wording.footer.description }}></div>
                </div>
               : ('')}
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

export default HistoryRfpDetail