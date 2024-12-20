import React from 'react';
import { Container } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';


const App = () => {
    return (
        <Container maxidth="lg">
            <NavBar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/auth" element={<Auth/>} />
                </Routes>
        </Container>
    );
}

export default App;