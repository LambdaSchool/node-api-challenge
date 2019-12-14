const express = require('express');

const actions = require('../actions')

const router = express.Router();

// get()
router.get('/', async (req, res, next) => {
    try {
        return res.json(await actions.get())
    }
    catch (err) {
        next(err)
    }
})
// getProjectActions()
router.get('/:id', async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})
// insert()
router.post('/:id', async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})
// update()
router.put('/:id', async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})
// remove()
router.delete('/:id', async (req, res, next) => {
    try {
        await actions(req.params.id)
        return res.status(204).end()
    }
    catch (err) {
        next(err)
    }
})


module.exports = router