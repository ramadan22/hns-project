import { React, useState, useEffect, useHistory, Link } from '../libraries'

import { Navbar, Footer, ListSideBlog } from '../components/molecule'
import { PanelHeading, Button } from '../components/atom'
import { IconFB, IconInstagram, IconLin } from '../assets/images'
import { Api } from '../helpers/api'
import { FaSearch } from '../components/icons'
import { NewsLatestActionDetailParam } from '../modules/actions'
import { connect } from 'react-redux'

const DateFormat = ({dateTime}) => {
  let splitFormatValue = dateTime.split("-")
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')

  return <option value={`${splitFormatValue[0]}-${splitFormatValue[1]}`}>{dateFormatValue[1] + " " + dateFormatValue[2]}</option>
}

const ComponentNavbar = ({data}) => {
  return data && <Navbar NavActive={"blog"} BreadData={`Home,Blog,Blog Detail,${data}`} />
}

const DateFormat2 = ({ dateTime }) => {
  let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "long"
  }).format(new Date(dateTime))

  dateFormatValue = dateFormatValue.split(' ')
  return (dateFormatValue[1] + " " + dateFormatValue[0] + ", " + dateFormatValue[2])
}

const BlogDetail = ({match, NewsLatestActionDetailParam}) => {
  const history = useHistory()
  const [popularBlog, setPopularBlog] = useState([])
  const [recentBlog, setRecentBlog] = useState([])
  const [archive, setArchive] = useState([])
  const [blog, setBlog] = useState({})
  const [breadDetail, setBreadDetail] = useState(null)
  const [paramBlog, setParamBlog] = useState(null)
  const [keyword, setKeyword] = useState([])
  const [listBlog, setListBlog] = useState([])
  const [nextBlog, setNextBlog] = useState("")
  const [previousBlog, setPreviousBlog] = useState([])

  const paramSend = match.params.id.split("-")

  useEffect(() => {
    setParamBlog(paramSend[0])
  }, [paramSend])

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

  useEffect(() => {
    Api.get(`/master/api/v1/news/fetch`)
    .then(res => {
      setListBlog(res.data.data.items)
    })
    .catch(function (error) {
      console.log(error.response)
    })
  }, [])

  useEffect(() => {
    Api.get(`/master/api/v1/news/detail/code=${paramBlog}`)
    .then(res => {
      setBlog(res.data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [paramBlog])

  useEffect(() => {
    if(Object.keys(blog).length > 0)
      setBreadDetail(blog.title);
  }, [blog])

  useEffect(() => {
    getPopularBlog()
  }, [])

  useEffect(() => {
    getRecentBlog()
  }, [])

  useEffect(() => {
    getArchive()
  }, [])

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value)
  }

  const searchKeyword = (event) => {
    event.preventDefault()
    NewsLatestActionDetailParam({keyword: keyword})
    history.push('/blog/')
  }

  const NewsArchive = (event) => {
    let time = event.target.value
    let splitTime = time.split("-")
    NewsLatestActionDetailParam({year: splitTime[0], month: splitTime[1]})
    history.push('/blog/')
  }

  useEffect(() => {
    if(listBlog.length > 0){
      listBlog.map((res, index) => {
        if(res.code === blog.code){
          setNextBlog(`/blog-detail/${listBlog[index+1] !== undefined ? listBlog[index+1].code+"-"+listBlog[index+1].title.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-') : listBlog[index].code+"-"+listBlog[index].title.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-')}`)
          setPreviousBlog(`/blog-detail/${listBlog[index-1] !== undefined ? listBlog[index-1].code+"-"+listBlog[index-1].title.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-') : listBlog[index].code+"-"+listBlog[index].title.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-')}`)
        }
      })
    }
  }, [listBlog, blog])

  return (
    <>
      <ComponentNavbar data={`${breadDetail !== null ? breadDetail : ''}`} />
      <div className="container mx-auto px-10 flex flex-wrap pb-20">
        <div className="w-1/4 border-r border-solid border-gray-300">
          <div className="w-full px-5">
            <div className="relative">
              <form onSubmit={searchKeyword}>
                <input type="input" name="keyword" onChange={handleChangeKeyword} value={keyword} className="w-full rounded bg-gray-200 border-0 focus:outline-none px-3 py-2" placeholder="Search" required />
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
              <select onChange={NewsArchive} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
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
          <div className="w-full list-blog pl-10 mb-10">
            <div className="px-20 mb-3">
              <div className="flex flex-wrap title-section text-3xl text-gray-700 leading-tight block mb-5">
                <h1 className="mx-auto text-center">{`${Object.keys(blog).length > 0 ? blog.title : ''}`}</h1>
              </div>
            </div>
            <div className="flex flex-wrap mb-3">
              <div className="w-auto mr-auto">
                {Object.keys(blog).length > 0 ? (
                  <DateFormat2 dateTime={`${blog.createdAt}`} />
                ) : ('')}
              </div>
            </div>
            {Object.keys(blog).length > 0 ? (
              <img src={blog.image} alt="meeting room blog" className="w-full h-64 object-cover mb-3" />
            ) : ('')}
            <Button Text="Looking for meeting space?" ClassName="px-6 py-2 my-5 rounded-md bg-yellow-400 text-black" />
            {Object.keys(blog).length > 0 ? (
              <div className="text-left mt-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            ) : ('')}
            <div className="mt-5 flex flex-wrap justify-start">
              {Object.keys(blog).length > 0 && blog.tag !== undefined && blog.tag !== '' ? (
                blog.tag.split(',').map((res, index) => {
                  return <button key={index} ClassName="text-xs inline ml-2 border-2 border-solid border-gray-200 rounded-md py-1 px-2">{`${res}`}</button>
                })
              ) : ('')}
            </div>
            <div className="mt-5 flex flex-wrap justify-start">
              <img src={IconFB} alt="HNS Facebook" className="ml-1 w-4" />
              <img src={IconLin} alt="HNS LinkedIn" className="mx-3 w-4" />
              <img src={IconInstagram} alt="HNS Instagram" className="w-4" />
            </div>
            <div className="w-full flex flex-wrap mt-5">
              <Link to={`${previousBlog}`} className="border border-solid border-gray-300 rounded-sm w-1/2 text-gray-600 py-3 text-center">Previous</Link>
              <Link to={`${nextBlog}`} className="border border-solid border-gray-300 rounded-sm w-1/2 text-gray-600 py-3 text-center">Next</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

const mapDispatchToProps = {
  NewsLatestActionDetailParam
}

export default connect(null, mapDispatchToProps)(BlogDetail)