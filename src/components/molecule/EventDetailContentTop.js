import { React, useEffect, useState, useHistory } from '../../libraries'
import { FaStar, FaDoorOpen, FaComments } from '../../components/icons'
import { TitleSection } from '../../components/atom'
import { connect } from 'react-redux'
import { CartActionAdd, ModalAction, RedirectAction, ModalActionLogin } from '../../modules/actions'
import {
  IconAccomodation,
  IconTeam,
  IconMeetingRoom
} from '../../assets/images'
import { getData } from '../../utils/localStorage'
import { Api } from '../../helpers/api'

const Facilities = ({ facilitiesValue }) => {
  var faicilitiesList = ""
  for (let i = 0; i < facilitiesValue.length; i++) {
    faicilitiesList += facilitiesValue[i].facilityName + ", "
  }
  faicilitiesList = faicilitiesList.substring(0, parseInt(faicilitiesList.length) - 2)
  faicilitiesList = (faicilitiesList.length > 50 ? faicilitiesList.substring(0, 50) + "..." : faicilitiesList)
  return <p>{faicilitiesList}</p>
}

const RatingList = ({ check }) => {
  let starList = []
  for (let star = 1; star <= 5; star++) {
    starList.push(<FaStar key={star} className={`inline text-md ml-1 ${star > check ? 'text-gray-400' : 'text-yellow-500'}`} />)
  }
  return starList
}

const EventDetailContentTop = (props) => {
  const history = useHistory()
  const { 
    data, dataFacilities, dataRating, 
    placeName, placeId, countryCode, image,
    address, ModalAction, CartResponse, 
    RedirectAction, CartDataList, 
    CartActionAdd, RedirectTo, ModalActionLogin,
    LoginDataReducer
  } = props
  const [disabledCollect, setDisabledCollect] = useState(false)
  const [disabledWish, setDisabledWish] = useState(false)
  const [responseAdd, setResponseAdd] = useState({})
  const [LoginData, setLoginData] = useState({})
  const [wishlist, setWishlist] = useState([])

  const getWishlist = () => {
    let tokenLogin = getData('tokenLogin')
    setWishlist([])
    if(tokenLogin){
      Api.get(`/membership/api/v1/wishlist/fetch`, {headers: { 'User-Token': `${tokenLogin}` }})
      .then(res => {
        setWishlist(res.data.data.items)
      })
      .catch(function (error) {
        setWishlist([])
      })
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  useEffect(() => {
    if(wishlist.length > 0){
      wishlist.map(res => {
        if(res.placeId === placeId)
          setDisabledWish(true)
      })
    } else {
      setDisabledWish(false)
    }
  }, [wishlist, placeId])

  useEffect(() => {
    setLoginData(LoginDataReducer)
  }, [LoginDataReducer])

  const AddCart = (event) => {
    const placeId = event.target.getAttribute('value')
    if(CartDataList[0] && CartDataList[0].countryCode !== event.target.getAttribute("data-country")){
      ModalAction({
        Type: "info-popup", 
        Message: "The hotel you chose is another country, delete the previous hotel?", 
        OtherFunction: {
          TextExtraButton: "Continue", 
          ExtraButton: true, 
          placeId: placeId
        }
      })
    } else {
      setDisabledCollect(true)
      CartActionAdd({placeId: placeId, status: true})
    }
  }

  const CollectAddRedirect = (event) => {
    const placeId = event.target.getAttribute('value')
    if(CartDataList[0] && CartDataList[0].countryCode !== event.target.getAttribute("data-country")){
      ModalAction({
        Type: "info-popup", 
        Message: "The hotel you chose is another country, delete the previous hotel?", 
        OtherFunction: {
          TextExtraButton: "Continue", 
          ExtraButton: true, 
          placeId: placeId,
          Redirect: true
        }
      })
    } else {
      setDisabledCollect(true)
      CartActionAdd({placeId: placeId, status: true})
      history.push('/select-venue-hotel', {
        fromCart: true
      })
    }
  }

  const CollectRedirect = () => {
    history.push('/select-venue-hotel', {
      fromCart: true
    })
  }

  const removeCart = (event) => {
    const placeId = event.target.getAttribute('value')
    ModalAction({
      Type: "info-popup", 
      Message: "Are you sure you want to remove this hotel from your shopping cart?", 
      OtherFunction: {
        TextExtraButton: "Continue", 
        ExtraButton: true, 
        Delete: true,
        placeId: placeId
      }
    })
  }

  useEffect(() => {
    if(CartResponse && Object.keys(CartResponse.data).length > 0){
      setResponseAdd(CartResponse.data)
      CartActionAdd(null)
    }
  }, [CartResponse])

  useEffect(() => {
    getWishlist()
    if(CartDataList && CartDataList.length > 0){
      CartDataList.map(res => {
        if(res.placeId === placeId)
          setDisabledCollect(true)
      })
    } else {
      setDisabledCollect(false)
    }
  }, [CartDataList, placeId])

  useEffect(() => {
    if(Object.keys(responseAdd).length > 0){
      ModalAction({Type: "success-popup", Message: responseAdd.message})
    } else if(RedirectTo !== null){
      history.push(RedirectTo, {
        fromCart: true
      })
      RedirectAction(null)
    }
  }, [RedirectTo, responseAdd])

  const modalLogin = () => {
    ModalActionLogin(true)
  }

  const ModalConfirmAddCart = (data) => {
    ModalAction({Type: "confirm-add-cart", data: data})
  }

  const handleWishtlist = (event) => {
    let tokenLogin = getData('tokenLogin')
    if(tokenLogin){
      Api.post(`/membership/api/v1/wishlist/update`, {placeId: placeId}, {headers: { 'User-Token': `${tokenLogin}` }})
      .then(res => {
        ModalAction({Type: "success-popup", Message: res.data.message})
        getWishlist()
      })
      .catch(function (error) {
        ModalAction({Type: "failed-popup", Message: error.response.data.message})
        getWishlist()
      })
    } else {
      modalLogin(true)
    }
  }

  return (
    <>
      <div className="container mx-auto flex flex-wrap px-10 mb-20">
        <div className="w-9/12">
          <TitleSection Type="x-large" Text={!data === false && placeName} />
          <TitleSection ClassName="text-left" Text={!data === false && address} />
          <div className="w-full flex flex-wrap text-left mt-4">
            <div className="w-1/3 pr-12 border-solid border-r border-gray-300">
              <div className="w-full flex items-center mb-2">
                <img src={IconMeetingRoom} alt="icon meeting room" className="inline mr-2 w-3" />
                <p className="my-auto">Meeting Rooms</p>
                <p className="ml-auto font-bold">
                  {!data === false && data.meetingRoom.length > 0 ? (
                    data.meetingRoom[0].meetingRoomQuantity
                  ) : ('0')}
                </p>
              </div>
              <div className="w-full flex items-center mb-2">
                <img src={IconTeam} alt="icon meeting room" className="inline mr-2 w-3" />
                <p className="my-auto">Max. Attendees</p>
                <p className="ml-auto font-bold">
                  {!data === false ? (
                    data.maxCapacity
                  ) : ('0')}
                </p>
              </div>
              <div className="w-full flex items-center">
                <img src={IconAccomodation} alt="icon meeting room" className="inline mr-2 w-3" />
                <p className="my-auto">Accomm. Rooms</p>
                <p className="ml-auto font-bold">
                  {!data === false ? (
                    data.totalQuantity
                  ) : ('0')}
                </p>
              </div>
            </div>
            <div className="w-1/3 pl-12 pr-12 border-solid border-r border-gray-300 flex items-center">
              <FaDoorOpen className="inline mr-5 text-2xl w-20" />
              <Facilities facilitiesValue={dataFacilities} />
            </div>
            <div className="w-1/3 pl-12 flex items-center">
              <FaComments className="inline mr-6 text-2xl" />
              <div className="">
                <RatingList check={dataRating} />
                {/* <FaStar className="inline mr-1" />
                <FaStar className="inline mr-1" />
                <FaStar className="inline mr-1" />
                <FaStar className="inline mr-1" />
                <FaStar className="inline mr-1" /> */}
                <p>Reviews</p>
              </div>
              <p className="font-bold ml-auto">0</p>
            </div>
          </div>
        </div>
        <div className="w-3/12 flex flex-wrap items-center">
          <button 
            type="button" 
            value={placeId} 
            data-country={`${countryCode}`} 
            onClick={(CartDataList && CartDataList.length > 0 ? (disabledCollect ? CollectRedirect : CollectAddRedirect) : CollectAddRedirect)} 
            className="w-auto text-base px-4 py-2 rounded-md bg-yellow-400 text-black ml-auto">Get A Quote Now</button>
          <div className="ml-auto w-full flex flex-wrap items-center justify-end text-sm mt-2 mb-auto text-gray-500">
            <button className="focus:outline-none flex" type="button" onClick={handleWishtlist}>
              <FaStar className={`inline-block my-auto mr-2 text-base ${disabledWish ? "text-yellow-500" : ""}`} />
              <p> Save to wishlist</p>
            </button>
          </div>
          <button 
            type="button" 
            value={placeId} 
            data-country={`${countryCode}`} 
            className={`w-auto text-sm px-10 py-1 text-sm uppercase rounded-md focus:outline-none ${disabledCollect ? "bg-gray-300" : "bg-yellow-400"} text-black mt-auto ml-auto`} 
            onClick={(CartDataList && CartDataList.length > 0 ? (disabledCollect ? removeCart : () => ModalConfirmAddCart({placeId: placeId, placeName: placeName, image: image, country: {value: countryCode}})) : /*modalLogin AddCart */() => ModalConfirmAddCart({placeId: placeId, placeName: placeName, image: image, country: {value: countryCode}}))}>Collect</button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  CartResponse: state.CartResponse,
  CartDataList: state.CartDataList.data,
  RedirectTo: state.RedirectTo.data,
  LoginDataReducer: state.LoginStatus.LoginData
})

const mapDispatchToProps = {
  CartActionAdd,
  ModalAction,
  RedirectAction,
  ModalActionLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailContentTop)