import { React, useHistory, useEffect, useState, useLocation } from '../libraries'

import { PanelTitleStep } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import { IconTeam } from '../assets/images'
import { connect } from 'react-redux'
import { getData } from '../utils/localStorage'
import { RfpDataGet, ModalAction, CartActionAdd } from '../modules/actions'
import { FaPlusCircle, FaSpinner } from '../components/icons'
import { Api } from '../helpers/api'

const SelectVenueHotel = ({ LoginData, CartDataList, CartDataAdd, RfpDataGet, RfpData, ModalAction, CartResponse, CartActionAdd }) => {
  const history = useHistory()
  const locationParam = useLocation()
  const [spiner, setSpiner] = useState(false)
  const [RfpDataState, setRfpDataState] = useState({})
  const [sendCountry, setSendCountry] = useState(null)
  const [listCart, setListCart] = useState([])
  const [placeParam, setPlaceParam] = useState({
    place: [],
    city: []
  })
  
  // useEffect(() => {
  //   if(Object.keys(LoginData).length < 1 && getData('tokenLogin') === false)
  //     history.push(`/`);
  // }, [LoginData, history])

  useEffect(() => {
    const tokenLogin = getData('tokenLogin')
    Api.get(`/supplier/api/v2/cart/fetch${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : "?guestId="+CartDataAdd.guestId }`, {headers: { 'User-Token': `${tokenLogin}` }})
    .then(res => {
      setListCart(res.data.data.detail)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [CartDataAdd])

  const handleChecked = (event) => {
    let value = event.target.value
    let cityName = event.target.getAttribute("data-city")
    if(event.target.checked){
      setPlaceParam(prevState => ({
        ...prevState,
        place: [...prevState.place, { placeId: value } ],
        city: [...prevState.city, { cityName: cityName } ]
      }))
    } else {
      setPlaceParam(prevState => ({
        ...prevState,
        place: [...placeParam.place.filter(item => item.placeId !== value)],
        city: [...placeParam.city.filter(item => item.city !== cityName)]
      }))
    }
  }

  const handleSubmit = (event) => { 
    event.preventDefault()
    // console.log({...placeParam, guestId: (getData("guestIdRfp") ? getData("guestIdRfp") : "")})
    setSpiner(true)
    const UserToken = getData('tokenLogin')
    Api.post(`/supplier/api/v2/rfp/place`, {...placeParam, guestId: (getData("guestIdRfp") ? getData("guestIdRfp") : "")}, {headers: { 'User-Token': UserToken }})
    .then(res => {
      RfpDataGet()
      setSpiner(false)
      history.push(`/event-detail`)
    })
    .catch(function (error) {
      setSpiner(false)
      console.log(error.response)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
    })
  }

  useEffect(() => {
    RfpDataGet()
  }, [])

  useEffect(() => {
    setPlaceParam({
      place: [],
      city: []
    })
    if(locationParam.state && locationParam.state.fromCart && listCart){
      listCart.map(res => {
        setPlaceParam(prevState => ({
          ...prevState,
          place: [...prevState.place, { placeId: res.placeId }],
          city: [...prevState.city, { city: res.city }],
        }))
      })
    } else if(RfpData !== null && RfpData.place){
      RfpData.place.map(res => {
        setPlaceParam(prevState => ({
          ...prevState,
          place: [...prevState.place, { placeId: res.placeId }],
          city: [...prevState.city, { city: res.city }],
        }))
      })
    }
  }, [RfpData, locationParam.state, listCart])

  const handleClickAddHotel = () => {
    history.push(`/venue-search/eventid=&minattendees=0&maxattendees=0&location=&locationname=&minpricemeetingroom=0&maxpricemeetingroom=0&minpriceroom=0&maxpriceroom=0&keyword=`,
      {
        city: [sendCountry]
      }
    )
  }

  useEffect(() => {
    if(CartResponse && Object.keys(CartResponse.data).length > 0){
      ModalAction({Type: "success-popup", Message: CartResponse.data.message})
      CartActionAdd(null)
    }
  }, [CartResponse])

  const countCountry = () => {
    var array_elements = placeParam.city;

    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i].city != current) {
            if (cnt > 0) {
                // console.log(current + ' comes --> ' + cnt + ' times<br>');
            }
            current = array_elements[i].city;
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        // console.log(current + ' comes --> ' + cnt + ' times');
        setSendCountry({city: current})
    }
  }

  useEffect(() => {
    countCountry()
  }, [placeParam.city])

  useEffect(() => {
    console.log("CartDataAdd", CartDataAdd)
  }, [CartDataAdd])
  
  return (
    <>
      <Navbar Type="rfp" />
        <div className="container mx-auto px-10 flex flex-wrap pb-20">
          <PanelTitleStep Text="1. Select Venue" />
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full py-5 px-4 flex flex-wrap pb-10 border-b-2 border-dotted border-gray-300 mb-10">
              <div className="w-full">
                {listCart.length > 0 ? 
                  listCart.map((res, index) => {
                    return (
                    <div key={index} className="flex flex-wrap mb-6">
                      <div className="w-9/12 flex">
                        <input type="checkbox" 
                          name="placeId" 
                          onChange={handleChecked} 
                          value={res.placeId && res.placeId} 
                          className="mr-3 mt-2"
                          data-city={res.city && res.city} 
                          checked={placeParam.place.length > 0 && placeParam.place.findIndex(item => item.placeId === res.placeId) > -1 && true} />
                        <div className="text-left">
                          <h4 className="font-bold">{`${res.placeName}`}</h4>
                          <p className="text-sm">{`${res.address}`} Telephone: {`+${res.phoneCode}`} {`${res.phone}`}</p>
                        </div>
                      </div>
                      <div className="w-3/12 flex">
                        <p className="ml-auto my-auto flex">
                          <img src={IconTeam} className="inline mr-3 my-auto" alt="icon team" /> Max. Attendees <span className="ml-4 font-bold">{`${res.maxAttendees}`}</span>
                        </p>
                      </div>
                    </div> ) 
                  }) 
                : ('')}
                <div className="w-full mt-2 mb-2 flex">
                  <button type="button" className="focus:outline-none ml-auto text-xs flex" onClick={handleClickAddHotel}><FaPlusCircle className="text-sm text-yellow-400 inline mr-2 my-auto" />Add More Spaces</button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end mb-10">
              <span className="my-auto mr-5">Continue to the next step</span>
              <button type="submit" className="text-center w-40 py-2 text-black uppercase rounded-sm text-sm ml-5 flex justify-center rounded" style={{ backgroundColor: "#fed500" }}>
                <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Next Step
              </button>
            </div>
          </form>
          <PanelTitleStep Text="2. Event Details" />
          <PanelTitleStep Text="3. Select a Package" />
          <PanelTitleStep Text="4. Event Schedule" />
        </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  CartResponse: state.CartResponse,
  LoginData: state.LoginStatus.LoginData,
  CartDataList: state.CartDataList.data,
  CartDataAdd: state.CartDataAdd.data,
  RfpData: state.RfpDataGetReducer.data
})

const mapDispatchToProps = {
  RfpDataGet,
  ModalAction,
  CartActionAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectVenueHotel)