import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import config from '../config/database'
import User from '../models/User'

module.exports = {
    async SignUp(request, response) {
        const {email} = request.body

        try {
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
                                response.status(200).json({
                                    message: 'Sing Up is successful',
                                    success: true,
                                    payload: {
                                        token,
                                        id: user._id
                                    }
                                })
                            })
                        }
                    })
                } else {
                    response.status(409).json({
                        error: 'This email is already taken!'
                    })
                }
            })
        } catch (error) {
            response.status(500).json({error: error})
        }
    },

    async SingIn(request, response) {
        const {email, password} = request.body

        try {
            const account = await User.findOne({email})

            const validPassword = bcrypt.compareSync(password, account.password)

            if (!validPassword) {
                response.status(500).json({
                    message: 'Wrong password!',
                    success: false
                })
            }

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
                            id: account._id
                        }
                    })
                }
            })
        }
         catch (error) {
            response.status(500).json({error: error})
        }
    }
}
