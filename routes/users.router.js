const express = require('express');
const router = express.Router();

const UserService = require('./../services/user.service');
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const data = await service.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
