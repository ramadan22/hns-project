import { React, useState, useEffect, useHistory } from '../libraries'
import LogoHnsWhite from '../assets/images/logo-white.png'
import { FaCheckCircle, FaSpinner } from '../components/icons'
import { Api } from '../helpers/api'
import { connect } from 'react-redux'
import { MemberLoginStatus } from '../modules/actions/Member__Action'


const ForgotPassword = ({ MemberLoginStatus, match }) => {
  const history = useHistory()
  const [checkPass, setCheckPass] = useState('')
  const [spiner, setSpiner] = useState(false)
  const [params, setParams] = useState({
    id: match.params.id,
    hash: match.params.hash,
    newPassword: '',
    confirmNewPassword: ''
  })

  const handleChange = (event) => {
    setParams({...params, [event.target.getAttribute('name')]: event.target.value})
  }

  useEffect(() => {
    if(params.newPassword !== '' && params.confirmNewPassword !== '' && params.newPassword === params.confirmNewPassword){
      setCheckPass('entering')
    } else {
      setCheckPass('')
    }
  }, [params.newPassword, params.confirmNewPassword] )

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    Api.put(`/membership/api/v1/member/setNewPassword`, params)
      .then(res => {
        history.push('/')
        setSpiner(false)
        MemberLoginStatus({ type: "success-popup", message: res.data.message, activePopupProps: "login" })
      })
      .catch(function (error) {
        console.log(error.response)
        setSpiner(false)
        MemberLoginStatus({ type: "failed-popup", message: error.response.data.message })
      })
  }

  const enableSamePass = {
    entering: {opacity: '1'}
  }

  return (
    <>
      <div className="flex flex-wrap w-full h-full fixed inset-auto overflow-auto">
        <div className="w-1/3 h-auto bg-white py-8 px-12 m-auto shadow-lg rounded-lg">
          <p className="w-full mb-5 text-center">Change Password</p>
          <img src={LogoHnsWhite} alt="Logo" className="mx-auto mb-5" />
          <div className="w-full mb-6 text-xl text-center block">please fill your new password</div>
          <form className="w-full" onSubmit={handleSubmit}>
            <input name="newPassword" onChange={handleChange} type="password" className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" required placeholder="New Password" />
            <input name="confirmNewPassword" onChange={handleChange} type="password" className="w-full border-b border-solid border-gray-300 py-3 mb-1 focus:outline-none" required placeholder="Confirm New Password" />
            <p className="text-xs color-green text-left flex" style={{ transition: 'all 0.5s ease', opacity: '0', color: '#28a745', ...enableSamePass[checkPass] }}><FaCheckCircle className="my-auto mr-1 inline" /> The password is the same</p>
            <button type="submit" className="px-6 rounded-md text-sm text-white py-1 bg-yellow-400 uppercase mx-auto mt-5 focus:outline-none flex">
              <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Change now
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  MemberLoginStatus
}

export default connect(null, mapDispatchToProps)(ForgotPassword)