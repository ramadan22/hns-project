import React from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import loadable from '@loadable/component'
import Select from 'react-select'

const FormatDate = (dateTime) => {
    let dateFormatValue = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(dateTime))
    dateFormatValue = dateFormatValue.split('/')
    return (dateFormatValue[2]+"-"+dateFormatValue[0]+"-"+dateFormatValue[1])
}

const FormatDateBack = (dateTime) => {
    let dateFormatValue = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(dateTime))
    dateFormatValue = dateFormatValue.split('/')
    return (dateFormatValue[2]+"/"+dateFormatValue[0]+"/"+dateFormatValue[1])
}

export {
    React,
    DatePicker,
    axios,
    FormatDate,
    FormatDateBack,
    loadable,
    Select
}

export * from 'react'
export * from 'axios'
export * from 'react-router-dom'
export * from '@loadable/component'
export * from 'react-select'