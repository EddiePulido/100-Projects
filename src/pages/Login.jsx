import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { user, loginUser } = useAuth() 

  const loginForm = useRef(null)

  useEffect(() => {
    if(user){
      navigate('/projects')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password.value 

    const userInfo = { email, password }
    loginUser(userInfo)

  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Find projects for your portfolio!</h1>
      <h2 className='text-center mb-4'>Login/Register to see the project board</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form ref={loginForm} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password..."
                  />
                </div>

                <div className="d-grid">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary"
                  />
                </div>
              </form>

              <p className="mt-3 text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
