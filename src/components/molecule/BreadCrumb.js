import { React, useState, useEffect } from '../../libraries'
import { FaChevronRight } from '../icons'

export const BreadCrumb = (props) => {
  const { BreadData } = props
  const [bread, setBread] = useState([])
  
  useEffect(() => {
    if(BreadData !== ''){
      const breadSplit = BreadData.split(',')
      setBread(breadSplit)
    }
  }, [BreadData])

  return (
    BreadData !== '' ? (
      bread.length > 0 ? (
        <div className="bread-crumb text-left text-sm mb-4 flex">
          {bread.map((res, index) => {
            return(
              <span key={index} className="flex flex-no-wrap">
                {`${res}`}
                {index < (bread.length-1) && <FaChevronRight className="inline mx-2 my-auto" style={{ fontSize: '9px' }} />}
              </span>
            )
          })}
        </div>
      ) : ('') 
    ) : ('')
  )
}

BreadCrumb.defaultProps = {
  BreadData: ''
}