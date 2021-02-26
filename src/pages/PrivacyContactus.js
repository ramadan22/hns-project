import { React, useEffect, useState } from '../libraries'
import { Navbar, Footer } from '../components/molecule'
import { Api } from '../helpers/api'

const PrivacyContactus = () => {
  const [privacyData, setPrivacyData] = useState(null)
  const [contactUsData, setContactUsData] = useState(null)

  const getPrivacy = () => {
    Api.get('/master/api/v1/privacy/fetch')
      .then(res => {
        setPrivacyData(res.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const getContactus = () => {
    Api.get('/master/api/v1/contactUs/fetch')
      .then(res => {
        setContactUsData(res.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    getPrivacy()
  }, [])

  useEffect(() => {
    getContactus()
  }, [])

  return (
    <>
      <Navbar BreadData={"Home,Privacy Contactus"} />
      <div className="lg:container mx-auto lg:px-10 px-5 flex flex-wrap">
        <h3 className="w-full text-3xl text-left text-yellow-500 font-bold">{`${privacyData !== null ? privacyData.title : ''}`}</h3>
        <div className="text-left text-sm mt-2" style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{__html: `${privacyData !== null ? privacyData.content : ''}`}}></div>
        <h3 className="w-full text-2xl text-left font-bold mt-6">{`${contactUsData !== null ? contactUsData.title : ''}`}</h3>
        <div className="text-left text-sm mt-2" style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{__html: `${contactUsData !== null ? contactUsData.content : ''}`}}></div>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyContactus