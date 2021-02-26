import { React, useEffect, useState, useHistory } from '../../libraries'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'
import {
  BackdropModal,
  TitleSection
} from '../atom'

import { FaSpinner, FaTimes } from '../icons'

import { CartActionGet, ModalAction } from '../../modules/actions'

const ModalCart = (props) => {
  const { counterProps, CartDataList, ModalAction } = props
  const [listCart, setListCart] = useState([])
  const [spiner, setSpiner] = useState([])
  
  const history = useHistory()

  useEffect(() => {
    setListCart(CartDataList.length > 0 && CartDataList)
    // setSpiner(false)
  }, [CartDataList])

  useEffect(() => {
    if(listCart.length > 0){
      listCart.map((res, index) => {
        setSpiner(prevArray => [...prevArray, {
          placeId: res.placeId,
          status: false
        }])
      })
    }
  }, [listCart])

  const handlecounter = () => {
    counterProps(null)
  }

  const handleCheckbox = (event) => {
    const placeId = event.target.value
    if(event.target.checked){

    } else {
      ModalAction({
        Type: "info-popup", 
        Message: "Do you want to remove this meeting space from your selection?", 
        OtherFunction: {
          TextExtraButton: "Yes", 
          TextExtraButton2: "No",
          ExtraButton: true, 
          Delete: true,
          placeId: placeId
        }
      })
    }
  }

  const handleClose = () => {
    counterProps(null)
  }

  const handleSubmitCart = () => {
    history.push("/select-venue-hotel", {
      fromCart: true
    })
  }

  const defaultStyle = {
    transition: `all 0.5s ease`,
    marginTop: '-100px',
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1, marginTop: '0' },
  }

  return (
    <>
      <BackdropModal />
      <Transition timeout={100} in={true} appear>
        {(status) => (
          <div style={{...defaultStyle, ...transitionStyles[status]}} className="w-full h-full flex flex-wrap fixed z-30 overflow-y-auto" data-key="exept">
            <div className="xl:w-1/3 lg:w-5/12 md:w-1/2 sm:w-2/3 w-full h-auto bg-white py-8 xl:px-12 md:px-8 px-5 mx-auto my-auto flex flex-wrap relative">
              <FaTimes className="absolute right-0 top-0 text-lg mt-3 mr-3 md:hidden block" style={{ color: "#e9dada" }} onClick={handleClose} />
              <p className="w-full mb-4 text-left uppercase text-2xl">VENUE LIST</p>
              {listCart.length > 0 ? (<TitleSection ClassName="w-full mb-3 mt-3 text-lg text-left uppercase" Text="Here are your list of spaces." />) : ('')}
              {listCart.length > 0 && spiner.length > 0 ? (
                listCart.map((res, index) => {
                  return(
                    <div key={index} className="w-full flex flex-wrap mb-3 group">
                      <div className="w-1/12">
                        {spiner[index].status ? 
                          <FaSpinner className={`icon-spin inline mr-2 my-auto`} /> :
                          <input type="checkbox" className="my-auto mr-3" value={`${res.placeId}`} name={`key-${index}`} checked onChange={handleCheckbox} />
                        }
                      </div>
                      <div className="w-10/12 flex flex-wrap">
                        <p className="font-bold my-auto text-left leading-tight">{`${res.placeName}`}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="w-full text-left">Your shopping cart is empty</p>
              )}
              {listCart.length > 0 ? (
                <>
                  <TitleSection ClassName="w-full mb-3 mt-6 text-left" Text="Venues will respond to you with a personalised qoute!" />
                  <div className="w-full mt-5 flex flex-wrap">
                    <div className="w-1/2 pr-2 flex text-center">
                      <button className="text-center rounded-md sm:text-sm text-xs text-black-100 py-1 border border-grey-200 uppercase w-full ml-auto" onClick={() => handlecounter()}>Add More Spaces</button>
                    </div>
                    <div className="w-1/2 pl-2 flex text-center">
                      <button onClick={handleSubmitCart} className="text-center rounded-md sm:text-sm text-xs py-1 bg-yellow-400 uppercase w-full focus:outline-none">Submit Request</button>
                    </div>
                  </div>
                </>
              ) : (
                <button onClick={handlecounter} className="border border-solid border-gray-300 px-10 py-1 rounded mb-0 mt-10 mx-auto focus:outline-none">Close</button>
              )}
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
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart)