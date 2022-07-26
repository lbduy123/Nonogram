import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import MyCreation from './pages/MyCreation'
import New from './pages/Nonogram/New'
import Edit from './pages/Nonogram/Edit'
import Play from './pages/Nonogram/Play'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/creation" element={<MyCreation />} />
            <Route path="/new" element={<New />} />
            <Route path="/*" element={<Edit />} />
            <Route path="/p/*" element={<Play />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
