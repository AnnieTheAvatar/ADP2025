'use client'

import React, { useState, useEffect } from 'react';

interface Degree {
  id: string;
  title: string;
  slug: string;
  degreeType: string;
}

const DegreeList: React.FC = () => {
  const [Degrees, setDegrees] = useState<Degree[]>([]);

  useEffect(() => {
    fetch('/api/degrees') // This will fetch all the degrees
      .then((response) => response.json())
      .then((data: { docs: Degree[] }) => {
        // Ensure docs is always an array, even if it's undefined
        setDegrees(data.docs || []);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        // You might want to set a default value or handle the error here
        setDegrees([]);
      });
  }, []);

  return (
    <div>
      <ul>
        {Degrees.map((degree) => (
          <li key={degree.id}>
            <a href={`/degrees/${degree.slug}`}>{degree.degreeType} of {degree.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DegreeList;
