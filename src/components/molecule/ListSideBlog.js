import { React, Link } from '../../libraries'
import { HandleError } from '../atom'

export const ListSideBlog = (props) => {
  const { data } = props

  return (
    <div className="w-full flex flex-wrap mt-5">
      <Link to={`/blog-detail/${data.code}-${data.title.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-')}`} className="w-1/4">
        <img src={`${data !== '' ? data.image : ''}`} onError={HandleError} alt="blog list" className="object-cover h-16 w-full" />
      </Link>
      <Link to={`/blog-detail/${data.code}-${data.title.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-')}`} className="w-3/4 my-auto">
        <p className="text-xs text-left pl-3 leading-tight">{`${data !== '' ? ((data.title.length > 70) ? data.title.substring(0, 70)+'...' : data.title) : ''}`}</p>
      </Link>
    </div>
  )
}

ListSideBlog.defaultProps = {
  data: ''
}