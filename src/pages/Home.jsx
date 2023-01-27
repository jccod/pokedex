import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTrainerGlobal } from '../store/slices/trainer.slice';
import '../App.css'


const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value = ''
        navigate('/pokedex')
    }



    return (
        <div className='home'>
            <img className='home__img' src="/home/pokedex.png" alt="pokedex-logo" />
            <h1 className='home__title'>Hi Trainer!</h1>
            <p className='home__text'>Give me your name to start:</p>
            <form className='search__form' onSubmit={handleSubmit}>
                <input className='search__input' id="name" type="text" />
                <button className='search__btn' >Start</button>
            </form>

        </div>
    );
};

export default Home;