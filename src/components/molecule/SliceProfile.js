import { React } from '../../libraries'

import { FaChevronRight } from '../icons'
import { Input } from '../atom'

export const SliceProfile = () => {
    return (
        <>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 pl-6 pr-2 mb-5">
                <div className="w-1/2 text">
                    <Input TextPlaceholder="User ID" />
                </div>
                <div className="w-1/2 justify-end flex flex-wrap items-center">
                    <p>AA2312SAS</p>
                    <FaChevronRight className="inline ml-4 text-sm" />
                </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 pl-6 pr-2 mb-5">
                <div className="w-1/2 text">
                    <Input TextPlaceholder="Name" />
                </div>
                <div className="w-1/2 justify-end flex flex-wrap items-center">
                    <p>Frank Brown</p>
                    <FaChevronRight className="inline ml-4 text-sm" />
                </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 pl-6 pr-2 mb-5">
                <div className="w-1/2 text">
                    <Input TextPlaceholder="Email" />
                </div>
                <div className="w-1/2 justify-end flex flex-wrap items-center">
                    <p>frank@brown.com</p>
                    <FaChevronRight className="inline ml-4 text-sm" />
                </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 pl-6 pr-2 mb-5">
                <div className="w-1/2 text">
                    <Input TextPlaceholder="Phone Number" />
                </div>
                <div className="w-1/2 justify-end flex flex-wrap items-center">
                    <p>+123 1234 1234 123</p>
                    <FaChevronRight className="inline ml-4 text-sm" />
                </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 pl-6 pr-2 mb-5">
                <div className="w-1/2 text">
                    <Input TextPlaceholder="Telephone Number" />
                </div>
                <div className="w-1/2 justify-end flex flex-wrap items-center">
                    <p>+01 123412342</p>
                    <FaChevronRight className="inline ml-4 text-sm" />
                </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 pl-6 pr-2 mb-5">
                <div className="w-1/2 text">
                    <Input TextPlaceholder="Company" />
                </div>
                <div className="w-1/2 justify-end flex flex-wrap items-center">
                    <p>PT DIGITAL ABC</p>
                    <FaChevronRight className="inline ml-4 text-sm" />
                </div>
            </div>
            <div className="w-full border-b border-solid border-gray-300 flex flex-wrap pb-3 pl-6 pr-2 mb-5">
                <p className="w-11/12 text-sm mb-1">Address</p>
                <p className="w-11/12">Cur office is located within the company's building Address Keas 69 Str.</p>
                <FaChevronRight className="inline ml-auto text-sm" />
            </div>
        </>
    )
}