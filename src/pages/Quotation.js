import { React, Link, useEffect, useState, useHistory, useRef } from '../libraries'

import { Navbar, Footer, FooterHistoryRfp } from '../components/molecule'
import { FaChevronLeft } from '../components/icons'
import { IconTeam, IconDoor } from '../assets/images'
import { getData } from '../utils/localStorage'
import { Api } from '../helpers/api'
import ReactToPrint from 'react-to-print'

const DateFormat = ({dateTime, status}) => {
  let splitFormatValue = dateTime.split("-")
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      day: "2-digit",
      month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  if(status === 1)
      return dateFormatValue[0] + " " + dateFormatValue[1]
  else
      return dateFormatValue[2] + ", " + dateFormatValue[0]
}

const DateFormat2 = ({dateTime, status}) => {
  let splitFormatValue = dateTime.split("-")
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      year: "numeric",
      day: "2-digit",
      month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  return dateFormatValue[0] + " " + dateFormatValue[2] + " " + dateFormatValue[1] + " " + dateFormatValue[3] 
}

class ComponentToPrint extends React.PureComponent {
  render() {
    var RfpData = this.props.RfpData;
    return (
      <div className="container mx-auto px-10 pt-2 mb-32">
        <div className="flex flex-wrap mb-6 pb-4">
          <div className="w-1/2 text-left">
            <p className="text-lg font-bold">{`${Object.keys(RfpData).length > 0 ? RfpData.contact.eventName : ""}`}</p>
            {/* <p className="text-sm">{`${Object.keys(RfpData).length > 0 ? RfpData.contact.firstname+" "+RfpData.contact.lastname : ""}`}</p>
            <p className="text-sm">{`${Object.keys(RfpData).length > 0 ? RfpData.contact.email : ""}`}</p>
            <p className="text-sm">{`${Object.keys(RfpData).length > 0 ? "+"+RfpData.contact.phone : ""}`}</p> */}
          </div>
          <div className="w-1/2 text-right">
            <p className="text-sm">{Object.keys(RfpData).length > 0 ? <><DateFormat dateTime={`${RfpData.events.startDate}`} /> - <DateFormat status={1} dateTime={`${RfpData.events.endDate}`} /></> : ""}</p>
            {/* <p className="text-sm">Event type : {`${Object.keys(RfpData).length > 0 ? RfpData.events.eventTypeName : ""}`}</p> */}
          </div>
          <div className="w-full mb-2 mt-4 border-b-2 border-dotted border-gray-300"></div>
          <div className="w-full text-left mt-2 mb-2">
            <button className="w-full text-center py-2 font-bold bg-yellow-400 text-black">Billing</button>
          </div>
          <div className="w-full mt-5 flex flex-wrap">
            <div className="w-2/3 text-left">
              <p className="font-bold text-xl">{`${Object.keys(RfpData).length > 0 ? RfpData.placeName : ""}`}</p>
              <p className="text-sm">Address: {`${Object.keys(RfpData).length > 0 ? RfpData.address : ""}`}, {`${Object.keys(RfpData).length > 0 ? RfpData.countryName : ""}`} {`${Object.keys(RfpData).length > 0 && RfpData.phone !== "" ? "Telephone "+RfpData.phone : ""}`}</p>
            </div>
            <div className="w-1/3 text-right">
              <p className="font-bold text-xl">Quotations</p>
            </div>
          </div>
          <div className="w-full px-16 py-5 bg-gray-200 mt-5 mb-4 flex flex-wrap">
            <div className="w-3/5 text-left flex flex-wrap">
              <div className="w-3/6 my-auto">
                <p className="font-bold text-xl">{`${Object.keys(RfpData).length > 0 ? RfpData.contact.firstname+" "+RfpData.contact.lastname : ""}`}</p>
                <p className="text-sm">{`${Object.keys(RfpData).length > 0 ? RfpData.contact.email : ""}`}</p>
                <p className="text-sm">{`${Object.keys(RfpData).length > 0 ? "+"+RfpData.contact.phone : ""}`}</p>
              </div>
              <div className="w-3/6 my-auto">
                <p className="text-sm mb-2 flex">
                  <img src={IconDoor} alt="icon door open" className="inline w-3 mr-4 my-auto" /> Event type : <span className="ml-1 font-bold">{`${Object.keys(RfpData).length > 0 ? RfpData.events.eventTypeName : ""}`}</span>
                </p>
                <p className="text-sm">
                  <img src={IconTeam} alt="icon user" className="inline w-4 mr-2 my-auto" /> Attendees : <span className="font-bold">{`${Object.keys(RfpData).length > 0 ? RfpData.events.totalAttendees : ""}`}</span>
                </p>
              </div>
            </div>
            <div className="w-2/5 text-right">
              <p className="text-sm">Invoice Number : </p>
              <p className="font-bold text-xl mb-3">{`${Object.keys(RfpData).length > 0 ? RfpData.invoiceNumber : ""}`}</p>
              <p className="text-xs">Date : <spam className="font-bold">{Object.keys(RfpData).length > 0 ? <DateFormat2 dateTime={`${RfpData.createdAt}`} /> : ""}</spam></p>
            </div>
          </div>
          <div className="w-full text-left">
            {Object.keys(RfpData).length > 0 ? 
              RfpData.schedule.length > 0 ? 
                RfpData.schedule.map((res, index) => {
                  return (
                    <div key={index}>
                      <div className="flex flex-wrap text-sm pb-1 mb-2 border-b-2 border-dotted border-gray-300">
                        <p className="w-full font-bold">Day {index+1} - <DateFormat2 dateTime={`${res.scheduleDate}`} /></p>
                        <div className="w-6/12">
                          <p className="text-xl text-yellow-500 font-bold mt-2">Function Space</p>
                          <p>
                            {`${res.package.pricetypeName}`} : &nbsp;
                            {`${RfpData.package.description.replace(/(<([^>]+)>)/ig, "").replace("&nbsp;", " ").length > 90 ? 
                              RfpData.package.description.replace(/(<([^>]+)>)/ig, "").replace("&nbsp;", " ").substring(0, 90)+"..."
                            : RfpData.package.description.replace(/(<([^>]+)>)/ig, "").replace("&nbsp;", " ")}`}</p>
                        </div>
                        <div className="w-2/12 text-center flex flex-wrap justify-center">
                          <p className="w-full my-auto">Quantity</p>
                          <p className="w-full my-auto">{`${res.package.totalAttendees}`}</p>
                        </div>
                        <div className="w-2/12 text-center flex flex-wrap justify-center">
                          <p className="w-full my-auto">Estimate Cost</p>
                          <p className="w-full my-auto">{`${res.package.currency}`} {`${res.package.salesPrice}`}</p>
                        </div>
                        <div className="w-2/12 text-center flex flex-wrap justify-center">
                          <p className="w-full my-auto">TOTAL (INC. TAX)</p>
                          <p className="w-full my-auto">{`${res.package.currency}`} {`${res.package.salesSubtotalPrice}`}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap text-sm pb-1 mb-2 border-b-2 border-dotted border-gray-300">
                        <div className="w-full">
                          <p className="text-xl text-yellow-500 font-bold mt-2">Food and Beferage</p>
                        </div>
                        {res.food.length > 0 ? 
                          res.food.map((res2, index2) => {
                            return (<div className="w-full flex flex-wrap mb-6" key={index2}>
                              <div className="w-6/12 flex">
                                <p className="my-auto">{`${res2.foodName}`}</p>
                              </div>
                              <div className="w-2/12 text-center flex flex-wrap justify-center">
                                <p className="w-full my-auto">Quantity</p>
                                <p className="w-full my-auto">{`${res2.quantity}`}</p>
                              </div>
                              <div className="w-2/12 text-center flex flex-wrap justify-center">
                                <p className="w-full my-auto">Estimate Cost</p>
                                <p className="w-full my-auto">{`${res2.currency}`} {`${res2.salesPrice}`}</p>
                              </div>
                              <div className="w-2/12 text-center flex flex-wrap justify-center">
                                <p className="w-full my-auto">TOTAL (INC. TAX)</p>
                                <p className="w-full my-auto">{`${res2.currency}`} {`${res2.salesSubtotalPrice}`}</p>
                              </div>
                            </div>)
                          })
                        : ""}
                      </div>
                      <div className="flex flex-wrap text-sm pb-1 mb-2 border-b-2 border-dotted border-gray-300">
                        <div className="w-full">
                          <p className="text-xl text-yellow-500 font-bold mt-2">Accommodation</p>
                        </div>
                        {res.accomodation.length > 0 ? 
                          res.accomodation.map((res2, index2) => {
                            return (<div className="w-full flex flex-wrap mb-6" key={index2}>
                              <div className="w-6/12 flex">
                                <p className="my-auto">{`${res2.accomodationTypeName}`}</p>
                              </div>
                              <div className="w-2/12 text-center flex flex-wrap justify-center">
                                <p className="w-full my-auto">Quantity</p>
                                <p className="w-full my-auto">{`${res2.quantity !== undefined ? res2.quantity : "-"}`}</p>
                              </div>
                              <div className="w-2/12 text-center flex flex-wrap justify-center">
                                <p className="w-full my-auto">Estimate Cost</p>
                                <p className="w-full my-auto">{`${res2.salesPrice !== undefined ? res2.currency+" "+res2.salesPrice : "-"}`}</p>
                              </div>
                              <div className="w-2/12 text-center flex flex-wrap justify-center">
                                <p className="w-full my-auto">TOTAL (INC. TAX)</p>
                                <p className="w-full my-auto">{`${res2.salesSubtotalPrice !== undefined ? res2.currency+" "+res2.salesSubtotalPrice : "-"}`}</p>
                              </div>
                            </div>)
                          })
                        : ""}
                      </div>
                      <div className="w-full flex flex-wrap justify-end">
                        <div className="py-2 px-8 text-center">
                          <p className="font-bold uppercase">Total Price</p>
                        </div>
                        <div className="py-2 px-20 text-center">
                          <p className="font-bold uppercase">{`${res.package.currency}`} {`${res.subtotalSales}`}</p>
                        </div>
                      </div>
                      <div className="mt-5 mb-5 border-b-2 border-solid border-black w-full"></div>
                    </div>
                  )
                })
              : ""
            : ""}
          </div>
          <div className="w-full flex flex-wrap justify-end mb-6 hidden">
            <div className="py-2 px-8 text-center">
              <p className="font-bold uppercase">Sub Total</p>
            </div>
            <div className="py-2 px-20 text-center">
              <p className="font-bold uppercase">$8.197</p>
            </div>
          </div>
          {Object.keys(RfpData).length > 0 ? 
            <div className="w-full flex flex-wrap justify-end">
              <div className="py-2 px-3 flex border border-solid border-black bg-gray-200">
                <p className="mr-auto pr-2">Total Estimation</p>
                <p className="ml-auto font-bold uppercase">{`${RfpData.schedule[0].package.currency}`} {`${RfpData.pricing.salesTotalCost}`}</p>
              </div>
            </div>
          : ""}
          <div className="mt-6 w-full text-left">
            {Object.keys(RfpData).length > 0 ? 
              <>
                <p className="text-lg font-bold text-left mb-3">{`${RfpData.meta.wording.footer.title}`}</p>
                <div className="w-full text-left" dangerouslySetInnerHTML={{ __html:RfpData.meta.wording.footer.description }}></div>
              </>
            : ""}
          </div>
          <div className="w-full h-3 bg-yellow-500 mt-2"></div>
        </div>
      </div>
    );
  }
}
 
const Quotation = ({ match }) => {
  const history = useHistory()
  const regex = /(<([^>]+)>)/ig
  const [RfpData, setRfpData] = useState({})

  const componentRef = useRef();

  useEffect(() => {
    const tokenLogin = getData("tokenLogin")
    Api.get(`/transactions/api/v1/myRfp/detail?rfpPlaceId=${match.params.rfpId}`, {headers: { 'User-Token': `${tokenLogin}` }})
      .then(res => {
        setRfpData(res.data.data)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    console.log(RfpData)
  }, [RfpData])

  useEffect(() => {
    if(RfpData.invoiceNumber === "")
      history.push('/my-history-rfp')
  }, [RfpData])

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 flex mb-10">
        <Link to="/my-history-rfp" className="flex mb-3 mr-auto">
          <FaChevronLeft className="inline mr-2 my-auto text-xs" />
          <span className="my-auto">Back to My History RFP List</span>
        </Link>
        <ReactToPrint
          trigger={() => 
            <button className="shadow ml-auto text-sm py-1 px-8">Print</button>
          }
          content={() => componentRef.current}
        />
      </div>
      <ComponentToPrint RfpData={RfpData} ref={componentRef} />
      <div className="container mx-auto px-10">
        <FooterHistoryRfp />
      </div>
      
      <Footer />
    </>
  )
}

export default Quotation