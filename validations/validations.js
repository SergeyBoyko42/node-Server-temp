import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
    body('fullName', 'Имя должно быть миниум 3 символа').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),

]
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
]

export const PostCreateValidation = [
    body('title', 'Введите заголовок').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст татьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тегов').optional().isString(),
    body('imageUrl', 'Неправильныя ссылка на изображение').optional().isString(),

]