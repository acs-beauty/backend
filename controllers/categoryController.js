const ApiError = require('../errors/ApiError')
const { User } = require('../models')
const { Category } = require('../models')
const findUser = require('../queries/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const slugify = require('slugify')

const generateJWT = (id, email, isAdmin) => jwt.sign({ id, email, isAdmin }, process.env.SECRET_KEY, { expiresIn: '24h' })

class CategoryController {
  async post(req, res, next) {
    try {
      const { name } = req.body
      if (!name) {
        return next(ApiError.badRequest('Не передано поле name'))
      }
      // if (!slug) {
      //   return next(ApiError.badRequest('Не передано поле slug'))
      // }

      const category = await Category.create({ name, slug: slugify(name, { lower: true }) })
      return res.json(category)
    } catch {
      return next(
        ApiError.badRequest(
          'Непредвиденная ошибка, возможно вы пытаетесь передать категорию с полем slug, которое уже есть в базе данных'
        )
      )
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return next(ApiError.badRequest('Не передан параметр id'))
      }

      const category = await Category.findByPk(id)
      return res.json(category)
    } catch {
      return next(ApiError.badRequest('Возможно не передан параметр id или он имеет неправильный формат'))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return next(ApiError.badRequest('Не передан параметр id'))
      }

      const category = await Category.findByPk(id)
      if (!category) {
        return next(ApiError.notFound(`категория с id ${id} не найдена`))
      }
      await category.destroy()

      // await Category.destroy({
      //   where: {
      //     id,
      //   },
      // })

      return res.status(204).json()
      // return res.json('Категория была успешно удалена')
    } catch {
      return next(ApiError.badRequest('Возможно не передан параметр id или он имеет неправильный формат'))
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.notFound('Пользователь с таким email не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль'))
    }
    // const token = generateJWT(user.id, user.email, user.isAdmin)
    const token = generateJWT(user.id, user.email)
    return res.json({ token })
  }

  async me(req, res, next) {
    const id = req.id
    const user = await User.findOne({ where: { id } })
    const { password, ...info } = user.toJSON()

    return res.json(info)
  }

  // async post(req, res) {}
  // async patch(req, res) {}
}

module.exports = new CategoryController()
