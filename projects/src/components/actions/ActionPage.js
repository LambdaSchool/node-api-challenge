import React, { useState, useEffect } from 'react';
import { Item, Icon, Menu } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const ActionPage = () => {
    const [action, setAction] = useState({});

    const { id } = useParams();
    const history = useHistory();
 
  useEffect(() => {
    axios
      .get(`https://node-app-sprint.herokuapp.com/api/projects/${id}/action`)
      .then((response) => {
        console.log("response", response.data);
        setAction(response.data)
      })
      .catch((err) => (err));
  }, [id]);

  const deleteAction = id => {
    axios
      .delete(`https://node-app-sprint.herokuapp.com/api/actions/${id}`)
      .then((res) => {
        history.push('/api/actions')
          (res)
        })
      .catch((err) => (err));
  };
    

  const routeToActionEdit = (e, action) => {
    e.preventDefault()
    history.push(`/editaction/${action.id}`)
  };
  const routeToActionList = e => {
    e.preventDefault()
    history.push(`/api/actions`)
  };
// console.log("action", action.action);
  return (
     // {action.action.map((action)=> ( // can't map over the actions to render an action by ID 
    <div className="action-wrapper" >
      <Item.Group link>
        <Item>
          <Item.Image size='medium' src='https://images.unsplash.com/photo-1554774853-b3d587d95440?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1463&q=80' />
          <Item.Content>
            <Item.Header>Notes: "Neque porro quisquam est qui
              dolorem ipsum quia dolor sit amet, consectetur, 
              adipisci velit..."{action.notes}
            </Item.Header>
            <Item.Description>Description:  "Neque porro quisquam est qui
              dolorem ipsum quia dolor sit amet, consectetur, 
              adipisci velit..."{action.description}
            </Item.Description>
          </Item.Content>
          <Menu icon vertical>
            <Menu.Item>
                <Icon name="list" alternate outline color="blue" onClick={e => routeToActionList(e)}/>
            </Menu.Item>

            <Menu.Item>
                <Icon name="trash" alternate outline color="red" onClick={()=>deleteAction(id)}/>
            </Menu.Item>

            <Menu.Item>
                <Icon name="edit" alternate outline color="green" onClick={e => routeToActionEdit(e, action)}/>
            </Menu.Item>
          </Menu>
        </Item>
      </Item.Group>
    </div>
    //  ))} 
  )
};

export default ActionPage;