import { React, useEffect, useState } from '../../libraries'
import { Transition } from 'react-transition-group'

import { BackdropModal } from '../atom'
import { FaCheck, FaTimes, FaInfo, FaSpinner } from '../icons'
import { connect } from 'react-redux'
import { ModalAction, ActivePopup, CartActionAdd, RedirectAction } from '../../modules/actions'

const ModalDefault = (props) => {
  const { Text, Type, OtherFunction, ActivePopupProps, ActivePopup, counterProps, ModalAction, CartActionAdd, RedirectAction } = props
  const [spiner, setSpiner] = useState(false)

  const handlecounter = (value) => {
    counterProps(null)
    ModalAction(null)
    if(value !== 'undefined'){
      ActivePopup('login')
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      document.addEventListener('click', handleDocumentClick);
     }, 1000)
  }, [])

  const handleDocumentClick = (evt) => {
    if(evt.target.getAttribute("data-key") === "exept"){
      counterProps(null)
      ModalAction(null)
    }
  }

  const handleOtherFunction = () => {
    setSpiner(true)
    if(OtherFunction !== false && OtherFunction.ExtraButton){
      if(OtherFunction.Redirect){
        setSpiner(false)
        CartActionAdd({placeId: OtherFunction.placeId, status: true, modalStatus: 'no-modal'})
        ModalAction(null)
        RedirectAction('/select-venue-hotel')
      } else {
        setSpiner(false)
        counterProps(null)
        ModalAction(null)
        CartActionAdd({placeId: OtherFunction.placeId, status: true})
      }
    }
  }

  const handleOtherFunctionDeleteHotel = () => {
    setSpiner(true)
    if(OtherFunction !== false && OtherFunction.ExtraButton){
      CartActionAdd({placeId: OtherFunction.placeId, status: false})
      counterProps(null)
      ModalAction(null)
      setSpiner(false)
    }
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
      <BackdropModal zIndex={40} />
      <Transition timeout={100} in={true} appear>
        {(status) => (
          <div style={{...defaultStyle, ...transitionStyles[status]}} className="w-full h-full flex flex-wrap fixed z-50 overflow-y-auto" data-key="exept">
            <div className="w-1/3 h-auto bg-white pt-8 px-12 mx-auto my-auto flex flex-wrap rounded">
              <div className={`w-24 h-24 flex rounded-full text-white text-3xl mx-auto`} style={{ marginTop: "-75px", backgroundColor: `${Type === 'success-popup' ? '#28a745' : ''}${Type === 'failed-popup' ? '#dc3545' : ''}${Type === 'info-popup' ? '#17a2b8' : ''}` }}>
                {Type === 'success-popup' ? (
                  <FaCheck className="m-auto" />
                ) : ('')}
                {Type === 'failed-popup' ? (
                  <FaTimes className="m-auto" />
                ) : ('')}
                {Type === 'info-popup' ? (
                  <FaInfo className="m-auto" />
                ) : ('')}
              </div>
              <p className="w-full text-2xl mt-5 text-green-600" style={{ fontFamily: "arial", whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: Text }}></p>
                <button className="border border-solid border-gray-300 w-32 py-1 rounded mb-5 mt-10 mx-auto focus:outline-none" onClick={(value) => handlecounter(ActivePopupProps)}>{ActivePopupProps !== 'undefined' ? 'Login now' : (OtherFunction.TextExtraButton2 ? OtherFunction.TextExtraButton2 : "Close")}</button>
                {OtherFunction !== false && OtherFunction.ExtraButton ?
                  <button className="border border-solid border-gray-300 w-32 py-1 rounded mb-5 mt-10 mx-auto focus:outline-none flex justify-center" onClick={OtherFunction.Delete ? handleOtherFunctionDeleteHotel : handleOtherFunction} style={{ backgroundColor: "#fed500", color: "#71641f" }}>
                    <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> {OtherFunction.TextExtraButton}</button>
                    : ""
                }
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

ModalDefault.defaultProps = {
  Text: "text modal default",
  Type: ''
}

const mapDispatchToProps = {
  ModalAction,
  ActivePopup,
  CartActionAdd,
  RedirectAction
}

export default connect(null, mapDispatchToProps)(ModalDefault)