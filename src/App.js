import logo from './logo.svg';
import './App.css';
import Table_Display from './Table'
import Country_detail from './country_details'
import {
  BrowserRouter as Router,
  Routes,
  Route,
}
  from "react-router-dom";



function App() {
  return (

    <div className="App">
      <h1> Table </h1>
      <Router>
        <Routes>
          <Route path="/" element={<Table_Display />} />
          <Route path="/details/:code" element={<Country_detail />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
