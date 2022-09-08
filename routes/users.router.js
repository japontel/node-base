const express = require('express');
const router = express.Router();

const UserService = require('./../services/user.service');
const validatorHandler = require("../middleware/validator.handler");
const { createUserSchema, updateUserSchema, getUserSchema } = require("../schemas/user.schema");
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const data = await service.list();
    res.json(data);
  } catch (error) {
    next(error);
  }
})

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await service.find(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
