import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  {/*make a loading state so that appwrite process the data*/}
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

//in this from authService we are getting current user then if we get userdata dispatch
  useEffect(() => {
    authService.getCurrentUser()//loading state is true 
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))//loading state false
  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block '>
        <Header />
        <main>
       <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App