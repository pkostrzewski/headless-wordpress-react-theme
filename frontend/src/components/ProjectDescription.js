import React from 'react';
import '../styles/ProjectDescription.scss';

const ProjectDescription = () => {
  return (
    <section className="project-description">
      <div className="wrapper">
        <div className="info">
            <h2>Project Overview</h2>
            <p>
                This is an example website built using React as the frontend framework and WordPress as the backend engine. The website operates in a headless architecture, where WordPress serves as the content management system (CMS) while React is responsible for rendering the user interface.
            </p>
            <p>
                By utilizing a headless approach, this setup allows for a flexible and dynamic frontend experience while leveraging the powerful content management features of WordPress on the backend.
            </p>
            <p><i><u>The project is under development.</u></i></p>
            </div>
      </div>
    </section>
  );
};

export default ProjectDescription;