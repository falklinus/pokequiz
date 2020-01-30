import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './PokemonCard.css';

import pokelogo from '../pokelogo.png';

const PokemonCard = ({ name, url, onlyGen1, setOnlyGen1 }) => {
  const [image, setImage] = useState('');
  const [pokeLoading, setPokeLoading] = useState(true);

  useEffect(() => {
    const urlArray = url.split('/');
    console.log(urlArray[urlArray.length - 2]);
    if (parseFloat(urlArray[urlArray.length - 2]) > 151) setOnlyGen1(false);
    fetchImage();
  }, []);

  const fetchImage = async () => {
    setPokeLoading(true);
    await axios.get(url).then(res => {
      setImage(res.data.sprites['front_default']);
    });
    setPokeLoading(false);
  };
  return (
    <div className='card'>
      <p className={pokeLoading ? 'hidden card-title' : 'card-title'}>{name}</p>
      <img
        className='card-image'
        src={pokeLoading ? pokelogo : image}
        alt={name}
      />
    </div>
  );
};

export default PokemonCard;
