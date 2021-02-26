import { React, Link } from '../../libraries'
import { Transition } from 'react-transition-group'
import LogoHnsWhite from '../../assets/images/logo-white.png'

import {
  BackdropModal,
  TitleSection
} from '../atom'

const ModalRfpNonHotel = ({ onClick }) => {
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
          <div style={{ ...defaultStyle, ...transitionStyles[status] }} className="w-full h-full flex flex-wrap fixed z-40 overflow-y-auto" data-key="exept">
            <div className="w-1/3 h-auto bg-white pt-8 pb-12 px-12 mx-auto my-auto flex flex-wrap">
              <img src={LogoHnsWhite} alt="Logo" className="mx-auto mb-5 mt-5" />
              <TitleSection ClassName="w-full mb-1 text-3xl flex flex-wrap justify-center" Text={"Continue to the next step!"} />
              <p className="w-full text-center">Create quote RFP non Hotel</p>
              <button className="uppercase w-full py-1 mt-10 rounded" style={{ backgroundColor: "#fed500" }} onClick={onClick}>Yes</button>
              <Link to="/thank-you" className="font-bold w-full mt-6 mb-2 text-sm uppercase">No, Thanks</Link>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

export default ModalRfpNonHotel