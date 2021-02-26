import { React, Link, useEffect, useState, useHistory, useLocation, useRef } from '../libraries'

import { Navbar, Footer, FooterHistoryRfp, NavLeftMyAccount } from '../components/molecule'
import { FaChevronLeft } from '../components/icons'
import { IconTeam, IconDoor } from '../assets/images'
import { getData } from '../utils/localStorage'
import { Api } from '../helpers/api'
import ReactToPrint from 'react-to-print'

const DateFormat = ({ dateTime, status }) => {
  let splitFormatValue = dateTime.split("-")
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  if (status === 1)
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
      <div className="w-full p-5">
        <div className="w-full flex flex-wrap mb-6">
          <div className="w-2/5 flex items-start">
            <p className="mt-2 mr-5 font-bold">Your GTS ID : </p>
            <h3 className="border-4 border-dotted border-gray-400 py-2 bg-gray-100 mb-3 flex-auto font-bold text-center">{RfpData.gtsCode}</h3>
          </div>
          <div className="w-3/5">
            {/* <div className="flex flex-wrap title-section text-xl text-gray-700 font-bold block" style={{ float: 'right' }}>
              <h1 className='capitalize font-bold'>{RfpData.supplier[0].companyName}</h1>
            </div> */}
            <div className="flex flex-wrap title-section block" style={{ float: 'right' }}>
              <p className="text-md"><DateFormat dateTime={RfpData.event.startDate} /> - <DateFormat status={1} dateTime={`${RfpData.event.endDate}`} /></p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mb-6 pb-4">
          <div className="w-1/2 text-left">
            <p className="text-lg font-bold capitalize">{RfpData.supplier[0].companyName}</p>
            <p className="text-md">{`${RfpData.contact.firstname} ${RfpData.contact.lastname}`}</p>
            <p className="text-md">{RfpData.contact.email}</p>
            <p className="text-md">{RfpData.contact.phone}</p>
          </div>
          <div className="w-1/2 text-right">
            {/* <p className="text-md"><DateFormat dateTime={RfpData.event.startDate} /> - <DateFormat status={1} dateTime={`${RfpData.event.endDate}`} /></p> */}
            {/* <p className="text-md">Event type : {RfpData.supplier[0].companyTypeName}</p> */}
          </div>
          <div className="w-full mb-2 mt-4 border-b-2 border-dotted border-gray-300" />
          <div className="w-full text-left mt-2 mb-2">
            <button className="w-full text-center py-2 font-bold bg-yellow-400 text-black">Billing</button>
          </div>
          <div className="w-full mt-5 flex flex-wrap">
            <div className="w-2/3 text-left">
              <p className="font-bold text-xl capitalize">{RfpData.event.eventName}</p>
            </div>
            <div className="w-1/3 text-right">
              <p className="font-bold text-xl capitalize">Quotations</p>
            </div>
          </div>
          <div className="w-full px-16 py-5 bg-gray-200 mt-5 mb-4 flex flex-wrap">
            <div className="w-3/5 text-left flex flex-wrap">
              <div className="w-3/6 my-auto">
                <p className="font-bold text-xl capitalize">{`${RfpData.contact.salutation} ${RfpData.contact.firstname} ${RfpData.contact.lastname}`}</p>
                <p className="text-md">{`${RfpData.contact.email}`}</p>
                <p className="text-md">{`${RfpData.contact.phone}`}</p>
              </div>
              <div className="w-3/6 my-auto">
                <p className="text-md mb-2 flex text-bold">
                  Event type : {RfpData.supplier[0].companyTypeName}
                </p>
                <p className="text-md text-bold">
                  Attendees : {RfpData.event.totalAttendees}
                </p>
              </div>
            </div>
            <div className="w-2/5 text-right">
              <p className="text-md">Invoice Number : </p>
              <p className="font-bold text-xl mb-3">{RfpData.supplier[0].invoiceNumber && RfpData.supplier[0].invoiceNumber}</p>
              <p className="text-xs">Date : <span className="font-bold"><DateFormat dateTime={`${RfpData.event.endDate}`} /></span></p>
            </div>
          </div>
          {RfpData.supplier.map((item, idx) =>
            item.schedule.map((row, index) =>
              row.detail.map((r, i) =>
                <div className="w-full text-left" key={idx + 1 }>
                  <div>
                    <div className="flex flex-wrap text-md pb-2 mb-4 border-b-2 border-dotted border-gray-300">
                      <div className="w-6/12">
                        <p className="font-bold">Day {idx+1} - <DateFormat2 dateTime={`${row.scheduleDate}`} /> </p>
                        <p className="text-md font-semi-bold mt-2">{r.itemName}</p>
                        <p className="text-md font-semi-bold mt-2">{r.remark !== '' && r.remark}</p>
                      </div>
                      <div className="w-2/12 text-center flex flex-wrap justify-center">
                        <p className="w-full my-auto">Quantity</p>
                        <p className="w-full my-auto">{r.quantity}</p>
                      </div>
                      <div className="w-2/12 text-center flex flex-wrap justify-center">
                        <p className="w-full my-auto">Estimate Cost</p>
                        <p className="w-full my-auto">{r.salesPrice}</p>
                      </div>
                      <div className="w-2/12 text-center flex flex-wrap justify-center">
                        <p className="w-full my-auto">TOTAL (INC. TAX)</p>
                        <p className="w-full my-auto">{r.subtotalSalesPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
          <div className="w-full flex flex-wrap justify-end mb-6 hidden">
            <div className="py-2 px-8 text-center">
              <p className="font-bold uppercase">Sub Total</p>
            </div>
            <div className="py-2 px-20 text-center">
              <p className="font-bold uppercase">$8.197</p>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-end">
            <div className="py-2 px-3 flex border border-solid border-black bg-gray-200">
              <p className="mr-auto pr-2">Total</p>
              <p className="ml-auto font-bold uppercase">{RfpData.supplier[0].totalSalesPrice}</p>
            </div>
          </div>
          <div className="mt-10 w-full text-left">
            <p className="text-lg font-bold text-left mb-3">Description</p>
            <div className="w-full text-left" dangerouslySetInnerHTML={{ __html: RfpData.meta.wording.footer.description }}></div>
          </div>
          <div className="w-full h-3 bg-yellow-500 mt-2"></div>
        </div>
      </div>
    )
  }
}

const QuotationGts = ({ match }) => {
  const componentRef = useRef()
  const history = useHistory()
  const regex = /(<([^>]+)>)/ig
  const [RfpData, setRfpData] = useState({})
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const getQuotation = () => {
    const tokenLogin = getData("tokenLogin")
    setLoading(true)
    // Api.get(`/transactions/api/v1/myGts/detail?gtsCode=${match.params.gtsCode}&gtsSupplierId=${match.params.gtsSupplierId}`, { headers: { 'User-Token': `${tokenLogin}` } })
    Api.get(`/transactions/api/v1/myGts/detail?gtsCode=${location.state.gtsCode}&gtsSupplierId=${location.state.gtsSupplierId}`, { headers: { 'User-Token': `${tokenLogin}` } })
      .then(res => {
        console.log('RfpData', res.data.data)
        setRfpData(res.data.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }

  useEffect(() => {
    let isMounted = true
    isMounted && getQuotation()
    return () => isMounted === false
    
  }, [])
  // console.log('RfpData', RfpData)

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 flex flex-wrap mb-20">
        <div className="w-1/5 text-left pr-5">
          <NavLeftMyAccount activeNav="myHistoryNonRfp" />
        </div>
        {loading ? (<p>loading ...</p>) : (
          <div className="w-4/5">
            <div className="w-full flex">
              <div className="flex flex-wrap text-left mb-6 cursor-pointer mr-auto" onClick={() => history.goBack()}>
                <FaChevronLeft className="text-xs inline my-auto mr-1" />Back to My Non History RFP list
              </div>
              <ReactToPrint
                trigger={() => 
                  <button className="shadow ml-auto text-sm py-1 px-8">Print</button>
                }
                content={() => componentRef.current}
              />
            </div>
            <ComponentToPrint RfpData={RfpData} ref={componentRef} />
            <FooterHistoryRfp />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default QuotationGts
