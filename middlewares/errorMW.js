module.exports = (error, request, response, next) => {
    response.status(error.status ?? 500).json({ message: `${error}` })
}   