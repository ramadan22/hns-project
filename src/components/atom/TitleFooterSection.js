import { React } from '../../libraries'

export const TitleFooterSection = (props) => {
    const { text } = props

    return(
        <h4 className="text-md uppercase font-bold mb-3">{text}</h4>
    )
}

TitleFooterSection.defaultProps = {
    text: 'title footer'
}