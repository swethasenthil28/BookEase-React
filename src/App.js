//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import AddHalls from './components/Halls/AddHalls';
import DisplayHalls from './components/Halls/DisplayHalls';
// import Auth from './components/Auth';
function App() {
  const role = localStorage.getItem("role")
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {role === "admin" && <Route path="addhall" element={<AddHalls />} />}
          {role === "admin" && <Route path="displayhalls" element={<DisplayHalls />} />}
          {/* <Auth /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  </div>

  );
}

export default App;
