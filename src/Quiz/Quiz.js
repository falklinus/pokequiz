import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Quiz.css';

const Quiz = () => {
  const [pokeUrl, setPokeUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPokeUrl, setNextPokeUrl] = useState('');
  const [pokelist, setPokelist] = useState([]);
  const [pokemon, setPokemon] = useState('');
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState('');
  const [pokeLimit, setPokeLimit] = useState(20);
  const [prompt, setPrompt] = useState('What pokemon is this?');
  const [pokeImages, setPokeImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tmpList, setTmpList] = useState([]);
  const [pokeCount, setPokeCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(pokeUrl)
      .then(res => {
        setTmpList([...tmpList, ...res.data.results]);
        if (tmpList.length > 151) {
          setTmpList(tmpList.slice(0, 151));
          setPokelist(shuffleArray(tmpList));
        } else setPokeUrl(res.data.next);
      })
      .catch(err => {
        console.error(err);
      });
  }, [pokeUrl]);

  useEffect(() => {
    if (round === pokeLimit) {
      setPokeUrl(nextPokeUrl);
      return;
    }
    setPokemon({ ...pokelist[round], ...pokeImages[round] });
    setGuess('');
    setPrompt('What pokemon is this?');
  }, [round]);

  useEffect(() => {
    fetchImages.then(async res => {
      await setPokeImages(res);
    });
    setRound(0);
  }, [pokelist]);

  useEffect(() => {
    setPokemon({ ...pokelist[round], ...pokeImages[round] });
    if (pokeImages.length > 0) {
      setLoading(false);
    }
  }, [pokeImages]);

  let fetchImages = new Promise(async (resolve, reject) => {
    let tmpPokeImages = [];
    for (let poke of pokelist) {
      await axios.get(poke.url).then(res => {
        tmpPokeImages.push(res.data.sprites);
      });
    }
    resolve(tmpPokeImages);
  });

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const handleSubmit = () => {
    if (guess.toLowerCase() == pokemon.name) setPrompt('Correct!');
    else setPrompt(`Wrong... it was ${pokemon.name}`);
    setTimeout(() => setRound(round + 1), 2000);
  };
  return (
    <div className='Quiz-container'>
      <p className='Quiz-prompt'>{!loading ? prompt : 'Loading pokemon...'}</p>
      {!loading && (
        <>
          <img
            className='Pokemon-image'
            src={pokemon['front_default']}
            alt={pokemon.name}
          />
          <input
            className='Quiz-input'
            type='text'
            autoComplete='off'
            spellCheck='false'
            autoFocus
            onChange={event => setGuess(event.target.value)}
            value={guess}
            onKeyPress={event => {
              if (event.key === 'Enter') handleSubmit();
            }}
          />
          <button className='Quiz-button' onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
