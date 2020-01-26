const express = require("express");
const actionModel = require("../data/helpers/actionModel.js");
const projectsModel = require("../data/helpers/projectModel.js");
const router = express.Router();

// Post Action
router.post("/", (req, res) => {
  const newAction = req.body;

  if (!newAction.notes || !newAction.description || !newAction.project_id) {
    res.status(400).json({
      errorMessage:
        "Please provide project id, notes, and description for this action."
    });
  } else {
    actionModel
      .insert(newAction)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the action to the database"
        });
      });
  }
});

// router.put("/:id", (req, res) => {
//     console.log(req);
// });



router.put("/:id", (req, res) => {
  const projectId = req.params.project_id;
  const actionId = req.params.id;
  const editAction = req.body;

  if (!editAction.notes || !editAction.description || !editAction.project_id) {
    res.status(400).json({
      errorMessage: "Please provide notes, description, and project id for the post."
    });
  } else {
    console.log(projectId);
    console.log(editAction);
    actionModel.get(projectId).then(project => {
      if (project.length > 0) {
        actionModel
          .update(actionId, editAction)
          .then(action => {
            res.status(200).json(action);
          })
          .catch(err => {
            res.status(500).json({
              errorMessage: "The post information could not be modified."
            });
          });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    });
  }
});

// // Update an action
// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   const editAction = req.body;

//   if (!editAction.notes || !editAction.description || !editAction.project_id) {
//     res.status(400).json({
//       errorMessage:
//         "Please provide project id, notes, and description for this action."
//     });
//   } else {
//     try {
//       const project = await projectsModel.get(id);
//       if (project.length > 0) {
//         const updateAction = await actionModel.update(id, editAction);
//         res.json(updateAction);
//       } else {
//         res.status(404).json({
//           message: "The post with the specified ID does not exist."
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         errorMessage: "The post information could not be modified."
//       });
//     }
//   }
// });

// Get All Actions
router.get("/", (req, res) => {
  actionModel
    .get()
    .then(allActions => {
      res.status(200).json(allActions);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not load actions" });
    });
});


// Get Specific Action
router.get("/:id", validateId, (req, res) => {
  const id = req.params.id;

  actionModel
    .get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Could not load action" });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;
  actionModel
    .get(id)
    .then(hub => {
      if (hub) {
        req.hub = hub;
        next();
      } else {
        // res.status(404).json({ message: 'does not exist' });
        next(new Error("does not exist"));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "exception", err });
    });
}

// Delete Action
router.delete("/:id", (req, res) => {
  const actionId = req.params.id;
  actionModel
    .remove(actionId)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The action could not be removed"
      });
    });
});

function errorHandler(error, req, res, next) {
  console.log("error: ", error.message);
  res.status(400).json({ message: error.message });
}

router.use(errorHandler);

module.exports = router;
