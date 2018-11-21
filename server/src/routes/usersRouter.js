import { Router } from 'express'
import bcrypt from 'bcrypt-nodejs'
import emailValidator from 'email-validator'
import User from '../models/usersSchema'


const route = Router()

route.post('/register', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm
    const age = req.body.age
    const sex = req.body.sex
    const country = req.body.country
    const city = req.body.city

    if (!username || !email || !password || !passwordConfirm || !age || !sex || !country || !city) {
        res.json({
            ok: false,
            error: 'All field must be required!',
            fields: ['username', 'email', 'password', 'passwordConfirm', 'age', 'sex', 'country', 'city']
        })
    } else if (username.length < 3 || username.length > 16) {
        res.json({
            ok: false,
            error: 'Username length must be from 3 to 6 characters!',
            fields: ['username']
        })
    } else if(!/^[a-zA-Z0-9]+$/.test(username)) {
        res.json({
            ok: false,
            error: 'Only latin letters!',
            fields: ['username']
        })
    } else if (passwordConfirm !== password) {
        res.json({
            ok: false,
            error: 'Passwords do not match!',
            fields: ['password', 'passwordConfirm']
        })
    } else if (password.length < 8) {
        res.json({
            ok: false,
            error: 'The minimum password length is 8 characters!',
            fields: ['password', 'passwordConfirm']
        })
    } else if (!emailValidator.validate(email)) {
        res.json({
            ok: false,
            error: 'Email entered incorrectly!',
            fields: ['email']
        })
    } else {

        User.findOne({
            email
        }).then(mail => {
            if(!mail) {
                bcrypt.hash(password, null, null, (err, hash) => {
                    User.create({
                        username,
                        email,
                        password: hash,
                        age,
                        sex,
                        country,
                        city
                    }).then(user => {
                        console.log(user)
                        res.json({
                            ok: true
                        })
                    }).catch(err => {
                        console.log(err)
                        res.json({
                            ok: false,
                            error: 'Error!, something wrong'
                        })
                    })
                })
            } else {
                res.json({
                    ok: false,
                    error: 'this email is already taken',
                    fields: ['email']
                })
            }
        }).catch(err => {
            console.log(err)
            res.json({
                ok: false,
                error: 'Error!, something wrong'
            })
        })

    }
})

module.exports = route