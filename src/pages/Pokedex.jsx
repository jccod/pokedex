import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokeCard from '../components/Pokedex/PokeCard';
import Pagination from '../components/Pokedex/Pagination';
import title from '../assets/images/pokedex-title.png'


const Pokedex = () => {

    const { trainer } = useSelector(state => state)

    const [pokemons, setPokemons] = useState()
    const [types, setTypes] = useState()
    const [typeSelected, setTypeSelected] = useState('All pokemons')

    const navigate = useNavigate()

    useEffect(() => {
        if (typeSelected !== "All pokemons") {
            axios.get(typeSelected)
                .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
                .catch(error => console.log(error))
        } else {
            //All pokemons
            const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=99999'
            axios.get(URL)
                .then(res => setPokemons(res.data.results))
                .catch(error => console.log(error))
        }


    }, [typeSelected])

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/type`
        axios.get(URL)
            .then(res => setTypes(res.data.results))
            .catch(error => console.log(error))
    }, [])


    const handleSubmit = e => {
        e.preventDefault()
        const input = e.target.search.value.trim().toLowerCase()
        navigate(`/pokedex/${input}`)
    }

    const handleChange = e => {
        setTypeSelected(e.target.value)
        setPage(1)
    }

    //Pagination
    const [page, setPage] = useState(1)
    const [pokePerPage, setPokePerPage] = useState(8)
    const initialPoke = (page - 1) * pokePerPage
    const finalPoke = (page * pokePerPage)
    const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)



    return (
        <div className='pokedex-container'>
            <header className='page__header'>
                <img className='header__img' src="title" alt="" />
            </header>
            <h2 className='welcome-text'><span className='welcome-name'>Welcome {trainer}, </span>here you can find your favorite Pokemon</h2>
            <div className='search-container'>
                <form className='search__form search__form--pokedex' onSubmit={handleSubmit}>
                    <input className='search__input' id='search' type="text" />
                    <button className='search__btn'>Search</button>
                </form>
                <select className='search__select' onChange={handleChange}>
                    <option value='All pokemons'>All pokemons</option>
                    {
                        types?.map(type => (
                            <option key={type.url} value={type.url}>{type.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className='poke-container'>
                {
                    pokemons?.slice(initialPoke, finalPoke).map(poke => (
                        <PokeCard
                            key={poke.url}
                            url={poke.url}
                        />
                    ))
                }
            </div>
            <Pagination 
                page={page}
                maxPage={maxPage}
                setPage={setPage}
            />
        </div>
    );
};

export default Pokedex;