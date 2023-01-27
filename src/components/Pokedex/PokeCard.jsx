import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PokeCard = ({url}) => {

    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(error => console.log(error))
    },[])

    const navigate = useNavigate()

    const handleClic = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }

    return (
        <article className='poke-card' onClick={handleClic}>
            <header className='poke-card__header'>
                <img className='poke-card__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section className='poke-card__info-container'>
                <h3 className='poke-card__name'>{pokemon?.name}</h3>
                <ul className='poke-card__type-list'>
                    {
                        pokemon?.types.map(type => (
                            <li  className='poke-card__type' key={type.type.name}>{type.type.name}</li>
                        ))
                    }
                </ul>
            </section>
            <footer className='poke-card__footer'>
                <ul className='poke-card__stats-container'>
                    {
                        pokemon?.stats.map(stat => (
                            <li className='poke-card__stat' key={stat.stat.name}>
                                <span className='poke-card__stat-label'>{stat.stat.name}</span>
                                <span className='poke-card__stat-info'>{stat.base_stat}</span>
                            </li>
                        ))

                    }

                </ul>
            </footer>
        </article>
    );
};

export default PokeCard;