import React from "react";
import axios from 'axios';
import _ from 'lodash';
import { useState } from "react";

const PokemonCard = ({ ButtonComponent }) => {
    const [isLoading, setLoad] = useState(true)
    const [pokemonName, setPokemonName] = useState('')
    const [pokemonSpriteUrl, setPokemonSprite] = useState('')
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemonMoves, setPokemonMoves] = useState([])

    const loadRandomPokemonCard = async () => {
        setLoad(!isLoading)
    }

    const randomPokemonId = Math.floor(Math.random() * 151) + 1;

    const getPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`)
            if (!response.ok) {
                throw new Error('Error loading pokemon.');
            }
            const data = await response.json();
            alert('Fetching a new Pokemon!');
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error)
        }

    }


    return (
        <>
            <ButtonComponent onClick={getPokemon} text="Get Pokemon">Get Pokemon</ButtonComponent>
            <div className="w-60 h-60 border-4 bg-red-900 flex items-center justify-center">
                Pokemon Card
            </div>
        </>
    )
}
export default PokemonCard