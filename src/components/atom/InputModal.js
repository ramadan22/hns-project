import { React } from '../../libraries'

export const InputModal = (props) => {
    const { TextPlaceholder } = props

    return(
        <input type="text" className="w-full border-b border-solid border-gray-300 py-3 mb-5 focus:outline-none" placeholder={TextPlaceholder} />
    )
}

InputModal.defaultProps = {
    TextPlaceholder: 'Text Placeholder'
}