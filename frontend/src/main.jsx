import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {RouterProvider , createBrowserRouter, 
createRoutesFromElements, Route} from 'react-router-dom'
import {About,Contact,Home,Login,Profile,Register,Subscription,Uplaod} from "./components"
import App from './App.jsx'
import './index.css'
import store from '../src/store/store.js'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} >
      <Route path="" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="subscription" element={<Subscription/>}/>
      <Route path="upload" element={<Uplaod/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
