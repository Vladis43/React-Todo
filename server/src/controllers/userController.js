import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import randomstring from 'randomstring'
import config from '../config/database'
import User from '../models/User'
import mailer from '../misc/mailer'


module.exports = {
    async SignUp(request, response) {
        const {username, email} = request.body
        const errors = request.validationErrors()
        const verificationCode = randomstring.generate({length: 6, charset: 'numeric'})

        try {
            if (errors) {
                response.status(422).json({errors})
            } else {
                const isUsername = await User.findOne({username})

                if (isUsername) {
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
                    const isEmail = await User.findOne({email})

                    if (isEmail) {
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
                        User.create({
                            ...request.body,
                            password: bcrypt.hashSync(request.body.password),
                            verificationCode
                        }, (error, user) => {
                            if (error) {
                                response.status(409).json({error})
                            } else {
                                jwt.sign({id: user._id}, config.SECRET_KEY, (error, token) => {
                                    response.status(201).json({
                                        message: 'Sing Up is successful',
                                        success: true,
                                        payload: {
                                            token,
                                            id: user._id,
                                            username: user.username,
                                            email: user.email
                                        }
                                    })
                                })
                            }
                        })

                        //Compose an email
                        const html = `
                            Hi there,
                            <br/>
                            Thank you for registering in Todo application!
                            <br/><br/>
                            Please verify your email:
                            <br/>
                            Code: <b>${verificationCode}</b>
                            `;

                        //Send the email
                        mailer.sendEmail('admin@todo.com', email, 'Please, verify your email!', html)
                    }
                }
            }
        } catch (error) {
            response.status(500).json({error})
        }
    },

    async Verification(request, response) {
        const verificationCode = request.params.vCode

        try {
            const user = await User.findOneAndUpdate({verificationCode}, {active: true, verificationCode: ''})

            if (!user) {
                response.status(404).json({
                    errors: [
                        {
                            param: 'verificationCode',
                            msg: 'Wrong verification code!'
                        }
                    ],
                    success: false
                })
            } else {
                await user.save()
                response.status(201).json({
                    message: 'Email confirmed!',
                    success: true
                })
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
                    const validPassword = bcrypt.compareSync(password, user.password)

                    if (!validPassword) {
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
