import { useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard'

const Button = ({ onClick, text }) => {
  return (
    <button className="w-30 h-15 border-4 bg-blue-200 flex items-center justify-center" onClick={onClick}>
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
