import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useParams } from 'react-router-dom'
import get from './utils/axios-configure'
import axios from 'axios'
import { margin, style, width } from "@mui/system";
import TinyFlag from "tiny-flag";
import { URL_FLAG, URL_COUNTRY, HEADER_CONFG } from "./utils/const"





export default function Details() {
    const [searchParams, setSearchParams] = useSearchParams();
    // const getcode=searchParams.get("code");
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
    const findelement = (array, code) => {
        return Object.values(array).find(item => item === code);
    }

    return (

        <div>
            <div className="container">
                <table style={{ width: '80%', margin: 100 }}>
                    <tbody>
                        {capitals &&
                            <tr key={code} >
                                <th>Capital</th>
                                <td>{capitals[code]}</td>
                            </tr>
                        }
                        {currencys &&
                            <tr >
                                <th>Currency</th>


                                <td>{currencys[code]}</td>
                            </tr>

                        }

                        {phonecodes &&
                            <tr key={code} >

                                <th> Phone Code</th>
                                <td>{phonecodes[code]}</td>
                            </tr>
                        }

                        {flags &&
                            Object.keys(flags).filter(item => item === code).map(filterd =>
                                <tr key={code}>
                                    <th>Flag</th>
                                    <td>
                                        <img src={flags[filterd].image} style={{ height: 25, width: 25 }} alt="React Logo" />
                                    </td>
                                </tr>

                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 