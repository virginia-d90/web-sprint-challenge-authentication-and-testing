const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const secret = process.env.SECRET_JWT || "secret"

    if(token){
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                res.status(401).json({error: true, message: "recieved an invalid token"})
            }else{
                req.token = decoded
                next()
            }
        })
    } else {
        res.status(401).json({error:true, message:"no token found"})
    }
}


