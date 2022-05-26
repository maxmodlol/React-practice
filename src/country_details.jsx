import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useParams } from 'react-router-dom'
import get from './utils/axios-configure'
import axios from 'axios'
import { margin, style, width } from "@mui/system";
import TinyFlag from "tiny-flag";
import {url_flag,url_country} from "./utils/const"





export default function Details() {
    const [searchParams, setSearchParams] = useSearchParams();
    // const getcode=searchParams.get("code");
    const queryParams = new URLSearchParams(window.location.search);
    const { code } = useParams();
    const [capitals, setCapital] = useState([]);
    const [phonecodes, setPhonecode] = useState([]);
    const [currencys, setCurrency] = useState([]);
    const [flags, setFlag] = useState([]);

    const header = {
        'Content-Type': 'application/json'
    };


    useEffect(() => {
        async function question() {
            const [capital_response, phonecode_response, currencys_response, flags_response] = await Promise.all(
                [get(url_country + `capital.json`, header),
                get(url_country + `phone.json`, header),
                get(url_country + `currency.json`, header),
                get(url_flag, header)
                ]).then(values => {
                    setCapital(values[0].data);
                    setPhonecode(values[1].data);
                    setCurrency(values[2].data);
                    setFlag(values[3].data);

                }
                )
                .catch(err => {
                    console.log(err);


                });
        }
        question();


    }, []);



    return (

        <div>
            <div className="container">
                <table style={{ width: '80%', margin: 100 }}>

                    {capitals &&
                        <tr key={code} >
                            <th>Capital</th>
                            <td>{capitals[Object.keys(capitals).find(item => item === code)]}</td>
                        </tr>
                    }
                    {currencys &&
                        <tr key={code} >
                            <th>Currency</th>


                            <td>{currencys[Object.keys(currencys).find(item => item === code)]}</td>
                        </tr>

                    }

                    {phonecodes &&
                        <tr key={code} >

                            <th> Phone Code</th>
                            <td>{phonecodes[Object.keys(phonecodes).find(item => item === code)]}</td>
                        </tr>
                    }
                    {flags &&


                        Object.keys(flags).filter(item => item === code).map(filterd =>
                            <tr key={code} >
                                <th>Flag</th>
                                <td>
                                    <img src={flags[filterd].image} style={{ height: 25, width: 25 }} alt="React Logo" />
                                </td>
                            </tr>
                        )}
                </table>
            </div>
        </div>
    )
} 