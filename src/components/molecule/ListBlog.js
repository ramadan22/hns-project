import { React, Link } from '../../libraries'

import { FbIcon, LinIcon, InsIcon } from '../icons'
import { HandleError } from '../atom'

const DateFormat = ({ dateTime }) => {
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')
  return (dateFormatValue[1] + " " + dateFormatValue[0] + ", " + dateFormatValue[2])
}

export const ListBlog = (props) => {
  const { data } = props

  return (
    <div className="w-full list-blog pl-10 mb-10">
      <div className="px-20 mb-3">
        <div className="flex flex-wrap title-section text-3xl text-gray-700 leading-tight block mb-5">
          <h1 className="mx-auto text-center">{`${data !== '' ? data.title : ''}`}</h1>
        </div>
      </div>
      <div className="flex flex-wrap mb-3">
        <div className="w-auto mr-auto"><DateFormat dateTime={`${data !== '' ? data.createdAt : ''}`} /></div>
        <div className="w-auto ml-auto">
          {data !== '' && data.tag !== undefined && data.tag !== '' ? (
            data.tag.split(',').map((res, index) => {
              return <button key={index} className="text-xs inline ml-2 border-2 border-solid border-gray-200 rounded-md py-1 px-2">{`${res}`}</button>
            })
          ) : ('')}
        </div>
      </div>
      <img src={`${data !== '' ? data.image : ''}`} onError={HandleError} alt={`${data !== '' ? data.title : ''}`} className="w-full h-64 object-cover mb-3" />
      <div className="text-left mt-1" style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: `${data !== '' ? ((data.content.replace(/(<([^>]+)>)/ig, "").length > 245) ? data.content.replace(/(<([^>]+)>)/ig, "").substring(0, 245)+'...' : data.content) : ''}` }}></div>
      <div className="mt-5 flex flex-wrap">
        <div className="w-2/12 flex items-center">
          <img src={FbIcon} alt="icon facebook" className="mr-auto w-auto" />
          <img src={LinIcon} alt="icon linkedin" className="m-auto w-auto" />
          <img src={InsIcon} alt="icon facebook" className="m-auto w-auto" />
        </div>
        <div className="w-8/12 flex items-center">
          <hr className="w-full" />
        </div>
        <div className="w-2/12 flex flex-wrap">
          <Link to={`/blog-detail/${data.code}-${data.title.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-')}`} className="w-full text-sm inline border-2 border-solid border-yellow-400 rounded-md py-1 px-2">Continue Reading</Link>
        </div>
      </div>
    </div>
  )
}

ListBlog.defaultProps = {
  data: ''
}