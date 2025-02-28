import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [messages, setMessages] = useState<string[]>([]) 
  const [input,setInput] = useState<string>('')

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")

    ws.onopen = () => {
      console.log('Connected to server')
      ws.send('Hello! Message From Client!!')
      setSocket(ws)
    }

    ws.onmessage = (event) => {
      setMessages(prevMessages => [...prevMessages, event.data]) 
    }
    return () => {
      ws.close() 
    }

  }, [])  

  if(!socket) return <div>Connecting...</div>

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <input type="text" placeholder='message' onChange={(e)=> setInput(e.target.value)}/>
      <button onClick={()=>{
        socket?.send('Hello! Message From Client!! '+input)
      }}></button>
      {messages}
    </div>
  )
}

export default App
