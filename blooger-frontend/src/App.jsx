/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import Input from './components/Editor'
import { BrowserRouter, Route,Router,Routes } from 'react-router-dom'
import { Mainlayout } from './components/Mainlayout'
import { Writeblog } from './pages/Writeblog'
import {Home} from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { ProtectedRoutes } from './context/ProtectedRoutes'
import { MarkdownProvider } from './context/UseMarkdown'
import BlogReader from './pages/BlogReader'
function App() {

  return (
    <BrowserRouter>

    <MarkdownProvider>
    <Routes>
    <Route element={<Mainlayout/>}>

     <Route path="/" element={
      <ProtectedRoutes>
        <Home/>
      </ProtectedRoutes>}/>

     <Route path="/write"element={
      <ProtectedRoutes>
        <Writeblog/>
      </ProtectedRoutes>}/>

     <Route path="/profile"element={
      <ProtectedRoutes>
        <Profile/>
      </ProtectedRoutes>}/>
    </Route>
    
    <Route path="/blog/:id" element={<BlogReader />} />
    <Route path='/register'element={<Register/>}/>
    <Route path='/login'element={<Login/>}/>

    </Routes>

    </MarkdownProvider>
    </BrowserRouter>
  )
}

export default App
