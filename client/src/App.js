import './App.css';
import React from 'react';      
import {Route, Routes} from 'react-router-dom';
import Start from './components/Start';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Breed from './components/Breed';
import Create from './components/Create';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/home' element={<div><NavBar /><Home /></div>}/>
        <Route path = '/breed/:id' element = {<div><Breed /></div>}/>
        <Route path='/create' element={<div><Create /></div>} />
        <Route path="*" element={<p>Not existing path</p>} />
      </Routes>
    </div>
  );
}

export default App;
