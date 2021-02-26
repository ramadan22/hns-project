import { React, useState, useEffect } from '../../libraries'

import {
    IconShare,
    IconSignout,
    IconMyrfp,
    IconUser,
    IconHelpCenter
} from '../../assets/images'

export const Link = (props) => {
    const { LinkText, TypeLink, Link, ClassName, KeyIcon } = props

    const [linkClass, setLinkClass] = useState('')

    useEffect(() => {
        switch(TypeLink){
            case 'yellow-white':
                setLinkClass('px-6 rounded-md text-sm text-white py-1 bg-yellow-400 uppercase w-11/12')
                break
            case 'button-default':
                setLinkClass('px-6 rounded-md text-sm text-black-100 py-1 border border-grey-200 uppercase w-11/12 ml-auto')
                break
            case 'tag-blog':
                setLinkClass('text-xs inline ml-2 border-2 border-solid border-gray-200 rounded-md py-1 px-2')
                break
            case 'view-detail-blog':
                setLinkClass('w-full text-sm inline border-2 border-solid border-yellow-400 rounded-md py-1 px-2')
                break
            default:
                setLinkClass(ClassName)
        }
    }, [TypeLink, ClassName])

    return(
        <a href={Link} className={`${linkClass} ${KeyIcon !== "" && "flex items-center"}`}>
            {KeyIcon === "IconShare" && <div className="inline mr-3" dangerouslySetInnerHTML={{__html: `<img src=${IconShare} alt="icon dropdown" />`}}></div>}
            {KeyIcon === "IconSignout" && <div className="inline mr-3" dangerouslySetInnerHTML={{__html: `<img src=${IconSignout} alt="icon dropdown" />`}}></div>}
            {KeyIcon === "IconMyrfp" && <div className="inline mr-3" dangerouslySetInnerHTML={{__html: `<img src=${IconMyrfp} alt="icon dropdown" />`}}></div>}
            {KeyIcon === "IconUser" && <div className="inline mr-3" dangerouslySetInnerHTML={{__html: `<img src=${IconUser} alt="icon dropdown" />`}}></div>}
            {KeyIcon === "IconHelpCenter" && <div className="inline mr-3" dangerouslySetInnerHTML={{__html: `<img src=${IconHelpCenter} alt="icon dropdown" />`}}></div>}
            {LinkText}
        </a>
    )
}

Link.defaultProps = {
    LinkText: "Link",
    TypeLink: "default",
    Link: "!#",
    ClassName: 'text-sm text-blue-500 inline',
    KeyIcon: ""
}