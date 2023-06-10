const User = require('../models/user.model');

const register = async (req, res, next) => {
	const { userName, password, fullName } = req.body;
	try {
		if (!userName) {
			const err = new Error('User name is required!');
			err.status = 400;
			throw err;
		}

		const existingUser = await User.findOne({ userName });
		if (existingUser) {
			const err = new Error('User already exists!');
			err.status = 400;
			throw err;
		}

		const user = await User.create({ userName, password, fullName });
		res.status(201).json({ user });
	} catch (err) {
		next(err);
	}
};

module.exports = { register } ;
