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
                const usernameExist = await User.findOne({username})

                if (usernameExist) {
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
                    const emailExist = await User.findOne({email})

                    if (emailExist) {
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
                                console.log(user)
                                jwt.sign({id: user._id}, config.SECRET_KEY, (error, token) => {
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
                        mailer.sendEmail('admin@todoapp.com', email, 'Please, verify your email!', html)
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
                const account = await User.findOne({email})

                if (!account) {
                    response.status(404).json({
                        errors: [{
                            param: 'email',
                            msg: 'User with such email not found!'
                        }],
                        success: false
                    })
                } else {
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
                        jwt.sign({...account}, config.SECRET_KEY, (error, token) => {
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
                                        username: account.username,
                                        active: account.active
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
