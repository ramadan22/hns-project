import { React } from '../../../libraries'

export const ThumbnailLoading = () => {
  return (
    <div className="lg:w-1/3 w-1/2 text-left xl:pr-8 px-2 xl:pb-8 pb-4">
      <div className="thumbnail-molecule relative">
        <div className="xl:h-48 sm:h-40 h-24 rounded-t-md animate"></div>
        <div className="w-full flex flex-wrap shadow-lg py-3 px-4 border-solid border-grey-100 border-r-2 border-l-2 bg-gray-300">
          <div className="w-1/2">
            <p className="h-4 animate"></p>
            <p className="h-3 mt-4 animate"></p>
          </div>
          <div className="w-1/2">
            <p className="h-4 animate"></p>
            <p className="h-3 mt-4 animate"></p>
          </div>
        </div>
        <div className="w-full flex flex-wrap pt-5 px-4 pb-4 flex flex-wrap border-2 border-t-0 border-grey-100 border-solid rounded-b-md">
          <h2 className="w-full flex-column mb-4 h-5 animate">&nbsp;</h2>
          <p className="w-full flex flex-column items-center text-md mb-5 animate h-5"></p>
          <div className="w-full flex flex-column items-center text-left text-sm mb-2">
            <div className="w-2/3 mr-auto animate">&nbsp;</div>
            <div className="w-1/3 font-bold">
              <p className="w-5 ml-auto animate">&nbsp;</p>
            </div>
          </div>
          <div className="w-full flex flex-column items-center text-left text-sm mb-2">
            <div className="w-2/3 mr-auto animate">&nbsp;</div>
            <div className="w-1/3 font-bold">
              <p className="w-5 ml-auto animate">&nbsp;</p>
            </div>
          </div>
          <div className="w-full flex flex-column items-center text-left text-sm mb-2">
            <div className="w-2/3 mr-auto animate">&nbsp;</div>
            <div className="w-1/3 font-bold">
              <p className="w-5 ml-auto animate">&nbsp;</p>
            </div>
          </div>
          <div className="w-full flex flex-wrap mt-2">
            <p className="w-1/3 animate">&nbsp;</p>
          </div>
          <div className="w-full mt-3 flex flex-wrap">
            <div className="w-1/2 flex text-center">
              <div className="px-6 rounded-md text-sm text-white py-1 uppercase w-11/12 animate"></div>
            </div>
            <div className="w-1/2 flex text-center">
              <div className="px-6 rounded-md text-sm text-black-100 py-1 border border-grey-200 uppercase w-11/12 ml-auto animate">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}