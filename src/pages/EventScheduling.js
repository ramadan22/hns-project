import {
  React,
  Link,
  useEffect,
  useState,
  Fragment,
  axios,
  Select,
  useCallback,
  useHistory
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
  const [spiner, setSpiner] = useState(false)
  const history = useHistory()
  const type = {
    food: 'food',
    accomodation: 'accomodataion'
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

  const onSelectMenu = useCallback((indexItem, indexFood) => option => {
    let { indexMenu, foodId, label } = option
    let data = [...listData]
    let menus = [...listFoodSelect]
   
    menus[indexItem].items.map((item, index) => {
      if (indexMenu === index) {
        menus[indexItem].items[index] = {
          indexMenu: index,
          foodId: item.foodId,
          name: item.name,
          code: item.code,
          status: item.status,
          isDisable: true
        }
      }
      return item
    })

    data[indexItem] = {
      ...data[indexItem],
      food: [...data[indexItem].food.map((item, idx) => {
        if (idx === indexFood) {
          return {
            ...item,
            foodId: foodId,
            foodName: label
          }
        }
        return item
      })]
    }

    menus[indexItem].items = listFoodSelect[indexItem].items.reduce((result, obj2) => {
      if (data[indexItem].food.some(obj1 => obj1.foodId === obj2.foodId)) {
        return [
          ...result, {
            foodId: obj2.foodId,
            name: obj2.name,
            code: obj2.code,
            status: obj2.status,
            isDisable: true
          }
        ]
      }
      return [
        ...result, {
          foodId : obj2.foodId, 
          name: obj2.name,
          code: obj2.code,
          status: obj2.status,
          isDisable: false
        }
      ]
    }, [])

    setListFoodSelect(menus)
    setListData(data)
  }, [listData, listFoodSelect])

  const onSelectRoom = useCallback((indexItem, indexAcc) => option => {
    const { indexRoom, accomodationTypeId, label } = option
    let data = [...listData]
    let room = [...listRoomAccomodation]
   
    room[indexItem].items.map((item, index) => {
      if (indexRoom === index) {
        room[indexItem].items[index] = {
            indexRoom: index,
            accomodationTypeId: item.accomodationTypeId,
            accomodationTypeName: item.accomodationTypeName,
            accomodationTypeCode: item.accomodationTypeCode,
            isDisable: true
        }
        return item
      }
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

    room[indexItem].items = listRoomAccomodation[indexItem].items.reduce((result, ob2) => {
      if (data[indexItem].accomodation.some(obj1 => obj1.accomodationTypeId === ob2.accomodationTypeId)) {
        return [
          ...result, {
            accomodationTypeId: ob2.accomodationTypeId,
            accomodationTypeName: ob2.accomodationTypeName,
            accomodationTypeCode: ob2.accomodationTypeCode,
            isDisable: true
          }
        ]
      }else {
        return [
        ...result, {
            accomodationTypeId: ob2.accomodationTypeId,
            accomodationTypeName: ob2.accomodationTypeName,
            accomodationTypeCode: ob2.accomodationTypeCode,
            isDisable: false
          }
        ]
      }
    }, [])

    setListRoomAccomodation(room)
    setListData(data)
  }, [listData, listRoomAccomodation])

  const _appendForm = useCallback((indexItem, type) => event => {
    let data = [...listData]
    let menus = [...listFoodSelect]
    let room = [...listRoomAccomodation]
    if (type === 'food') {
      menus[indexItem].items.map((item, index) => {
        if (indexItem === index) {
          menus[indexItem].items[index] = {
            ...item,
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
        food: [...data[indexItem].food, {
          isPackageIncluded: 1,
          tempRfpScheduleFoodId: '',
          tempRfpId: '',
          foodId: null,
          quantity: ''
        }]
      }

      menus[indexItem].items = listFoodSelect[indexItem].items.reduce((result, obj2) => {
        if (data[indexItem].food.some(obj1 => obj1.foodId === obj2.foodId)) {
          return [
            ...result, {
              foodId: obj2.foodId,
              name: obj2.name,
              code: obj2.code,
              status: obj2.status,
              isDisable: true
            }
          ]
        }
        return [
          ...result, {
            foodId : obj2.foodId, 
            name: obj2.name,
            code: obj2.code,
            status: obj2.status,
            isDisable: false
          }
        ]
      }, [])

      setListFoodSelect(menus)
      return setListData(data)
    } else {
    room[indexItem].items.map((item, index) => {
      if (indexItem === index) {
        room[indexItem].items[index] = {
              indexRoom: index,
              accomodationTypeId: item.accomodationTypeId,
              accomodationTypeName: item.accomodationTypeName,
              accomodationTypeCode: item.accomodationTypeCode,
              isDisable: true
          }
          return item
        }
      })

      data[indexItem] = {
        ...data[indexItem],
        accomodation: [...data[indexItem].accomodation, {
          isPackageIncluded: 1,
          tempRfpScheduleAccomodationId: '',
          accomodationTypeId: null,
          quantity: ''
        }]
      }

      room[indexItem].items = listRoomAccomodation[indexItem].items.reduce((result, ob2) => {
        if (data[indexItem].accomodation.some(obj1 => obj1.accomodationTypeId === ob2.accomodationTypeId)) {
          return [
            ...result, {
              accomodationTypeId: ob2.accomodationTypeId,
              accomodationTypeName: ob2.accomodationTypeName,
              accomodationTypeCode: ob2.accomodationTypeCode,
              isDisable: true
            }
          ]
        }else {
          return [
          ...result, {
              accomodationTypeId: ob2.accomodationTypeId,
              accomodationTypeName: ob2.accomodationTypeName,
              accomodationTypeCode: ob2.accomodationTypeCode,
              isDisable: false
            }
          ]
        }
      }, [])

      setListRoomAccomodation(room)
      return setListData(data)
    }
  }, [listData, listFoodSelect, listRoomAccomodation])
  

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

      menu[indexItem].items = listFoodSelect[indexItem].items.reduce((result, obj2) => {
        if (data[indexItem].food.some(obj1 => obj1.foodId === obj2.foodId)) {
          return [
            ...result, {
              foodId: obj2.foodId,
              name: obj2.name,
              code: obj2.code,
              status: obj2.status,
              isDisable: true
            }
          ]
        }
        return [
          ...result, {
            foodId : obj2.foodId, 
            name: obj2.name,
            code: obj2.code,
            status: obj2.status,
            isDisable: false
          }
        ]
      }, [])

      setListFoodSelect(menu)
      return setListData(data)
    } else {
      room[indexItem].items.map((item, index) => {
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

      room[indexItem].items = listRoomAccomodation[indexItem].items.reduce((result, ob2) => {
        if (data[indexItem].accomodation.some(obj1 => obj1.accomodationTypeId === ob2.accomodationTypeId)) {
          return [
            ...result, {
              accomodationTypeId: ob2.accomodationTypeId,
              accomodationTypeName: ob2.accomodationTypeName,
              accomodationTypeCode: ob2.accomodationTypeCode,
              isDisable: true
            }
          ]
        }else {
          return [
          ...result, {
              accomodationTypeId: ob2.accomodationTypeId,
              accomodationTypeName: ob2.accomodationTypeName,
              accomodationTypeCode: ob2.accomodationTypeCode,
              isDisable: false
            }
          ]
        }
      }, [])

      setListRoomAccomodation(room)
      return setListData(data)
    }
  }

  const _handleSubmit = event => {
    event.preventDefault()

    const schedule = { schedule: listData }

    setLoading(true)
    Api.post('/supplier/api/v2/rfp/schedule', {...schedule, guestId: getData("guestIdRfp") ? getData("guestIdRfp") : ""}, {
      headers: { 'User-Token': getData('tokenLogin') }
    })
      .then(res => {
        setLoading(false)
        history.push("/your-contact-information")
      })
      .catch(err => {
        ModalAction({ Type: 'failed-popup', Message: err.response.data.message })
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    let mounted = true
    if (mounted === true) {
      axios.all([
        Api.get(`/supplier/api/v2/rfp/fetch${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, {
          headers: { 'User-Token': getData('tokenLogin') }
        }),
        Api.get(`/supplier/api/v2/rfp/food${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, {
          headers: { 'User-Token': getData('tokenLogin') }
        }),
        Api.get(`/supplier/api/v2/rfp/accomodation${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, {
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

  console.log("list food select", listFoodSelect)
  console.log("list data", listData && listData)
  return (
    <>
      <Navbar Type='rfp' />
      <div className='container mx-auto px-10 flex flex-wrap pb-20'>
        <PanelTitleStep Text='1. Select Venue/Hotel' />
        <PanelTitleStep Text='2. Event Details' />
        <PanelTitleStep Text='3. Select a Package' />
        <PanelTitleStep Text='4. Event Schedule' />
        <form className='w-full' onSubmit={_handleSubmit}>
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
                                {/* {console.log('listFoodSelect render', listFoodSelect)} */}
                                <Select
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
                                  required={true}
                                  rules={{ required: 'Please select an Menu' }}
                                  getOptionValue={(option) => option.label}
                                  placeholder='Select Menus'
                                  isOptionDisabled={(option) => option.isDisable === true ? true : null }
                                  defaultValue={{
                                    label: item.foodName,
                                    foodId: item.foodId
                                  }}
                                />
                                {/* isOptionDisabled={(option) => item.foodName === option.label ? true : null } */} 
                                
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
                    <p className="mb-3">No Menu Added</p>
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
                                  required={true}
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
                                  placeholder='Select Rooms'
                                  isOptionDisabled={(option) => option.isDisable === true ? true : null }
                                  defaultValue={{
                                    accomodationTypeId: item.accomodationTypeId,
                                    label: item.accomodationTypeName
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
                    <p className="mb-3">No Rooms Added</p>
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
            {/* <button
              type='submit'
              onClick={_handleSubmit}
              className='text-center w-40 py-2 text-black bg-yellow-500 uppercase rounded-sm text-sm ml-5'>
              Next Step
            </button> */}
            <button type="submit" className="text-center w-40 py-2 text-black uppercase rounded text-sm ml-5 flex justify-center" style={{ backgroundColor: "#fed500" }}>
              <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Next Step
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