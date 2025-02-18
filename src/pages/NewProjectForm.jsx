import { useState } from 'react';
import db from '../appwrite/databases';
import { useNavigate } from 'react-router-dom';

const NewProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    techStack: '',
    discordUsername: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await db.projects.create(formData);
      navigate(`/projects/${res.$id}`);
    } catch (err) {
      console.error(err);
      setError("Error creating project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-body">
              <h2 className="card-title fw-bold mb-4">Create New Project</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label">Project Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="projectDescription" className="form-label">Project Description:</label>
                  <textarea
                    className="form-control"
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="techStack" className="form-label">Tech Stack your project will use:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="techStack"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="discordUsername" className="form-label">Discord Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="discordUsername"
                    name="discordUsername"
                    value={formData.discordUsername}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProjectForm;