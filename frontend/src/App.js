import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login,Admin, Gallery, Contact,Register, Credits, ForgotPassword} from './Pages';
import { NotFound } from './Components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

    </Router>
  );
}

export default App;
