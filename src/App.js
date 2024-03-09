import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const BeerCard = ({ beer }) => (
  <div className="beer-card">
    <img src={beer.image_url} alt={beer.name} />
    <h3>{beer.name}</h3>
    <p>{beer.tagline}</p>
    <p>{beer.description}</p>
  </div>
);

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBeers();
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search for beer..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="beer-list">
        {filteredBeers.map(beer => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </div>
  );
};

export default App;
