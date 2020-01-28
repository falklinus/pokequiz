import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Pokemon.css';

const Pokemon = ({ name, url, image }) => {
  const [sprites, setSprites] = useState('empty');

  /* useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setSprites(res.data.sprites);
      })
      .catch(err => console.error(err));
  }, [url]); */

  //if (sprites === 'empty') return '';
  return (
    <div className='pokemon-container'>
      {/*  <h3>{name}</h3> */}
      <div>
        <img className='Pokemon-image' src={image} alt={name} />
      </div>
    </div>
  );
};

export default Pokemon;
