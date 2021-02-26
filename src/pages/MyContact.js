import { React, useEffect, useState, useRef } from '../libraries'

import { Navbar, Footer, FooterHistoryRfp, ModalForgotPassword, NavLeftMyAccount } from '../components/molecule'
import { TitleSection } from '../components/atom'
import { FaChevronRight, FaChevronDown, FaSpinner } from '../components/icons'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
import { ModalAction } from '../modules/actions'
import { connect } from 'react-redux'
import '../assets/styles/RemoveArrowOption.css'

const MyContact = ({ ModalAction }) => {
  const [statusButton, setStatusButton] = useState(false)
  const [spiner, setSpiner] = useState(false)
  const [params, setParams] = useState({
    salutation: "", 
    firstName: "", 
    lastName: "", 
    department: "", 
    position: "", 
    email: "", 
    officeNumber: "", 
    mobileNumber: "", 
    remarks: "", 
    rfpEmails: ""
  })

  useEffect(() => {
    const tokenLogin = getData("tokenLogin")
    Api.get(`/membership/api/v1/member/contact`, {headers: { 'User-Token': `${tokenLogin}` }})
    .then(res => {
      if(Object.keys(res.data.data).length > 0){
        setParams({
          salutation: res.data.data.salutation, 
          firstName: res.data.data.firstName, 
          lastName: res.data.data.lastName, 
          department: res.data.data.department, 
          position: res.data.data.position, 
          email: res.data.data.email, 
          officeNumber: res.data.data.officeNumber, 
          mobileNumber: res.data.data.mobileNumber, 
          remarks: res.data.data.remarks, 
          rfpEmails: res.data.data.rfpEmails
        })
      }
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [spiner])

  const cancelCourse = () => { 
    document.getElementById("form-contact").reset();
  }

  const handleChange = (event) => {
    let val
    setStatusButton(true)
    if(event.target.getAttribute('type') === "checkbox"){
      if(event.target.checked){
        val = "1"
      } else {
        val = "0"
      }
    } else {
      val = event.target.value
    }

    setParams({
      ...params,
      [event.target.name]: val
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const tokenLogin = getData("tokenLogin")
    cancelCourse()
    setSpiner(true)
    Api.put(`/membership/api/v1/member/updateContact`, params, {headers: { 'User-Token': `${tokenLogin}` }})
    .then(res => {
      setStatusButton(false)
      setSpiner(false)
      ModalAction({Type: "success-popup", Message: res.data.message})
    })
    .catch(function (error) {
      setStatusButton(false)
      setSpiner(false)
      console.log(error.response)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
    })
  }

  return (
    <>
      <Navbar />
      <div className="lg:container lg:mx-auto lg:px-10 px-5 flex flex-wrap md:mb-20 sm:mb-16 mb-10">
        <div className="xl:w-3/12 md:w-4/12 w-full text-left sm:pr-5 pr-0">
          <NavLeftMyAccount activeNav="contact" />
        </div>
        <div className="xl:w-9/12 md:w-8/12 w-full xl:pl-16 lg:pl-10 md:pl-6 pl-0 md:mt-0 mt-5 md:border-l border-0 border-gray-300 border-solid">
          <div className="rounded-lg shadow text-left xl:px-12 px-3 py-6">
            <div className="mb-8">
              <TitleSection Text="Contact" Type="3xl-large" />
            </div>
            <form onSubmit={handleSubmit} id="form-contact">
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2 relative">
                  <select onChange={handleChange} value={params.salutation} defaultValue={params.salutation} type="text" name="salutation" placeholder="salutation" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2">
                    <option value="" hidden>Salutation</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                  </select>
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">Salutation</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="text" name="firstName" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="First Name" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.firstName}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="text" name="lastName" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Last Name" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.lastName}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="text" name="department" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Department" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.department}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="text" name="position" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Position" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.position}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="email" name="email" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Email" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.email}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="number" name="officeNumber" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Office Number" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.officeNumber}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="number" name="mobileNumber" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Mobile Number" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.mobileNumber}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" onChange={handleChange} type="text" name="remarks" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Remarks" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.remarks}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2-left flex">
                  <input autocomplete="off" onChange={handleChange} value={params.rfpEmails} checked={params.rfpEmails === "1" ? true : false} type="checkbox" name="rfpEmails" className="focus:outline-none my-auto" placeholder="Rfp Emails" />
                  <span className="ml-4 my-auto">Check</span>
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">Use contact information for transaction</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full flex flex-wrap justify-end">
                {statusButton ?
                  <button type="submit" className="w-auto h-full px-5 py-1 uppercase rounded-md md:text-lg sm:text-base text-sm text-white" style={{ backgroundColor: "#fed500" }}>
                    <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Save
                  </button>
                : ""}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-20 mb-10 pb-10 border-b border-solid border-gray-300">
        <FooterHistoryRfp />
      </div>
      <Footer />
    </>
  )
}

const mapDispatchToProps = {
  ModalAction
}

export default connect(null, mapDispatchToProps)(MyContact)