const faker = require("faker");
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize')

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async find(id) {
    const product =  this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is blocked')
    }
    return product;
  }

  async list() {
    const query = "SELECT * FROM tasks";
    const [data] = await sequelize.query(query);
    return data;
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, data) {

    const productIndex = this.products.findIndex(item => item.id === id);
    if (productIndex === -1) {
      console.log('update');
      throw boom.notFound('Product not found');
    }

    const product = this.products[productIndex];
    this.products[productIndex] = {
      ...product,
      ...data
    };

    return this.products[productIndex];
  }

  async delete(id) {
    const productIndex = this.products.findIndex(item => item.id === id);
    if (productIndex === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(productIndex, 1);
  }
}

module.exports = ProductService;
