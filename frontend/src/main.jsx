import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider , createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import {About,Contact,Home,Login,SignUp} from "./components"
import App from './App.jsx'
import './index.css'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} >
      <Route path="" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signUp" element={<SignUp/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
