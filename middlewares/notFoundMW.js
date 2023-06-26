module.exports = (request, response) => {
    response.status(404).json({ message: "PAGE NOT FOUND" })
}