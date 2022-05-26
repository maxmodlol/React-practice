import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useState, useCallback } from 'react';
import SearchBar from "material-ui-search-bar";
import debounce from 'lodash.debounce'
import { useNavigate } from "react-router-dom";
import  app  from './utils/axios-configure';
import axios from 'axios';
import {url,timeout} from './utils/const'


export default function Country_Table() {
  var [rows, setRows] = useState([]);
  var [searchfilter, setSearchfilter] = useState([]);
  const [searched, setSearched] = useState("");
  let navigate = useNavigate();
  


  const columns_countries = [
    { field: 'name', headerName: 'Countrey Name', width: 350 },
    { field: 'code', headerName: 'Countrey Code', width: 350 },
  ];

  const handleDebounce = debounce(searchVal => {

    setRows(searchfilter.filter((row) => {
      return row.name.toLowerCase().includes(searchVal.toLowerCase());
    }));
  },
    timeout);

  const cancelSearch = () => {
    setSearched("");
    setRows(searchfilter);

  }
  const handleTimeoutSearch =useCallback((searchVal) =>  setTimeout(() => {
    clearTimeout(searchVal);
    handleDebounce(searchVal);
  }, timeout))
 



  useEffect(() => {
    axios.get(url)
      .then(res => {
        let my_data = res.data;
        var obj = eval(res.data);

        setRows(obj);
        setSearchfilter(obj);
      },
      )
      .catch(err => {
        console.log(err);

      });

  }, [])
  const handleOnCellClick = (param) => {
    console.log(param.row.code);
    navigate({
      pathname: `/details/${param.row.code}`
    });

  }


  return (
    <div style={{ height: 400, width: '50%', marginLeft: 250 }}>
      <SearchBar
        value={searched}
        onChange={(searchVal) => handleTimeoutSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />

      <DataGrid
        getRowId={(rows) => rows.name}
        rows={rows}
        columns={columns_countries}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={handleOnCellClick}

      />



    </div>

  )
}

