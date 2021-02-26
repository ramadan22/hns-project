import { React } from '../../libraries'

import { Link, TitleSection, Paragraph } from '.'
import Image from '../../assets/images/image-room-meeting.jpg'

export const ThumbnailLastNewsAndFaq = (props) => {
  const { Title, Text, Type } = props

  return (
    <div className="thumbnail-last-news-faq flex flex-wrap">
      <h3 className={`w-1/2 text-xl mb-5 font-bold text-gray-700 ${Type === "lastNews" && "uppercase"}`}>{Title}</h3>
      {Type === "lastNews" && <Link LinkText="See Details" ClassName="ml-auto mt-auto font-bold text-sm text-yellow-400 mb-5 text-gray-700" />}
      <div className="w-full flex-column h-56 bg-white relative">
        <div className="w-full h-full object-cover absolute z-10 bg-black">
          <img src={Image} alt="meeting room" className="w-full h-full object-cover opacity-75" />
        </div>
        {Type === "lastNews" ? (
          <div className="flex items-center absolute z-20 bottom-0 mb-5">
            <div className="w-1/2 px-5 text-sm text-white">{Text}</div>
            <div className="w-1/2 px-5 flex flex-wrap justify-end">
              <a href="!#" className="w-full text-center border border-solid border-white rounded-sm p-3 text-white">Looking For Meeting space?</a>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-wrap relative z-20">
            <div className="m-auto text-center">
              <TitleSection Text="FAQ" ClassName="flex justify-center text-3xl mb-2 text-white" />
              <Paragraph Text="If you cannot find the answer to question<br />please contact us by email<br />contact@hnssmallmeeting.com or<br />by phone +123 456 789" ClassName="text-sm leading-tight text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ThumbnailLastNewsAndFaq.defaultProps = {
  Title: 'Title',
  Text: 'lorem ipsum dola sit amet Pout Edsid calm. Lorem ipsum dola',
  Type: 'lastNews'
}