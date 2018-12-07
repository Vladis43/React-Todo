import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import randomstring from 'randomstring'
import config from '../config/database'
import User from '../models/User'
import mailer from '../misc/mailer'


export default {
    async SignUp(request, response) {
        const {username, email} = request.body
        const errors = request.validationErrors()
        const verificationCode = randomstring.generate({length: 6, charset: 'numeric'})

        try {
            if (errors) {
                response.status(422).json({errors})
            } else {
                const username = await User.findOne({username})

                if (username) {
                    response.status(409).json({
                        errors: [
                            {
                                param: 'username',
                                msg: 'This username is already taken!'
                            }
                        ],
                        success: false
                    })
                } else {
                    const user = await User.findOne({email})

                    if (user) {
                        response.status(409).json({
                            errors: [
                                {
                                    param: 'email',
                                    msg: 'This email is already taken!'
                                }
                            ],
                            success: false
                        })
                    } else {
                        const newUser = await User.create({
                            ...request.body,
                            password: bcrypt.hashSync(request.body.password),
                            verificationCode
                        })

                        if (!newUser) {
                            response.status(409).json({error})
                        } else {
                            response.status(201).json({
                                message: 'Sing Up is successful',
                                success: true,
                                payload: {
                                    username: newUser.username
                                }
                            })
                        }

                        mailer.sendEmail('admin@todo.com', email, 'Please, verify your email!', verificationCode)
                    }
                }
            }
        } catch (error) {
            response.status(500).json({error})
        }
    },

    async Verification(request, response) {
        const {verificationCode} = request.body
        const verificationUser = request.params.user

        try {
            const user = await User.findOne({username: verificationUser})

            if (!user) {
                response.status(404).json({
                    errors: [
                        {
                            param: 'email',
                            msg: 'User not found!'
                        }
                    ],
                    success: false
                })
            } else {
                if (verificationCode === user.verificationCode) {
                    await user.update({active: true, verificationCode: ''})
                    jwt.sign({id: user._id}, config.SECRET_KEY, (error, token) => {
                        response.status(201).json({
                            message: 'Email is confirmed!',
                            success: true,
                            payload: {
                                token,
                                id: user._id
                            }
                        })
                    })
                } else {
                    response.status(409).json({
                        errors: [
                            {
                                param: 'username',
                                msg: 'Wrong verification code!'
                            }
                        ],
                        success: false
                    })
                }
            }
        } catch (error) {
            response.status(500).json({error})
        }
    },

    async SingIn(request, response) {
        const {email, password} = request.body
        const errors = request.validationErrors()

        if (errors) {
            response.status(422).json({errors})
        } else {
            try {
                const user = await User.findOne({email})

                if (!user) {
                    response.status(404).json({
                        errors: [{
                            param: 'email',
                            msg: 'Wrong email or password!'
                        }],
                        success: false
                    })
                } else {
                    const isPasswordValid = bcrypt.compareSync(password, user.password)

                    if (!isPasswordValid) {
                        response.status(401).json({
                            errors: [{
                                param: 'password',
                                msg: 'Wrong email or password!'
                            }],
                            success: false
                        })
                    } else {
                        jwt.sign({...user}, config.SECRET_KEY, (error, token) => {
                            if (error) {
                                response.status(403).json('Forbidden')
                            } else {
                                response.status(200).json({
                                    message: 'Sing In is successful',
                                    success: true,
                                    payload: {
                                        token,
                                        id: user._id,
                                        username: user.username,
                                        email: user.email,
                                        active: user.active
                                    }
                                })
                            }
                        })
                    }
                }
            } catch (error) {
                response.status(500).json({error})
            }
        }
    }
}
