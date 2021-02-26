import { React, useState, useEffect } from '../../libraries'
import { Transition } from 'react-transition-group'
import LogoHnsWhite from '../../assets/images/logo-white.png'
import { connect } from 'react-redux'
import { ModalAction, ActivePopup, MemberLoginStatus, ModalActionLogin } from '../../modules/actions'
import { storageData } from '../../utils/localStorage'
import { Api } from '../../helpers/api'
import { FaSpinner, FaTimes } from '../icons'
import {
  BackdropModal,
  TitleSection
} from '../atom'

import DataStatic from '../../static/Data'

const ModalLogin = (props) => {
  const { counterProps, MemberLoginStatus, ModalAction, ModalActionLogin } = props
  const [spiner, setSpiner] = useState(false)

  const [loginParams, setLoginParams] = useState({
    email: '',
    password: '',
    rememberMe: 0
  })

  // const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    ModalActionLogin(false)
  }, [])

  const handlecounter = () => {
    counterProps("register")
  }

  const handleClose = () => {
    counterProps(null)
  }

  const handlecounterForgot = () => {
    counterProps("forgot-password")
  }

  const handleChange = (event) => {
    setLoginParams({...loginParams, [event.target.getAttribute('name')]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    Api.post('/membership/api/v1/member/login', loginParams)
    .then(res => {
      counterProps(null)
      storageData('tokenLogin', res.data.data.token)
      ModalAction({Type: "success-popup", Message: res.data.message})
      setSpiner(false)
      MemberLoginStatus(true)
      // setChecked(true)
    })
    .catch(function (error) {
      console.log(error.response)
      counterProps(null)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
      setSpiner(false)
      MemberLoginStatus(false)
      // setChecked(false)
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

  const onChangeChecked = e =>
    setLoginParams({...loginParams, [e.target.getAttribute('name')]: (loginParams.rememberMe > 0 ? 0 : 1)})

  return (
    <>
      <BackdropModal />
      <Transition timeout={100} in={true} appear>
        {(status) => (
          <div style={{...defaultStyle, ...transitionStyles[status]}} className="w-full h-full flex flex-wrap fixed z-40 overflow-y-auto" data-key="exept">
            <div className="xl:w-1/3 lg:w-5/12 md:w-1/2 sm:w-2/3 w-full h-auto bg-white py-8 xl:px-12 md:px-8 px-5 mx-auto my-auto flex flex-wrap relative">
              <FaTimes className="absolute right-0 top-0 text-lg mt-3 mr-3 md:hidden block" style={{ color: "#e9dada" }} onClick={handleClose} />
              <p className="w-full mb-5 text-center">{DataStatic.ModalLoginText.Text1}</p>
              <img src={LogoHnsWhite} alt="Logo" className="mx-auto mb-5 lg:w-40 w-32" />
              <TitleSection ClassName="w-full mb-3 lg:text-2xl md:text-xl text-lg sm:text-left" Text={DataStatic.ModalLoginText.Text2} />
              <form className="w-full mx-auto" onSubmit={(event) => handleSubmit(event)}>
                <input name="email" type="email" className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none lg:text-base text-sm" required placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none lg:text-base text-sm" required placeholder="Password" onChange={handleChange} />
                <p className="w-full text-left text-sm text-blue-600"><input type="checkbox" name='rememberMe' onChange={onChangeChecked} defaultChecked={loginParams.rememberMe > 0 ? true : false} /> Remember me?</p>
                <div className="w-full mt-5">
                  <button type="submit" className="w-full px-5 py-1 uppercase rounded-md text-white flex justify-center focus:outline-none lg:text-base text-sm" style={{ backgroundColor: "#fed500" }}><FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Log In</button>
                </div>
              </form>
              <p className="w-full text-right text-sm mt-3"><button className="text-sm text-blue-500 inline" onClick={() => handlecounterForgot()}>Forgot Password?</button></p>
              <p className="w-full text-center text-sm mt-4">{DataStatic.ModalLoginText.Text3} <button className="inline text-blue-500 focus:outline-none" onClick={() => handlecounter()}>Register</button></p>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

const mapDispatchToProps = {
  ModalAction,
  ActivePopup,
  MemberLoginStatus,
  ModalActionLogin
}

export default connect(null, mapDispatchToProps)(ModalLogin)