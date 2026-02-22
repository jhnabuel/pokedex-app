import { useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard'

const Button = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="
    w-60 h-16
    rounded-2xl
    bg-gradient-to-r from-blue-500 to-blue-400
    text-white text-lg
    shadow-lg
    border-2 border-blue-1000
    transition-all duration-300 ease-in-out
    
    hover:scale-110
    hover:shadow-2xl
    hover:from-blue-600
    hover:to-blue-500
    
    active:scale-95
    active:shadow-md
  "
    >
      {text}
    </button>


  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <PokemonCard ButtonComponent={Button} />
      </div>
    </>
  )
}

export default App
