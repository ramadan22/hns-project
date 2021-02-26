import { React, Link, useEffect, useState, useHistory } from '../libraries'
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

const HistoryNonRfpDetail = ({ match }) => {
  const [listHistoryRfp, setListHistoryRfp] = useState({})
  const [statusContent, setStatusContent] = useState(false)
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const getList = () => {
    setLoading(true)
    const tokenLogin = getData("tokenLogin")
    Api.get(`/transactions/api/v1/myGts/detail?gtsCode=${match.params.nonRfpCode}`, { headers: { 'User-Token': `${tokenLogin}` } })
      .then(res => {
        console.log(res)
        setListHistoryRfp(res.data.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }

  useEffect(() => {
    let isMounted = true
    isMounted && getList()
    return () => isMounted === false
  }, [])

  // useEffect(() => {
  //   console.log(listHistoryRfp)
  // }, [listHistoryRfp])
  // console.log('listHistoryRfp', listHistoryRfp)

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 flex flex-wrap mb-20">
        <div className="w-1/5 text-left pr-5">
          <NavLeftMyAccount activeNav="myHistoryNonRfp" />
        </div>
        {loading ? <p>loading ...</p> :
          (<div className="w-4/5">
            <div className="w-full flex flex-wrap text-left mb-6 cursor-pointer" onClick={() => history.goBack()}>
              <FaChevronLeft className="text-xs inline my-auto mr-1" />Back to My Non History RFP list
            </div>
            <div className="mb-6">
              <div className='w-full mb-6'>
                <div className='w-full mb-6 flex flex-wrap'>
                  <div className='w-full mb-6'>
                    <div className="w-full flex flex-wrap">
                      <div className="w-1/2">
                        <div className="flex flex-wrap title-section text-xl text-gray-700 font-bold block">
                          <h1 className='capitalize'>{listHistoryRfp.event.eventName}</h1>
                        </div>
                        <p className="text-left mt-1 mb-4">{`${listHistoryRfp.contact.firstname} ${listHistoryRfp.contact.lastname}`}</p>
                      </div>
                      <div className="w-1/2 flex items-start">
                        <p className="mt-2 mr-5 font-bold">Your GTS ID : </p>
                        <h3 className="border-4 border-dotted border-gray-400 py-2 bg-gray-100 mb-3 flex-auto font-bold">{listHistoryRfp.gtsCode}</h3>
                      </div>
                    </div>
                  </div>
                  <div className='w-full flex flex-wrap items-center mt-1 mb-6'>
                    <div className='w-4/12 text-left'>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>Budget : {`${listHistoryRfp.event.currency} ${listHistoryRfp.event.budget}`}</p>
                      </div>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>Number of guest : {listHistoryRfp.event.totalAttendees}</p>
                      </div>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>Country : {listHistoryRfp.event.countryName}</p>
                      </div>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>City : {listHistoryRfp.event.city}</p>
                      </div>
                    </div>
                    <div className='w-4/12 text-left'>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>Email : {listHistoryRfp.contact.email}</p>
                      </div>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>Phone : {listHistoryRfp.contact.phone}</p>
                      </div>
                    </div>
                    <div className='w-4/12'>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>From : {<DateFormat dateTime={listHistoryRfp.event.startDate} />}</p>
                      </div>
                      <div className='w-full flex flex-wrap items-center'>
                        <p>To : {<DateFormat dateTime={listHistoryRfp.event.endDate} />}</p>
                      </div>
                    </div>
                  </div>
                  {listHistoryRfp.supplier.length > 0 ? (
                    listHistoryRfp.supplier.map(item =>
                      <div className='w-full flex flex-wrap my-3' key={item.gtsSupplierId}>
                        <div className="w-4/5 flex flex-wrap">
                          <div className='w-full'>
                            <div className='w-full flex flex-wrap'>
                              <div className="w-1/4 pr-6">
                                <img src={item.companyTypeImage} alt="meeting room" class="object-cover w-full h-40" />
                              </div>
                              <div className='w-3/4'>
                                <div className="w-full flex flex-wrap">
                                  <div className="w-1/2">
                                    <div className="flex flex-wrap title-section text-xl text-gray-700 font-bold block">
                                      <h1 className='capitalize'>{item.companyName}</h1>
                                    </div>
                                    {/* <p className="text-left mt-1 mb-4">event sendiri</p> */}
                                  </div>
                                </div>
                                <div className='w-full flex flex-wrap flex-row space-x-48 mt-1'>
                                  <div className='w-100'>
                                    <p className='text-gray-700 font-semibold'>Invoice Number</p>
                                    <p className='text-gray-700 font-semibold'>{item.invoiceNumber && item.invoiceNumber}</p>
                                  </div>
                                  <div className='w-100'>
                                    <p>Status : <Status status={item.status} /></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/5 items-center">
                          <br />
                          <Link to={{
                            pathname: '/quotation-gts',
                            state: { gtsCode: listHistoryRfp.gtsCode, gtsSupplierId: item.gtsSupplierId },
                          }}>
                            <div className="px-6 rounded-md text-sm text-white py-3 uppercase w-full" style={{ backgroundColor: "#fed500" }}>
                              SEE QUOTATION
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                  ) : (
                    <p className='text-center'>Supplier No Data</p>
                  )}
                </div>
              </div>
              {listHistoryRfp.rundown.map(list =>
                <div className='w-full mb-6' key={list.gtsRundownId + 1}>
                  <div className='w-full shadow py-3 px-4 mb-6 rounded-md flex flex-wrap'>
                    <h1 className='text-left border-b-2 border-dotted border-gray-300 pb-3 mb-6 w-full font-bold capitalize'>{<DateFormat dateTime={list.scheduleDate} />}</h1>
                    {list.detail.map(res =>
                      <div className='w-full flex flex-wrap' key={res.gtsRundownDetailId + 1}>
                        <div className='w-4/5 text-left'>
                          <h1 className='text-left mb-3 w-full font-bold capitalize'>{res.companyTypeName}</h1>
                          <p className='mb-3 font-semibol capitalize'>{res.isTransport === 1 ? `${res.serviceType}, ${res.itemName}, ${res.from}, ${res.to}, ${res.pickupTime}, ${res.duration}` : `${res.itemName}`}</p>
                          <p>Notes : {res.remark && res.remark}</p>
                        </div>
                        <div className='w-1/5'>
                          <h3 className='font-semibold'>{res.quantity} Qty</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className='w-full mb-6'>
                <h3 className='w-full font-bold capitalize text-left'>
                  {listHistoryRfp.meta.wording.footer.title}
                </h3>
                <p className="w-full text-left" dangerouslySetInnerHTML={{ __html: listHistoryRfp.meta.wording.footer.description }} />
              </div>
            </div>
          </div>)}
      </div>
      <Footer />
    </>
  )
}

const Status = ({ status }) => {
  return (
    <>
      {(() => {
        switch (status) {
          case 'Completed' :
            return <span className='text-green-400'>{status}</span>
          case '1 Supplier(s) Approved':
            return <span style={{ color: '4994ce' }}>{status}</span>
          case '2 Supplier(s) Awarded':
            return <span style={{ color: '4994ce' }}>{status}</span>
          case 'Under Approval':
            return <span style={{ color: '4994ce' }}>{status}</span>
          case 'Approved':
            return <span className='text-green-400'>{status}</span>
          case 'error':
            return <span className='text-green-400'>{status}</span>
          default:
            return <span className='text-green-400'>{status}</span>
        }
      })()}
    </>
  )
}

const DateFormat = ({ dateTime, status }) => {
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  return dateFormatValue[0] + " " + dateFormatValue[2] + " " + dateFormatValue[1] + " " + dateFormatValue[3]
}

export default HistoryNonRfpDetail
