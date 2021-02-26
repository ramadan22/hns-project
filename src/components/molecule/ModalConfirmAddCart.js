import { React, useEffect, useState, useHistory } from '../../libraries'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'
import {
  BackdropModal,
  TitleSection
} from '../atom'

import { FaSpinner, FaTimes } from '../icons'

import { CartActionGet, ModalAction, CartActionAdd } from '../../modules/actions'

const ModalConfirmAddCart = (props) => {
  const { counterProps, data, ModalAction, CartActionAdd, CartDataList } = props
  console.log(data)
  // const [listCart, setListCart] = useState([])
  // const [spiner, setSpiner] = useState([])

  const history = useHistory()

  // useEffect(() => {
  //   setListCart(CartDataList.length > 0 && CartDataList)
  //   // setSpiner(false)
  // }, [CartDataList])

  // useEffect(() => {
  //   if (listCart.length > 0) {
  //     listCart.map((res, index) => {
  //       setSpiner(prevArray => [...prevArray, {
  //         placeId: res.placeId,
  //         status: false
  //       }])
  //     })
  //   }
  // }, [listCart])

  const handlecounter = () => {
    counterProps(null)
  }

  const handleClose = () => {
    handlecounter()
    ModalAction(null)
  }

  const handleSelect = (placeId, withRedirect, countryCode) => {
    handlecounter()
    ModalAction(null)
    if(CartDataList[0] && CartDataList[0].countryCode !== countryCode){
      ModalAction({Type: "info-popup", Message: "You've selected meeting spaces in another country. Do you want to remove your previous selection?", OtherFunction: {TextExtraButton: "Yes", TextExtraButton2: "No", ExtraButton: true, placeId: placeId}})
    } else {
      CartActionAdd({placeId: placeId, status: true})
      if(withRedirect){
        history.push('/select-venue-hotel', {
          fromCart: true
        })
      }
    }
  }

  const defaultStyle = {
    transition: `all 0.5s ease`,
    marginTop: '-100px',
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, marginTop: '0' },
  }

  return (
    <>
      <BackdropModal />
      <Transition timeout={100} in={true} appear>
        {(status) => (
          <div style={{ ...defaultStyle, ...transitionStyles[status] }} className="w-full h-full flex flex-wrap fixed z-30 overflow-y-auto" data-key="exept">
            <div className="xl:w-1/3 lg:w-5/12 md:w-1/2 sm:w-2/3 w-full h-auto bg-white py-8 xl:px-12 md:px-8 px-5 mx-auto my-auto flex flex-wrap relative">
              <FaTimes className="absolute right-0 top-0 text-lg mt-3 mr-3 md:hidden block" style={{ color: "#e9dada" }} onClick={handleClose} />
              <p className="w-full mb-4 text-left uppercase text-2xl">VENUE LIST</p>
              <div className="w-full bg-blue-200 px-2 py-3">
                <p className="text-left">Add more Venues</p>
                <p className="text-left text-sm">Add more Venues.</p>
              </div>
              <div className="w-full border border-solid border-gray-300 rounded px-2 py-2 flex flex-wrap mt-4">
                <img className="w-1/3 h-24 object-cover" src={data.image} />
                <div className="w-2/3 pl-5">
                  <p className="font-bold text-left">{data.placeName}</p>
                  <p className="w-full cursor-pointer text-left text-red-500 mt-4" onClick={handleClose}>Remove</p>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button onClick={() => handleSelect(data.placeId, false, data.country.value)} className="w-24 bg-red-500 py-1 mt-4 text-xs rounded-sm text-white">Select Venue</button>
                <button onClick={() => handleSelect(data.placeId, true, data.country.value)} className="w-24 bg-blue-500 py-1 mt-4 text-xs rounded-sm text-white ml-2">Submit Request</button>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

const mapStateToProps = (state) => ({
  CartDataList: state.CartDataList.data
})

const mapDispatchToProps = {
  CartActionGet,
  ModalAction,
  CartActionAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmAddCart)