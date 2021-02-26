import { React, Link } from '../../libraries'

export const NavLeft = (props) => {
  const { Active, Params } = props

  return (
    <>
      <Link to={`/hotel-overview/placeid-${Params}`}><div className={`px-5 py-2 text-lg mb-3 ${Active === 'ho' && "bg-gray-300"}`}>Hotel Overview</div></Link>
      <Link to={`/detailed-information/placeid-${Params}`}><div className={`px-5 py-2 text-lg mb-3 ${Active === 'di' && "bg-gray-300"}`}>Detailed Information</div></Link>
      <Link to={`/function-space-layouts/placeid-${Params}`}><div className={`px-5 py-2 text-lg mb-3 ${Active === 'fsl' && "bg-gray-300"}`}>Function space & Layouts</div></Link>
      <Link to={`/accomodation/placeid-${Params}`}><div className={`px-5 py-2 text-lg mb-3 ${Active === 'acc' && "bg-gray-300"}`}>Accomodation</div></Link>
    </>
  )
}

NavLeft.defaultProps = {
  Params: '#',
  Active: ''
}