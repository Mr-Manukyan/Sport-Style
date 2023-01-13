module.exports = (res, error, errorMessage) => {

 res.status(500).json({
    success : false,
    message : errorMessage ? errorMessage : error.message ,
    resultCode: 500
 })
}