exports.getUser = (req, res, next) => {
	res.send({
		nama: 'Budi',
		Alamat: 'Banten',
		Pekerjaan: 'Programmer',
		Umur: 22
	})
}

exports.createUser = async (req, res, next) => {
	try {
		const payload = req.body

		if (payload.name == "" && payload.email == "") {
			return res.status(400).send({
				message: `body is required, cannot be empty`
			})
		}

		// const insertData = await knex('users').insert({
		// 	name: payload.name,
		// 	email: payload.email
		// })

		/* const string = {}
		console.log('object :>> ', !!string); */


		return res.status(201).send({
			message: `success data created`
		})
	} catch (error) {
		return res.status(500).send(error)
	}
}