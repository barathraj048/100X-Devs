import { useState } from 'react'

import './App.css'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [text, setText] = useLocalStorage('text', "") 

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

export default App
