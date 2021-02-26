import { React } from '../../libraries'

export const BackdropModal = ({ zIndex }) => {
    return(
        <div className={`backdrop w-full h-full fixed z-${zIndex ? zIndex : "20"} opacity-75`} style={{ backgroundColor: "#388bbe" }}></div>
    )
}