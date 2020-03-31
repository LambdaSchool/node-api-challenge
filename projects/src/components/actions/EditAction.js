import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const EditAction = () => {
  const [updatedAction, setUpdatedAction] = useState('');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/actions/${id}`)
      .then((response) => {
        setUpdatedAction(response.data)
      })
      .catch((err) => (err));
  }, [id]);

  const handleChangesAdd = (e) => {
    setUpdatedAction({
      ...updatedAction,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
  // Data sent to the API contains only the notes and the description  
    const dataToSend = {
        notes: updatedAction.notes,
        description: updatedAction.description,
      };

    axios
      .put(`http://localhost:4000/api/actions/${id}`, dataToSend)
      .then((res) => { 
        setUpdatedAction('')
        history.push(`/api/actions`)
    })
      .catch((err) => (err));
  };

  return (
    <div>
      <div className="addActionForm">
        <Form onSubmit={handleAdd} >
          <Form.Input
            required
            label="Note"
            type="text"
            name="notes"
            placeholder='Notes' 
            onChange={handleChangesAdd}
            value={updatedAction.notes}
          />
          <Form.TextArea
            required
            label='Description' 
            name="description"
            placeholder='Description' 
            onChange={handleChangesAdd} 
            value={updatedAction.description}
          />
          <Button type='submit'> Update Action </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditAction;
