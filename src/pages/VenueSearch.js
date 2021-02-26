import { React, useState, useEffect, useLocation } from '../libraries'
import { TitleSection } from '../components/atom'
import { connect } from 'react-redux'
import { AvabilityAction } from '../modules/actions'
import DataStatic from '../static/Data'
import { ThumbnailLoading } from '../components/molecule/loading'
import { 
  Navbar, 
  ExploreForm, 
  Thumbnail, 
  ContainerLastNewsAndFaq, 
  Footer 
} from '../components/molecule'

const VenueSearch = ({AvabilityAction, AvabilityList, match, CartDataList}) => {
  const location = useLocation()
  // const [param, setParam] = useState({ page: 1, perPage: 6 })
  // const paramsLocation = useLocation()
  const [listProduct, setListProduct] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  const [listCart, setListCart] = useState([])
  const [moreTrigger, setMoreTrigger] = useState(false)
  const params = match.params.slug.split('&')
  let subParam = []

  useEffect(() => {
    if(location.state && location.state.city){
      console.log("location.state.city", location.state.city)
      const params = {...avabilityValues}
      params.cityFilter = location.state.city
      setAvabilityValues(params)
    }
  }, [])

    for (let i = 0; i < params.length; i++) {
      let paramsValue = params[i].split('=')
      subParam.push(paramsValue[1])
    }
  
  const [avabilityValues, setAvabilityValues] = useState({
    page: 1,
    perPage: 6,
    eventsId: subParam[0] !== undefined ? subParam[0] : "",
    minAttendees: subParam[1] !== undefined ? subParam[1] : "",
    maxAttendees: subParam[2] !== undefined ? subParam[2] : "",
    city: subParam[3] !== undefined ? subParam[3] : "",
    cityFilter: location.state ? location.state.city : "",
    cityName: subParam[4] !== undefined ? subParam[4] : "",
    minPriceMeetingRoom: subParam[5] !== undefined ? subParam[5] : "",
    maxPriceMeetingRoom: subParam[6] !== undefined ? subParam[6] : "",
    minPriceRoom: subParam[7] !== undefined ? subParam[7] : "",
    maxPriceRoom: subParam[8] !== undefined ? subParam[8] : "",
    keyword: subParam[9] !== undefined ? subParam[9] : ""
  })

  const OpenMore = () => {
    setMoreTrigger(true)
    setAvabilityValues({...avabilityValues, page:avabilityValues.page+1})
  }

  useEffect(() => {
    setAvabilityValues({...avabilityValues, 
      page: 1,
      perPage: 6,
      eventsId: subParam[0] !== undefined ? subParam[0] : "",
      minAttendees: subParam[1] !== undefined ? subParam[1] : "",
      maxAttendees: subParam[2] !== undefined ? subParam[2] : "",
      city: subParam[3] !== undefined ? subParam[3] : "",
      cityFilter: location.state ? location.state.city : "",
      cityName: subParam[4] !== undefined ? subParam[4] : "",
      minPriceMeetingRoom: subParam[5] !== undefined ? subParam[5] : "",
      maxPriceMeetingRoom: subParam[6] !== undefined ? subParam[6] : "",
      minPriceRoom: subParam[7] !== undefined ? subParam[7] : "",
      maxPriceRoom: subParam[8] !== undefined ? subParam[8] : "",
      keyword: subParam[9] !== undefined ? subParam[9] : ""
    })
  }, [match.params])

  useEffect(() => {
    setLoadProduct(true)
    AvabilityAction(avabilityValues)
  }, [avabilityValues])

  useEffect(() => {
    setListCart(CartDataList.length > 0 ? CartDataList : [])
  }, [CartDataList])

  useEffect(() => {
    if(!AvabilityList === false && AvabilityList.dataAvabilityList !== null){
      setLoadProduct(false)
      if(moreTrigger === false){
        setListProduct(AvabilityList.dataAvabilityList.items)
      }
    }
  }, [AvabilityList.dataAvabilityList])

  useEffect(() => {
    if(!AvabilityList === false && AvabilityList.dataAvabilityList !== null){
      setLoadProduct(false)
      if(moreTrigger){
        setMoreTrigger(false)
        setListProduct(listProduct => [...listProduct, ...AvabilityList.dataAvabilityList.items])
      } 
    }
  }, [AvabilityList.dataAvabilityList])

  return (
    <>
      <Navbar BreadData={"Home,Venue Search"} />
      <ExploreForm AllParam={subParam} />
      <div className="lg:container lg:mx-auto lg:px-10 px-5 text-left pt-5">
        <div className="flex flex-wrap title-section text-xl text-gray-700 font-bold block">
          <h1>{`${avabilityValues.cityName}`} Meeting venues search results</h1> 
          <p className="font-medium text-xs sm:ml-5 ml-0 mt-2 text-gray-500">{`${!AvabilityList === false && AvabilityList.dataAvabilityList !== null ? AvabilityList.dataAvabilityList.total : '0'} Hotels`}</p>
        </div>
        {/* <TitleSection Type="x-large" Text={`${avabilityValues.cityName} ${DataStatic.TitleSectionVenueSearch}`} WithSmallText={`${!AvabilityList === false && AvabilityList.dataAvabilityList !== null ? AvabilityList.dataAvabilityList.total : '0'} Hotels`} /> */}
      </div>
      <div className="lg:container lg:mx-auto lg:px-10 px-5 text-left pt-5">
        <TitleSection Type="medium" Text={`We found ${!AvabilityList === false && AvabilityList.dataAvabilityList !== null ? AvabilityList.dataAvabilityList.total : '0'} hotels matching your criteria`} />
      </div>
      <div className="lg:container lg:mx-auto lg:px-10 sm:px-5 px-0 container-product flex flex-wrap mb-10 pt-5" style={{ minHeight: "250px" }}>
        {listProduct.length > 0 ? (
          listProduct.map((res, index) => {
            return (<div className="lg:w-1/3 w-1/2 text-left xl:pr-8 px-2 xl:pb-8 pb-4" key={index}>
              <Thumbnail data={res} onCart={Object.keys(listCart).length > 0 ? listCart.filter((res2) => res2.placeId === res.placeId ? true : false) : ""} />
            </div>)
          })
        ) : ('')}
        {loadProduct ? (
          <>
            <ThumbnailLoading /><ThumbnailLoading /><ThumbnailLoading />
          </>
        ) : ('')}
      </div>
      {!AvabilityList === false && AvabilityList.dataAvabilityList !== null && AvabilityList.dataAvabilityList.total > 6 ? (<div className="w-auto mx-auto px-10 pb-16 pt-4">
        <button type="button" onClick={OpenMore} style={{ backgroundColor: "#fed500" }} className="w-auto h-full px-5 py-1 uppercase rounded-md bg-yellow-400 text-white">View More Spaces</button>
      </div> ) : ('')}
      <ContainerLastNewsAndFaq />
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  AvabilityList: state.AvabilityResult,
  CartDataList: state.CartDataList.data
})

const mapDispatchToProps = {
  AvabilityAction
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueSearch)