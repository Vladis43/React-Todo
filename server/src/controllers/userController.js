import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import config from '../config/database'
import User from '../models/User'

module.exports = {
    async SignUp(request, response) {
        const {email} = request.body
        const errors = request.validationErrors()

        try {

            if (errors) {
                response.status(422).json({errors: errors})
            } else {
                await User.findOne({email}, (error, user) => {
                    if (!user) {
                        User.create({
                            ...request.body,
                            password: bcrypt.hashSync(request.body.password),
                        }, (error, user) => {
                            if (error) {
                                response.status(409).json({error: error})
                            } else {
                                console.log(user)
                                jwt.sign({id: user._id}, config.secret, (error, token) => {
                                    response.status(201).json({
                                        message: 'Sing Up is successful',
                                        success: true,
                                        payload: {
                                            token,
                                            id: user._id,
                                            username: user.username
                                        }
                                    })
                                })
                            }
                        })
                    } else {
                        response.status(409).json({
                            errors: [
                                {
                                    param: 'email',
                                    msg: 'This email is already taken!'
                                }
                            ],
                            success: false
                        })
                    }
                })
            }
        } catch (error) {
            response.status(500).json({error: error})
        }
    },

    async SingIn(request, response) {
        const {email, password} = request.body
        const errors = request.validationErrors()
        const account = await User.findOne({email})

        if (errors) {
            response.status(422).json({errors: errors})
        } else {

            if (!account) {
                response.status(404).json({
                    errors: [{
                        param: 'email',
                        msg: 'User with such email not found!'
                    }],
                    success: false
                })
            } else {

                try {
                    const validPassword = bcrypt.compareSync(password, account.password)

                    if (!validPassword) {
                        response.status(401).json({
                            errors: [{
                                param: 'password',
                                msg: 'Wrong password!'
                            }],
                            success: false
                        })
                    } else {

                        jwt.sign({...account}, config.secret, (error, token) => {
                            if (error) {
                                response.status(403).json('Forbidden')
                            } else {
                                console.log(account)
                                response.status(200).json({
                                    message: 'Sing In is successful',
                                    success: true,
                                    payload: {
                                        token,
                                        id: account._id,
                                        username: account.username
                                    }
                                })
                            }
                        })

                    }
                } catch (error) {
                    response.status(500).json({error: error})
                }

            }
        }
    }
}
