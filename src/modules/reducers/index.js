import { combineReducers } from 'redux'

import { EventList } from './Event__Reducer'
import { AttendeesList } from './Attendees__Reducer'
import { NewsLatestData, NewsDetailParam } from './News__Reducer'
import { FaqData } from './Faq__Reducer'
import { MostSearchedData } from './MostSearched__Reducer'
import { Location, LocationCountry } from './Location__Reducer'
import { LoginStatus } from './Member__Reducer'
import { RedirectTo } from './Redirect__Reducer'
import { AvabilityResult, AvabilityDetail } from './suppliers/avability/Avability__Reducer'
import { CartDataList, CartResponse, CartDataAdd } from './cart/Cart__Reducer'
import { ModalReducer } from './modal/Modal__Reducer'
import { ModalLogin } from './modal/ModalLogin__Reducer'
import { RfpDataGetReducer } from './rfp/RfpData__Reducer'
import { GtsDataGetReducer } from './gts/GtsData__Reducer'
import { ContactUs } from './ContactUs__Reducer'
import { Params } from './ParamsRfpNonHotel__Reducer'

export const rootReducers = combineReducers({
    EventList,
    AttendeesList,
    NewsLatestData,
    NewsDetailParam,
    FaqData,
    MostSearchedData,
    Location,
    AvabilityResult,
    AvabilityDetail,
    LoginStatus,
    CartDataList,
    CartResponse,
    CartDataAdd,
    ModalReducer,
    ModalLogin,
    RfpDataGetReducer,
    GtsDataGetReducer,
    ContactUs,
    RedirectTo,
    LocationCountry,
    Params
})