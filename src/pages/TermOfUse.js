import { React, useEffect, useState } from '../libraries'
import { Navbar, Footer } from '../components/molecule'
import { Api } from '../helpers/api'

const TermOfUse = () => {
  const [termData, setTermData] = useState({})

  const getTerm = () => {
    Api.get('/master/api/v1/term/fetch')
      .then(res => {
        setTermData(res.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    getTerm()
  }, [])

  return (
    <>
      <Navbar BreadData={"Home,Term of Use"} />
      <div className="lg:container mx-auto lg:px-10 px-5 flex flex-wrap">
        <h3 className="text-3xl text-left text-yellow-500 font-bold">{`${Object.keys(termData).length !== 0 ? termData.title : ''}`}</h3>
        {/* <div className="text-left text-sm mt-2" style={{whiteSpace: "pre-wrap"}}>{Object.keys(termData).length !== 0 ? termData.content : ''}</div> */}
        <div className="text-left text-sm mt-2" style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{__html: `${Object.keys(termData).length !== 0 ? termData.content : ''}`}}></div>
      </div>
      <Footer />
    </>
  )
}

export default TermOfUse
