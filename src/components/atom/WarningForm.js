import { React } from '../../libraries'
import { FaSortDown, FaExclamation } from '../icons'
import { Transition } from 'react-transition-group'

export const WarningForm = () => {
  const defaultStyle = {
    transition: `all 1s ease`,
    opacity: '0'
  }

  const transitionStyles = {
    entering: { opacity: '0' },
    entered: { opacity: '1' },
  }

  return (
    <Transition timeout={1000} in={true} appear>
      {(status) => (
        <div style={{ ...defaultStyle, ...transitionStyles[status], top: '-30px', fontSize: '11px', backgroundColor: '#ffc107', color: '#212529' }} className="absolute z-10 shadow right-0 py-1 px-2 flex rounded">
          <FaExclamation className="inline my-auto mr-1" style={{ fontSize: '10px' }} />Must select dropdown
          <FaSortDown className="absolute inset-x-0 mx-auto" style={{ bottom: '-8px', fontSize: '20px', color: '#ffc107' }} />
        </div>
      )}
    </Transition>
  )
}