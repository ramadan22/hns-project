import { React } from '../../libraries'

export const Paragraph = (props) => {
    const { ClassName, Text } = props

    return (
        <p className={ClassName} dangerouslySetInnerHTML={{__html: Text}}></p>
    )
}

Paragraph.defaultProps = {
    Text: 'Text Paragraph',
    ClassName: ''
}