import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Chat from './Pages/Chat'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/app' element={<Chat />}/>
      <Route path='/voice' />
    </Routes>
  )
}

export default App
