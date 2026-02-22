import React from "react";
import axios from 'axios';
import _, { shuffle } from 'lodash';
import { useState } from "react";

const PokemonCard = ({ ButtonComponent }) => {
    const [isLoading, setLoad] = useState(false)
    const [pokemonName, setPokemonName] = useState('')
    const [pokemonSpriteUrl, setPokemonSprite] = useState('')
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemonMoves, setPokemonMoves] = useState([])
    /**
     * This function helper gets the Pokemon Data using PokeAPI
     *
     */
    const getPokemon = async () => {
        try {
            setLoad(true)
            // Randomizes pokemonID to get random pokemon for the API
            const randomPokemonId = Math.floor(Math.random() * 151) + 1;

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`)

            if (!response.ok) {
                throw new Error('Error loading pokemon.');
            }
            const data = await response.json();

            // Sets the pokemon data using hooks
            setPokemonName(data.name)
            setPokemonSprite(data.sprites.front_default)
            setPokemonTypes(data.types)
            console.log(data.name)
            console.log(data.types)


            // Getting four random moves from the array of fetched moves for that pokemon
            const randomMoves = [...data.moves].sort(() => 0.5 - Math.random()).slice(0, 4)

            // Getting move details
            const detailedMoves = await Promise.all(
                randomMoves.map(async (moveObj) => {
                    const res = await fetch(
                        `https://pokeapi.co/api/v2/move/${moveObj.move.name}`
                    )

                    const moveData = await res.json();
                    console.log(moveData)
                    return {
                        name: moveData.name,
                        power: moveData.power,
                        type: moveData.type.name
                    }
                })
            )

            setPokemonMoves(detailedMoves)
            setLoad(false)
        } catch (error) {
            console.error('Error fetching data:', error)
        }

    }


    return (
        <>
            <div className="flex flex-col items-center gap-6">
                <ButtonComponent onClick={getPokemon} text="Get Pokemon" />
                {/*Pokemon Card*/}
                <div className="w-60 h-80 border-4 border-yellow-400 rounded-xl shadow-xl flex flex-col items-center justify-center text-white text-lg font-bold">
                    {/*Pokemon Name*/}
                    <div className="border-2">
                        {pokemonName}
                    </div>

                    {/*Pokemon Sprite*/}
                    <img src={pokemonSpriteUrl} alt="" />


                    {/*Pokemon Type*/}
                    <div className="flex flex-row border-2">
                        {
                            pokemonTypes.map((pokemonTypes, pokemonType) => (
                                <div key={pokemonType} className="p-1"> {pokemonTypes.type.name}</div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default PokemonCard