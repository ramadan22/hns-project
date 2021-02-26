import { React, Link } from '../../libraries'
import { HandleError } from '../atom'

const DateFormat = ({ dateTime }) => {
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')
  return (dateFormatValue[1] + " " + dateFormatValue[0] + ", " + dateFormatValue[2])
}

export const DealsList = ({ data }) => {
  return (
    <>
      <div className="w-full flex py-4 cursor-pointer hover:bg-gray-200 hover:shadow-md">
        <div className="w-3/12">
          <img src={`${data.image}`} onError={HandleError} alt={`${data.specialDeals.title}`} className="w-full rounded-r-md object-cover shadow" style={{ height: "300px" }} />
        </div>
        <div className="flex flex-wrap w-6/12 pl-10 pr-6 text-left">
          <p className="w-full flex-column text-lg">{`${data.specialDeals.title}`}</p>
          <div className="w-full flex-column mt-5">
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: `${data.specialDeals.content !== "" && data.specialDeals.content.replace(/(<([^>]+)>)/ig, "").length > 245 ? data.specialDeals.content.replace(/(<([^>]+)>)/ig, "").substring(0, 245)+'...' : data.specialDeals.content.replace(/[^a-zA-Z ]/g, "")}` }}></p>
          </div>
          <p className="w-full flex-column text-md mt-auto mb-4">Promotion Valid Until <DateFormat dateTime={`${data.specialDeals.expire !== '' ? data.specialDeals.expire : ''}`} /></p>
          {data !== '' && data.tags !== undefined && data.tags !== '' ? (
            data.tags.map((res, index) => {
              // return <button key={index} className="text-xs inline ml-2 border-2 border-solid border-gray-200 rounded-md py-1 px-2">{`${res}`}</button>
              return (<div key={index} className="w-auto mr-2">
                {res !== "" ?
                  <button className="px-6 rounded-md text-sm text-black-100 py-1 border-2 uppercase ml-auto" style={{ borderColor: "#d4d4d4" }}>{`${res}`}</button>
                : ""}
              </div>)
            })
          ) : ('')}
        </div>
        <div className="flex w-3/12 pl-5 pr-5">
          <Link to={`/hotel-overview/placeid-${data.placeId !== undefined && data.placeId}`} className="px-2 rounded-md text-sm text-black py-2 w-7/12 my-auto ml-auto" style={{ backgroundColor: "#fed500" }}>View Details</Link>
        </div>
      </div>
    </>
  )
}