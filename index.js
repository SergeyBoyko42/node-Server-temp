import express from 'express'
import mongoose from 'mongoose'
import { registerValidation, loginValidation } from './validations/validations.js';
import checkAuth from './utils/checkAuth.js'

import * as PostController from './controllers/PostsController.js'
import * as UserController from './controllers/UserController.js'

import { PostCreateValidation } from './validations/validations.js'

import multer from 'multer'
import handleValidationErrors from './utils/handleValidationErrors.js';


mongoose.connect('mongodb+srv://seregaboyko10:03577773Grey@cluster0.ycov5.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('База данных подключена'))
    .catch(() => console.log('DB error', err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const ulpoad = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))


app.post('/uploads', checkAuth, ulpoad.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`,
    })
})

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)

app.post('/auth/register', handleValidationErrors, registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', checkAuth, PostController.getAll)

app.get('/posts:id', PostController.getOne)

app.post('/posts', checkAuth, PostCreateValidation, PostController.create)

app.delete('/posts/:id', checkAuth, PostController.remove)

app.patch('/posts/:id', PostCreateValidation, PostController.update)


app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Сервер запустился на порте 4000');
})
