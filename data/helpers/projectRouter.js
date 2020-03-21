const express = require('express');

const Projects = require('./projectModel.js');
const Actions = require('./actionModel');
const router =express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    const projectInfo = req.body;
    console.log(projectInfo);
  
    if (typeof projectInfo.name === 'undefined' || typeof projectInfo.description === 'undefined' || typeof projectInfo.completed === 'undefined') {
      res.status(400).json({ errorMessage: 'Please provide name, description and if it was completed for the project.' });
    } else {
      Projects.insert(projectInfo)
        .then((project) => {
          res.status(201).json({ success: true, project });
        })
        .catch((err) => {
          res.status(500).json({ errorMessage: 'There was an error while saving the project to the database', err });
        });
    }
});

router.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
       res.status(200).json(project);
    })
    .catch((err) => {
     res.status(500).json({ message: 'Error retrieving the project', err });
    });
});



  router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
      .then(() => {
        res.status(200).json({ message: 'The project has been deleted' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Error deleting the project', err });
      });
  });  

  router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const projectInfo = req.body;
    if (typeof projectInfo.name === 'undefined' || typeof projectInfo.description === 'undefined' || typeof projectInfo.completed === 'undefined') {
        res.status(400).json({ errorMessage: 'Please provide name, description and if project was completed for the project.' });
      } else {
    Projects.update(id, req.body)
      .then((project) => {
        res.status(200).json({ success: 'Info Updated!', info: req.body, project });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Server error', err });
      });
    }
  });

  router.get('/:id/action', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
      .then((action) => {
        res.status(200).json({ success: true, action });
      })
      .catch((err) => {
        res.status(500).json({ error: 'The actions information could not be retrieved.', err });
      });
  });

  router.post('/:id/action', validateProjectId, (req, res) => {
    const userid = req.params.id;
    const projectInfo = req.body;
    console.log(projectInfo);
    if (typeof projectInfo.notes === 'undefined' || typeof projectInfo.description === 'undefined' || typeof projectInfo.completed === 'undefined') {
        res.status(400).json({ errorMessage: 'Please provide name, description and if it was completed for the project.' });
      } else {
    Projects.get(userid)
      .then(() => {
          Actions.insert({ notes: projectInfo.notes, description: projectInfo.description, completed:projectInfo.completed, project_id:Number(id )})
            .then((actionnew) => res.status(201).json({ success: actionnew }));
      })
      .catch((err) => {
        res.status(500).json({ error: 'There was an error while saving the action to the database', err });
      });
    }
});

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
      .then((project) => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ message: 'Invalid project ID' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Invalid project ID 500', err });
      });
  }

  module.exports = router;