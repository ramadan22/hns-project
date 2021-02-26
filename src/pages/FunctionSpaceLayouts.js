import { React, useEffect, useLocation } from '../libraries'

import { Navbar, Footer, ContainerLastNewsAndFaq, EventDetailContentTop } from '../components/molecule'
import { NavLeft, HandleError } from '../components/atom'
import { connect } from 'react-redux'
import { AvabilityDetailAction } from '../modules/actions'

const FunctionSpaceLayouts = ({ AvabilityDetailAction, AvabilityDetail, AvabilityDetailLoading }) => {
  const paramsLocation = useLocation()
  const params = paramsLocation.pathname.split("/").pop().replace('placeid-', '')

  useEffect(() => {
    AvabilityDetailAction(params)
  }, [AvabilityDetailAction, params])

  useEffect(() => {
    console.log(AvabilityDetail && AvabilityDetail)
  }, [AvabilityDetail])

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
          <NavLeft Active={'fsl'} Params={params} />
        </div>
        <div className="w-3/4 pl-10">
          <p className="text-xl font-bold mb-3">Function Space</p>
          <div className="flex flex-wrap mb-10">
            {AvabilityDetail && AvabilityDetail.details.meetingRooms.meetingRoom.length > 0 ?
              AvabilityDetail.details.meetingRooms.meetingRoom.map((res, index) => {
                return (
                  <div key={index} className="w-1/3 pr-5">
                    <img src={`${res.images[0].url}`} onError={HandleError} className="w-full h-32 object-cover" alt="meeting room" />
                    <div className="border border-solid border-gray-300 border-t-none shadow py-2 px-3" style={{ minHeight: '125px' }}>
                      <p className="font-bold mb-1">{`${res.roomName}`}</p>
                      {res.lowestPrice.length > 0 ? 
                        <>
                          {/* <p>{res.lowestPrice[0].name}</p> */}
                          {/* {res.lowestPrice.map(res2 => { */}
                            {/* <div className="w-full" key={index2}> */}
                              <p className="text-sm flex flex-wrap mb-1"><span>{`${res.lowestPrice[0].name}`}</span><span className="ml-auto">{`${res.lowestPrice[0].currency}`}{`${res.lowestPrice[0].total}`}</span></p>
                            {/* </div> */}
                          {/* })} */}
                        </>
                      : ''}
                      <p className="text-sm flex flex-wrap mb-1">
                        Total Max Attendees <span className="ml-auto">{`${res.maxCapacity}`}</span>
                      </p>
                    </div>
                  </div>
                )
              }) : ('')
            }
          </div>
          <p className="text-xl font-bold mb-5 mt-5">Event Room Layouts</p>
          <div className="w-full flex flex-wrap">
            <div className="w-full flex flex-wrap px-5 py-4 bg-gray-100">
              <div className="w-4/12 flex text-left">
                <p className="font-bold my-auto text-lg">Meeting Room</p>
              </div>
              {AvabilityDetail && AvabilityDetail.details.meetingRooms.meetingRoom.length > 0 ? (
                AvabilityDetail.details.meetingRooms.meetingRoom[0].layout.length > 0 ? (
                  AvabilityDetail.details.meetingRooms.meetingRoom[0].layout.map((res, index) => {
                    return (
                      <div key={index} className="w-1/12 flex flex-wrap text-center ">
                        <img src={`${res.icon}`} alt="icon teatre" className="mx-auto mb-1 h-5" /><br />
                        <p className="w-full" style={{ fontSize: '10px' }}>{`${res.name}`}</p>
                      </div>
                    )
                  })
                ) : ('')
              ) : ('')}
              
            </div>
            {AvabilityDetail && AvabilityDetail.details.meetingRooms.meetingRoom.length > 0 ? (
              AvabilityDetail.details.meetingRooms.meetingRoom.map((res, index) => {
                return (
                  <div key={index} className="w-full flex flex-wrap px-5 py-4">
                    <div className="w-4/12 flex text-left">
                      <p className="my-auto text-md ">{`${res.roomName}`}<br /><span className="text-xs">{`${res.dimensions.area}`}m ({`${res.dimensions.width}`}m x {`${res.dimensions.length}`}m)</span></p>
                    </div>
                    {res.layout.length > 0 ? (
                      res.layout.map((res2, index2) => {
                        return(
                          <div key={index2} className="w-1/12 flex flex-wrap text-center ">
                            <p className="w-full text-xs my-auto">{`${res2.capacity}`}</p>
                          </div>
                        )
                      })
                      ) : ('')
                    }
                  </div>
                )
              })) : ''
            }
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FunctionSpaceLayouts)