import { React, useState } from '../../libraries'
import { Transition } from 'react-transition-group'
import LogoHnsWhite from '../../assets/images/logo-white.png'
import { ModalAction } from '../../modules/actions'
import { connect } from 'react-redux'
import { BackdropModal } from '../atom'
import { Api } from '../../helpers/api'
import { FaSpinner } from '../icons'

const ModalForgotPassword = ({ counterProps, ModalAction }) => {
  const [spiner, setSpiner] = useState(false)
  const [param, setParam] = useState({
    email: ''
  })

  const handlecounter = () => {
    counterProps("login")
  }

  const handleChange = (event) => {
    setParam({...param, email: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    Api.post(`/membership/api/v1/member/forgotPasswordV2`, {...param})
    .then(res => {
      ModalAction({Type: "success-popup", Message: res.data.message})
      setSpiner(false)
      counterProps(null)
    })
    .catch(function (error) {
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
      setSpiner(false)
      counterProps(null)
    })
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
          <div style={{ ...defaultStyle, ...transitionStyles[status] }} className="w-full h-full flex flex-wrap absolute z-40 overflow-y-auto" data-key="exept">
            <div className="w-1/3 h-auto bg-white py-8 px-12 mx-auto my-auto flex flex-wrap">
              <p className="w-full mb-5 text-center">Welcome to</p>
              <img src={LogoHnsWhite} alt="Logo" className="mx-auto mb-5 lg:w-40 w-32" />
              <p className="w-full mb-3 text-lg text-center text-3xl">Forgot your password?</p>
              <p>Enter your email address bellow and we'll send<br />Your instruction on how</p>
              <form onSubmit={handleSubmit} className="w-full">
                <input type="email" name="email" onChange={handleChange} className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" placeholder="Email" required />
                <div className="w-full mt-5">
                  <button className="w-full px-5 py-1 uppercase rounded-md bg-yellow-400 text-white flex justify-center focus:outline-none">
                    <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Send
                  </button>
                </div>
              </form>
              <p className="w-full text-center text-sm mt-4">Return to <button className="text-sm text-blue-500 inline" onClick={() => handlecounter()}>Log In</button></p>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

const mapDispatchToProps = {
  ModalAction
}

export default connect(null, mapDispatchToProps)(ModalForgotPassword)