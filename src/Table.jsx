import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useState, useCallback } from 'react';
import SearchBar from "material-ui-search-bar";
import debounce from 'lodash.debounce'
import { useNavigate } from "react-router-dom";
import  app  from './utils/axios-configure'


export default function Country_Table() {
  var [rows, setRows] = useState([]);
  var [searchfilter, setSearchfilter] = useState([]);
  const [searched, setSearched] = useState("");
  let navigate = useNavigate();
  const url = "https://gist.githubusercontent.com/keeguon/2310008/raw/bdc2ce1c1e3f28f9cab5b4393c7549f38361be4e/countries.json";
  const header = {
    'Content-Type': 'application/json'
    };


  let timeout;
  const columns_countries = [
    { field: 'name', headerName: 'Countrey Name', width: 350 },
    { field: 'code', headerName: 'Countrey Code', width: 350 },
  ];

  const handleSearch = debounce(searchVal => {

    setRows(searchfilter.filter((row) => {
      return row.name.toLowerCase().includes(searchVal.toLowerCase());
    }));
  },
    500);

  const cancelSearch = () => {
    setSearched("");
    setRows(searchfilter);

  }
  const handleTimeoutSearch = (searchVal) => timeout = setTimeout(() => {
    clearTimeout(timeout);
    handleSearch(searchVal);
  }, 1000)




  useEffect(() => {
    app(url,header)
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

