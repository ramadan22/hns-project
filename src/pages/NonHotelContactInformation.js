import { React, useState, Link, useEffect, useHistory } from '../libraries'
import { connect } from 'react-redux'
import { PanelTitleStep } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import { Api } from '../helpers/api'
import { getData, removeData } from '../utils/localStorage' 
import { ModalAction, GtsDataGet } from '../modules/actions'
import { FaSpinner } from '../components/icons'

const NonHotelContactInformation = ({ Params, ModalAction, gtsData, GtsDataGet }) => {
	const history = useHistory()
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

	useEffect(() => {
		GtsDataGet(getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : "")
	}, [])

	useEffect(() => {
		if(gtsData){
			setState({
				...state,
				eventName: gtsData.events.eventName !== undefined ? gtsData.events.eventName : "",
			})
		}
	}, [gtsData])

	const _getContact = () => {
		Api.get('/membership/api/v1/member/contact', {
		  headers: { 'User-Token': getData('tokenLogin') }
		})
		.then(res => {
			console.log("account", res)
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
		)}).catch(err => console.log(err.response.data.message))
	}

	useEffect(() => {
		_getContact()
	}, [])

  	const _handleChange = event => {
		const { name, value } = event.target
		setState(prevState => ({
			...prevState, [name]: value
		}))
	}

	const storeApi = () => {
		Api.post('/supplier/api/v2/gts/store', {guestId: getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : ""}, {
			headers: { 'User-Token': getData('tokenLogin') }
		})
		.then(res => {
			removeData("guestId")
			history.push('/thank-you', {
			  type: "gts",
			  code: res.data.data.gtsCode
			})
		  }
		)
		.catch(function (error) {
		  ModalAction({Type: "failed-popup", Message: error.response.data.message})
		})
	}
	
	const _handleSubmit = (event) => {
		event.preventDefault()
		const UserToken = getData('tokenLogin') ? getData('tokenLogin') : ""
		setSpiner(true)
		if(UserToken === ""){
			setSpiner(false)
			setStatusModal(true)
		} else {
			Api.post(`/supplier/api/v2/gts/contact`, {guestId: getData('guestId') && getData('guestId') !== "undefined" ? getData('guestId') : "", ...state}, {headers: { 'User-Token': UserToken }})
			.then(res => {
				setSpiner(false)
				console.log("submit contact", res)
				storeApi()
			})
			.catch(function (error) {
				setSpiner(false)
				ModalAction({Type: "failed-popup", Message: error.response.data.message})
				console.log(error.response)
			})
		}
	}

	const handleCounter = () => {
		setStatusModal(false)
	}

	useEffect(() => {
		console.log("State", state)
	}, [])

	return (
		<>
			<Navbar Type="rfp" counterModalLogin={(value) => handleCounter(value)} modalLoginGts={statusModal} />
			<div className="container mx-auto px-10 flex flex-wrap pb-20">
				<PanelTitleStep Text="1. EVENT REQUIREMENTS" />
				<PanelTitleStep Text="2. EVENT SCHEDULE" />
				<PanelTitleStep Text="3. YOUR CONTACT INFORMATION" />
				<form onSubmit={_handleSubmit}>
					<div className="w-full flex flex-wrap text-left px-4">
						<div className="w-1/2 pr-10 mb-5">
							<p className="mb-2 font-bold">First Name</p>
							<div className="flex flex-wrap">
								<div className="w-1/6">
									<select name="salutation" onChange={_handleChange} value={state.salutation || ''} className="w-full py-1 pl-1 pr-2 border border-solid border-gray-300 rounded-sm">
										<option value="Mr">Mr.</option>
										<option value="Mrs">Mrs.</option>
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
					<div className="w-full mt-2 text-left px-4">
						{/* <div className="flex">
							<input type="checkbox" className="my-auto mr-3" required /> I agree to the HNS <Link to='/term-of-use' target='_blank'><span className="ml-2 text-yellow-600">terms and conditions</span></Link>
						</div>
						<div className="flex">
							<input type="checkbox" className="my-auto mr-3" required /> I agree to the Pullman ASIA Free Conference Rental <Link to='/term-of-use' target='_blank'><span className="ml-2 text-yellow-600">terms and conditions</span></Link>
						</div>
						<p className="mb-5 mt-2">Please enter the correct contact information, I will contact you to review your needs</p> */}
						<div className="flex">
							<input type="checkbox" className="my-auto mr-3" required /> I agree to the Affinitii <Link to='/term-of-use' target='_blank'><span className="ml-2 text-yellow-600">Terms and Conditions</span></Link>
						</div>
						<p className="mb-5 mt-2">Please enter the correct contact information, I will contact you to review your needs</p>
						<button type='submit' disabled={spiner ? true : false} className="uppercase text-sm py-3 px-10 rounded flex" style={{ backgroundColor: "#fed500" }}>
							<FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Finised
						</button>
					</div>
				</form>
			</div>
			<Footer />
		</>
	)
}

const mapStateToProps = (state) => ({
	Params: state.Params.dataParamsRfpNonHotel,
	gtsData: state.GtsDataGetReducer.data
})

const mapDispatchToProps = {
	ModalAction,
	GtsDataGet
}

export default connect(mapStateToProps, mapDispatchToProps)(NonHotelContactInformation)