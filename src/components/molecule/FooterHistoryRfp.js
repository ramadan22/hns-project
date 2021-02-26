import { React, useEffect, useState } from '../../libraries'
import { Api } from '../../helpers/api'

export const FooterHistoryRfp = () => {
    const [dataFooter, setDataFooter] = useState(null)
    
    useEffect(() => {
        Api.get(`/master/api/v1/faqFooter/fetch`)
        .then(res => {
            setDataFooter(res.data.data)
        })
        .catch(function (error) {
            console.log(error.response)
        })
    }, [])

    return(
        <div className="container mx-auto px-10">
            {dataFooter !== null ? 
                <div dangerouslySetInnerHTML={{ __html:dataFooter.content }}></div>
            : ("")}
            {/* <p className="text-lg font-bold">If you require any further information, feel free to contact us.</p>
            <p className="text-sm">Lorem Ipsum dolor sit amet, consectetur adipiscing elit, support@hns.com incididunt ut labore magna aliqua. call 001-1234-1234-123</p> */}
        </div>
    )
}