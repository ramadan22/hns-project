import { React, useEffect, useState, useRef } from '../libraries'
import { Navbar, ExploreForm, DealsList, ContainerLastNewsAndFaq, Footer } from '../components/molecule'
import { Api } from '../helpers/api'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const Deals = (props) => {
  const { match } = props
  let params
  let subParam = []

  if(match.params.slug !== undefined){
    params = match.params.slug.split('&')
    for (let i = 0; i < params.length; i++) {
      let paramsValue = params[i].split('=')
      subParam.push(paramsValue[1])
    }
  }

  const scrollProduct = useRef(null)

  const [buttonLoadMore, setButtonLoadMore] = useState(false)
  const [totalProduct, setTotalProduct] = useState(false)
  const [deals, setDeals] = useState([])
  const [param, setParam] = useState({
    page: 1,
    perPage: 4,
    eventsId: subParam[0] !== undefined ? subParam[0] : "",
    minAttendees: subParam[1] !== undefined ? subParam[1] : "",
    maxAttendees: subParam[2] !== undefined ? subParam[2] : "",
    city: subParam[3] !== undefined ? subParam[3] : "",
    cityName: subParam[4] !== undefined ? subParam[4] : "",
    minPriceMeetingRoom: subParam[5] !== undefined ? subParam[5] : "",
    maxPriceMeetingRoom: subParam[6] !== undefined ? subParam[6] : "",
    minPriceRoom: subParam[7] !== undefined ? subParam[7] : "",
    maxPriceRoom: subParam[8] !== undefined ? subParam[8] : "",
    keyword: subParam[9] !== undefined ? subParam[9] : ""
  })

  useEffect(() => {
    setParam({...param, 
      page: 1,
      perPage: 6,
      eventsId: subParam[0] !== undefined ? subParam[0] : "",
      minAttendees: subParam[1] !== undefined ? subParam[1] : "",
      maxAttendees: subParam[2] !== undefined ? subParam[2] : "",
      city: subParam[3] !== undefined ? subParam[3] : "",
      cityName: subParam[4] !== undefined ? subParam[4] : "",
      minPriceMeetingRoom: subParam[5] !== undefined ? subParam[5] : "",
      maxPriceMeetingRoom: subParam[6] !== undefined ? subParam[6] : "",
      minPriceRoom: subParam[7] !== undefined ? subParam[7] : "",
      maxPriceRoom: subParam[8] !== undefined ? subParam[8] : "",
      keyword: subParam[9] !== undefined ? subParam[9] : ""
    })
  }, [match.params])

  const OpenMore = () => {
    setParam({...param, page:param.page+1})
    Api.get(`/supplier/api/v1/availibility?isDeals=1&page=${param.page}&perPage=${param.perPage}${param.eventsId !== '' ? '&eventId[]='+param.eventsId : ''}${param.cityName !== '' ? '&city='+param.cityName : ''}${param.minPriceMeetingRoom !== '' ? '&minPriceMeetingRoom='+param.minPriceMeetingRoom : ''}${param.maxPriceMeetingRoom !== '' ? '&maxPriceMeetingRoom='+param.maxPriceMeetingRoom : ''}${param.minPriceRoom !== '' ? '&minPriceRoom='+param.minPriceRoom : ''}${param.maxPriceRoom !== '' ? '&maxPriceRoom='+param.maxPriceRoom : ''}${param.minAttendees !== '' ? '&minAttendees='+param.minAttendees : ''}${param.maxAttendees !== '' ? '&maxAttendees='+param.maxAttendees : ''}${param.keyword !== undefined && param.keyword !== '' ? '&keyword='+param.keyword : ''}`)
    .then(response => {
      setTotalProduct(response.data.data.total)
      console.log(response.data.data)
      if(deals.length > 0){
        setDeals(deals => [...deals, ...response.data.data.items])
        // setDeals(response.data.data.items)
      } 
      // else {
      //   setDeals(response.data.data.items)
      // }
      if(deals.length > 0){
        executeScroll()
      }
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }

  const executeScroll = () => scrollToRef(scrollProduct)

  useEffect(() => {
    Api.get(`/supplier/api/v1/availibility?isDeals=1&page=1&perPage=${param.perPage}${param.eventsId !== '' ? '&eventId[]='+param.eventsId : ''}${param.cityName !== '' ? '&city='+param.cityName : ''}${param.minPriceMeetingRoom !== '' ? '&minPriceMeetingRoom='+param.minPriceMeetingRoom : ''}${param.maxPriceMeetingRoom !== '' ? '&maxPriceMeetingRoom='+param.maxPriceMeetingRoom : ''}${param.minPriceRoom !== '' ? '&minPriceRoom='+param.minPriceRoom : ''}${param.maxPriceRoom !== '' ? '&maxPriceRoom='+param.maxPriceRoom : ''}${param.minAttendees !== '' ? '&minAttendees='+param.minAttendees : ''}${param.maxAttendees !== '' ? '&maxAttendees='+param.maxAttendees : ''}${param.keyword !== undefined && param.keyword !== '' ? '&keyword='+param.keyword : ''}`)
    .then(response => {
      setTotalProduct(response.data.data.total)
      // console.log("deals list", response)
      if(deals.length > 0){
        // setDeals(deals => [...deals, ...response.data.data.items])
        setDeals(response.data.data.items)
      } else {
        setDeals(response.data.data.items)
      }
      if(deals.length > 0){
        executeScroll()
      }
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [param])

  useEffect(() => {
    if(deals.length < totalProduct){
      setButtonLoadMore(true)
    } else {
      setButtonLoadMore(false)
    }
  }, [deals, totalProduct])

  return (
    <>
      <Navbar NavActive={"deals"} BreadData={"Home,Deals"} />
      <ExploreForm AllParam={param} Status="Deals" />
      <div className="lg:container lg:mx-auto lg:px-10 px-5 deals-list lg:pt-10 pt-5 lg:pb-20 pb-5">
        {deals.length > 0 ? (
          deals.map((res, index) => {
            return (<div key={index} ref={scrollProduct} className="w-full"><DealsList data={res} /></div>)
          })
        ) : ('')}
        <div className="mt-10">
          {buttonLoadMore ? (
            <button onClick={OpenMore} className="px-6 rounded-md text-sm text-white py-1 bg-yellow-400 uppercase w-2/12">View More Spaces</button>
          ) : ('')}
        </div>
      </div>
      <ContainerLastNewsAndFaq />
      <Footer />
    </>
  )
}

export default Deals
