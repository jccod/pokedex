import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css'


const PokedexInfo = () => {

    const { id } = useParams()

    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(URL)
            .then(res => setPokemon(res.data))
            .catch(error => console.log(error))
    }, [id])

    console.log(pokemon)

    return (
        <div className='poke-info'>
            <section className='poke-info__details'>
                <header className='poke-info__header'>
                    <img className='poke-info__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                </header>
                <div className='poke-info__data-container'>
                    <p className='poke-info__id'>#{pokemon?.id}</p>
                    <h2 className='poke-info__name'>{pokemon?.name}</h2>
                    <div className='poke-info__wh'>
                        <p className='poke-info__wh-data'><span className='poke-info__wh-label'>weight</span>{pokemon?.weight}</p>
                        <p className='poke-info__wh-data'><span className='poke-info__wh-label'>height</span>{pokemon?.height}</p>
                    </div>
                    <div className='poke-info__th'>
                        <div className='poke-info__type'>
                            <h3 className='poke-info__th-title'>Type</h3>
                            <ul className='poke-info__list'>
                                {
                                    pokemon?.types.map(type => (
                                        <li className='poke-info__item' key={type.type.name}>{type.type.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='poke-info__abilities'>
                            <h3 className='poke-info__th-title'>Abilities</h3>
                            <ul className='poke-info__list'>
                                {
                                    pokemon?.abilities.map(ability => (
                                        <li className='poke-info__item'>{ability.ability.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='poke-info__stats-container'>
                        <h3 className='poke-info__th-title'>Stats</h3>
                        {
                            pokemon?.stats.map(stat => (
                                <div className='poke-info__stat'>
                                    <div className='poke-info__stat-text'>
                                        <p className='poke-info__label'>{stat.stat.name}</p>
                                        <p className='poke-info__base-stat'>{stat.base_stat}/150</p>
                                    </div>


                                    <meter className='poke-info__meter'
                                        min='0' max='150'
                                        low='74' high='75'
                                        value={stat.base_stat}
                                    >
                                    </meter>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className='poke-info__movements'>
                <h3 className='poke-info__th-title poke-info__th-title--movements'>Movements</h3>
                <div className='poke-info__movements-container'>
                    {
                        pokemon?.moves.map(move => (
                            <span className='poke-info__move'>{move.move.name}</span>
                        ))
                    }

                </div>

            </section>

        </div>
    );
};

export default PokedexInfo;