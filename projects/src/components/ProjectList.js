import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import AddProject from './AddProject';
import Navigation from './Navigation';
import { Card} from 'semantic-ui-react';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
 
  useEffect(() => {
    axios
      .get(`https://node-app-sprint.herokuapp.com/api/projects/`)
      .then((response) => {
        setProjectList(response.data)
      })
      .catch((err) => (err));
  }, []);
  
  return (
    <div>
      {/* <AddProject projectList={projectList} setProjectList={setProjectList} /> */}
      <Navigation/>
      <div className="cards-wrapper">
        <Card.Group>
          {projectList.map((project) => (
            <ProjectCard project={project} key={project.id}/>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};
export default ProjectList;

