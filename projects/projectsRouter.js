const express = require("express");

const projectDb = require("../data/helpers/projectModel.js");

const actionsDb = require("../data/helpers/actionModel.js");

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("projectsRouter working!")
// });

// get all projects
router.get("/", (req, res) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The projects information could not be found"
      });
    });
});

// get a specific project
router.get("/:id", (req, res) => {
  const id = req.params.id;

  projectDb
    .get(id)
    .then(specificP => {
      if (id) {
        res.status(200).json(specificP);
      } else {
        res.status(404).json({
          error: "No project with that ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project information could not be found"
      });
    });
});

// get a projects actions
router.get("/:id/actions", (req, res) => {
  const project_id = req.params.id;

  projectDb
    .getProjectActions(project_id)
    .then(actions => {
      if (project_id) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({
          message: "The project with the specific ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The actions information could not be found"
      });
    });
});

// add a new project
router.post("/", (req, res) => {
  const newProject = req.body;

  projectDb
    .insert(newProject)
    .then(project => {
      if (newProject.name || newProject.description) {
        res.status(201).json(project);
      } else {
        res.status(400).json({
          errorMessage: "Please provide name and description for new a project"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the project"
      });
    });
});

// update a project
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  projectDb
    .update(id, body)
    .then(updatedP => {
      if (!id) {
        res.status(404).json({
          message: "The project with the specific ID does not exist"
        });
      } else if (!updatedP.name || !updatedP.description) {
        res.status(400).json({
          message: "Please provide name and description for updated project"
        });
      } else {
        res.status(200).json({ updatedP });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project information could not be updated"
      });
    });
});

// delete a project
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  projectDb
    .remove(id)
    .then(deletedP => {
      if (!id) {
        res.status(404).json({
          message: "The project with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ deletedP });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project could not be removed"
      });
    });
});

// create new action...well if I can figure it out
router.post("/:id/actions", (req, res) => {
  const body = req.body;
  actionsDb.insert(body);
  const project_id = req.body.project_id;

  projectDb
    .get(project_id)
    .then(newAction => {
      if (newAction.length === 0) {
        res.status(400).json({
          message: "missing action data"
        });
      } else if (!body.description && !body.notes) {
        res.status(400).json({
          message: "missing required description and notes fields"
        });
      } else {
        res.status(200).json({ body });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the action"
      });
    });
});

module.exports = router;
