export const validateDocumentsSchemas = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (e) {
        return res.status(400).json(e)
    }
}