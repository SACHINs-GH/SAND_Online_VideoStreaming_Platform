
import { Outlet } from 'react-router-dom'
import {Footer,Header,SideNavbar} from "./components"
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <div className='flex'>
        <SideNavbar/>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default App
