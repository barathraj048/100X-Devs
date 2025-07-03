import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Sender } from './components/Sender'
import  Receiver  from './components/Reciver'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>WebRTC Demo</h1>} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/receiver" element={<Receiver />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App