import 'dotenv/config'
import jwt from 'jsonwebtoken'
import {verify, sign} from jwt

function createToken(user){
    return sign(
        {
            emailAddress: user.emailAddress,
            userPassword: user.userPassword
        },
        process.env.SECRETE_KEY,
        {
            expireIn: '1hr'
        }
    )
}

function verifyToken(req, res, next){
    const token = req?headers["authorization"]:null
    if(token){
        if(verify(token, process.env.SECRETE_KEY)){
            next()
        }else{
            res.json({
                status: res.statusCode,
                msg: 'Please provide the correct credentials'
            })
        }
    }else{
        res.json({
            status: res.statusCode,
            msg: 'Log in first'
        })
    }
}

export {createToken, verifyToken}