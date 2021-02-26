import { React, Link, useEffect, useState } from '../../libraries'
import { TitleFooterSection, Logo, HandleError } from '../atom'
import { FaSpinner } from '../../components/icons'
import { Api } from '../../helpers/api'
import { connect } from 'react-redux'
import { ModalAction } from '../../modules/actions'

const Footer = ({ contactUs, ModalAction }) => {
  const [spiner, setSpiner] = useState(false)
  const [socialMedia, setSocialMedia] = useState([])
  const [subscribeFooter, setSubscribeFooter] = useState(null)
  const [aboutUs, setAboutUs] = useState({})
  const [subscribeVal, setSubscribeVal] = useState("")

  const subscribeText = (event) => {
    setSubscribeVal(event.target.value)
  }

  const submitSub = () => {
    setSpiner(true)
    Api.post(`/notification/api/v1/subscribe/subscribe`, {email: subscribeVal})
    .then(res => {
      setSpiner(false)
      setSubscribeVal("")
      ModalAction({Type: "success-popup", Message: res.data.message})
    })
    .catch(function (error) {
      setSpiner(false)
      setSubscribeVal("")
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
    })
  }

  useEffect(() => {
    Api.get(`/master/api/v1/socialMedia/fetch`)
    .then(res => {
      setSocialMedia(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    Api.get(`/master/api/v1/subscribeFooter/fetch`)
    .then(res => {
      setSubscribeFooter(res.data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    Api.get(`/master/api/v1/aboutUs/fetch`)
      .then((response) => {
        setAboutUs(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <div className="lg:container mx-auto footer py-5 lg:px-10 px-5 sm:mt-16 mt-5 flex flex-wrap">
      <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full text-left lg:pr-0 pr-6">
        <TitleFooterSection text="About Paragon" />
        <Logo Type="white" />
        {Object.keys(aboutUs).length > 0 ? 
          <div className="text-xs mt-2 leading-tight" dangerouslySetInnerHTML={{ __html:aboutUs.footerDescription }}></div>    
        : "" }
      </div>
      <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full text-left lg:pl-10 pl-0 sm:mt-0 mt-5">
        <TitleFooterSection text="Contact Us" />
        {contactUs !== null ?
          <p className="text-sm mb-3">Questions? Call <a href={`tel:${contactUs.phone.replace("-", "")}`} style={{ color: "#92a1c0" }}>{contactUs.phone}</a></p>
        : ""}
        <div className="flex sm:flex-wrap flex-wrap text-xs">
          <p className="md:w-1/2 sm:w-1/2 w-auto md:pr-0 pr-5 mb-2">
            <Link className="text-xs text-black hover:underline" to="/faq">FAQ</Link>
          </p>
          <p className="md:w-1/2 sm:w-1/2 w-auto md:pr-0 pr-5 mb-2 text-left">
            <Link className="text-xs text-black hover:underline" to="/privacy-contactus">Contact Us</Link>
          </p>
          <p className="md:w-1/2 sm:w-1/2 w-auto md:pr-0 pr-5 mb-2">
            <Link className="text-xs text-black hover:underline" to="/privacy-contactus">Privacy</Link>
          </p>
          <p className="md:w-1/2 sm:w-1/2 w-auto md:pr-0 pr-5 mb-2 text-left">
            <Link className="text-xs text-black hover:underline" to="">Send meeting request</Link>
          </p>
          <p className="md:w-1/2 sm:w-1/2 w-auto md:pr-0 pr-5 mb-2">
            <Link className="text-xs text-black hover:underline" to="/term-of-use">Term of Use</Link>
          </p>
          <p className="md:w-1/2 sm:w-1/2 w-auto md:pr-0 pr-5 mb-2 text-left">
            <Link className="text-xs text-black hover:underline" to="">Hotelers access</Link>
          </p>
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full text-left lg:pl-10 pl-0 lg:pr-0 pr-0 md:pl-6 pl-0 sm:mt-0 mt-5">
        {subscribeFooter !== null ? 
          <TitleFooterSection text={`${subscribeFooter.title}`} />
        : ("")}
        <div className="relative shadow-lg">
          <input type="search" onChange={subscribeText} value={subscribeVal} className="w-full rounded shadow text-xs border-0 focus:outline-none pl-3 pr-20 py-2" placeholder="Enter Your Email" />
          <div className="w-20 absolute pin-r pin-t top-0 right-0 flex text-xs text-white px-3 h-full cursor-pointer" onClick={submitSub} style={{ backgroundColor: "#fed500" }}>
            {spiner ? 
              <FaSpinner className={`icon-spin inline m-auto`} /> :
            <span className="m-auto">EMAIL ME</span> }
          </div>
        </div>
        {subscribeFooter !== null ? 
          <div className="text-xs mt-5 leading-tight" dangerouslySetInnerHTML={{ __html:subscribeFooter.content }}></div>
        : ("")}
      </div>
      <div className="lg:w-1/4 md:w-full sm:w-1/2 w-full text-left lg:pl-10 pl-0 lg:mt-0 mt-5 text-center">
        <h4 className="text-md uppercase font-bold mb-3 md:text-center text-left">Let's Get Social</h4>
        <div className="flex items-center mt-3 md:justify-center justify-left">
          {socialMedia.length > 0 ? 
            socialMedia.map((res, index) => {
              return (
                <a href={`${res.link}`} target="_blank" className="w-4 mx-2" key={index}>
                  <img src={`${res.icon}`} onError={HandleError} alt={`${res.name}`} className="w-full" />
                </a> )
            })
          : ("")}
        </div>
        <p className="text-base md:mt-3 mt-4 font-bold md:text-center text-left">Feel Free to send us a message</p>
        {contactUs !== null ?
          <p className="text-sm md:mt-4 mt-1 md:text-center text-left"><a href={`mailto:${contactUs.email}`} style={{ color: "#92a1c0" }}>{contactUs.email}</a></p>
        : "" }
      </div>
      <div className="w-full sm:text-sm text-xs text-center sm:mt-12 mt-8 sm:mb-8 mg-4 text-teal-600">
        &copy; Copyright 2020. City Tours & Car Rentals Pte Ltd. All Rights Reserved.
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  contactUs: state.ContactUs.data
})

const mapDispatchToProps = {
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)