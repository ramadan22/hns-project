import { React, Link, useLocation, useEffect, createRef } from '../libraries'
import { Slide } from "react-slideshow-image";
import { FaStar } from '../components/icons'
import { Navbar, Footer, ContainerLastNewsAndFaq, EventDetailContentTop } from '../components/molecule'
import { NavLeft, HandleError } from '../components/atom'
import { connect } from 'react-redux'
import { AvabilityDetailAction } from '../modules/actions'
import "react-slideshow-image/dist/styles.css"
import '../assets/styles/StyleSlider.css'

const HotelOverview = ({ AvabilityDetailAction, AvabilityDetail, AvabilityDetailLoading }) => {
  const paramsLocation = useLocation()
  const params = paramsLocation.pathname.split("/").pop().replace('placeid-', '')

  const slideRef = createRef()
  const slideImages = []

  if (!AvabilityDetail === false && AvabilityDetail.details.overview.images.length > 0) {
    for (let i = 0; i < AvabilityDetail.details.overview.images.length; i++) {
      slideImages.push(AvabilityDetail.details.overview.images[i].url)
    }
  }

  const properties = {
    duration: 1000,
    autoplay: false,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    indicators: i => <div className="indicator"><img src={slideImages[i]} alt="slider" onError={HandleError} className="object-cover" /></div>
  };

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
            countryCode={AvabilityDetail.country.value}
            image={AvabilityDetail.image} />
        </>
      ) : ('')}
      <div className="container mx-auto px-10 flex flex-wrap text-left mb-20">
        <div className="w-1/4">
          <NavLeft Active={'ho'} Params={params} />
        </div>
        <div className="w-3/4 pl-10">
          {!AvabilityDetail === false && AvabilityDetail.details.overview.images.length > 0 &&
            <div className="slide-container">
              <Slide ref={slideRef} {...properties}>
                {slideImages.map((each, index) => (
                  <div key={index} className="each-slide">
                    <img className="lazy w-full" onError={HandleError} src={each} alt="slide" />
                  </div>
                ))}
              </Slide>
            </div>
          }

          <p className="text-xl font-bold mt-5 mb-1">Hotels Presentation</p>
          <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: !AvabilityDetailLoading && !AvabilityDetail === false ? AvabilityDetail.details.overview.description.content : "" }}></div>
          <p className="text-xl font-bold mt-10 mb-1">Contact Information</p>
          <p className="text-gray-500">Tel : {!AvabilityDetailLoading && !AvabilityDetail === false ? AvabilityDetail.details.overview.contactInformation.telp : ""}</p>
          <p className="text-gray-500">Address : {!AvabilityDetailLoading && !AvabilityDetail === false ? AvabilityDetail.details.overview.contactInformation.address : ""}</p>
          <p className="text-gray-500 break-words">
            Web : {!AvabilityDetailLoading && !AvabilityDetail === false ?
              <Link to={`${AvabilityDetail.details.overview.contactInformation.website}`} target="_blank">{AvabilityDetail.details.overview.contactInformation.website}</Link> : ""
            }
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HotelOverview)