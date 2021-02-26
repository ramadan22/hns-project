import { React, useState } from '../../libraries'
import { FaChevronDown } from '../icons'

export const FaqList = () => {
    const [toggleStatus, setToggleStatus] = useState(1)

    const handleToggle = (evt) => {
        const attribute = evt.currentTarget.getAttribute("data-value")
        const status = parseInt((toggleStatus !== attribute && attribute))
        // console.log(status);
        setToggleStatus(status)

        // console.log(toggleStatus)
    }

    return(
        <>
            <div className="w-full text-left cursor-pointer my-4" data-value={1} onClick={handleToggle}>
                <div className="w-full flex flex-wrap items-center">
                    <p>What is the meaning of lorem ipsum?</p>
                    <FaChevronDown className="ml-auto" />
                </div>
                <div className={`block bg-gray-300 p-3 mt-3 ${toggleStatus === 1 ? "block" : "hidden"}`}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </div>
            </div>
            <div className="w-full text-left cursor-pointer my-4" data-value={2} onClick={handleToggle}>
                <div className="w-full flex flex-wrap items-center">
                    <p>What is the meaning of lorem ipsum?</p>
                    <FaChevronDown className="ml-auto" />
                </div>
                <div className={`block bg-gray-300 p-3 mt-3 ${toggleStatus === 2 ? "block" : "hidden"}`}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </div>
            </div>
        </>
    )
}