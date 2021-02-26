import { React, Link } from '../../libraries'

import { TitleSection } from '../atom'
import { FaDoorOpen } from '../icons'
import { HandleError } from '../atom'

const DateFormat = ({dateTime, status}) => {
    let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        day: "2-digit",
        month: "long"
    }).format(new Date(dateTime))

    dateFormatValue = dateFormatValue.split(' ')

    if(status === 1)
        return dateFormatValue[0] + " " + dateFormatValue[2]
    else
        return dateFormatValue[1] + " " + dateFormatValue[0]
}

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

export const ThumbnailHistory = (props) => {
    const { Type, allData } = props

    return(
        <div className={`w-full ${!Type && "shadow"} py-3 px-4 mb-6 rounded-md flex flex-wrap`}>
            <div className={`xl:w-1/4 w-4/12 pr-6 ${Type && "hidden"}`}>
                <img src={`${Object.keys(allData).length > 0 ? (allData.place.length > 0 ? allData.place[0].image : "") : ""}`} onError={HandleError} alt="meeting room" className="object-cover w-full h-40" />
            </div>
            <div className={`${Type ? "w-full" : "xl:w-3/4 w-8/12"}`}>
                <div className="w-full flex flex-wrap">
                    <div className="xl:w-1/2 w-full">
                        <TitleSection Text={`Event Name`} Type="x-large" />
                        <p className="text-left mt-1 mb-4">{`${Object.keys(allData).length > 0 ? allData.contact.eventName : ""}`}</p>
                        {/* <p className="text-left mt-1 mb-4 hidden">{`${Object.keys(allData).length > 0 ? allData.address : ""}`}, {`${Object.keys(allData).length > 0 ? allData.countryName : ""}`} {`${Object.keys(allData).length > 0 && allData.phone !== "" ? "Telephone "+allData.phone : ""}`}</p> */}
                        {/* <TitleSection Text={`${Object.keys(allData).length > 0 ? allData.contact.eventName : ""}`} Type="x-large" /> */}
                    </div>
                    <div className="xl:w-1/2 w-full flex items-start">
                        <p className="mt-2 mr-5">Your RFP ID : </p>
                        <h3 className="border-4 border-dotted border-gray-400 py-2 bg-gray-100 mb-3 flex-auto font-bold">{`${Object.keys(allData).length > 0 ? allData.rfpCode : ""}`}</h3>
                    </div>
                </div>
                <div className="w-full flex flex-wrap items-center mt-1">
                    <div className="xl:w-5/12 lg:w-4/6 w-full text-left">
                        <div className="w-full flex flex-wrap items-center">
                            <FaDoorOpen className="inline mr-2" />
                            <p>Event type : {`${Object.keys(allData).length > 0 ? allData.events.eventTypeName : ""}`}</p>
                        </div>
                        <div className="w-full flex flex-wrap items-center">
                            <FaDoorOpen className="inline mr-2" />
                            <p>Attendees : {`${Object.keys(allData).length > 0 ? allData.events.totalAttendees : ""}`}</p>
                        </div>
                    </div>
                    <div className="xl:w-3/12 lg:w-2/6 w-full text-left">
                        <div className="xl:w-full w-auto xl:flex-none flex lg:justify-end lg:mt-0 mt-3">
                            {Object.keys(allData).length > 0 ? (
                                <>
                                    <p className="text-left">Status :<br />
                                        <span style={{ color: allData.approvedCount > 0 ? "green" : (
                                            allData.downCount > 0 ? "red" : (
                                                allData.waitingCountnya > 0 ? "blue" : "#4994ce"
                                            )
                                        ) }}>{allData.rawRfpStatus !== "" ? allData.rawRfpStatus : allData.rfpStatus}</span>
                                    </p>
                                </>
                            ) : ("")}
                        </div>
                    </div>
                    <div className="xl:w-4/12 w-full text-right xl:mt-0 mt-5 xl:flex-none flex flex-wrap items-end justify-end">
                        {Type ? (
                            <>
                                <p className="text-md text-right">Invoice Number:</p>
                                <p className="text-lg text-right font-bold mb-2">{Object.keys(allData).length > 0 ? allData.invoiceNumber : ""}</p>
                                <p className="text-xs text-right">Date : <span className="font-bold">{Object.keys(allData).length > 0 ? <DateFormat2 dateTime={`${allData.createdAt}`} /> : ""}</span></p>
                            </>
                        ) : (
                            <>
                                <p className="xl:w-full w-auto text-xs">{Object.keys(allData).length > 0 ? <DateFormat dateTime={`${allData.events.startDate}`} /> : ""} - <DateFormat status={1} dateTime={`${allData.events.endDate}`} /></p>
                                <Link to={`/my-history-rfp-detail/${Object.keys(allData).length > 0 ? allData.rfpCode : ""}`} className="px-6 rounded-md text-sm text-white py-1 uppercase xl:ml-0 ml-4" style={{ backgroundColor: "#fed500" }}>View Details</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
ThumbnailHistory.defaultProps = {
    Type: "",
    allData: ""
}
