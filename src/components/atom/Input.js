import { React } from '../../libraries'

export const Input = (props) => {
    const { TextPlaceholder } = props

    return(
        <input type="text" className="" placeholder={TextPlaceholder} />
    )
}

Input.defaultProps = {
    TextPlaceholder: "Text Placeholder"
}