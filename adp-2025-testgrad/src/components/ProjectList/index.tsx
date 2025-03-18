'use client'

import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects') // This will fetch all projects
      .then((response) => response.json())
      .then((data: { docs: Project[] }) => {
        // Ensure docs is always an array, even if it's undefined
        setProjects(data.docs || []);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        // You might want to set a default value or handle the error here
        setProjects([]);
      });
  }, []);

  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={`/projects/${project.slug}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
