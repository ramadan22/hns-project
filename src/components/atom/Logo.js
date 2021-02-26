import { React } from '../../libraries'
import LogoBlue from '../../assets/images/logohnswhite.png'
import LogoWhite from '../../assets/images/logo-white.png'

export const Logo = (props) => {
    const { Type } = props

    return(
        <div className="logo">
            <img src={Type === "blue" ? LogoBlue : LogoWhite} alt="Logo" className="rounded-md w-40" />
        </div>
    )
}

Logo.defaultProps = {
    Type: "blue"
}