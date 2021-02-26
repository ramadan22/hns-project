import { React, useEffect, useState } from '../../libraries'

export const TitleSection = (props) => {
    const { Text, Type, WithSmallText, ClassName } = props

    const [classTitleSection, setClassTitleSection] = useState(null)
    const [load, setLoad] = useState("hidden")

    useEffect(() => {
        setLoad("block")

        switch(Type){
            case "medium":
                setClassTitleSection('text-md')
                break
            case "x-large":
                setClassTitleSection('text-xl text-gray-700 font-bold')
                break
            case "3xl-large":
                setClassTitleSection('text-3xl text-gray-700 leading-tight')
                break
            default:
                setClassTitleSection(ClassName)
        }
    },[Type, ClassName])

    return(
        <div className={`flex flex-wrap title-section ${classTitleSection} ${load}`}>
            <h1>{ Text }</h1> {WithSmallText !== undefined && <p className="font-medium text-xs ml-5 mt-2 text-gray-500">{WithSmallText}</p>}
        </div>
    )
}

TitleSection.defaultProps = {
    Text: "Title Section",
    Type: "normal",
    ClassName: ''
}