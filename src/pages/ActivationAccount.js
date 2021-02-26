import { React, useState, useHistory } from '../libraries'
import LogoHnsWhite from '../assets/images/logo-white.png'
import { FaSpinner } from '../components/icons'
import { TitleSection } from '../components/atom'
import { Api } from '../helpers/api'
import { connect } from 'react-redux'
import { ModalAction } from '../modules/actions'


const ActivationAccount = ({ ModalAction, match }) => {
  const history = useHistory()
  const [spiner, setSpiner] = useState(false)
  const [params] = useState({
    hash: match.params.hash,
    id: match.params.id
  })

  const handleClick = () => {
    setSpiner(true)
    Api.get(`/membership/api/v1/member/activation?i=${params.id}&h=${params.hash}`)
    .then(res => {
      setSpiner(false)
      history.push("/")
      ModalAction({ Type: "success-popup", Message: res.data.message, Status: "login" })
    })
    .catch(function (error) {
      setSpiner(false)
      console.log(error.response)
      ModalAction({ Type: "failed-popup", Message: error.response.data.message })
    })
  }

  return (
    <>
      <div className="flex flex-wrap w-full h-full fixed inset-auto">
        <div className="w-1/3 h-auto bg-white py-8 px-12 m-auto flex flex-wrap shadow-lg rounded-lg">
          <p className="w-full mb-5 text-center">Activation Account</p>
          <img src={LogoHnsWhite} alt="Logo" className="mx-auto mb-5" />
          <TitleSection ClassName="w-full mb-3 text-xl text-center" Text="by pressing this button you will activate your account" />
          <button className="px-6 rounded-md text-sm text-white py-1 bg-yellow-400 uppercase mx-auto mt-5 flex flex-wrap" onClick={handleClick}>
            <FaSpinner className={`icon-spin inline mr-2 my-auto ${spiner ? 'block' : 'hidden'}`} /> Active account
          </button>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  ModalAction
}

export default connect(null, mapDispatchToProps)(ActivationAccount)