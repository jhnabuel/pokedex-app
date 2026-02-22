import React from "react";
import axios from 'axios';
import _, { shuffle } from 'lodash';
import { useState } from "react";
import {
    POKEAPI_MOVE_URL,
    POKEAPI_TYPE_URL,
    POKEAPI_POKEMON_URL,
    POKEAPI_TYPE_TO_COLOR,
} from '../global/constants';

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

            const response = await fetch(`${POKEAPI_POKEMON_URL}/${randomPokemonId}`)

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
                        `${POKEAPI_MOVE_URL}/${moveObj.move.name}`
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
                <ButtonComponent onClick={getPokemon} text="Generate Pokemon" />
                {/*Pokemon Card*/}
                <div className="w-[350px] min-h-[520px] bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-3xl shadow-xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105">
                    {/*Pokemon Name*/}
                    <div className="text-2xl text-center capitalize">
                        {pokemonName}
                    </div>

                    {/*Pokemon Sprite*/}
                    <div className={`w-full rounded-2xl p-4
                            bg-gradient-to-r
                            ${POKEAPI_TYPE_TO_COLOR[pokemonTypes[0]?.type?.name] || "from-gray-300"} 
                            to-white shadow-inner`}>
                        <img className="mx-auto" src={pokemonSpriteUrl} alt="" />
                    </div>

                    {/*Pokemon Type*/}
                    <div className="flex flex-wrap justify-center gap-3">
                        {
                            pokemonTypes.map((pokemonTypes, pokemonType) => (
                                <div key={pokemonTypes.type.name} className={`px-3 py-1 rounded-full capitalize bg-gradient-to-r
                                    ${POKEAPI_TYPE_TO_COLOR[pokemonTypes.type.name] || "from-gray-300"} 
                            to-white`}> {pokemonTypes.type.name}</div>
                            ))}
                    </div>

                    {/*Pokemon Moves*/}
                    <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl p-2 space-y-1 shadow-inner">
                        {
                            pokemonMoves.map((pokemonMoves, pokemonMove) => (
                                <div key={pokemonMove} className="flex justify-between items-center 
bg-white rounded-lg px-3 py-2 shadow-sm">
                                    <div className="p-3 capitalize"> {pokemonMoves.name}</div>
                                    <div className={`p-2 border-black border-2 rounded-xl m-1 bg-gradient-to-r 
                            ${POKEAPI_TYPE_TO_COLOR[pokemonMoves.type] || "from-gray-300"} 
                            to-white`}> {pokemonMoves.type}</div>
                                    <div className="p-3"> {pokemonMoves.power ?? "N/A"}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default PokemonCard