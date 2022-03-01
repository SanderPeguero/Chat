import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AuthProvider from '../contexts/AuthProvider'

import Chats from './Chats'
import Login from './Login'

function App() {
  
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/chat' element={<Chats/>}></Route>
            <Route path='/' element={<Login/>}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
