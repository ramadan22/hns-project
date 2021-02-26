import { React, useEffect, useLocation } from '../libraries'
import { Navbar, Footer, ContainerLastNewsAndFaq, EventDetailContentTop } from '../components/molecule'
import { NavLeft, HandleError } from '../components/atom'
import { IconAccomodation } from '../assets/images'
import { FaUser } from '../components/icons'
import { connect } from 'react-redux'
import { AvabilityDetailAction } from '../modules/actions'

const Accomodation = ({ AvabilityDetailAction, AvabilityDetail, AvabilityDetailLoading }) => {
  const paramsLocation = useLocation()
  const params = paramsLocation.pathname.split("/").pop().replace('placeid-', '')

  const DateFormat = ({ dateTime }) => {
    let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      day: "2-digit",
      month: "long"
    }).format(new Date(dateTime))

    dateFormatValue = dateFormatValue.split(' ')
    return (dateFormatValue[1] + " " + dateFormatValue[0] + ", " + dateFormatValue[2])
  }

  useEffect(() => {
    AvabilityDetailAction(params)
  }, [AvabilityDetailAction, params])

  console.log("AvabilityDetail", AvabilityDetail)

  return (
    <>
      <Navbar />
      {!AvabilityDetailLoading && !AvabilityDetail === false ? (
        <>
          <EventDetailContentTop
            data={AvabilityDetail.details.meetingRooms}
            dataRating={AvabilityDetail.starRating}
            dataFacilities={AvabilityDetail.facilities}
            placeName={AvabilityDetail.placeName}
            address={AvabilityDetail.address} 
            placeId={AvabilityDetail.placeId} 
            countryCode={AvabilityDetail.country.value} />
        </>
      ) : ('')}
      <div className="container mx-auto px-10 flex flex-wrap text-left mb-20">
        <div className="w-1/4">
          <NavLeft Active={'acc'} Params={params} />
        </div>
        <div className="w-3/4 pl-10">
          {!AvabilityDetailLoading && !AvabilityDetail === false ? (
            Object.keys(AvabilityDetail.specialDeals).length > 0 ? (
              <>
                <h3 className="text-xl font-bold mb-1">{`${AvabilityDetail.specialDeals.title}`}</h3>
                <div className="text-md mt-1" dangerouslySetInnerHTML={{ __html: `${AvabilityDetail.specialDeals.content}` }}></div>
                <div className="border-2 border-dotted border-gray-500 bg-gray-200 py-5 px-5 mt-4">
                  <p>
                    {/* Valid Until {`${AvabilityDetail.specialDeals.expire}`} */}
                    Valid Until <DateFormat dateTime={AvabilityDetail.specialDeals.expire} />
                  </p>
                  <p>Applicable team: {`${AvabilityDetail.specialDeals.remark}`}</p>
                </div>
              </>
            ) : ('')
          ) : ('')
          }
          {!AvabilityDetailLoading && !AvabilityDetail === false ? (
            AvabilityDetail.details.rooms.room.length > 0 ? (
              <>
                <p className="text-xl font-bold mb-1 uppercase mt-10 mb-5">Accommodation</p>
                <div className="flex flex-wrap">
                  {AvabilityDetail.details.rooms.room.map((res, index) => {
                    return (
                      <div key={index} className="w-1/3 pr-5 flex flex-wrap">
                        <h3 className="w-full font-bold text-md mb-2">{`${res.roomName}`}</h3>
                        <p className="pr-4 text-xs flex text-gray-700">
                          <img src={IconAccomodation} className="h-2 h-auto inline my-auto mr-2" alt="icon accommodation" /> {`${res.roomQuantity}`} Rooms
                        </p>
                        <p className="pr-4 text-xs flex text-gray-700">
                          <FaUser className="inline mr-2 my-auto" />
                          {`${res.roomCapacity}`} Adults
                        </p>
                        <img src={`${res.images.length > 0 ? res.images[0].url : ''}`} onError={HandleError} alt="hotel room" className="w-full h-64 object-cover mt-2" />
                      </div>
                    )
                  })}
                </div>
              </>
            ) : ('')
          ) : ('')}
        </div>
      </div>
      <ContainerLastNewsAndFaq />
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  AvabilityDetail: state.AvabilityDetail.dataAvabilityDetail,
  AvabilityDetailLoading: state.AvabilityDetail.loadingAvabilityDetail
})

const mapDispatchToProps = {
  AvabilityDetailAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Accomodation)