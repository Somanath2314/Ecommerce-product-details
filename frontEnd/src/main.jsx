import React from 'react' 
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import AboutTeam from './components/AboutTeam/AboutTeam.jsx'
import ApiEndpoints from './components/ApiEndpoints/ApiEndpoints.jsx'
import AdminSection from './components/AdminSection/AdminSection.jsx'
import Register from './components/User/Register.jsx'
import Login from './components/User/Login.jsx'
import Layout from './Layout.jsx'
import { Provider } from 'react-redux'
import {store} from './app/store.js'
import "./index.css"

// Components i need
//Initially i need
//Home Page
//About the team
//Api-Endpoints, docuementation
//Admin Section 
// login, logout button
// Register

// to do
// generate Api key


const router = new createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='about-team' element={<AboutTeam/>}/>
            <Route path='api-endpoints' element={<ApiEndpoints/>}/>
            <Route path='admin-section' element={<AdminSection/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='login' element={<Login/>}/> 
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode> 
        <Provider store={store}>
        <RouterProvider router={router} />
        </Provider> 
    </React.StrictMode>,
  )