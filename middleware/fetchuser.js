var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Shivam123Secured'


const fetchuser = (req, res,next) => {
    // get the user from the jwt token and add id to req object
    //bringing token from header
    const token = req.header('auth-token');
    
    if(!token){
        //401 == access denied
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
   

  

}




module.exports = fetchuser;