import {
  React,
  Link,
  useEffect,
  useState,
  Fragment,
  axios,
  Select,
  useCallback
} from '../libraries'

import { PanelTitleStep } from '../components/atom'
import { Navbar, Footer } from '../components/molecule'
import {
  IconTeam,
  IconLunchic,
  IconSeruic,
  IconTypedayic,
  IconPintuic
} from '../assets/images'
import { Api } from '../helpers/api'
import { getData } from '../utils/localStorage'
import {
  RfpDataGet,
  fetchRfp,
  actionPackageAttendees,
  actionFoodQuality,
  actionAccomondationQuality,
  actionCheckboxFood,
  actionCheckboxAccomodation,
  ModalAction
} from '../modules/actions'
import { connect } from 'react-redux'
import { FaPlus, FaMinus, FaChevronLeft, FaSpinner } from '../components/icons'
import { setDefaultHandler } from 'workbox-routing'

const EventScheduling = ({ ModalAction, rfpData }) => {
  const [loading, setLoading] = useState(true)
  const [listData, setListData] = useState([])
  const [listFoodSelect, setListFoodSelect] = useState([])
  const [listRoomAccomodation, setListRoomAccomodation] = useState([])
  const [listMenuSelected, setListMenuSelected] = useState([])
  const type = {
    food: 'food', accomodation: 'accomodataion'
  }

  const _handleChangeAttendees = useCallback((index) => event => {
    let packageAttendees = [...listData]
    packageAttendees[index] = {
      ...packageAttendees[index],
      package: {
        ...packageAttendees[index].package,
        totalAttendees: event.target.value
      }
    }
    setListData(packageAttendees)
  }, [listData])

  const _handleChangeQualityFood = useCallback((index, indexFood) => event => {
    let data = [...listData]
    data[index] = {
      ...data[index],
      food: [...data[index].food.map((item, idx) => {
        if (idx === indexFood) {
          return {
            ...item,
            quantity: event.target.value
          }
        }
        return item
      })]
    }
    setListData(data)
  }, [listData])

  const _handleChangeQualityAccomodation = useCallback((index, indexAcc) => event => {
    let data = [...listData]
    data[index] = {
      ...data[index],
      accomodation: [...data[index].accomodation.map((item, idx) => {
        if (idx === indexAcc) {
          return {
            ...item,
            quantity: event.target.value
          }
        }
        return item
      })]
    }
    return setListData(data)
  }, [listData])

  const handleChange = () => {

  }
  // const onSelectMenu = (indexItem, indexFood) => option => {
  //   let { indexMenu, foodId, label } = option
  //   let data = [...listData]
  //   setListMenuSelected(option)
    // let menu = listFoodSelect.map((item, index) => {
    //   if (indexItem === index) {
    //     item.items[indexMenu] = {
    //       indexMenu: indexMenu,
    //       foodId: item.items[indexMenu].foodId,
    //       name: item.items[indexMenu].name,
    //       code: item.items[indexMenu].code,
    //       status: item.items[indexMenu].status,
    //       isDisable: true
    //     }
    //   }
    //   return item
    // })
    
    // data[indexItem] = {
    //   ...data[indexItem],
    //   food: [...data[indexItem].food.map((item, idx) => {
    //     if (idx === indexFood) {
    //       return {
    //         ...item,
    //         foodId: foodId,
    //         foodName: label
    //       }
    //     }
    //     return item
    //   })]
    // }
    // setListFoodSelect(menu)
  //   setListData(data)
  // }

  const onSelectRoom = (indexItem, indexAcc) => option => {
    const { indexRoom, accomodationTypeId, label } = option
    let data = [...listData]
    let room = [...listRoomAccomodation]
    room.map((item, index) => {
      if (indexItem === index) {
        item.items[indexRoom] = {
          indexRoom: indexRoom,
          accomodationTypeId: item.items[indexRoom].accomodationTypeId,
          accomodationTypeName: item.items[indexRoom].accomodationTypeName,
          accomodationTypeCode: item.items[indexRoom].accomodationTypeCode,
          isDisable: true
        }
      }
      return item
    })
    
    data[indexItem] = {
      ...data[indexItem],
      accomodation: [...data[indexItem].accomodation.map((item, idx) => {
        if (idx === indexAcc) {
          return {
            ...item,
            accomodationTypeId: accomodationTypeId,
            accomodationTypeName: label
          }
        }
        return item
      })]
    }
    setListRoomAccomodation(room)
    setListData(data)
  }

  const _appendForm = (
    indexItem,
    type
  ) => event => {
    // let data = [...listData]
    // console.log('listMenuSelected', listMenuSelected)
    // const { indexMenu, foodId, label } = listMenuSelected
    // if (type === 'food') {
    //   let menu = listFoodSelect.map((item, index) => {
    //     if (indexItem === index) {
    //       item.items[indexMenu] = {
    //         indexMenu: indexMenu,
    //         foodId: item.items[indexMenu].foodId,
    //         name: item.items[indexMenu].name,
    //         code: item.items[indexMenu].code,
    //         status: item.items[indexMenu].status,
    //         isDisable: true
    //       }
    //     }
    //     return item
    //   })
      
    //   data[indexItem] = {
    //     ...data[indexItem],
    //     food: [...data[indexItem].food, {
    //       isPackageIncluded: 1,
    //       tempRfpScheduleFoodId: '',
    //       tempRfpId: '',
    //       foodId: null,
    //       quantity: ''
    //     }]
    //   }

    //   setListFoodSelect(menu)
    //   return setListData(data)

    // } else {
    //   data[indexItem] = {
    //     ...data[indexItem],
    //     accomodation: [...data[indexItem].accomodation, {
    //       isPackageIncluded: 1,
    //       tempRfpScheduleAccomodationId: '',
    //       accomodationTypeId: null,
    //       quantity: ''
    //     }]
    //   }
    //   return setListData(data)
    // }
  }

  const _prependForm = (indexItem, type) => event => {
    let data = [...listData]
    let menu = [...listFoodSelect]
    let room = [...listRoomAccomodation]

    if (type === 'food') {
      menu[indexItem].items.map((item, index) => {
        if (item.indexMenu === index) {
          menu[indexItem].items[index] = {
            indexMenu: index,
            foodId: item.foodId,
            name: item.name,
            code: item.code,
            status: item.status,
            isDisable: false
          }
        }
        return item
      })

      data[indexItem] = {
        ...data[indexItem],
        food: [
          ...data[indexItem].food.reverse().slice(1).reverse()
        ]
      }
      setListRoomAccomodation(menu)
      return setListData(data)
    } else {
      room[indexItem].items.map((item, index) => {
        console.log('item room', item)
        if (item.indexRoom === index) {
          room[indexItem].items[index] = {
            indexRoom: index,
            accomodationTypeId: item.accomodationTypeId,
            accomodationTypeName: item.accomodationTypeName,
            accomodationTypeCode: item.accomodationTypeCode,
            isDisable: false
          }
        }
      })
      data[indexItem] = {
        ...data[indexItem],
        accomodation: [
          ...data[indexItem].accomodation.reverse().slice(1).reverse()
        ]
      }
      
      return setListData(data)
    }
  }

  const _handleSubmit = event => {
    event.preventDefault()

    // let data = listData.map((item, index) => {
    //   item.food = item.food.filter(itemFood => itemFood.isPackageIncluded > 0)
    //   item.accomodation = item.accomodation.filter(itemAccomondation => itemAccomondation.isPackageIncluded > 0)
    //   return item
    // })

    const schedule = { schedule: listData }

    console.log('submit form', schedule)
    // setLoading(true)
    // Api.post('/supplier/api/v1/rfp/schedule', schedule, {
    //   headers: { 'User-Token': getData('tokenLogin') }
    // })
    //   .then(res => {
    //     setLoading(false)
    //     history.push("/your-contact-information")
    //   })
    //   .catch(err => {
    //     ModalAction({ Type: 'failed-popup', Message: err.response.data.message })
    //     setLoading(false)
    //   })
  }

  useEffect(() => {
    setLoading(true)
    let mounted = true
    if (mounted === true) {
      axios.all([
        Api.get('/supplier/api/v1/rfp/fetch', {
          headers: { 'User-Token': getData('tokenLogin') }
        }),
        Api.get('/supplier/api/v2/rfp/food', {
          headers: { 'User-Token': getData('tokenLogin') }
        }),
        Api.get('/supplier/api/v2/rfp/accomodation', {
          headers: { 'User-Token': getData('tokenLogin') }
        })
      ])
        .then(axios.spread((schedule, listFood, listAcc) => {
          const { data } = schedule.data
          setListData(data.schedule)
          setListFoodSelect(listFood.data.data)
          setListRoomAccomodation(listAcc.data.data)
          setLoading(false)
        }))
    }
    return () => mounted === false
  }, [])

  useEffect(() => {
    console.log("listData", listData && listData)
  }, [listData])

  useEffect(() => {
    console.log("list food select", listFoodSelect && listFoodSelect)
  }, [listFoodSelect])

  useEffect(() => {
    let data = []
    if(listFoodSelect.length > 0){
      data = [...listFoodSelect]
      listFoodSelect.map((res, index) => {
        console.log(data[index].items.filter(listSelectedRes => listSelectedRes.isDisable === true))
        setListMenuSelected(data[index].items.filter(listSelectedRes => listSelectedRes.isDisable === true))
        // console.log(listData[index].food)
        // return data[index].items = listData[index].food.filter(listDataRes => listDataRes.foodId === res.foodId).map(resultRes => {
        //   return resultRes
        // })
      })
      // setListFoodSelect([...listFoodSelect])
      // setListMenuSelected(data)
    }
  }, [listFoodSelect])

  useEffect(() => {
    console.log("listMenuSelected", listMenuSelected)
  }, [listMenuSelected])

  return (
    <>
      <Navbar Type='rfp' />
      <div className='container mx-auto px-10 flex flex-wrap pb-20'>
        <PanelTitleStep Text='1. Select Venue/Hotel' />
        <PanelTitleStep Text='2. Event Details' />
        <PanelTitleStep Text='3. Select a Package' />
        <PanelTitleStep Text='4. Event Schedule' />
        <form className='w-full'>
          <div className='w-full pb-10 border-b-2 border-dotted border-gray-300 px-4 flex flex-wrap mb-10'>
            <p className='w-full text-left text-sm mb-2 flex'>
              {/* <img
                src={IconSeruic}
                alt='Icon Seruic'
                className='inline mr-2 w-3 my-auto'
              /> */}
              Define the quantities for your event per day.
            </p>
            {loading ? 'loading...' : listData.map((response, indexItem) => (
              <div key={response.scheduleDate} className='w-full py-3 px-3 shadow rounded-sm text-left mb-3'>
                <h3 className='border-b-2 border-dotted border-gray-300 pb-3 mb-3'>
                  DAY {indexItem + 1} - {<DateFormat dateTime={response.scheduleDate} />}
                </h3>
                <div className='w-full flex flex-wrap px-16'>
                  <p className='w-full text-lg font-bold text-blue-500 mb-3'>Meeting Package</p>
                  <div className='w-7/12 pr-16 flex flex-wrap'>
                    <div className='w-11/12 pl-5'>
                      <p className='w-full mb-2 font-bold'>Price Type</p>
                      <div className='flex flex-wrap'>
                        <div className='w-11/12'>
                          <p className='pt-1'>
                            <img
                              src={IconTypedayic}
                              alt='Icon Lunch'
                              className='inline mr-4 w-5'
                            />
                            {response.package.priceTypeName === '' ? 'Type not set' : response.package.priceTypeName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-5/12 flex flex-wrap'>
                    <p className='w-full mb-2 font-bold'>Total Attendees</p>
                    <div className='w-2/12 border border-r-0 border-solid border-gray-300 h-10 flex'>
                      <img
                        src={IconTeam}
                        alt='icon team'
                        className='inline w-4 m-auto'
                      />
                    </div>
                    <input
                      name='totalAttendees'
                      type='number'
                      required={true}
                      value={response.package.totalAttendees === 0 ? null : response.package.totalAttendees}
                      onChange={_handleChangeAttendees(indexItem)}
                      className='w-10/12 focus:outline-none border border-l-0 border-solid border-gray-300 h-10'
                    />
                  </div>
                  <div className='w-full border-b-2 border-dotted border-teal-200 mt-5 mb-5' />
                </div>
                <div className='w-full flex flex-wrap px-16'>
                  <p className='w-full text-lg font-bold text-blue-500 mb-3'>Food and Beverage</p>
                  {response.food.length > 0 ? (
                    <>
                      {response.food.map((item, indexFood) =>
                        <Fragment key={indexFood}>
                          <div className='w-7/12 flex flex-wrap'>
                            <div className='w-full flex flex-wrap'>
                              <div className='w-11/12 pl-5 pr-16'>
                                <p className='w-full mb-2 font-bold'>Menus</p>
                                {/* <img
                                  src={IconLunchic}
                                  alt='Icon Lunch'
                                  className='inline mr-4 w-5'
                                /> */}
                                {/* <select onChange={handleChange} className="block appearance-none w-full bg-white border border-solid border-gray mt-2 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                                  <option value="" hidden>Please select an Menu</option>
                                  {listFoodSelect.length > 0 && listMenuSelected.length > 0 ? 
                                  listFoodSelect[indexItem].items.map((res, indexMenu) => {
                                    return <option key={indexMenu} value={res.foodId}>{res.name}</option>
                                  })
                                  : ""}
                                </select> */}
                                
                                {/* <Select
                                  onChange={onSelectMenu(indexItem, indexFood)}
                                  options={listFoodSelect[indexItem].items.map((item, indexMenu) => {
                                    return {
                                      indexMenu: indexMenu,
                                      foodId: item.foodId,
                                      label: item.name,
                                      code: item.code,
                                      status: item.status,
                                      isDisable: item.isDisable
                                    }
                                  })}
                                  rules={{ required: 'Please select an Menu' }}
                                  getOptionValue={(option) => option.label}
                                  placeholder='Select Menus'
                                  isOptionDisabled={(option) => item.foodName !== '' && option.isDisable === true ? true : null}
                                  defaultValue={{
                                    label: item.foodName,
                                    foodId: item.foodId,
                                    isDisable: item.isDisable === true ? true : null
                                  }}
                                /> */}
                              </div>
                              <div className='w-full border-b-2 border-dotted border-teal-200 mt-5 mb-5' />
                            </div>
                          </div>
                          <div className='w-5/12 flex flex-wrap'>
                            <div className='w-full flex flex-wrap'>
                              <p className='w-full mb-2 font-bold'>Quality</p>
                              <div className='w-2/12 border border-r-0 border-solid border-gray-300 h-10 flex'>
                                <img src={IconTeam} className='inline w-4 m-auto' alt='icon team' />
                              </div>
                              <input
                                type='number'
                                name='quantity'
                                placeholder='Input qty'
                                value={item.quantity === 0 ? '' : item.quantity}
                                required={true}
                                onChange={_handleChangeQualityFood(indexItem, indexFood)}
                                className='w-10/12 focus:outline-none border border-l-0 border-solid border-gray-300 h-10'
                              />
                              <div className='w-full border-b-2 border-dotted border-teal-200 mt-5 mb-5' />
                            </div>
                          </div>
                        </Fragment>
                      )}
                    </>
                  ) : (
                    <p>No Menu Added</p>
                  )}
                </div>
                <div className='w-full flex flex-wrap px-16'>
                  <div className='text-left flex mb-3'>
                    <Actionform
                      label='Add Menus'
                      icon={<FaPlus className='inline mr-1 my-auto' style={{ fontSize: '0.5rem' }} />}
                      onClick={_appendForm(indexItem, type.food)}
                    />
                    <Actionform
                      label='Remove Menus'
                      icon={<FaMinus className='inline mr-1 my-auto' style={{ fontSize: '0.5rem' }} />}
                      onClick={_prependForm(indexItem, type.food)}
                    />
                  </div>
                  <div className='w-full border-b-2 border border-teal-200 my-3' />
                </div>
                <div className='w-full flex flex-wrap px-16'>
                  <p className='w-full text-lg font-bold text-blue-500 mb-3'>Accommodation</p>
                  {response.accomodation.length > 0 ? (
                    response.accomodation.map((item, indexAcc) =>
                      item.isPackageIncluded === 1 && (
                        <Fragment key={indexAcc}>
                          <div className='w-7/12 flex flex-wrap'>
                            <div className='w-full flex flex-wrap'>
                              <div className='w-11/12 pl-5 pr-16'>
                                <p className='w-full mb-2 font-bold'>Rooms</p>
                                {/* <img
                                  src={IconLunchic}
                                  alt='Icon Lunch'
                                  className='inline mr-4 w-5'
                                /> */}
                                <Select
                                  onChange={onSelectRoom(indexItem, indexAcc)}
                                  options={listRoomAccomodation[indexItem].items.map((item, indexRoom) => {
                                    return {
                                      indexRoom: indexRoom,
                                      accomodationTypeId: item.accomodationTypeId,
                                      label: item.accomodationTypeName,
                                      accomodationTypeCode: item.accomodationTypeCode,
                                      isDisable: item.isDisable
                                    }
                                  })}
                                  rules={{ required: 'Please select an Room' }}
                                  getOptionValue={(option) => option.label}
                                  placeholder='Select Menus'
                                  isOptionDisabled={(option) => option.isDisable === true ? true : null}
                                  defaultValue={{
                                    accomodationTypeId: item.accomodationTypeId,
                                    label: item.accomodationTypeName,
                                    isDisable: item.isDisable === true ? true : null
                                  }}
                                />
                              </div>
                              <div className='w-full border-b-2 border-dotted border-teal-200 mt-5 mb-5' />
                            </div>
                          </div>
                          <div className='w-5/12 flex flex-wrap'>
                            <div className='w-full flex flex-wrap'>
                              <p className='w-full mb-2 font-bold'>Quality</p>
                              <div className='w-2/12 border border-r-0 border-solid border-gray-300 h-10 flex'>
                                <img src={IconTeam} className='inline w-4 m-auto' alt='icon team' />
                              </div>
                              <input
                                type='number'
                                name='quantity'
                                placeholder='Input qty'
                                value={item.quantity === 0 ? null : item.quantity}
                                required={true}
                                onChange={_handleChangeQualityAccomodation(indexItem, indexAcc)}
                                className='w-10/12 focus:outline-none border border-l-0 border-solid border-gray-300 h-10'
                              />
                              <div className='w-full border-b-2 border-dotted border-teal-200 mt-5 mb-5' />
                            </div>
                          </div>
                        </Fragment>
                      )
                    )
                  ) : (
                    <p>No Rooms Added</p>
                  )}
                  <div className='w-full flex flex-wrap'>
                    <div className='text-left flex mb-3'>
                      <Actionform
                        label='Add Accomodation'
                        icon={<FaPlus className='inline mr-1 my-auto' style={{ fontSize: '0.5rem' }} />}
                        onClick={_appendForm(indexItem, type.accomodation)}
                      />
                      <Actionform
                        label='Remove Accomodation'
                        icon={<FaMinus className='inline mr-1 my-auto' style={{ fontSize: '0.5rem' }} />}
                        onClick={_prependForm(indexItem, type.accomodation)}
                      />
                    </div>
                    <div className='w-full border-b-2 border border-teal-200 my-3' />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='w-full flex justify-end mb-10'>
            <span className='my-auto mr-5'>Continue to the next step</span>
            <Link to='/select-package' className='justify-center w-40 py-2 border border-solid border-yellow-500 rounded-sm uppercase text-sm flex'><FaChevronLeft className='inline my-auto mr-1 text-xs' /> Previous Step</Link>
            <button
              type='submit'
              onClick={_handleSubmit}
              className='text-center w-40 py-2 text-black bg-yellow-500 uppercase rounded-sm text-sm ml-5'>
              Next Step
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

const Actionform = ({ onClick, label, icon }) => {
  return (
    <button
      type='button'
      className='focus:outline-none w-auto font-bold flex mr-5'
      onClick={onClick}>
      {icon}{label}
    </button>
  )
}

const mapDispatchToProps = {
  ModalAction, RfpDataGet
}

const DateFormat = ({ dateTime, status }) => {
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  return dateFormatValue[0] + " " + dateFormatValue[2] + " " + dateFormatValue[1] + " " + dateFormatValue[3]
}

export default connect(null, mapDispatchToProps)(EventScheduling)
