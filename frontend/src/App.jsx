import React from 'react'
import { Outlet } from 'react-router-dom'
import {Footer,Header} from "./components"
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
