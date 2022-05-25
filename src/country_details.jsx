import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useParams } from 'react-router-dom'
import app from './utils/axios-configure'
import axios from 'axios'
import { margin, style, width } from "@mui/system";
import TinyFlag from "tiny-flag";





export default function Details() {
    const [searchParams, setSearchParams] = useSearchParams();
    // const getcode=searchParams.get("code");
    const queryParams = new URLSearchParams(window.location.search);
    const { code } = useParams();
    const [capital, setCapital] = useState([]);
    const [phonecode, setPhonecode] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [flag, setFlag] = useState([]);
    const url_country ="http://country.io/";
    const url_flag="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/by-code.json"
    

    useEffect(() => {
        app.get(url_country+`capital.json`)
            .then(res => {
                let my_data = eval(res.data);
                setCapital(my_data);
            },
            )
            .catch(err => {
                console.log(err);


            });
        app.get(url_country+`phone.json`)
            .then(res => {
                let my_data2 = eval(res.data);
                setPhonecode(my_data2);
            },
            )
            .catch(err => {
                console.log(err);


            });
        app.get(url_country+`currency.json`)
            .then(res => {
                let my_data3 = eval(res.data);
                setCurrency(my_data3);
            },
            )
            .catch(err => {
                console.log(err);


            });
        axios.get(url_flag)
            .then(res => {
                let my_data4 = eval(res.data);
                setFlag(my_data4);
            },
            )
            .catch(err => {
                console.log(err);


            });
    }, []);




    return (

        <div>
            <div className="container">
                <table style={{ width: '80%', margin: 100 }}>
                    <thead>
                        <tr>
                            <th>Capital</th>
                            <th>Currency</th>
                            <th>Phone Code</th>
                            <th>Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {capital && Object.keys(capital).filter(item => item === code).map(filterd =>
                            <tr key={capital[filterd]} >
                                <td>{capital[filterd]}</td>

                                {currency && Object.keys(currency).filter(item => item === code).map(filterd =>

                                    <td>{currency[filterd]}</td>


                                )}
                                {phonecode && Object.keys(phonecode).filter(item => item === code).map(filterd =>
                                    <td>{phonecode[filterd]}</td>
                                )}
                                {flag && Object.keys(flag).filter(item => item === code).map(filterd =>
                                    <td>
                                        <img src={flag[filterd].image} style={{height:25,width:25}} alt="React Logo" />
                                    </td>
                                )}
                            </tr>

                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
} 