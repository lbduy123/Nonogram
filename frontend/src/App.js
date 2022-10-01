import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminDashboard from './pages/AdminDashboard'
import Dashboard from './pages/Dashboard'
import Login from './pages/Auth/Login'

import MyCreation from './pages/MyCreation'
import WorkShop from './pages/WorkShop'
import New from './pages/Nonogram/New'
import Edit from './pages/Nonogram/Edit'
import Play from './pages/Nonogram/Play'
import { HeaderTemplate } from './templates/HeaderTemplate'
import Register from './pages/Auth/Register'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HeaderTemplate />}>
            <Route path="" element={<Dashboard />} />
            <Route path="casual" element={<Dashboard />} />
            <Route path="workshop" element={<WorkShop />} />
            <Route path="creation" element={<MyCreation />} />

            <Route path="new" element={<New />} />
            <Route path="e/*" element={<Edit />} />
            <Route path="p/*" element={<Play />} />
            <Route path="admin" element={<AdminDashboard />} />;
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
