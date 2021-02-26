import { React, useEffect, useState, useRef } from '../libraries'
import { Navbar, ExploreForm, DealsList, ContainerLastNewsAndFaq, Footer } from '../components/molecule'
import { Api } from '../helpers/api'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const DealsSearch = (props) => {
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
    perPage: 6,
    eventsId: subParam[0] !== undefined ? subParam[0] : "",
    minAttendees: subParam[1] !== undefined ? subParam[1] : "",
    maxAttendees: subParam[2] !== undefined ? subParam[2] : "",
    city: subParam[3] !== undefined ? subParam[3] : "",
    cityName: subParam[4] !== undefined ? subParam[4] : "",
    minPriceMeetingRoom: subParam[5] !== undefined ? subParam[5] : 0,
    maxPriceMeetingRoom: subParam[6] !== undefined ? subParam[6] : 1000,
    minPriceRoom: subParam[7] !== undefined ? subParam[7] : 0,
    maxPriceRoom: subParam[8] !== undefined ? subParam[8] : 1000,
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
    Api.get(`/supplier/api/v1/availibility?isDeals=1&page=1&perPage=${param.perPage}${param.eventsId !== '' ? '&eventsId[]='+param.eventsId : ''}${param.cityName !== '' ? '&city='+param.cityName : ''}${param.minPriceMeetingRoom !== '' ? '&minPriceMeetingRoom='+param.minPriceMeetingRoom : ''}${param.maxPriceMeetingRoom !== '' ? '&maxPriceMeetingRoom='+param.maxPriceMeetingRoom : ''}${param.minPriceRoom !== '' ? '&minPriceRoom='+param.minPriceRoom : ''}${param.maxPriceRoom !== '' ? '&maxPriceRoom='+param.maxPriceRoom : ''}${param.minAttendees !== '' ? '&minAttendees='+param.minAttendees : ''}${param.maxAttendees !== '' ? '&maxAttendees='+param.maxAttendees : ''}${param.keyword !== undefined && param.keyword !== '' ? '&keyword='+param.keyword : ''}`)
    .then(response => {
      setTotalProduct(response.data.data.total)
      // setDeals(deals => [...deals, ...response.data.data.items])
      setDeals(response.data.data.items)
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
      <ExploreForm AllParam={subParam} Status="Deals" />
      <div className="container mx-auto px-10 deals-list pt-10 pb-20">
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

export default DealsSearch
