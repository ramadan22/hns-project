import { React } from '../../libraries'

export const PanelHeading = (props) => {
  const { Text } = props

  return (
    <div className="text-center py-3 bg-gray-200 text-black text-lg uppercase font-bold">{Text}</div>
  )
}

PanelHeading.defaultProps = {
  Text: "Panel Heading"
}