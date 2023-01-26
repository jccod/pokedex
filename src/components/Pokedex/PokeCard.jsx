import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/pokeCard.css'


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
        <article onClick={handleClic}>
            <header>
                <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section>
                <h3>{pokemon?.name}</h3>
                <ul>
                    {
                        pokemon?.types.map(type => (
                            <li key={type.type.name}>{type.type.name}</li>
                        ))
                    }
                </ul>
            </section>
            <footer>
                <ul>
                    {
                        pokemon?.stats.map(stat => (
                            <li key={stat.stat.name}>
                                <span>{stat.stat.name}</span>
                                <span>{stat.base_stat}</span>
                            </li>
                        ))

                    }

                </ul>
            </footer>
        </article>
    );
};

export default PokeCard;