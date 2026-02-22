import { useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard'

const Button = ({ onClick, text }) => {
  return (
    <button className="w-35 h-20 p-4 rounded-2xl shadow-2xl border-4 border-black m-2 p-2 bg-blue-200 text-white" onClick={onClick}>
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
