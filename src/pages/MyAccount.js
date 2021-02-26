import { React, Link, useHistory, useEffect, useState } from '../libraries'
import { connect } from 'react-redux'
import { getData } from '../utils/localStorage'

import { Navbar, Footer, ProfileData, ChangePassword, NavLeftMyAccount } from '../components/molecule'

const MyAccount = ({LoginData}) => {
  const history = useHistory()
  const [content, setContent] = useState("myAccount")
  
  useEffect(() => {
    if(Object.keys(LoginData).length < 1 && getData('tokenLogin') === false)
      history.push(`/`);
  }, [LoginData, history])

  const handleCounter = (value) => {
    setContent(value)
  }

  return (
    <>
      <Navbar />
      <div className="lg:container lg:mx-auto lg:px-10 px-5 flex flex-wrap md:mb-20 sm:mb-16 mb-10">
        <div className="xl:w-3/12 md:w-4/12 w-full text-left sm:pr-5 pr-0">
          <NavLeftMyAccount activeNav="myAccount" />
        </div>
        <div className="xl:w-9/12 md:w-8/12 w-full xl:pl-16 lg:pl-10 md:pl-6 pl-0 md:mt-0 mt-5 md:border-l border-0 border-gray-300 border-solid">
          {content === "myAccount" ? <ProfileData counter={(value) => handleCounter(value)} /> : <ChangePassword counter={(value) => handleCounter(value)} />}
        </div>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  LoginData: state.LoginStatus.LoginData
})

export default connect(mapStateToProps)(MyAccount)