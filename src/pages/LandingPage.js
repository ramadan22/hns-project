import { React, useEffect, useState, useHistory } from '../libraries'
import { IBgLanding, IBgCurve90 } from '../assets/images'
import { FaChevronDown } from '../components/icons'
import { Footer, Navbar } from '../components/molecule'
import { Api } from '../helpers/api'
import "../assets/styles/SliderBanner.css"
import "../assets/styles/Responsive.css"

const LandingPage = () => {
  const [listHTQ, setListHTQ] = useState([])
  const [companyType, setCompanyType] = useState([])
  const [infoGts, setInfoGts] = useState([])
  const [mostSearchedList, setMostSearchedList] = useState([])
  const [selectType, setSelectType] = useState({})
  const [selectLocation, setSelectLocation] = useState({})
  const history = useHistory()

  const handlechangeType = e => {
    let val = JSON.parse(e.target.value)
    setSelectType(val.companyTypeId)
  }

  const handlechangeLocation = e => {
    console.log(JSON.parse(e.target.value))
    setSelectLocation(JSON.parse(e.target.value))
  }

  const handleSubmit = () => {
    history.push('/event-requirements', {
      companyTypeId: selectType,
      countryCode: selectLocation.countryCode,
      countryName: selectLocation.countryName,
      location: selectLocation.cityId,
      locationName: selectLocation.cityName
    })
  }
  
  useEffect(() => {
    Api.get(`/supplier/api/v1/howToQuote/fetch`)
      .then(res => {
        setListHTQ(res.data.data.items)
      })
      .catch(function (error) {
        console.log(error.response)
      })

    Api.get(`/supplier/api/v1/company/type?notIn[]=Hotel&orderBy=sequence&sort=asc`)
    .then(res => {
      setCompanyType(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })

    Api.get(`/master/api/v1/informationGts/fetch`)
    .then(res => {
      setInfoGts(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })

    Api.get('/master/api/v1/city/fetch?isHighlight=1')
    .then(response => {
      setMostSearchedList(response.data.data.items)
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Navbar Type="home" NavActive={"landing"} />
      <div className='relative landing-banner' style={{ backgroundImage: `url(${IBgLanding})`, backgroundSize: 'cover', height: 700, width: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
        {/* <div className='relative' style={{ backgroundSize: 'cover', height: 700, width: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}> */}
          <div className='container mx-auto px-10 absolute inset-0 flex flex-wrap pt-48 text-left'>
            <div className='lg:w-2/5 w-1/2 lg:pr-16 pr-10'>
              <form className="w-full" onSubmit={handleSubmit}>
                <p className='text-white capitalize text-2xl mb-3'>
                  Search unique venues, compare prices and book, now
                </p>
                <div className='inline-block relative w-full mb-3'>
                  <select name="type" onChange={handlechangeType} required className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option hidden value="">Company Type</option>
                    {companyType.length > 0 ?
                      (companyType.map((res) => {
                        return <option value={JSON.stringify(res)} key={res.companyTypeId}>{res.type}</option>
                      })) : ('')}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaChevronDown className="text-sm" />
                  </div>
                </div>
                {/* <Dropdown data={companyType} onChange={handlechangeType} /> */}
                
                <div className='inline-block relative w-full'>
                  <select name="location" onChange={handlechangeLocation} required className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option hidden value="">Location</option>
                    {mostSearchedList.length > 0 ?
                      (mostSearchedList.map((res) => {
                        return <option value={JSON.stringify(res)} key={res.cityId}>{res.cityName}</option>
                      })) : ('')}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaChevronDown className="text-sm" />
                  </div>
                </div>
                <div className='mt-5 w-full flex text-center'>
                  <button className='py-3 rounded-md text-sm uppercase text-white py-1 uppercase w-full' style={{ backgroundColor: '#fed500' }}>
                    quote now
                  </button>
                </div>
              </form>
            </div>
            <div className='lg:w-3/5 w-1/2'>
              <h3 className='text-white capitalize text-3xl font-bold tracking-widest mb-5'>
                ground transport service
              </h3>
              <p className='text-white capitalize text-1xl'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias velit, rerum nam sint delectus sunt sequi molestias quod a expedita officia odio blanditiis quo qui dicta. Soluta voluptate quidem deleniti?</p>
            </div>
          </div>
        {/* </div> */}
      </div>
      <div className='relative'>
        <img src={IBgCurve90} className='w-full object-cover bg-curve bottom-0' />
        <div className='h-10 z-100' />
      </div>
      <h3 className='text-blue-900 capitalize text-4xl font-bold mb-10 pb-5 m-131'>
        we can provide
      </h3>
      <div className='container mx-auto pb-10'>
        <div className='flex flex-wrap justify-center mb-10'>
          {/* {[0, 1, 2].map(i => ( */}
          {companyType.length > 0 ?
            companyType.map((res, index) => {
              return (
                <div key={index} className='flex flex-wrap w-1/3 p-2 text-center cursor-pointer mb-5'>
                  <div className='w-full lg:pb-16 pb-8 max-w-sm rounded overflow-hidden shadow-lg hover:bg-white transition duration-500 bg-white'>
                    <div className="flex justify-center">
                      <img src={`${res.image}`} className="w-1/4" />
                    </div>
                    <div className='space-y-10'>
                      <i className='fa fa-spa' style={{ fontSize: 48 }} />
                      <div className='lg:px-6 px-3 lg:py-4 py-2'>
                        <div className='space-y-5'>
                          <div className='font-bold text-blue-800 text-xl capitalize'>{`${res.type}`}</div>
                          {/* <p className='text-blue-700 text-base'>
                            {`${res.description}`}
                          </p> */}
                          <p className="text-blue-700 text-base font-bold" dangerouslySetInnerHTML={{ __html: res.description }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          : ""}
          {/* ))} */}
        </div>
      </div>

      <div className='relative py-10'>
        <div className='container flex flex-wrap flex-row mx-auto py-10 relative'>
          <div className='w-1/2 pr-2'>
            <img src={IBgLanding} alt='dummy' className='w-full object-cover rounded-lg' style={{ height: 276 }} />
          </div>
          <div className='w-1/2 pr-2'>
            <img src={IBgLanding} alt='dummy' className='w-full object-cover rounded-lg' style={{ height: 276 }} />
          </div>
          <div className='card-offset cursor-pointer h-28 py-3 max-w-sm rounded overflow-hidden shadow-2xl hover:bg-white transition duration-500 bg-white'>
            <div className='space-y-10'>
              <div className='lg:py-4 lg:px-0 px-4'>
                <h3 className='text-center text-blue-900 capitalize text-4xl font-bold mb-4'>
                  how to quote
                </h3>
                {listHTQ.length > 0 ?
                  listHTQ.map((res, index) => {
                    return (
                      <div key={index} className='bg-gray-200 p-3'>
                        <div className='text-left text-blue-800 text-base font-bold mb-0 flex'>
                          <p className="w-5">{index+1}.</p> 
                          <p>{`${res.description}`}</p>
                        </div>
                      </div>
                    )
                  })
                : ""}
                {/* <div className='p-3'>
                  <p className='text-left text-blue-800 text-base font-bold mb-0'>
                    1. Lorem ipsum dolor sit
                  </p>
                </div>
                <div className='bg-gray-200 p-3'>
                  <p className='text-left text-blue-800 text-base font-bold mb-0'>
                    1. Lorem ipsum dolor sit
                  </p>
                </div>
                <div className='p-3'>
                  <p className='text-left text-blue-800 text-base font-bold mb-0'>
                    1. Lorem ipsum dolor sit
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className='curve-landing bg-gray-200 pt-10 pb-40' />
      </div>

      <div className='container mx-auto flex flex-wrap flex-col pt-10'>
        <h3 className='uppercase text-4xl font-bold mb-10 py-5'>
          informations
        </h3>
        {infoGts.length > 0 ?
          infoGts.map((res, index) => {
            return (index % 2 === 0 ? (
              <div className='flex flex-row flex-wrap lg:mb-20 mb-10' key={index}>
                <div className='w-2/5'>
                  <img src={`${res.image}`} alt='dummy' className='w-full object-cover' style={{ height: 170 }} />
                </div>
                <div className='w-3/5 lg:p-12 p-6 bg-gray-200'>
                  <p className="text-left font-bold">{`${res.name}`}</p>
                  <p className="text-left">{`${res.description}`}</p>
                </div>
              </div>
            ) : (
              <div className='flex flex-row flex-wrap lg:mb-20 mb-10' key={index}>
                <div className='w-3/5 lg:p-12 p-6 bg-gray-200'>
                  <p className="text-left font-bold">{`${res.name}`}</p>
                  <p className="text-left">{`${res.description}`}</p>
                </div>
                <div className='w-2/5'>
                  <img src={`${res.image}`} alt='dummy' className='w-full object-cover' style={{ height: 170 }} />
                </div>
              </div>
            ))
          })
        : ""}

        {/* <div className='flex flex-row flex-wrap' style={{ marginBottom: '9.5rem' }}>
          <div className='w-2/5'>
            <img src={IBgLanding} alt='dummy' className='w-full object-cover' style={{ height: 170 }} />
          </div>
          <div className='w-3/5 p-12 bg-gray-200'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum incidunt odit, illo nobis nihil porro nam eveniet! Nihil distinctio commodi necessitatibus quaerat facere inventore fugit eos? Laudantium veniam possimus quae.</p>
          </div>
        </div> */}
        
      </div>
      <Footer />
    </>
  )
}

const Dropdown = (data, onChange) => {
  return (
    <div className='inline-block relative w-full'>
      <select name="eventid" onChange={onChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option hidden value="">Event Type</option>
        {data.length > 0 ?
          (data.map((res) => {
            return <option value={res.eventsId} key={res.eventsId}>{res.eventsName}</option>
          })) : ('')}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaChevronDown className="text-sm" />
      </div>
    </div>
  )
}

export default LandingPage

 {/* <div className='inline-block relative w-full mb-3'>
      <select className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline' onChange={onChange}>
        <option hidden value="">Attendees</option>
        <option value=''>Select 1</option>
        <option value=''>Select 1</option>
        <option value=''>Select 1</option>
        <option value=''>Select 1</option>
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        <FaChevronDown className='text-sm' />
      </div>
    </div> */}
