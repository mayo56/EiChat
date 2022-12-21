import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Chat from './Pages/Chat'
import Voice from './Pages/Voice'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/app' element={<Chat />}/>
      <Route path='/voice' element={<Voice />} />
    </Routes>
  )
}

export default App
