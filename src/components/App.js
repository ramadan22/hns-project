import { React, useEffect, BrowserRouter as Router, Route, useState, loadable } from '../libraries'
import '../App.css'
import '../tailwind/tailwind.output.css'
import { connect } from 'react-redux'
import GlobalStyle from '../assets/GlobalStyle'
import { ScrollTop } from '../components/ScrollTop'
import { Api } from '../helpers/api'
import { storageData, getData } from '../utils/localStorage'
import { ModalDefault } from '../components/molecule'
import { ContactUsDataAction } from '../modules/actions/ContactUs__Action'

const Home = loadable(() => import('../pages/Home'))
const Deals = loadable(() => import('../pages/Deals'))
const Blog = loadable(() => import('../pages/Blog'))
const BlogDetail = loadable(() => import('../pages/BlogDetail'))
const MyAccount = loadable(() => import('../pages/MyAccount'))
const EventDetail = loadable(() => import('../pages/EventDetail'))
const Faq = loadable(() => import('../pages/Faq'))
const PrivacyContactus = loadable(() => import('../pages/PrivacyContactus'))
const HistoryRfp = loadable(() => import('../pages/HistoryRfp'))
const HistoryNonRfp = loadable(() => import('../pages/HistoryNonRfp'))
const BillingInfo = loadable(() => import('../pages/BillingInfo'))
const MyContact = loadable(() => import('../pages/MyContact'))
const VenueSearch = loadable(() => import('../pages/VenueSearch'))
const SelectVenueHotel = loadable(() => import('../pages/SelectVenueHotel'))
const Accomodation = loadable(() => import('../pages/Accomodation'))
const FunctionSpaceLayouts = loadable(() => import('../pages/FunctionSpaceLayouts'))
const DetailedInformation = loadable(() => import('../pages/DetailedInformation'))
const HotelOverview = loadable(() => import('../pages/HotelOverview'))
const SelectPackage = loadable(() => import('../pages/SelectPackage'))
const EventScheduling = loadable(() => import('../pages/EventScheduling'))
const YourContactInformation = loadable(() => import('../pages/YourContactInformation'))
const HistoryRfpDetail = loadable(() => import('../pages/HistoryRfpDetail'))
const HistoryNonRfpDetail = loadable(() => import('../pages/HistoryNonRfpDetail'))
const TermOfUse = loadable(() => import('../pages/TermOfUse'))
const Quotation = loadable(() => import('../pages/Quotation'))
const QuotationGts = loadable(() => import('../pages/QuotationGts'))
const ThanksPage = loadable(() => import('../pages/ThanksPage'))
const ActivationAccount = loadable(() => import('../pages/ActivationAccount'))
const ForgotPassword = loadable(() => import('../pages/ForgotPassword'))
const DealsSearch = loadable(() => import('../pages/DealsSearch'))
const CreateRfpNonHotel = loadable(() => import('../pages/CreateRfpNonHotel'))
const LandingPage = loadable(() => import('../pages/LandingPage'))
const RfpNonHotel = loadable(() => import('../pages/RfpNonHotel'))
const NonHotelContactInformation = loadable(() => import('../pages/NonHotelContactInformation'))
const EventReq = loadable(() => import('../pages/EventReq'))
const EventSchedulingGts = loadable(() => import('../pages/EventSchedulingGts'))

const App = ({ ModalData, ContactUsDataAction }) => {
  const [modal, setModal] = useState(null)

  useEffect(() => {
    // const getAppToken = () => {
    //   Api.post('/auth/api/v1/generateToken', {}, {auth:{username: 'codelabs-web', password: 'n35p3ESRtKzi8HqDoaA4jQYcJlxZKcvQsclY0On6'}})
    //     .then(res => {
    //       (res.data.data.token !== null && res.data.data.token !== "" && storageData('token', res.data.data.token))
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    // }
    // getAppToken()
    ContactUsDataAction()
  }, [])

  const handleCounter = () => {
    setModal(null)
  }

  useEffect(() => {
    setModal(ModalData)
  }, [ModalData])

  return (
    <div className="App">
      {/* {modal !== null ? (''
        <GlobalStyle overflow={'hidden'} paddingRight={"17px"} />
      ) : ('')} */}

      {modal !== null && modal.Type !== "confirm-add-cart" ? (
        <ModalDefault Text={`${modal.Message}`} Type={`${modal.Type}`} ActivePopupProps={`${modal.Status}`} counterProps={(value) => handleCounter(value)} OtherFunction={modal.OtherFunction ? modal.OtherFunction : false} />
      ) : ('')}

      <GlobalStyle />
      <Router basename="/hns-frontend">
        <ScrollTop />
        <Route exact path="/" component={Home} />
        <Route path="/deals" component={Deals} />
        <Route exact path="/deals-search/:slug" component={DealsSearch} />
        <Route path="/blog" component={Blog} />
        <Route exact path="/blog-detail/:id" component={BlogDetail} />
        <Route path="/venue-search/:slug" component={VenueSearch} />
        <Route path="/my-account" component={MyAccount} />
        <Route path="/event-detail" component={EventDetail} />
        <Route path="/hotel-overview" component={HotelOverview} />
        <Route path="/accomodation" component={Accomodation} />
        <Route path="/function-space-layouts" component={FunctionSpaceLayouts} />
        <Route path="/detailed-information/:slug" component={DetailedInformation} />
        <Route path="/faq" component={Faq} />
        <Route path="/privacy-contactus" component={PrivacyContactus} />
        <Route path="/my-history-rfp" component={HistoryRfp} />
        <Route path="/my-history-gts" component={HistoryNonRfp} />
        <Route exact path="/my-history-rfp-detail/:rfpCode" component={HistoryRfpDetail} />
        <Route exact path="/my-history-non-rfp-detail/:nonRfpCode" exact={true} component={HistoryNonRfpDetail} />
        <Route path="/billing-info" component={BillingInfo} />
        <Route path="/contact" component={MyContact} />
        <Route path="/select-venue-hotel" component={SelectVenueHotel} />
        <Route path="/select-package" component={SelectPackage} />
        <Route path="/event-scheduling" component={EventScheduling} />
        <Route path="/your-contact-information" component={YourContactInformation} />
        <Route path="/create-rfp-non-hotel" component={CreateRfpNonHotel} />
        <Route path="/quotation/:rfpId" component={Quotation} />
        <Route path="/quotation-gts/" exact={true} component={QuotationGts} />
        <Route path="/term-of-use" component={TermOfUse} />
        <Route path="/activation-account/:hash/:id" component={ActivationAccount} />
        <Route path="/forgot-password/:hash/:id" component={ForgotPassword} />
        <Route path="/rfp-non-hotel" component={RfpNonHotel} />
        <Route path="/contact-information-gts" component={NonHotelContactInformation} />
        <Route path="/thank-you" component={ThanksPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/event-requirements" component={EventReq} />
        <Route exact path="/event-schedule-gts" component={EventSchedulingGts} />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ModalData: state.ModalReducer.data
})

const mapDispatchToProps = {
  ContactUsDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App)