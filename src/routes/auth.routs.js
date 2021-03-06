const {Router} = require('express')
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const config = require("config")
const bcrypt = require('bcrypt')

const router = Router()

router.post(
    '/register',
    [
        check('email', "Некорректный email").isEmail(),
        check('password', "Минимальная длина пароля 6 символов!").isLength({min: 6})
    ],
    async (req, res) => {
    try{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                massage: "Некорректные данные при регистрации!"
            })
        }


        const {email, password} = req.body


        const candidate = await User.findOne({email})


      

        if(candidate){
           return res.status(400).json({massage: "Такой пользователь уже существует!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
 
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({massage: "Пользователь создан!"})
    } catch(e){
        res.status(500).json({"massage": "Возникла ошибка на сервере"})
    }
})

router.post(
    '/login', 
    [
        check('email', "Введите корректный email").normalizeEmail().isEmail(),
        check('password', "Введите пароль!").exists()
    ],
    async (req, res) => {
    try{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                massage: "Некорректные данные при входе в систему!"
            })
        }
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
           return res.status(400).json({massage: "Пользователь не найден!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({massage: "Неверный пароль, пробуйте снова!"})
         }

         const token = jwt.sign(
             {userId: user.id},
             config.get('jwtSecret'),
             {expiresIn: '1h'}
         )

         res.json({token, userId: user.id})


    } catch(e){
        console.log(e)
        res.status(500).json({"massage": "Возникла ошибка на сервере"})
    }
})

module.exports = router