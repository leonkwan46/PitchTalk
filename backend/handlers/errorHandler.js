const errorHandler = (err, req, res, next) => {
    console.log('=================ERROR===================')
    console.log(err.message)
    console.log('====================================')
    return res.status(500).json({ message: err.message })
}

export default errorHandler