import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p className="text-3xl underline">
          Hello world!
        </p>
      </div>
    </>
  )
}

export default App
