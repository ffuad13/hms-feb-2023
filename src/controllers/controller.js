const {user} = require('../models')

exports.helloWorld = (req, res, next) => {
    res.send('<h1>Hello Jakarta!</h1>');
};

exports.aboutMe = async(req, res, next) => {
    try {
        const me = await user.findOne({
            where: {id: req.user.id}
        })

        return res.status(200).send({
            message: `retrive data profile success`,
            data: me.dataValues
        })
    } catch (error) {
        console.log('object :>> ', error);
		return res.status(500).send({error})
    }
}