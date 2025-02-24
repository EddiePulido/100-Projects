import { useState, useEffect } from 'react';
import db from '../appwrite/databases';
import { Link } from 'react-router-dom';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await db.projects.list();
      setProjects(res.documents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Project Board</h2>
      <div className="row">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div className="col-md-4 mb-4" key={project.$id}>
              <Link
                to={`/projects/${project.$id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="card h-100 shadow border-0 overflow-hidden"> 
                  {/* {project.imageUrl && ( 
                    <img src={project.imageUrl} alt={project.projectName} className="card-img-top" style={{height: '200px', objectFit: 'cover'}}/>
                  )} */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2 fw-bold">{project.projectName}</h5>
                    <p className="card-text flex-grow-1 text-muted">
                      <strong>Creator:</strong> {project.discordUsername}
                    </p>
                    {project.shortDescription && (
                      <p className="card-text small text-truncate"> 
                        {project.shortDescription}
                      </p>
                    )}
                    <div className="mt-auto">
                      <button className="btn btn-primary btn-sm w-100">View Project</button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProjects;