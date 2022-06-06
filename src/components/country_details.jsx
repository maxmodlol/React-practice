import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import get from '../utils/axios-configure';
import { URL_FLAG, URL_COUNTRY, HEADER_CONFG } from "../utils/const"
import RowsDetails from "../components/rows_details"
import NotFound from "../components/Not_Found"





export default function Details() {
    const queryParams = new URLSearchParams(window.location.search);
    const { code } = useParams();
    const [capitals, setCapital] = useState([]);
    const [phonecodes, setPhonecode] = useState([]);
    const [currencys, setCurrency] = useState([]);
    let [flags, setFlag] = useState([]);


    const getCapitalsList = () => {

        return get(URL_COUNTRY + `capital.json`, HEADER_CONFG)



    }
    const getPhonePrefixList = () => {
        return get(URL_COUNTRY + `phone.json`, HEADER_CONFG)

    }

    const getCurrenciesList = () => {
        return get(URL_COUNTRY + `currency.json`, HEADER_CONFG)
    }

    const getFlagsList = () => {
        return get(URL_FLAG, HEADER_CONFG)

    }

    useEffect(() => {
        async function question() {
            const [capital_response, phonecode_response, currencys_response, flags_response] = await Promise.all(
                [getCapitalsList(),
                getPhonePrefixList(),
                getCurrenciesList(),
                getFlagsList()


                ]);
            setCapital(capital_response.data);
            setPhonecode(phonecode_response.data);
            setCurrency(currencys_response.data);
            setFlag(flags_response.data);
        }
        question();


    }, []);
    console.log(currencys);

    return (

        <div>
            <div className="container">
                <table style={{ width: '80%', margin: 100 }}>
                    <tbody>

                        {capitals ?
                            <RowsDetails title="Capitals" value={capitals[code]} isImg={false} />

                            : <NotFound />}
                        {currencys ?
                            <RowsDetails title="Currencyes" value={currencys[code]} isImg={false} />


                            : <NotFound />}

                        {phonecodes ?
                            <RowsDetails title="PhoneCode" value={phonecodes[code]} isImg={false} />
                            : <NotFound />}

                        {flags[code] ?
                            <RowsDetails title="Flags" value={flags[code].image} isImg={true} />

                            : <NotFound />}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 