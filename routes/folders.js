'use strict';

const express = require('express');
const knex = require('../knex');
// Create an router instance (aka "mini-app")
const router = express.Router();

router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .select('*')
    .from('folders')
    .where('id', `${id}`)
    .then(([folder]) => {
      if (folder) {
        res.json(folder);
      }else{
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .from('folders')
    .update(updateObj)
    .where('id', `${id}`)
    .returning('*')
    .then( ( [folder] ) => {
      if (folder) {
        res.json(folder);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


router.post('/', (req, res, next) => {
  const { name } = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .insert(newItem)
    .into('folders')
    .returning('*')
    .then(([folder]) => {
      if (folder) {
        res.status(201).json(folder);
      }
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .from('folders')
    .where('id', `${id}`)
    .del()

    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });

});




module.exports = router;
