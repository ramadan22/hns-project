import { React, useState, Link, useEffect } from '../../libraries'
import { Transition } from 'react-transition-group'
import LogoHnsWhite from '../../assets/images/logo-white.png'
import { FaSpinner, FaCheckCircle } from '../icons'
import { Api } from '../../helpers/api'
import { ModalAction } from '../../modules/actions'
import { connect } from 'react-redux'
import {
  BackdropModal,
  TitleSection
} from '../atom'
import DataStatic from '../../static/Data'

const ModalRegister = ({counterProps, ModalAction}) => {
  const [checkPass, setCheckPass] = useState('')
  const [spiner, setSpiner] = useState(false)
  const [formRegister, setFormRegister] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    telephone: ''
  })

  const handleChangeForm = (event) => {
    setFormRegister({...formRegister, [event.target.getAttribute('name')]: event.target.value})
  }

  useEffect(() => {
    if(formRegister.password !== '' && formRegister.confirmPassword !== '' && formRegister.password === formRegister.confirmPassword){
      setCheckPass('entering')
    } else {
      setCheckPass('')
    }
  }, [formRegister.password, formRegister.confirmPassword] )

  const submitRegister = (event) => {
    event.preventDefault()
    setSpiner(true)
    Api.post(`/membership/api/v1/member/registerV2`, formRegister)
    .then(res => {
      console.log(res)
      ModalAction({Type: "success-popup", Message: res.data.message})
      setSpiner(false)
      counterProps(null)
    })
    .catch(function (error){
      console.log(error.response)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
      setSpiner(false)
      counterProps(null)
    })
  }

  const handlecounter = () => {
    counterProps("login")
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

  const enableSamePass = {
    entering: {opacity: '1'}
  }

  return (
    <>
      <BackdropModal />
      <Transition timeout={100} in={true} appear>
        {(status) => (
          <div style={{ ...defaultStyle, ...transitionStyles[status] }} className="w-full h-full flex flex-wrap fixed z-40 overflow-y-auto py-6" data-key="exept">
            <div className="w-1/3 h-auto bg-white py-8 px-8 mx-auto my-auto flex flex-wrap">
              <p className="w-full mb-5 text-center">{DataStatic.ModalRegisterText.Text1}</p>
              <img src={LogoHnsWhite} alt="Logo" className="mx-auto mb-5 lg:w-40 w-32" />
              <TitleSection ClassName="w-full mb-3 text-2xl text-left" Text={DataStatic.ModalRegisterText.Text2} />
              <form onSubmit={submitRegister}>
                <input type="text" name="name" onChange={handleChangeForm} required className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" placeholder="Name"></input>
                <input type="email" name="email" onChange={handleChangeForm} required className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" placeholder="Email"></input>
                <input type="number" name="phone" onChange={handleChangeForm} required className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" placeholder="Phone Number"></input>
                <input type="number" name="telephone" onChange={handleChangeForm} required className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" placeholder="Telephone Number"></input>
                <input type="password" name="password" onChange={handleChangeForm} required className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" placeholder="Password"></input>
                <input type="password" name="confirmPassword" onChange={handleChangeForm} className="w-full border-b border-solid border-gray-300 py-3 mb-1 focus:outline-none" placeholder="Confirm Password"></input>
                <p className="text-xs color-green text-left flex" style={{ transition: 'all 0.5s ease', opacity: '0', color: '#28a745', ...enableSamePass[checkPass] }}><FaCheckCircle className="my-auto mr-1 inline" /> The password is the same</p>
                <p className="w-full text-center text-xs mt-5"><span dangerouslySetInnerHTML={{ __html: DataStatic.ModalRegisterText.Text3 }}></span> <Link to="/term-of-use" className="text-sm text-blue-500 inline">Term & Condition</Link> and<br /><Link to="/privacy-contactus" className="text-sm text-blue-500 inline">Privacy Policy</Link></p>
                <div className="w-full mt-4">
                  <button className="w-full px-5 py-1 uppercase rounded-md bg-yellow-400 text-white flex justify-center focus:outline-none"><FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Register</button>
                </div>
                <button type="button" className="focus:outline-none uppercase text-sm text-teal-400 mt-4" onClick={() => handlecounter()}>Back to login</button>
              </form>
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

export default connect(null, mapDispatchToProps)(ModalRegister)