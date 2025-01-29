import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import MovieReview from './components/MovieReview';
import Search from './components/Search';   
import AddReview from './components/AddReview';
import './styles/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} /> 
                <Route path="/search" element={<Search />} />   
                <Route path="/movie-review" element={<MovieReview />} /> 
                <Route path="/add-review" element={<AddReview />} />
            </Routes>
    </BrowserRouter>
);
