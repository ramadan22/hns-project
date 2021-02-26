import { React } from '../../libraries'
import Image from '../../assets/images/image-room-meeting.jpg'

export const WrapImageDeals = () => {
    return(
        <img src={Image} alt="room meeting" className="w-full rounded-r-md object-cover h-64" />
    )
}