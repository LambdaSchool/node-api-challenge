import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
import Navigation from './Navigation';

const EditProject = () => {
  const [updatedProject, setUpdatedProject] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://node-app-sprint.herokuapp.com/api/projects/${id}`)
      .then((response) => {
        console.log('edit project get response', response)
        setUpdatedProject(response.data)
      })
      .catch((err) => (err));
  }, [id]);

  const handleUpdateInputs = (e) => {
    e.persist()
    setUpdatedProject({
      ...updatedProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log('object info',updatedProject);
    var dataToSend = {
        'name' : updatedProject.name,
        'description' : updatedProject.description,
    };
    console.log(dataToSend);
    axios
      .put(`https://node-app-sprint.herokuapp.com/api/projects/${id}`, dataToSend)
      .then(console.log("where is the data"))
      .then((res) => {
        console.log("here is the data", res)
          setUpdatedProject(res.data)
      })
      .catch((err) => (err))
  };
  return (
   <div>
     <Navigation/>
            <div className="EditProjectForm">
                <Form onSubmit={handleUpdate}>
                <Form.Input
                    required
                    label="Name"
                    type="text"
                    name="name"
                    placeholder='Name' 
                    onChange={handleUpdateInputs}
                    value={updatedProject.name}
                    />
                <Form.TextArea
                    required
                    label='Description' 
                    name="description"
                    placeholder='Description' 
                    onChange={handleUpdateInputs} 
                    value ={updatedProject.description}
                    />
                <Button type='submit'>Save Changes</Button>
                </Form>
        </div>
   </div>
  );
};
export default EditProject;
