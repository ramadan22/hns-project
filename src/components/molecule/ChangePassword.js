import { React, useState } from '../../libraries'
import { FaChevronLeft } from '../icons'
import { connect } from 'react-redux'
import { getData } from '../../utils/localStorage' 
import { Api } from '../../helpers/api'
import { ModalAction } from '../../modules/actions'

const ChangePassword = ({ LoginData, counter, ModalAction }) => {
  const [params, setParams] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const handleChange = (event) => {
    setParams({
      ...params,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const UserToken = getData('tokenLogin')

    Api.put(`/membership/api/v1/member/changePassword`, params, {
      headers: { 'User-Token': UserToken }
    })
    .then(res => {
      ModalAction({Type: "success-popup", Message: res.data.message})
      counter("myAccount")
    })
    .catch(function (error) {
      console.log(error.response)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
    })
  }

  const handleBack = () => {
    counter("myAccount")
  }

  return (
    <div className="rounded-lg shadow text-left xl:px-12 px-3 py-6">
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-4">
          <button className="flex flex-wrap text-teal-500 mr-auto my-auto mb-6 focus:outline-none" onClick={handleBack}>
            <FaChevronLeft className="inline mr-2 my-auto" /> Back to My Account
          </button>
          <h1 className="xl:text-3xl lg:text-2xl text-xl text-left font-bold lg:mb-8 mb-5">Change Password</h1>
          <div className="flex flex-wrap">
            <div className="sm:w-1/2 w-full sm:mb-5 mb-4 sm:pr-5">
              <label for="" className="font-bold xl:text-lg text-base">Email</label>
              <input name="email" type="email" className="w-full border px-2 py-2 border-solid border-gray-400 rounded h-10 mt-1" value={`${Object.keys(LoginData).length > 0 ? LoginData.memberEmail : ''}`} disabled />
            </div>
            <div className="sm:w-1/2 w-full sm:mb-5 mb-4 sm:pl-5">
              <label for="" className="font-bold xl:text-lg text-base">Current Password</label>
              <input name="oldPassword" type="password" onChange={handleChange} className="w-full border px-2 py-2 border-solid border-gray-400 rounded h-10 mt-1" />
            </div>
            <div className="sm:w-1/2 w-full sm:mb-5 mb-4 sm:pr-5">
              <label for="" className="font-bold xl:text-lg text-base">New Password</label>
              <input name="newPassword" type="password" onChange={handleChange} className="w-full border px-2 py-2 border-solid border-gray-400 rounded h-10 mt-1" />
            </div>
            <div className="w-1/2 mb-5 pl-5 sm:block hidden"></div>
            <div className="sm:w-1/2 w-full sm:mb-5 mb-4 sm:pr-5">
              <label for="" className="font-bold xl:text-lg text-base">Confirm Password</label>
              <input name="confirmNewPassword" type="password" onChange={handleChange} className="w-full border px-2 py-2 border-solid border-gray-400 rounded h-10 mt-1" />
            </div>
            <div className="sm:w-1/2 w-full sm:mb-5 mb-4 sm:pl-5"></div>
          </div>
          <div className="flex flex-wrap sm:mt-5 mt-0">
            <button class="px-6 rounded-md md:text-lg sm:text-base text-sm text-black py-1 uppercase ml-auto" style={{ backgroundColor: "#fed500" }}>Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  LoginData: state.LoginStatus.LoginData
})

const mapDispatchToProps = {
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)