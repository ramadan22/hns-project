import { React } from '../../libraries'
import Image from '../../assets/images/image-room-meeting.jpg'

export const ThumbnailMostSearched = () => {
    return(
        <div className="w-full relative">
            <div className="flex w-full h-full absolute bg-blue-500 bg-opacity-50 z-10 rounded-lg">
                <p className="text-xl text-white m-auto">Asia</p>
            </div>
            <img src={Image} alt="meeting room" className="object-cover w-full h-24 rounded-lg" />
        </div>
    )
}