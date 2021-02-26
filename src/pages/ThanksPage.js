import { React, Link, useEffect, useState, useLocation } from '../libraries'

import { Navbar, FooterHistoryRfp, Footer } from '../components/molecule'
import { LogoWhite } from '../assets/images'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'

const ThanksPage = () => {
  const location = useLocation()

  return (
    <>
      <Navbar Type="rfp" />
      <div className="mt-10 mb-6 flex">
        <img src={LogoWhite} alt="logo white" className="mx-auto w-32" />
      </div>
      <p className="text-center">Thank You! We have received your event inquiry.</p>
      <div className="flex flex-wrap mt-10">
        <div className="flex mx-auto text-center">
          <p className="font-bold uppercase my-auto">Your {`${location.state && location.state.type === "gts" ? "GTS" : ""}${location.state && location.state.type === "rfp" ? "RFP" : ""}`} Id :</p>
          <div className="ml-2 border-4 border-dotted border-gray-300 bg-gray-200 px-5 py-2">{location.state && location.state.code !== "" ? location.state.code : ""}</div>
        </div>
        <div className="w-full flex flex-wrap mx-auto text-center">
          <p className="w-full mt-10">We are currently reviewing your event requirements and will send them shortly to the selected venues for an express qoute.</p>
          <p className="w-full mt-2">You may check on the latest update on the proposals by clicking on the link provided in your email.</p>
          <Link to="/" className="uppercase text-white mt-10 mx-auto focus:outline-none py-2 px-5 rounded" style={{ backgroundColor: "#fed500" }}>Back To Home</Link>
        </div>
      </div>
      <div className="mt-20 mb-10 pb-10 border-b border-solid border-gray-300">
        <FooterHistoryRfp />
      </div>
      <Footer />
    </>
  )
}

export default ThanksPage