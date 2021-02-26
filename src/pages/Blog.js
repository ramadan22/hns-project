import { React, useState, useEffect, useRef } from '../libraries'
import { Navbar, Footer, ListSideBlog, ListBlog } from '../components/molecule'
import { PanelHeading } from '../components/atom'
import { Api } from '../helpers/api'
import { FaSearch, FaChevronLeft, FaChevronRight } from '../components/icons'
import { connect } from 'react-redux'
import { NewsLatestActionDetailParam } from '../modules/actions'

const DateFormat = ({ dateTime }) => {
  let splitFormatValue = dateTime.split("-")
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  return <option value={`${splitFormatValue[0]}-${splitFormatValue[1]}`}>{dateFormatValue[1] + " " + dateFormatValue[2]}</option>
}

const ListPag = ({ page, lastPage, currentPage }) => {
  const handleChangePage = (event) => {
    page(event.target.value)
  }

  var list = []
  for(var q=1; q<=lastPage; q++)
    list.push(<button key={q} onClick={handleChangePage} value={q} class={`relative inline-flex items-center px-5 py-2 border border-gray-300 bg-white text-lg font-medium hover:bg-gray-50 ${currentPage == q ? 'font-bold text-white' : 'text-gray-700' }`} style={{ backgroundColor : (currentPage == q ? "#414141" : "") }}>{q}</button>)

  return list
}

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

const Blog = ({ NewsDetailParam }) => {
  const scrollProduct = useRef(null)
  const [popularBlog, setPopularBlog] = useState([])
  const [recentBlog, setRecentBlog] = useState([])
  const [archive, setArchive] = useState([])
  const [blog, setBlog] = useState([])
  const [fromBlog, setFromBlog] = useState(0)
  const [toBlog, setToBlog] = useState(0)
  const [totalBlog, setTotalBlog] = useState(0)
  const [paramKeyword, setParamKeyword] = useState('')
  const [lastPage, setLastPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState([])
  const [month, setMonth] = useState('')
  const [years, setYears] = useState('')
  const [archiveValue, setArchiveValue] = useState({
    year: '',
    month: ''
  })

  useEffect(() => {
    Api.get(`/master/api/v1/news/fetch?keyword=${keyword}&year=${years}&month=${month}&perPage=3&page=${page}`)
    .then(res => {
      console.log("Blog data", res)
      setFromBlog(res.data.data.from)
      setToBlog(res.data.data.to)
      setTotalBlog(res.data.data.total)
      setBlog(res.data.data.items)
      setLastPage(res.data.data.lastPage)
      setCurrentPage(res.data.data.currentPage)
      NewsLatestActionDetailParam(null)
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [keyword, years, month, page])

  const getPopularBlog = () => {
    Api.get('/master/api/v1/news/popular')
      .then(res => {
        setPopularBlog(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getRecentBlog = () => {
    Api.get('/master/api/v1/news/recent')
      .then(res => {
        setRecentBlog(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getArchive = () => {
    Api.get('/master/api/v1/news/archivesList')
      .then(res => {
        setArchive(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleChangeKeyword = (event) => {
    setParamKeyword(event.target.value)
  }

  const searchKeyword = (event) => {
    event.preventDefault()
    setKeyword(paramKeyword)
  }

  useEffect(() => {
    getPopularBlog()
  }, [])

  useEffect(() => {
    getRecentBlog()
  }, [])

  useEffect(() => {
    getArchive()
  }, [])

  const NewsArchive = (event) => {
    let time = event.target.value
    let splitTime = time.split("-")
    setParamKeyword('')
    setMonth(splitTime[1])
    setYears(splitTime[0])
  }

  const executeScroll = () => scrollToRef(scrollProduct)

  const handleClickChangePage = (value) => {
    setPage(value)
    executeScroll()
  }

  return (
    <>
      <div ref={scrollProduct} className="w-full"></div>
      <Navbar NavActive={"blog"} BreadData={"Home,Blog"} />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <div className="w-1/4 border-r border-solid border-gray-300">
          <div className="w-full px-5">
            <div className="relative">
              <form onSubmit={searchKeyword}>
                <input type="input" name="keyword" onChange={handleChangeKeyword} value={paramKeyword} className="w-full rounded bg-gray-200 border-0 focus:outline-none px-3 py-2" placeholder="Search" required />
                <button type="submit" className="absolute pin-r pin-t top-0 right-0 bg-yellow-400 text-white p-3 focus:outline-none">
                  <FaSearch className="h-4" />
                </button>
              </form>
            </div>
          </div>
          <hr className="my-3 border-b-1" />
          <div className="w-full px-5 mb-10">
            <PanelHeading Text="POPULAR POST" />
            {popularBlog && popularBlog.length > 0 ? (
              popularBlog.map((res, index) => {
                return <ListSideBlog data={res} key={index} />
              })
            ) : ('')}
          </div>
          <div className="w-full px-5 mb-10">
            <PanelHeading Text="RECENT POST" />
            {recentBlog && recentBlog.length > 0 ? (
              recentBlog.map((res, index) => {
                return <ListSideBlog data={res} key={index} />
              })
            ) : ('')}
          </div>
          <div className="w-full px-5">
            <PanelHeading Text="BLOG ARCHIVES" />
            <div className="mt-5">
              <select onChange={NewsArchive} defaultValue={`${archiveValue.year}-${archiveValue.month}`} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option hidden>Select Month</option>
                {archive.length > 0 ? (
                  archive.map((res, index) => {
                    return <DateFormat key={index} dateTime={`${res.year}-${res.month}-01`} />
                  })
                ) : ('')}
              </select>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          {blog.length > 0 ? (
            <>
              {blog.map((res, index) => {
                return <ListBlog key={index} data={res} key={index} />
              })}
              <div className="w-full mt-10 pl-10">
                <div className="bg-white py-3 flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                      Previous
                    </a>
                    <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                      Next
                    </a>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between border border-solid border-gray-300">
                    <div className="hidden">
                      <p className="text-sm text-gray-700">
                        Showing&nbsp;
                        <span className="font-medium">{`${fromBlog}`}</span>
                        &nbsp;to&nbsp;
                        <span className="font-medium">{`${toBlog}`}</span>
                        &nbsp;of&nbsp;
                        <span className="font-medium">{`${totalBlog}`}</span>
                        &nbsp;results&nbsp;
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" className="hidden relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Previous</span>
                          <FaChevronLeft />
                        </a>
                        {<ListPag page={(value) => handleClickChangePage(value)} lastPage={`${lastPage}`} currentPage={`${currentPage}`} />}
                        <a href="#" className="hidden relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Next</span>
                          <FaChevronRight />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : ('')}
        </div>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  NewsDetailParam: state.NewsDetailParam.params
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)