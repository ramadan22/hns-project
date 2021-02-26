import { React, Link, useState } from '../../libraries'
import {
  IconAccomodation,
  IconTeam,
  IconMeetingRoom,
  IconPicnic
} from '../../assets/images'
import { FaStar, FaSpinner } from '../icons'
import { HandleError } from '../atom'
import DataStatic from '../../static/Data'
import { CartActionAdd, ModalAction } from '../../modules/actions'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const RatingList = ({check}) => {
  let starList = []
  for(let star=1;star<=5;star++){
    starList.push(<FaStar key={star} className={`inline sm:text-base text-xs ml-1 ${star>check && 'text-gray-400'}`} />)
  }
  return starList
}

const Thumbnail = (props) => {
  const { data, CartActionAdd, CartResponse, ModalAction, onCart, LoginDataReducer, CartDataList } = props
  const [responseAdd, setResponseAdd] = useState({})
  const [spiner, setSpiner] = useState(false)
  const [LoginData, setLoginData] = useState({})

  useEffect(() => {
    setLoginData(LoginDataReducer)
  }, [LoginDataReducer])

  // const AddCart = (event) => {
  //   const placeId = event.target.getAttribute('value')
  //   setSpiner(true)
  //   if(CartDataList[0] && CartDataList[0].countryCode !== event.target.getAttribute("data-country")){
  //     setSpiner(false)
  //     ModalAction({Type: "info-popup", Message: "You've selected meeting spaces in another country. Do you want to remove your previous selection?", OtherFunction: {TextExtraButton: "Yes", TextExtraButton2: "No", ExtraButton: true, placeId: placeId}})
  //   } else {
  //     CartActionAdd({placeId: placeId, status: true})
  //   }
  // }

  const ModalConfirmAddCart = (data) => {
    ModalAction({Type: "confirm-add-cart", data: data})
  }

  const removeCart = (event) => {
    const placeId = event.target.getAttribute('value')
    // setSpiner(true)
    CartActionAdd({placeId: placeId, status: false})
  }

  useEffect(() => {
    if(CartResponse && Object.keys(CartResponse.data).length > 0){
      setResponseAdd(CartResponse.data)
      CartActionAdd(null)
    }
  }, [CartResponse])

  useEffect(() => {
    if(Object.keys(responseAdd).length > 0){
      ModalAction({Type: "success-popup", Message: responseAdd.message})
      // CartActionGet()
      setSpiner(false)
    }
  }, [responseAdd])

  // const modalLogin = () => {
  //   ModalActionLogin(true)
  // }

  return (
    <div className="thumbnail-molecule relative">
      <img src={`${!data === false && data.image}`} alt="meeting room" onError={HandleError} className="object-cover xl:h-48 sm:h-40 h-24 w-full rounded-t-md" />
      <div className="w-full flex flex-wrap shadow-lg py-3 xl:px-4 sm:pl-2 px-1 border-solid border-grey-100 border-r-2 border-l-2 bg-gradient-to-r from-gray-100 to-gray-300">
        <div className="sm:w-1/2 w-full xl:pr-0 sm:pr-1 px-1">
          <p className="font-bold xl:text-base sm:text-sm text-xs">Meeting Room</p>
          <p className="text-xs text-blue-400">Base Price 
            <span className="sm:text-sm text-xs">
              {!data === false && data.details.meetingRooms.meetingRoom.length > 0 && data.details.meetingRooms.meetingRoom[0].lowestPrice[0] ? (
                <>
                  {` ${data.details.meetingRooms.meetingRoom[0].lowestPrice[0].currency}${data.details.meetingRooms.meetingRoom[0].lowestPrice[0].total}`}
                </>
              ) : ""}
            </span>
          </p>
        </div>
        <div className="sm:w-1/2 w-full xl:pl-0 sm:pl-1 px-1">
          <p className="font-bold xl:text-base sm:text-sm text-xs">Accommodation</p>
          <p className="text-blue-400 text-xs">
            {!data === false && data.details.rooms.room.length > 0 ? 
              <>
                {` ${data.details.rooms.room[0] ? data.details.rooms.room[0].charge[0].currency : ""}${data.details.rooms.room[0] ? data.details.rooms.room[0].charge[0].total : ""}`}
              </>
            : ""}/{`${data.details.rooms.room[0] ? data.details.rooms.room[0].charge[0].name : ""}`}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-wrap xl:pt-5 pt-2 sm:px-4 px-2 pb-4 flex flex-wrap border-2 border-t-0 border-grey-100 border-solid rounded-b-md">
        <h2 className="w-full flex-column mb-2 xl:text-lg sm:text-base text-xs font-bold">{data !== undefined && !data.placeName === false && (data.placeName.length > 30 ? data.placeName.substring(0, 30)+'...' : data.placeName)}</h2>
        <p className="w-full flex flex-column items-center text-left uppercase xl:text-base sm:text-sm text-xs xl:mb-5 mb-3">
          <img src={IconPicnic} alt="icon meeting room" className="inline mr-2 sm:w-3 w-2" /> {data !== undefined && !data.city === false && data.city}
        </p>
        <div className="w-full flex sm:flex-column items-center text-left text-sm mb-1">
          <div className="sm:w-2/3 w-auto mr-auto xl:text-base text-xs">
            <img src={IconMeetingRoom} alt="icon meeting room" className="inline mr-1 xl:w-3 w-2 sm:inline-block hidden" /> {DataStatic.Thumbnail.text1} <span className="sm:hidden inline">:</span>
          </div>
          <div className="sm:w-1/3 w-auto sm:mr-auto sm:text-right text-left font-bold xl:text-base text-xs">
            {data !== undefined ? (
              data.details.meetingRooms.totalQuantity ) : ( 
              "0" 
            )}
          </div>
        </div>
        <div className="w-full flex flex-column items-center text-left text-sm mb-1">
          <div className="w-2/3 mr-auto xl:text-base text-xs">
            <img src={IconTeam} alt="icon meeting room" className="inline mr-1 xl:w-3 w-2 sm:inline-block hidden" /> {DataStatic.Thumbnail.text2} <span className="sm:hidden inline">:</span>
          </div>
          <div className="w-1/3 mr-auto text-right font-bold xl:text-base text-xs">
            {data !== undefined ? (
              data.details.meetingRooms.maxCapacity ) : ( 
              "0" 
            )}
          </div>
        </div>
        <div className="w-full flex flex-column items-center text-left text-sm mb-1">
          <div className="sm:w-2/3 w-11/12 mr-auto xl:text-base text-xs">
            <img src={IconAccomodation} alt="icon meeting room" className="inline mr-1 xl:w-3 w-2 sm:inline-block hidden" /> {DataStatic.Thumbnail.text3} <span className="sm:hidden inline">:</span>
          </div>
          <div className="sm:w-1/3 w-1/12 mr-auto text-right font-bold xl:text-base text-xs">
            {data !== undefined ? (
              data.details.rooms.totalQuantity ) : ( 
              "0" 
            )}
          </div>
        </div>
        <div className="w-full flex flex-wrap sm:mt-4 mt-1">
          <p className="my-auto sm:text-sm text-xs">Reviews : </p>
          <div className="sm:mx-3 pb-1 my-auto text-yellow-500">
            <RatingList check={data !== undefined && !data.starRating === false ? data.starRating : 0} />
          </div>
          <p className="my-auto text-xs hidden">(1 Review)</p>
        </div>
        <div className="w-full mt-3 flex flex-wrap">
          <div className="w-1/2 flex text-center">
            <button 
              type="button" 
              className={`sm:px-6 px-1 xl:rounded-md rounded-xs xl:text-sm text-xs py-1 uppercase w-11/12 focus:outline-none shadow-sm flex justify-center ${onCart !== undefined ? (Object.keys(onCart).length > 0 ? "bg-gray-300" : "") : ""}`} 
              value={`${data !== undefined && data.placeId}`} 
              data-country={`${data !== undefined && data.country.value}`}
              style={{ 
                backgroundColor : onCart !== "" ? (Object.keys(onCart).length > 0 ? "" : "#fed500") : "#fed500", 
                color : onCart !== "" ? (Object.keys(onCart).length > 0 ? "text-black" : "#71641f") : "#71641f"
              }}
              onClick={onCart !== "" ? (Object.keys(onCart).length > 0 ? removeCart : () => ModalConfirmAddCart(data)) : (Object.keys(LoginData).length > 0 ?() => ModalConfirmAddCart(data) : /*modalLogin*/ () => ModalConfirmAddCart(data))}
            ><FaSpinner className={`icon-spin inline sm:mr-2 mr-1 my-auto ${spiner ? 'block' : 'hidden'}`} /> Select
            </button>
          </div>
          <div className="w-1/2 flex text-center">
            <Link to={`/hotel-overview/placeid-${data !== undefined && data.placeId}`} className="sm:px-6 px-1 xl:rounded-md rounded-xs xl:text-sm text-xs text-black-100 py-1 border border-grey-200 uppercase sm:w-11/12 w-full ml-auto shadow">View</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  CartResponse: state.CartResponse,
  CartDataList: state.CartDataList.data,
  LoginDataReducer: state.LoginStatus.LoginData,
})

const mapDispatchToProps = {
  CartActionAdd,
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)