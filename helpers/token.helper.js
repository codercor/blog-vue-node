const jwt = require('jsonwebtoken');

console.log(process.env.TOKEN_PRIVATE_KEY);

const generateToken = (payload,expiresIn)=>{
    const token = jwt.sign({...payload}, process.env.TOKEN_PRIVATE_KEY,{expiresIn});
    return token
}



module.exports = {
    generateToken
}