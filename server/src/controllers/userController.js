import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import randomstring from 'randomstring'
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
                const userName = await User.findOne({username})

                if (userName) {
                    return response.status(409).json({
                        message: 'This username is already taken!',
                        success: false
                    })
                } else {
                    const user = await User.findOne({email})

                    if (user) {
                        return response.status(409).json({
                            message: 'This email is already taken!',
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
                    message: 'User not found!',
                    success: false
                })
            } else {
                if (verificationCode === user.verificationCode) {
                    await user.update({active: true, verificationCode: ''})
                    const payload = {
                        userId: user._id,
                        username: user.username
                    }
                    const token = jwt.sign({payload}, process.env.SECRET_KEY)

                    if (!token) {
                        response.status(403).json({message: 'Forbidden!'})
                    } else {
                        response.status(201).json({
                            message: 'Email is confirmed!',
                            success: true,
                            token
                        })
                    }
                } else {
                    response.status(409).json({
                        message: 'Wrong verification code!',
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
                        message: 'Wrong email or password!',
                        success: false
                    })
                } else {
                    const isPasswordValid = bcrypt.compareSync(password, user.password)

                    if (!isPasswordValid) {
                        response.status(401).json({
                            message: 'Wrong email or password!',
                            success: false
                        })
                    } else {
                        const payload = {
                            userId: user._id,
                            username: user.username,
                            active: user.active
                        }
                        const token = jwt.sign({payload}, process.env.SECRET_KEY)

                        if (!token) {
                            response.status(403).json({message: 'Forbidden!'})
                        } else {
                            response.status(200).json({
                                message: 'Sing In is successful',
                                success: true,
                                token
                            })
                        }
                    }
                }
            } catch (error) {
                response.status(500).json({error})
            }
        }
    }
}
