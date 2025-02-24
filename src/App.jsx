import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AllProjects from './pages/AllProjects'
import ProjectPage from './pages/ProjectPage'
import NewProjectForm from './pages/NewProjectForm'
import Navbar from './components/Navbar'
import { AuthProvider } from './utils/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {

  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<PrivateRoutes/>}>
            <Route element={<AllProjects/>} path="/projects"/>
            <Route element={<ProjectPage/>} path={"projects/:id"} />
            <Route element={<NewProjectForm/>} path={"projects/newProject"}  />
          </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
