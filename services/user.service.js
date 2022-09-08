const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')

class UserService {
  async find(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user;
  }

  async list() {
    const rta = await models.User.findAll();
    return rta;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, changes) {
    const user = await this.find(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.find(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
