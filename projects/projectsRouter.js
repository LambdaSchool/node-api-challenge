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
    const project_id = req.params.id

    projectDb.getProjectActions(project_id)
    .then(actions => {
        if (project_id) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({
                message: "The project with the specific ID does not exist"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The actions information could not be found"
        })
    })
})

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

// // create a new action
// router.post("/:id/actions", (req, res) => {
//     const body = req.body;
//     actionsDb.insert(body);
//     const id = req.params.id;

//     projectDb.get(id)
//     .then(newAction => {
//         if (!id) {
//             res.status(404).json({
//                 message: "The project with the specific ID does not exist"
//             })
//         } else if (!newAction.description && !newAction.notes) {
//             res.status(400).json({
//                 errorMessage: "Please provide a description and notes for your new action"
//             })
//         } else {
//             res.status(201).json({ newAction })
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             errorMessage: "There was an error while adding the action to the database"
//         });
//     });
// });


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

module.exports = router;
