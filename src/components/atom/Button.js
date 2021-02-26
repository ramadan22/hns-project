import { React, useEffect, useState } from '../../libraries'

export const Button = (props) => {
  const { Type, Text, ClassName } = props

  const [buttonClass, setButtonClass] = useState(null)

  useEffect(() => {
    switch (Type) {
      case "Send Request":
        setButtonClass("w-full py-1 border-2 rounded-md border-solid border-white")
        break
      case "Explore Now!":
        setButtonClass("w-9/12 h-full py-1 uppercase rounded-md bg-yellow-400 text-white")
        break
      case "yellow-white":
        setButtonClass("w-auto h-full px-5 py-1 uppercase rounded-md bg-yellow-400 text-white")
        break
      case "button-less":
        setButtonClass("")
        break
      default:
        setButtonClass(ClassName)
    }
  }, [Type, ClassName])

  return (
    <button className={`${buttonClass}`}>{Text}</button>
  )
}

Button.defaultProps = {
  Type: "default",
  Text: "Button",
  ClassName: "w-full py-1 rounded-md border-2 border-solid border-gray-300 focus:outline-none active:bg-gray-200"
}