import { useState } from 'react'
import './App.css'
import ExpandedTakeoutCard from './ExpandedTakeoutCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ExpandedTakeoutCard/>
      </div>
     
    </>
  )
}

export default App
