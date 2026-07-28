/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import Input from './components/Editor'
import { BrowserRouter, Route,Router,Routes } from 'react-router-dom'
import { Mainlayout } from './components/Mainlayout'
import { Writeblog } from './pages/writeblog'
import {Home} from './pages/Home'
import Register from './pages/register'
import Login from './pages/Login'
import Profile from './pages/Profile'
function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route element={<Mainlayout/>}>
     <Route path="/" element={<Home/>}/>
     <Route path="/write"element={<Writeblog/>}/>
     <Route path="/profile"element={<Profile/>}/>
    </Route>
    <Route path='/register'element={<Register/>}/>
    <Route path='/login'element={<Login/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
