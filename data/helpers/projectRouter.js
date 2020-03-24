/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
const express = require('express');

const Projects = require('./projectModel.js');
const Actions = require('./actionModel');

const { validateProjectId, validateActionBody, validateProjectBody } = require('../middleweare');

const router = express.Router();


router.get('/', (req, res) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error retrieving the projects', err });
    });
});

router.post('/', validateProjectBody, (req, res) => {
  const projectInfo = req.body;
  Projects.insert(projectInfo)
    .then((project) => {
      res.status(201).json({ success: true, project });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an error while saving the project to the database', err });
    });
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
      res.status(500).json({ message: 'Error deleting the project', err });
    });
});

router.put('/:id', validateProjectId, validateProjectBody, (req, res) => {
  const { id } = req.params;

  Projects.update(id, req.body)
    .then((project) => {
      res.status(200).json({ success: 'Info Updated!', info: req.body, project });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Server error', err });
    });
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

router.post('/:id/action', validateProjectId, validateActionBody, (req, res) => {
  const project_id = req.params.id;
  const { notes, description } = req.body;

  Projects.get(project_id)
    .then((action) => {
      if (!action) {
        null;
      } else {
        const newAction = { notes, description, project_id };
        Actions.insert(newAction)
          .then((actionnew) => res.status(201).json({ success: true, actionnew }));
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'There was an error while saving the action to the database', err });
    });
});

module.exports = router;
