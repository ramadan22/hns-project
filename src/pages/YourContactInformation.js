import { React, useState, useEffect, Link, useHistory } from '../libraries'
import { PanelTitleStep } from '../components/atom'
import { FaSpinner } from '../components/icons'
import { Navbar, Footer, ModalRfpNonHotel } from '../components/molecule'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
import { ModalAction } from '../modules/actions'
import { connect } from 'react-redux'

const YourContactInformation = ({ ModalAction, LoginData }) => {
  const [modalRfp, setModalRfp] = useState(false)
  const [statusModal, setStatusModal] = useState(false)
  const [spiner, setSpiner] = useState(false)
  const [state, setState] = useState({
    salutation: 'Mr',
    firstname: '',
    lastname: '',
    companyName: '',
    eventName: '',
    email: '',
    phone: ''
  })
  const history = useHistory()
  const _handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const _handleSubmit = (event) => {
    event.preventDefault()
    if(Object.keys(LoginData).length < 1){
      setStatusModal(false)
    }
    setSpiner(true)
    if(getData('tokenLogin')){
      Api.post('/supplier/api/v2/rfp/contact', {...state, guestId: getData("guestIdRfp") ? getData("guestIdRfp") : ""}, {
        headers: { 'User-Token': getData('tokenLogin') }
      })
        .then(res => {
          storeApi()
        })
        .catch(function (error) {
          setSpiner(false)
          ModalAction({Type: "failed-popup", Message: error.response.data.message})
        })
    } else {
      setSpiner(false)
			setStatusModal(true)
    } 
  }

  const _getContact = () => {
    Api.get('/membership/api/v1/member/contact', {
      headers: { 'User-Token': getData('tokenLogin') }
    })
      .then(res => {
        const { data } = res.data
        const {
          salutation,
          firstName,
          lastName,
          mobileNumber,
          email
        } = data
        data.length !== 0 && (
          setState({
            salutation: salutation,
            firstname: firstName,
            lastname: lastName,
            email,
            phone: data.mobileNumber
          })
        )
      })
      .catch(err => console.log(err.response.data.message))
  }

  const storeApi = () => {
    Api.post(`/supplier/api/v2/rfp/store${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, {}, {
      headers: { 'User-Token': getData('tokenLogin') }
    })
    .then(res => {
        setSpiner(false)
        Api.post('/supplier/api/v1/rfp/clean', {}, {
          headers: { 'User-Token': getData('tokenLogin') }
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err.response.data.message))
        history.push('/thank-you', {
          type: "rfp",
          code: res.data.data.rfpCode
        })
      }
    )
    .catch(function (error) {
      setSpiner(false)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
    })
  }

  // const cleanRfp = () => {
  //   Api.post('/supplier/api/v1/rfp/clean', {}, {
  //     headers: { 'User-Token': getData('tokenLogin') }
  //   })
  //     .then(res => {
  //       history.push('/thank-you', {
  //         type: "",
  //         code: 
  //       })
  //     })
  //     .catch(err => console.log(err.response.data.message))
  // }

  useEffect(() => {
    _getContact()
    setTimeout(() => {
      document.addEventListener('click', handleDocumentClick);
    }, 1000)
  }, [])

  const handleDocumentClick = (evt) => {
    if (evt.target.getAttribute("data-key") === "exept") {
      setModalRfp(false)
    }
  }

  const handleCounter = () => {
		setStatusModal(false)
  }
  
  return (
    <>
      <Navbar Type="rfp" counterModalLogin={(value) => handleCounter(value)} modalLoginGts={statusModal} />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <PanelTitleStep Text="1. Select Venue/Hotel" />
        <PanelTitleStep Text="2. Event Details" />
        <PanelTitleStep Text="3. Select a Package" />
        <PanelTitleStep Text="4. Event Schedule" />
        <div className="w-full border-b-2 border-dotted border-teal-200 mt-5 mb-3"></div>
        <h3 className="font-bold text-2xl mb-6">Your Contact Information</h3>
        <form onSubmit={_handleSubmit}>
          <div className="w-full flex flex-wrap text-left">
            <div className="w-1/2 pr-10 mb-5">
              <p className="mb-2 font-bold">First Name</p>
              <div className="flex flex-wrap">
                <div className="w-1/6">
                  <select className="w-full py-1 pl-1 pr-2 border border-solid border-gray-300 rounded-sm">
                    <option>Mr.</option>
                    <option>Mrs.</option>
                  </select>
                </div>
                <div className="w-5/6 pl-3">
                  <input
                    type="text"
                    name='firstname'
                    required
                    value={state.firstname || ''}
                    onChange={_handleChange}
                    className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-10 mb-5">
              <p className="mb-2 font-bold">Last Name</p>
              <input
                type="text"
                name='lastname'
                required
                value={state.lastname || ''}
                onChange={_handleChange}
                className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm"
              />
            </div>
            <div className="w-1/2 pr-10 mb-5">
              <p className="mb-2 font-bold">Company Name</p>
              <input
                type="text"
                name='companyName'
                required
                value={state.companyName || ''}
                onChange={_handleChange}
                className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm"
              />
            </div>
            <div className="w-1/2 pl-10 mb-5">
              <p className="mb-2 font-bold">Event Name</p>
              <input
                type="text"
                name='eventName'
                required
                value={state.eventName || ''}
                onChange={_handleChange}
                className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm"
              />
            </div>
            <div className="w-1/2 pr-10 mb-5">
              <p className="mb-2 font-bold">Email</p>
              <input
                type="email"
                name='email'
                required
                value={state.email || ''}
                onChange={_handleChange}
                className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm"
              />
            </div>
            <div className="w-1/2 pl-10 mb-5">
              <p className="mb-2 font-bold">Phone</p>
              <input
                type="number"
                name='phone'
                value={state.phone}
                required
                onChange={_handleChange}
                className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm"
              />
            </div>
          </div>
          <div className="w-full border-b-2 border-dotted border-teal-200 mt-5 mb-3"></div>
          <div className="w-full mt-2 text-left">
            {/* <div className="flex"> */}
              {/* <input type="checkbox" className="my-auto mr-3" required /> I agree to the HNS <Link to='/term-of-use' target='_blank'><span className="ml-2 text-yellow-600">terms and conditions</span></Link> */}
              {/* <input type="checkbox" className="my-auto mr-3" required /> I agree to the HNS */}
            {/* </div> */}
            <div className="flex">
              <input type="checkbox" className="my-auto mr-3" required /> I agree to the Affinitii <Link to='/term-of-use' target='_blank'><span className="ml-2 text-yellow-600">Terms and Conditions</span></Link>
            </div>
            <p className="mb-5 mt-2">Please enter the correct contact information, I will contact you to review your needs</p>
            <button disabled={spiner ? true : false} type='submit' className="uppercase text-sm py-3 px-10 rounded flex" style={{ backgroundColor: "#fed500" }}>
              <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Submit your Request
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  LoginData: state.LoginStatus
})

const mapDispatchToProps = {
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(YourContactInformation)
