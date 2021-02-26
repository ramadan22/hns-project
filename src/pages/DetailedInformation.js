import { React, useEffect, useLocation } from '../libraries'

import { Navbar, Footer, ContainerLastNewsAndFaq, EventDetailContentTop } from '../components/molecule'
import { NavLeft } from '../components/atom'

import { connect } from 'react-redux'
import {
  AvabilityDetailAction
} from '../modules/actions'

const DetailedInformation = ({ AvabilityDetailAction, AvabilityDetail, AvabilityDetailLoading }) => {
  const paramsLocation = useLocation()
  const params = paramsLocation.pathname.split("/").pop().replace('placeid-', '')

  useEffect(() => {
    AvabilityDetailAction(params)
  }, [AvabilityDetailAction, params])

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
         <NavLeft Active={'di'} Params={params} />
        </div>
        <div className="w-3/4 pl-10">
          {!AvabilityDetailLoading && !AvabilityDetail === false ? (
            AvabilityDetail.details.detailInformation.length > 0 ?
              AvabilityDetail.details.detailInformation.map((res, index) => {
                return (
                  <div key={index}>
                    <p className="text-xl font-bold mb-1">{res.title}</p>
                    <div style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: res.description }}></div>
                  </div>
                )
              }) : ''
          ) : (
              <p className="text-left">loading ...</p>
            )
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailedInformation)