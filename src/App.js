// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserProfile from './components/UserProfile';
import Blogs from './components/Admin/Blogs';
import Services from './components/Admin/Services';
import LandingPage from './components/LandingPage';
import Classes from './components/Classes';
import ContactForm from './components/ContactForm';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import Class from './components/Admin/Class';
import Member from './components/Admin/Member';
import AdminLogin from './components/AdminLogin';
import ProtectdRoute from './components/ProtectdRoute';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className='background w-full fontt'>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/blog" element={<Blog />} />


          {/* dashboard  */}
          <Route path="/admin" element={<ProtectdRoute><AdminDashboard /></ProtectdRoute>}>
            <Route path="members" element={<Member />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="services" element={<Services />} />
            <Route path="class" element={<Class />} />
          </Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
