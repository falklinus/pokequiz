import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonCard from '../PokemonCard/PokemonCard';

import './Practise.css';

const Practise = () => {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [pokelist, setPokelist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyGen1, setOnlyGen1] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemon();
  }, [url]);

  useEffect(() => {
    if (!onlyGen1) setNextUrl(null);
  }, [onlyGen1]);

  const fetchPokemon = async () => {
    await axios.get(url).then(res => {
      setPokelist(res.data.results);
      setOnlyGen1(true);
      if (res.data.next) setNextUrl(res.data.next);
      else setNextUrl(null);
      if (res.data.previous) setPrevUrl(res.data.previous);
      else setPrevUrl(null);
    });
    setLoading(false);
  };

  const nextPage = () => {
    setUrl(nextUrl);
  };

  const prevPage = () => {
    setUrl(prevUrl);
  };

  return (
    <div className='Practise-container'>
      {!loading &&
        pokelist.map((pokemon, index) => {
          if (onlyGen1 || (!onlyGen1 && index < 11)) {
            return (
              <div key={pokemon.name} className='col'>
                <PokemonCard
                  name={pokemon.name}
                  url={pokemon.url}
                  onlyGen1={onlyGen1}
                  setOnlyGen1={setOnlyGen1}
                />
              </div>
            );
          }
        })}
      {!loading && (
        <div className='page-buttons'>
          {prevUrl && (
            <button className='Quiz-button' onClick={() => prevPage()}>
              Prev
            </button>
          )}
          {nextUrl && (
            <button className='Quiz-button' onClick={() => nextPage()}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Practise;
