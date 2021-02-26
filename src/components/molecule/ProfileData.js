import { React, useState, useEffect } from '../../libraries'

import { HandleError } from '../atom'
import { FaChevronRight, FaSpinner } from '../icons'
import { connect } from 'react-redux'
import { ApiImage } from '../../helpers/api'
import { getData } from '../../utils/localStorage'
import { ModalAction, CreateDataLogin } from '../../modules/actions'

const ProfileData = ({ LoginData, ModalAction, CreateDataLogin, counter }) => {
  const [spiner, setSpiner] = useState(false)
  const [enableButton, setEnableButton] = useState('')
  const [addressValue, setAddressValue] = useState('')
  const [params, setParams] = useState({
    name: '',
    // email: '',
    phone: '',
    telephone: '',
    company: '',
    address: '',
    image: ''
  })
  const [imagePreview, setImagePreview] = useState("")
  const [imagePreviewShow, setImagePreviewShow] = useState("")

  const enableSubmit = () => {
    if (params.name === '' && params.email === '' && params.phone === '' && params.telephone === '' && params.company === '' && params.address === '' && params.image === '')
      setEnableButton('')
    else
      setEnableButton('entering')
  }

  // const cancelCourse = () => { 
  //   document.getElementById("form-contact").reset();
  // }

  useEffect(() => {
    enableSubmit()
  }, [params])

  const handleChange = (event) => {
    if (event.target.getAttribute('name') === 'image') {
      let urlImage = URL.createObjectURL(event.target.files[0])
      console.log(event.target.files[0])
      setImagePreview(urlImage)
      setParams({ ...params, [event.target.getAttribute('name')]: event.target.files[0] })
    } else {
      setParams({ ...params, [event.target.getAttribute('name')]: event.target.value })
    }

    if(event.target.getAttribute('name') === 'address')
      setAddressValue(`${event.target.value}`)
  }

  const styleEnableButton = {
    entering: { opacity: '1' }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    const UserToken = getData('tokenLogin')
    let formData = new FormData()
    formData.append("name", params.name)
    // formData.append("email", params.email)
    formData.append("phone", params.phone)
    formData.append("telephone", params.telephone)
    formData.append("company", params.company)
    formData.append("address", params.address)
    formData.append("image", params.image)
    ApiImage.post(`/membership/api/v1/member/updateProfile`, formData, {
      headers: { 'User-Token': UserToken }
    })
    .then(res => {
      console.log(res)
      // cancelCourse()
      setSpiner(false)
      CreateDataLogin(UserToken)
      ModalAction({Type: "success-popup", Message: res.data.message})
    })
    .catch(function (error) {
      console.log(error)
      setSpiner(false)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
      setImagePreviewShow(Object.keys(LoginData).length > 0 ? LoginData.image : '')
    })
  }

  useEffect(() => {
    setParams({
      ...params,
      name: LoginData.name,
      // email: '',
      phone: LoginData.phone,
      telephone: LoginData.telephone,
      company: LoginData.company,
    })
    setAddressValue(`${Object.keys(LoginData).length > 0 ? LoginData.address : ''}`)
  }, [LoginData])

  useEffect(() => {
    if (imagePreview !== "")
      setImagePreviewShow(imagePreview);
    else
      setImagePreviewShow(Object.keys(LoginData).length > 0 ? LoginData.image : '')
  }, [LoginData, imagePreview])

  const handleChangePass = () => {
    counter("changePass")
  }

  return (
    <>
      <div className="rounded-lg shadow text-left xl:px-12 px-3 py-6">
        <form onSubmit={handleSubmit} id="form-contact">
          <div className="w-full flex flex-wrap items-center xl:pr-0 sm:pr-3 pr-0">
            <img
              src={`${imagePreviewShow}`}
              onError={HandleError}
              alt="profile"
              className="border border-solid border-gray-300 rounded-full lg:w-24 lg:h-24 sm:w-20 w-24 sm:h-20 h-24 sm:mx-0 mx-auto object-cover"
              style={{ backgroundSize: '100% 100%' }} />
            <div className="sm:w-auto w-full sm:pl-4 pl-0 sm:ml-0 ml-auto sm:text-left text-center">
              <div className="relative overflow-hidden inline-block">
                <p className="sm:py-2 pt-2 pb-1 px-3 font-bold lg:text-base text-sm" style={{ color: "#fbdd50" }}>Change Photo</p>
                <input type="file" name="image" onChange={handleChange} className="absolute left-0 top-0 opacity-0 w-full h-full" />
              </div>
            </div>
            <button className="sm:w-auto w-full ml-auto focus:outline-none lg:text-base text-sm" onClick={handleChangePass}>Change Password</button>
          </div>
          <div className="w-full mt-8">
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
              <div className="xl:w-1/2 sm:w-2/5 w-full text">
                <p className="lg:text-base text-sm sm:mb-0 mb-2">User ID</p>
              </div>
              <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center">
                <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{`${Object.keys(LoginData).length > 0 ? LoginData.memberProfileId : ''}`}</p>
                <FaChevronRight className="inline ml-4 text-sm" />
              </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
              <div className="xl:w-1/2 sm:w-2/5 w-full text">
                {/* <input type="text" onChange={handleChange} name="name" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Name" /> */}
                <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">Name</p>
              </div>
              <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center">
                {/* <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{`${Object.keys(LoginData).length > 0 ? LoginData.name : ''}`}</p> */}
                <input type="text" onChange={handleChange} name="name" value={params.name} className="focus:outline-none w-1/2 lg:text-base text-sm text-right sm:mb-0 mb-2" placeholder="Name" />
                <FaChevronRight className="inline ml-4 text-sm" />
              </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
              <div className="xl:w-1/2 sm:w-2/5 w-full text">
                {/* <input type="text" onChange={handleChange} name="email" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Email" readOnly /> */}
                <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">Email</p>
              </div>
              <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center">
                <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{`${Object.keys(LoginData).length > 0 ? LoginData.memberEmail : ''}`}</p>
                <FaChevronRight className="inline ml-4 text-sm" />
              </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
              <div className="xl:w-1/2 sm:w-2/5 w-full text">
                {/* <input type="number" onChange={handleChange} name="phone" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Phone Number" /> */}
                <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">Phone Number</p>
              </div>
              <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center">
                <input type="number" onChange={handleChange} name="phone" value={params.phone} className="focus:outline-none w-1/2 lg:text-base text-sm text-right sm:mb-0 mb-2" placeholder="Phone Number" />
                <FaChevronRight className="inline ml-4 text-sm" />
              </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
              <div className="xl:w-1/2 sm:w-2/5 w-full text">
                <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">Telephone Number</p>
                {/* <input type="number" onChange={handleChange} name="telephone" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Telephone Number" /> */}
              </div>
              <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center">
                <input type="number" onChange={handleChange} name="telephone" value={params.telephone} className="focus:outline-none w-1/2 lg:text-base text-sm text-right sm:mb-0 mb-2" placeholder="Telephone Number" />
                <FaChevronRight className="inline ml-4 text-sm" />
              </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
              <div className="xl:w-1/2 sm:w-2/5 w-full text">
                <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">Company</p>
                {/* <input type="text" onChange={handleChange} name="company" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Company" /> */}
              </div>
              <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center">
                <input type="text" onChange={handleChange} name="company" value={params.company} className="focus:outline-none w-1/2 lg:text-base text-sm text-right sm:mb-0 mb-2" placeholder="Company" />
                <FaChevronRight className="inline ml-4 text-sm" />
              </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
              <p className="w-11/12 text-sm mb-1">Address</p>
              <div className="w-11/12">
                <textarea type="text" onChange={handleChange} name="address" value={addressValue} className="resize-none lg:text-base text-sm sm:mb-0 mb-2 focus:outline-none w-2/3 lg:h-32 h-20" placeholder="Your Address" />
              </div>
              <FaChevronRight className="inline ml-auto text-sm" />
            </div>
            <div className="w-full flex flex-wrap pb-3 pl-6 pr-2">
              <button style={{ opacity: '0', transition: 'opacity 0.5s ease', ...styleEnableButton[enableButton], backgroundColor: "#fed500" }} className="px-6 rounded-md text-sm text-white py-1 uppercase ml-auto flex">
                <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  LoginData: state.LoginStatus.LoginData
})

const mapDispatchToProps = {
  ModalAction,
  CreateDataLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileData)