import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Register = () => {
  const { user, registerUser } = useAuth()
  const registerForm = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = registerForm.current.name.value
    const email = registerForm.current.email.value
    const password1 = registerForm.current.password1.value
    const password2 = registerForm.current.password2.value

    if(password1 !== password2){
      alert('Passwords do not match!')
      return
    }

    const userInfo = { name, email, password1 }

    registerUser(userInfo)
    // navigate('/')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form ref={registerForm} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter name..."
                  />
                </div>

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
                  <label htmlFor="password1" className="form-label">Password:</label>
                  <input
                    type="password"
                    name="password1"
                    className="form-control"
                    id="password1"
                    placeholder="Enter password..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password2" className="form-label">Confirm Password:</label>
                  <input
                    type="password"
                    name="password2"
                    className="form-control"
                    id="password2"
                    placeholder="Confirm password..."
                  />
                </div>

                <div className="d-grid">
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                  />
                </div>
              </form>

              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register
