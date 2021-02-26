import { React, useState, useEffect, Link, useHistory } from '../../libraries'
import { FaSearch, FaPhone, FaClock, FaChevronDown, FaBars } from '../icons'
import { Logo } from '../atom'
import { connect } from 'react-redux'
import { CreateDataLogin, ModalAction, ActivePopup, CartActionGet, MemberLoginStatus } from '../../modules/actions'
import { getData, removeData } from '../../utils/localStorage'
import { 
  BreadCrumb,  
  ModalLogin, 
  ModalRegister,
  ModalForgotPassword,
  ModalCart,
  ModalConfirmAddCart,
  ModalSearch
} from '../molecule'
import DataStatic from '../../static/Data'
import LogoHnsWhite from '../../assets/images/logoAffinitiiFontWhite.png'
import GlobalStyle from '../../assets/GlobalStyle'

import {
  IconShare,
  IconSignout,
  IconMyrfp,
  IconUser,
  IconHelpCenter,
} from '../../assets/images'

const Navbar = (props) => {

  const { 
    Type, NavActive, BreadData, 
    MemberLoginStatus,
    LoginStatus, 
    CreateDataLogin, 
    LoginDataReducer, 
    ModalAction, 
    CartActionGet, CartDataList,
    contactUs,
    modalLoginGts,
    counterModalLogin,
    ModalLoginStatus,
    ModalData
  } = props
  const [popupType, setPopupType] = useState(null)
  const [totalCart, setTotalCart] = useState('0')
  const [LoginData, setLoginData] = useState({})
  const history = useHistory()

  useEffect(() => {
    if(getData('tokenLogin') !== false)
      CreateDataLogin(getData('tokenLogin'))
      CartActionGet()
  }, [LoginStatus.statusLogin])

  useEffect(() => {
      setLoginData(LoginDataReducer)
  }, [LoginDataReducer])

  useEffect(() => {
    setTotalCart(CartDataList && CartDataList.length > 0 ? CartDataList.length : 0)
  }, [CartDataList])

  const Logout = () => {
    CreateDataLogin('')
    MemberLoginStatus(false)
    removeData('tokenLogin')
    removeData('guestId')
    removeData('guestIdRfp')
    ModalAction({Type: "success-popup", Message: "Logout successfully."})
    history.push('/')
  }

  const handleCounter = (value) => {
    setPopupType(value)
  }

  const handlePopupCart = (value) => {
    setPopupType("cart")
  }

  useEffect(() => {
    CartActionGet()
    setTimeout(()=>{
      document.addEventListener('click', handleDocumentClick);
     }, 1000)
  }, [])

  const handleDocumentClick = (evt) => {
    if(evt.target.getAttribute("data-key") === "exept"){
      setPopupType(null)
      ModalAction(null)
      if(counterModalLogin){
        counterModalLogin(false)
      }
    }
  }

  useEffect(() => {
    if(modalLoginGts){
      setPopupType('login')
    }
  }, [modalLoginGts])

  useEffect(() => {
    if(ModalLoginStatus){
      setPopupType('login')
    }
  }, [ModalLoginStatus])

  useEffect(() => {
    if(ModalData !== null){
      setPopupType(`${ModalData.Type}`)
    } else {
      setPopupType(null)
    }
  }, [ModalData])

  // useEffect(() => {
  //   console.log("popupType", popupType)
  // }, [popupType])

  const PopupModal = () => {
    let component = ""
    if(popupType !== null && popupType === "login")
      component = <ModalLogin counterProps={(value) => handleCounter(value)} />
    else if(popupType !== null && popupType === "register")
      component = <ModalRegister counterProps={(value) => handleCounter(value)} />
    else if(popupType !== null && popupType === "forgot-password")
      component = <ModalForgotPassword counterProps={(value) => handleCounter(value)} />
    else if(popupType !== null && popupType === "confirm-add-cart" && ModalData !== null)
      component = <ModalConfirmAddCart data={ModalData.data} counterProps={(value) => handleCounter(value)} />
    else if(popupType !== null && popupType === "cart")
      component = <ModalCart counterProps={(value) => handleCounter(value)} />
    else if(popupType !== null && popupType === "modal-search")
      component = <ModalSearch counterProps={(value) => handleCounter(value)} />
    return component
  }

  const handlePopupSearch = () => {
    setPopupType("modal-search")
  }

  return (
    <>
      {popupType !== null || ModalData !== null ? (
        <GlobalStyle overflow={'hidden'} paddingRight={"17px"} />
      ) : (
        <GlobalStyle overflow={'auto'} paddingRight={"0px"} />
      )}
      <PopupModal />

      <div className={`w-full ${Type === "rfp" ? "py-8" : "lg:pt-3 pt-6 pb-0"} ${(Type === 'home') ? 'navbar bg-transparent absolute top-0 z-10' : 'bg-backgroundNavbar'} text-white md:mb-10 mb-5`}>
        <div className="lg:container mx-auto xl:px-10 px-5 flex flex-wrap">
          <div className={`lg:w-full md:w-1/2 sm:w-2/12 w-1/2 lg:mb-0 md:mb-5 mb-0 lg:order-1 md:order-2 order-3 md:flex-none flex ${Type === "rfp" && "hidden"}`}>
            <div className="w-full flex md:mb-2 sm:my-auto my-0 sm:text-center text-right items-center justify-end">
              <FaSearch className="pr-1 text-xl cursor-pointer sm:ml-auto ml-5" onClick={handlePopupSearch} />
              <FaBars className="md:hidden inline sm:ml-auto ml-5" />
            </div>
          </div>
          <div className="flex items-center lg:w-1/6 md:w-1/2 sm:w-4/12 w-1/2 lg:mb-0 md:mb-5 mb-0 text-left lg:order-2 md:order-1 order-1">
            <Link to="" className="focus:outline-none">
              {Type === "home" ?
                <img src={LogoHnsWhite} alt="logo hns" className="w-40" /> :
                <Logo />
              }
            </Link>
          </div>
          <div className="lg:w-3/6 md:w-7/12 w-full lg:pl-10 pl-0 md:mt-0 mt-6 uppercase xl:flex-none flex md:order-3 order-4">
            <div className={`w-full flex flex-wrap items-center xl:my-0 my-auto md:inline-flex hidden ${Type === "rfp" && "hidden"}`}>
              <Link className={`xl:text-sm text-xs md:w-auto w-full md:text-center text-left md:mt-0 mt-5 ${NavActive === "home" ? "text-yellow-500" : "text-white"} lg:mr-8 mr-5`} to="">MEETING SPACES</Link>
              <Link className={`xl:text-sm text-xs md:w-auto w-full md:text-center text-left md:mt-0 mt-5 ${NavActive === "landing" ? "text-yellow-500" : "text-white"} lg:mr-8 mr-5`} to="/landing">GROUND TRANSPORT SERVICE</Link>
              <Link className={`xl:text-sm text-xs md:w-auto w-full md:text-center text-left md:mt-0 mt-5 ${NavActive === "deals" ? "text-yellow-500" : "text-white"} lg:mr-8 mr-5`} to="/deals">{DataStatic.NavbarLinkText.Text2}</Link>
              <Link className={`xl:text-sm text-xs md:w-auto w-full md:text-center text-left md:mt-0 mt-5 ${NavActive === "blog" ? "text-yellow-500" : "text-white"} lg:mr-8 mr-5`} to="/blog">{DataStatic.NavbarLinkText.Text3}</Link>
            </div>
          </div>
          <div className="flex flex-wrap lg:w-2/6 md:w-5/12 sm:w-6/12 w-full md:order-4 sm:order-2 order-5 sm:mb-0 mb-5">
            <div className={`w-full flex flex-wrap sm:justify-center justify-start ${Type === "rfp" && "hidden"}`}>
              <div className="md:hidden sm:block hidden w-1/12"></div>
              <div className="flex items-center xl:px-2 pr-2 sm:w-7/12 w-1/2 text-right z-20">
                <button onClick={CartDataList.length > 0 ? handlePopupCart : undefined} className={`w-full border-t border-l border-b ${CartDataList.length < 1 ? "border-r rounded" : "rounded-tl rounded-bl"} xl:text-base text-xs border-solid border-gray-300 py-1 lg:px-4 sm:px-2 px-1 focus:outline-none`}>Venue List</button>
                {CartDataList.length > 0 ?
                 <button onClick={handlePopupCart} className="focus:outline-none rounded-tr rounded-br border-t border-b border-r border-solid border-white text-black text-bold py-1 px-3 xl:text-base text-xs" to="#" style={{ backgroundColor: "#fed500" }}>{`${totalCart}`}</button> : ("")
                }
              </div>
              <div className="flex items-center justify-center xl:px-2 pl-2 sm:w-4/12 w-1/2 sm:text-right text-center">
                {Object.keys(LoginData).length < 1 ?
                  <button className="w-full py-1 rounded-md bg-white text-black focus:outline-none xl:text-base text-xs" onClick={() => handleCounter("login")}>{DataStatic.NavbarButtonLogAndReq.Button2}</button> :
                  Object.keys(LoginData).length > 0 ? (
                    <div className="flex flex-wrap group relative z-10 items-center cursor-pointer text-center text-yellow-500">
                      <p className="w-full xl:text-base text-sm">{LoginData.name.split(" ").map((res, index) => (index === 0 ? (res.length > 7 ? res.substring(0, 7)+".." : res) : ""))} <FaChevronDown className="text-white inline ml-3 text-xs" /></p>
                      <div className="w-48 absolute hidden group-hover:block pt-10 z-20 top-0 right-0">
                        <div className="w-full bg-backgroundNavbar opacity-75 border border-solid border-white flex flex-wrap ml-auto pt-4 pb-2">
                          <Link to="/my-history-rfp" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300">
                            <img src={IconMyrfp} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text1}
                          </Link>
                          <Link to="/my-account" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300">
                            <img src={IconUser} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text2}
                          </Link>
                          <Link to="" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300">
                            <img src={IconShare} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text3}
                          </Link>
                          <Link to="" className="w-full text-sm text-left text-white py-2 px-3 hover:bg-blue-300">
                            <img src={IconHelpCenter} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text4}
                          </Link>
                          <button onClick={Logout} className="w-full text-sm border-t border-gray-300 border-solid text-left text-white mt-2 py-2 px-3 hover:bg-blue-300">
                            <img src={IconSignout} alt="icon dropdown" className="inline mr-2" /> {DataStatic.DropdownAccount.Text5}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : ('')
                }
              </div>
            </div>
            {Type === "rfp" &&
              <div className="w-full pl-24 ml-auto text-left">
                <p className="text-md mb-1">Need Help?</p>
                <p className="text-sm mb-1 flex items-center">
                  {contactUs !== null && (
                    <>
                      <a href={`tel:${contactUs.phone.replace('-', '')}`}><FaPhone className="inline mr-2 text-xs text-yellow-300" /> {contactUs.phone}</a>
                    </>
                  )}
                </p>
                <p className="text-sm flex items-center"> 
                  {contactUs !== null && (
                    <>
                      <FaClock className="inline mr-2 text-xs text-yellow-300" />
                      {contactUs.startTimeOperation.substring(0,5)} - {contactUs.endTimeOperation.substring(0,5)}
                    </>  
                  )}
                </p>
              </div>
            }
          </div>
          {Type !== "home" && Type !== "rfp" &&
            <div className="w-full flex flex-column lg:mt-12 md:mt-8 mt-0 lg:mb-5 md:mb-3 mb-2 sm:order-5 order-last">
              <BreadCrumb BreadData={BreadData} />
            </div>
          }
        </div>
      </div>
    </>
  )
}

Navbar.defaultProps = {
  Type: "",
  NavActive: ""
}

const mapStateToProps = (state) => ({
  LoginStatus: state.LoginStatus,
  LoginDataReducer: state.LoginStatus.LoginData,
  CartDataList: state.CartDataList.data,
  contactUs: state.ContactUs.data,
  ModalLoginStatus: state.ModalLogin.data,
  ModalData: state.ModalReducer.data
})

const mapDispatchToProps = {
  CreateDataLogin,
  ModalAction,
  ActivePopup,
  CartActionGet,
  MemberLoginStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)