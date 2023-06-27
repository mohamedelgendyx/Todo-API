const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');

exports.login = async (request, response, next) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if (!user || !bcrypt.compareSync(request.body.password, user.password)) {
            throw Object.assign(new Error('Email or Password is incorrect'), { status: 401 });
        }
        const token = JWT.sign({ _id: user._id }, process.env.secretKey, { expiresIn: "1d" });
        response.status(200).json({ token: token });
    } catch (error) { next(error); }
}

exports.signup = async (request, response, next) => {
    try {
        const hashedPassword = await bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
        const user = new User({
            fullname: request.body.fullname,
            email: request.body.email,
            password: hashedPassword
        });
        await user.save();
        response.status(201).json({ message: 'User created successfully', data: user });
    } catch (error) { next(error); }
}