import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AllProjects from './pages/AllProjects'
import ProjectPage from './pages/ProjectPage'
import NewProjectForm from './pages/NewProjectForm'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<AllProjects/>} path="/"/>
          <Route element={<ProjectPage/>} path={"projects/:id"} />
          <Route element={<NewProjectForm/>} path={"projects/newProject"}  />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
