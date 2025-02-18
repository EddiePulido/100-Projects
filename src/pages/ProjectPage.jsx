import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import db from '../appwrite/databases';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProjectData = async () => {
    setLoading(true);
    setError(null);
    try {
      const pro = await db.projects.get(id);
      setProject(pro);
    } catch (err) {
      console.error(err);
      setError('Error loading project.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectData();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>; // Center loading message
  }

  if (error) {
    return <div className="text-center text-danger py-5">{error}</div>; // Center error message
  }

  if (!project) {
    return <div className="text-center py-5">Project not found.</div>; // Center "not found" message
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0"> {/* Shadow and no border */}
            {project.imageUrl && ( // Optional image
              <img
                src={project.imageUrl}
                alt={project.projectName}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h2 className="card-title fw-bold mb-3">{project.projectName}</h2> 
              <p className="card-text">
                <strong>Description:</strong> {project.projectDescription}
              </p>
              <p className="card-text">
                <strong>Tech Stack:</strong> {project.techStack}
              </p>
              <p className="card-text">
                <strong>Creator's Discord Name (Message me if you're interested in joining!):</strong> {project.discordUsername}
              </p>
              <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
                Back to Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;