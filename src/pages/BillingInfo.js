import { React, useEffect, useState } from '../libraries'

import { Navbar, Footer, FooterHistoryRfp, NavLeftMyAccount } from '../components/molecule'
import { TitleSection } from '../components/atom'
import { FaChevronRight, FaSpinner } from '../components/icons'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
import { ModalAction } from '../modules/actions'
import { connect } from 'react-redux'

const BillingInfo = ({ ModalAction }) => {
  const [statusButton, setStatusButton] = useState(false)
  const [spiner, setSpiner] = useState(false)
  const [params, setParams] = useState({
    billingName: "", 
    taxIdNumber: "", 
    billingAddress: "", 
    nameOfTheBank: "", 
    bankAccountNumber: "", 
    swiftCode: "", 
    bankAddress: "", 
    billingInfoRemarks: ""
  })

  useEffect(() => {
    const tokenLogin = getData("tokenLogin")
    Api.get(`/membership/api/v1/member/billing`, {headers: { 'User-Token': `${tokenLogin}` }})
    .then(res => {
      if(Object.keys(res.data.data).length > 0){
        setParams({
          billingName: res.data.data.billingName, 
          taxIdNumber: res.data.data.taxIdNumber, 
          billingAddress: res.data.data.billingAddress, 
          nameOfTheBank: res.data.data.nameOfTheBank, 
          bankAccountNumber: res.data.data.bankAccountNumber, 
          swiftCode: res.data.data.swiftCode, 
          bankAddress: res.data.data.bankAddress, 
          billingInfoRemarks: res.data.data.billingInfoRemarks
        })    
      }
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [spiner])

  const handleChange = (event) => {
    setStatusButton(true)
    setParams({
      ...params,
      [event.target.name]: event.target.value
    })
  }

  const cancelCourse = () => { 
    document.getElementById("form-billing").reset();
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const tokenLogin = getData("tokenLogin")
    cancelCourse()
    setSpiner(true)
    Api.put(`/membership/api/v1/member/updateBilling`, params, {headers: { 'User-Token': `${tokenLogin}` }})
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
          <NavLeftMyAccount activeNav="billingInfo" />
        </div>
        <div className="xl:w-9/12 md:w-8/12 w-full xl:pl-16 lg:pl-10 md:pl-6 pl-0 md:mt-0 mt-5 md:border-l border-0 border-gray-300 border-solid">
          <div className="rounded-lg shadow text-left xl:px-12 px-5 py-6">
            <div className="mb-8">
              <TitleSection Text="Billing Info" Type="3xl-large" />
            </div>
            <form onSubmit={handleSubmit} id="form-billing">
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="text" onChange={handleChange} name="billingName" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2 lg:text-base text-sm sm:mb-0 mb-2" placeholder="Billing Name" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.billingName}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="number" onChange={handleChange} name="taxIdNumber" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Tax Id Number" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.taxIdNumber}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="text" onChange={handleChange} name="billingAddress" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Billing Address" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.billingAddress}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="text" onChange={handleChange} name="nameOfTheBank" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Name Of The Bank" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.nameOfTheBank}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="number" onChange={handleChange} name="bankAccountNumber" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Bank Account Number" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.bankAccountNumber}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="number" onChange={handleChange} name="swiftCode" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Swift Code" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.swiftCode}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="text" onChange={handleChange} name="bankAddress" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Bank Address" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.bankAddress}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 lg:pl-6 sm:pl-2 sm:pr-2 mb-5">
                <div className="xl:w-1/2 sm:w-2/5 w-full text sm:order-none order-2">
                  <input autocomplete="off" type="text" onChange={handleChange} name="billingInfoRemarks" className="focus:outline-none w-full lg:text-base text-sm sm:mb-0 mb-2" placeholder="Billing Info Remarks" />
                </div>
                <div className="xl:w-1/2 sm:w-3/5 w-full justify-end flex sm:flex-wrap items-center sm:order-none order-1">
                  <p className="lg:text-base text-sm sm:mb-0 mb-2 sm:mr-0 mr-auto">{params.billingInfoRemarks}</p>
                  <FaChevronRight className="inline ml-4 text-sm" />
                </div>
              </div>
              
              <div className="w-full flex flex-wrap justify-end">
                {statusButton ? 
                <button type="submit" className="w-auto h-full px-5 py-1 uppercase rounded-md md:text-lg sm:text-base text-sm text-white flex" style={{ backgroundColor: "#fed500" }}>
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

export default connect(null, mapDispatchToProps)(BillingInfo)