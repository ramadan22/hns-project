import { React, useEffect, useState } from '../../libraries'
import { TitleSection, HandleError } from '../atom'
import { Api } from '../../helpers/api'

export const MostSearched = ({ counterMostSearched }) => {
  const [mostSearchedList, setMostSearchedList] = useState([])

  useEffect(() => {
    Api.get('/master/api/v1/mostSearched/fetch')
      .then(response => {
        setMostSearchedList(response.data.data.items)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const handleClick = (value) => {
    counterMostSearched(value)
  }

  return (
    <div className="lg:container xl:mx-auto lg:px-10 px-5 most-searched flex flex-col">
      <div className="text-left mb-5 flex pr-5">
        <TitleSection Text="Most Searched!" Type="x-large" />
        <button className="focus:outline-none text-sm font-bold text-yellow-400 ml-auto">See more!</button>
      </div>
      <div className="flex flex-wrap">
        {mostSearchedList.length > 0 ? (
          mostSearchedList.map((res, index) => {
            return (
              <div key={index} className="sm:w-1/4 w-1/2 sm:mb-0 mb-4 sm:pr-5 px-2">
                <div className="w-full relative cursor-pointer" style={{ height: '115px' }} onClick={() => handleClick(`${res.name}`)}>
                  <div className="flex w-full h-full absolute bg-blue-500 bg-opacity-50 z-10 rounded-lg">
                    <p className="lg:text-xl text-base text-white m-auto">{`${res.name}`}</p>
                  </div>
                  <img src={`${res.image}`} onError={HandleError} alt={`${res.name}`} className="object-cover w-full h-full rounded-lg" />
                </div>
              </div>
            )
          })
        ) : ('')}
      </div>
    </div>
  )
}