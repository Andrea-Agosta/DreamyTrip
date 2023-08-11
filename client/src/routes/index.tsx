import React, { useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../views/Home/Home';
import Navbar from '../components/Navbar/Navbar';
import server from '../api/server';
import { CountryContext } from '../context/country';

function App() {
  const { setCountry } = useContext(CountryContext);
  useEffect(() => {
    server(null, '/geolocation').then((resp) => setCountry({
      country_name: resp.country_name,
      country_code: resp.country_code,
    }));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
