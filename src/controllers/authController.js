const {user} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
	try {
		const payload = req.body

		const hashedPassword = bcrypt.hashSync(payload.password, 8)

		const registerUser = await user.create({
			firstname: payload.firstname,
			lastname: payload.lastname,
			username: payload.username,
			email: payload.email,
			password: hashedPassword
		})

		return res.status(201).send({
			message: `create user success`,
			// result: registerUser
		})
	} catch (error) {
		return res.status(500).send({error})
	}
}

exports.login = async (req, res, next) => {
	try {
		const payload = req.body

		const getUser = await user.findOne({
			where: {email: payload.email}
		})

		const comparedPassword = bcrypt.compareSync(payload.password, getUser.dataValues.password)
		if (comparedPassword === false) {
			return res.status(400).send({
				message:`invalid password`
			})
		} else {
			const token = jwt.sign({
				id: getUser.dataValues.id,
				email: getUser.dataValues.email,
				email: getUser.dataValues.username,
			}, process.env.JWT_KEY, {expiresIn: 3600})

			return res.status(400).send({
				message:`login success`,
				token: token
			})
		}
	} catch (error) {
		return res.status(500).send({error})
	}
}