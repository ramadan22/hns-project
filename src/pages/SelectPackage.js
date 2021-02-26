import { React, useState, Link, useHistory, useEffect } from '../libraries'
import { PanelTitleStep } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import { FaChevronLeft, FaChevronDown, FaChevronUp, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
import { connect } from 'react-redux'
import { RfpDataGet, ModalAction } from '../modules/actions'

const SelectPackage = ({ RfpDataGet, RfpData, ModalAction }) => {
  const history = useHistory()
  const [spiner, setSpiner] = useState(false)
  const [dropdownLocationClick, setDropdownLocationClick] = useState(false)
  const [statusContent, setStatusContent] = useState("")
  const [dataName, setDataName] = useState("")
  const [listPackage, setListPackage] = useState([])
  const [packageSelect, setPackageSelect] = useState({})
  const [param, setParam] = useState({
    packageId: ""
  })

  useEffect(() => {
    RfpDataGet()
  }, [])
  
  useEffect(() => {
    if(RfpData !== null && Object.keys(RfpData.package).length > 0){
      setDataName(`${RfpData.package.currency}${RfpData.package.price} - ${RfpData.package.chargeUnit} - ${RfpData.package.name.length > 35 ? RfpData.package.name.substring(0, 35)+"..." : RfpData.package.name}`)
      setPackageSelect(RfpData.package)
      setParam({packageId:RfpData.package.packageId})
    }
  }, [RfpData])

  useEffect(() => {
    setTimeout(()=>{
      document.addEventListener('click', handleDocumentClick);
     }, 1000)
  }, [])

  const handleDocumentClick = (evt) => {
    if(evt.target.getAttribute("data-dropdown") !== "exept"){
      setDropdownLocationClick(false)
    } else {
      setDropdownLocationClick(true)
    }
  }

  useEffect(() => {
    Api.get(`/supplier/api/v1/package/fetch?status=1`)
    .then(res => {
      setListPackage(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpiner(true)
    const UserToken = getData('tokenLogin')
    Api.post(`/supplier/api/v2/rfp/package`, {...param, guestId: getData("guestIdRfp") ? getData("guestIdRfp") : ""}, {headers: { 'User-Token': UserToken }})
    .then(res => {
      setSpiner(false)
      history.push(`/event-scheduling`)
    })
    .catch(function (error) {
      setSpiner(false)
      // console.log(error.response)
      ModalAction({Type: "failed-popup", Message: error.response.data.message})
    })
  }

  const handleClickDropdown = () => {
    setDropdownLocationClick(!dropdownLocationClick)
  }

  const handleSelectPackage = (event) => {
    let value = event.target.value
    setDataName(event.target.getAttribute('data-name'))
    setParam({...param, packageId:event.target.getAttribute('data-value')})
    setPackageSelect(JSON.parse(value))
    setDropdownLocationClick(false)
  }

  const previousPage = () => {
    RfpDataGet()
    history.push('/event-detail')
  }

  useEffect(() => {
    console.log("package list", listPackage)
  }, [listPackage])

  useEffect(() => {
    console.log("RFP", RfpData)
  }, [RfpData])

  return (
    <>
      <Navbar Type="rfp" />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <PanelTitleStep Text="1. Select Venue/Hotel" />
        <PanelTitleStep Text="2. Event Details" />
        <PanelTitleStep Text="3. Select a Package" />
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full pt-5 pb-10 border-b-2 border-dotted border-gray-300 px-4 flex flex-wrap mb-10">
            <p className="w-full text-left mb-5">Please select the services you will need for your event, you will define the quantities per day in the next step.</p>
            {/* <h5 className="w-full text-left font-bold mt-4 mb-4">Select a package</h5> */}
            <div className="w-2/5 relative">
              <input type="text" data-dropdown="exept" value={dataName} onClick={handleClickDropdown} readOnly placeholder="Select a package" className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><FaChevronDown className="text-sm" /></div>
              <div data-dropdown="exept" className={`shadow-xl w-full rounded bg-white absolute pt-3 border boder-gray-400 border-solid z-10 overflow-y-auto rounded-md ${dropdownLocationClick ? "block" : "hidden"}`}>
                <div className="relative shadow-lg w-full rounded bg-white z-10 overflow-y-auto" style={{  height: `${listPackage.length > 4 ? '160px' : 'auto'}` }}>
                  {listPackage.map((res, index) => {
                    return (<button type="button" data-name={`${res.currency}${res.price} - ${res.chargeUnit} - ${res.name.length > 35 ? res.name.substring(0, 35)+"..." : res.name}`} data-value={res.packageId} value={JSON.stringify(res)} key={index} onClick={handleSelectPackage} className="w-full text-left py-2 px-4 cursor-pointer hover:bg-gray-200 focus:outline-none">{`${res.currency}`}{`${res.price} - ${res.chargeUnit} - ${res.name.length > 35 ? res.name.substring(0, 35)+"..." : res.name}`}</button>)
                  })}
                </div>
              </div>
            </div>
            {Object.keys(packageSelect).length > 0 ?  
              <div className="w-full py-4 px-4 shadow-lg flex flex-wrap border border-solid border-gray-200 hover:bg-gray-200 mt-8 mb-8 group rounded-lg">
                <div className="w-2/12 pr-8">
                  <div className="py-6 text-center text-black bg-yellow-400 h-32 shadow flex justify-center">
                    <div className="w-full my-auto">
                      {`${packageSelect.currency}`}{`${packageSelect.price}`}<br /><span className="text-xs">{`${packageSelect.chargeUnit}`}</span>
                    </div>
                  </div>
                </div>
                <div className="w-9/12 text-left">
                  <p className="font-bold mb-2">{`${packageSelect.name}`}</p>
                  <div dangerouslySetInnerHTML={{ __html:packageSelect.summary }}></div>
                  <div className={`w-full mt-5 text-teal-400`}>
                    <div dangerouslySetInnerHTML={{ __html:packageSelect.description }}></div>
                  </div>
                </div>
                
              </div>
             : ('')}
          </div>
          <div className="w-full flex justify-end mb-10">
            {/* <span className="my-auto mr-5">Continue to the next step</span> */}
            <button onClick={previousPage} className="justify-center w-40 py-2 border border-solid border-yellow-500 rounded uppercase text-sm flex focus:outline-none">
              <FaChevronLeft className="inline my-auto mr-1 text-xs" /> Previous Step
            </button>
            <button type="submit" className="text-center w-40 py-2 text-black uppercase rounded text-sm ml-5 flex justify-center" style={{ backgroundColor: "#fed500" }}>
              <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Next Step
            </button>
          </div>
        </form>
        <PanelTitleStep Text="4. Event Schedule" />
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  RfpData: state.RfpDataGetReducer.data
})

const mapDispatchToProps = {
  RfpDataGet, 
  ModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPackage)