const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')

class UserService {
  async create(data) {
    return data;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }
}

module.exports = UserService;
