import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import ProtectedRoute from './components/molecules/ProtectedRoute'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />

      </Routes>
    </Router>
  )
}

export default App
