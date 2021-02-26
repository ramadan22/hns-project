import { React, Link, useEffect, useState } from '../../libraries'
import { TitleSection, Paragraph } from '../atom'
import { connect } from 'react-redux'
import { NewsLatestAction, FaqFooterAction } from '../../modules/actions'

const ContainerLastNewsAndFaq = ({ NewsLatestAction, NewsLatestData, FaqFooterAction, FaqFooterData, counterLooking }) => {
  const [newsLatest, setNewsLatest] = useState({})
  const [load, setLoad] = useState(false)

  const handleClickCounter = () => {
    counterLooking(true)
  }
  
  useEffect(() => {
    NewsLatestAction()
  }, [NewsLatestAction])

  useEffect(() => {
    if(NewsLatestData.loadingNewsLatest === false && Object.keys(NewsLatestData.data).length > 0 && Object.keys(newsLatest).length < 1){
      setNewsLatest(NewsLatestData.data)
    }
  }, [NewsLatestData.data])

  useEffect(() => {
    FaqFooterAction()
  }, [FaqFooterAction])

  useEffect(() => {
    setLoad(true)
  }, [load])

  return (
    <div className="container-last-news-faq bg-gray-200 pt-10 pb-24 mb-10">
      <div className="lg:container mx-auto lg:px-10 px-5 flex flex-wrap">
        <div className="sm:w-1/2 w-full text-left lg:pr-6 sm:pr-2 pr-0">
          <div className="thumbnail-last-news-faq flex flex-wrap">
            {Object.keys(newsLatest).length > 0 &&
              <>
                <h3 className={`w-1/2 lg:text-xl text-lg sm:mb-5 mb-2 font-bold text-gray-700 uppercase`}>Latest News</h3>
                <Link to="/blog" className="ml-auto mt-auto font-bold text-sm text-yellow-400 mb-5 text-gray-700">See Details</Link>
                <div className="w-full flex-column h-56 bg-white relative">
                  <div className="w-full h-full object-cover absolute z-10 bg-black">
                    <img src={newsLatest.image} alt="meeting room" className="w-full h-full object-cover opacity-75" />
                  </div>
                  <div className="w-full flex items-center absolute z-20 bottom-0 mb-5">
                    <div className="w-1/2 px-5 text-sm text-white">{newsLatest.title}</div>
                    <div className="w-1/2 lg:px-5 px-2 flex flex-wrap justify-end">
                      <button onClick={handleClickCounter} className="w-full text-center border border-solid border-white rounded-sm p-3 lg:px-3 px-1 text-white lg:text-base text-xs focus:outline-none">Looking For Meeting space?</button>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
        <div className="sm:w-1/2 w-full text-left lg:pl-6 sm:pl-2 pl-0 sm:mt-0 mt-5">
          <Link to={"/faq"}>
            <div className="thumbnail-last-news-faq flex flex-wrap">
              {load && FaqFooterData.dataFaqFooter && FaqFooterData.loadingFaqFooter === false &&
                <>
                  <h3 className={`lg:w-1/2 w-full lg:text-xl text-lg sm:mb-5 mb-2 font-bold text-gray-700`}>Frequently asked questions</h3>
                  <div className="w-full flex-column h-56 bg-white relative">
                    <div className="w-full h-full object-cover absolute z-10 bg-black">
                      <img src={FaqFooterData.dataFaqFooter.image} alt="meeting room" className="w-full h-full object-cover opacity-75" />
                    </div>
                    <div className="w-full h-full flex flex-wrap relative z-20 lg:px-0 px-2">
                      <div className="m-auto text-center">
                        <TitleSection Text="FAQ" ClassName="flex justify-center lg:text-3xl text-xl mb-2 text-white" />
                        <Paragraph Text={FaqFooterData.dataFaqFooter.content} ClassName="text-sm leading-tight text-white" />
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  NewsLatestData: state.NewsLatestData,
  FaqFooterData: state.FaqData
})

const mapDispatchToProps = {
  NewsLatestAction,
  FaqFooterAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerLastNewsAndFaq)