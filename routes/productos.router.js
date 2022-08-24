const express = require('express');
const faker = require("faker");

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema')
const {valid} = require("joi");

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.list();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const product = await service.find(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
}
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
