import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import get from '../utils/axios-configure';
import { URL_FLAG, URL_COUNTRY, HEADER_CONFG } from "../utils/const"


    function NotFound(){
        return (
            <td>Not Found</td>
        );
    }


export default function Details() {
    const queryParams = new URLSearchParams(window.location.search);
    const { code } = useParams();
    const [capitals, setCapital] = useState([]);
    const [phonecodes, setPhonecode] = useState([]);
    const [currencys, setCurrency] = useState([]);
    let [flags, setFlag] = useState([]);


    const getCapitalsList = ()=>  {
      
     return   get(URL_COUNTRY + `capital.json`, HEADER_CONFG)
      


    }
    const getPhonePrefixList = () => {
         return get(URL_COUNTRY + `phone.json`, HEADER_CONFG)

    }

    const getCurrenciesList = () => {
    return    get(URL_COUNTRY + `currency.json`, HEADER_CONFG)
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
    console.log(flags);
    return (

        <div>
            <div className="container">
                <table style={{ width: '80%', margin: 100 }}>
                    <tbody>
                        {capitals ?
                            <tr key={code} >
                                <th>Capital</th>
                                <td>{capitals[code]}</td>
                            </tr>
                       :<NotFound/> }
                        {currencys ?
                            <tr >
                                <th>Currency</th>


                                <td>{currencys[code]}</td>
                            </tr>

                       :<NotFound/> }

                        {phonecodes ?
                            <tr key={code} >

                                <th> Phone Code</th>
                                <td>{phonecodes[code]}</td>
                            </tr>
                       :<NotFound/> }

                        { flags[code] ?
                            <tr key={code}>
                                <th>Flag</th>
                                <td>
                                    <img src={flags[code].image} style={{ height: 25, width: 25 }} alt="React Logo" />
                                </td>
                            </tr>
                            // Object.keys(flags).filter(item => item === code).map(filterd =>
                            //     <tr key={code}>
                            //         <th>Flag</th>
                            //         <td>
                            //             <img src={flags[code].image} style={{ height: 25, width: 25 }} alt="React Logo" />
                            //         <m/td>
                            //     </tr>

                            // )
                            :<NotFound/>}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 