import { React, DatePicker } from '../libraries'
import { FaChevronDown, FaPlus } from 'react-icons/fa'
import { Navbar, Footer } from '../components/molecule'

const CreateRfpNonHotel = () => {
  return (
    <>
      <Navbar Type="rfp" />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <h3 className="font-bold text-2xl mb-6 uppercase">Create RFP Non Hotel</h3>
        <div className="w-full flex flex-wrap text-left shadow-xl rounded-lg py-6 px-10 border border-gray-300 border-solid">
          <div className="w-1/2 pr-10 mb-5">
            <p className="mb-2 font-bold">Type RFP Non Hotel</p>
            <div className="flex flex-wrap relative">
              <select name="" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="test">test</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="text-sm" />
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-10 mb-5">
            <p className="mb-2 font-bold">Date</p>
            <DatePicker className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm" />
          </div>
          <div className="w-1/2 pr-10 mb-5">
            <p className="mb-2 font-bold">Input Intem Name</p>
            <input type="text" className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm" />
          </div>
          <div className="w-1/2 pl-10 mb-5">
            <p className="mb-2 font-bold">Price</p>
            <input type="text" className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm" />
          </div>
          <div className="w-1/2 pr-10 mb-5">
            <p className="mb-2 font-bold">Attendees</p>
            <input type="text" className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm" />
          </div>
          <div className="w-1/2 pl-10 mb-5">
            <p className="mb-2 font-bold">Descriptions</p>
            <input type="text" className="w-full border py-1 px-4 border-solid border-gray-300 rounded-sm" />
          </div>
        </div>
        <div className="w-full text-left">
          <button className="mt-10 mb-4 flex font-bold"><FaPlus className="inline text-sm my-auto" />&nbsp;&nbsp;Add More</button>
        </div>
        <div className="w-full border-b-2 border-dotted border-teal-200 mt-5 mb-3"></div>
        <div className="w-full mt-2 text-left">
          <div className="flex mb-3">
            Please review before you continue this page
          </div>
          <button className="uppercase text-sm py-3 px-10 rounded" style={{ backgroundColor: "#fed500" }}>Finised</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CreateRfpNonHotel