export default (res, req, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.ststus(400).json(errors.array())
    }
    next()
}