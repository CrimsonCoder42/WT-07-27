import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Auth from './Auth'
import ConfirmLogin from './ConfirmLogin';
import ProfilePage from './ProfilePage';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/confirmlogin"  element={<ConfirmLogin />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;
