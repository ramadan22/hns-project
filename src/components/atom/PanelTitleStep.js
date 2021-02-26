import { React } from '../../libraries'

export const PanelTitleStep = (props) => {
    const { Text } = props

    return (
        <div className="w-full py-2 px-4 mb-3 bg-gray-300 font-bold text-lg text-left rounded-sm">
            {Text}
        </div>
    )
}

PanelTitleStep.defaultProps = {
    Text: "Title Panel Step"
}