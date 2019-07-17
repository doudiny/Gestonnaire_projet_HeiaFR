var exports = module.exports = {}
var jwt = require('jsonwebtoken');
var secret2 = "mysecret420Yeaahhhh)dsnif23jbsj"
var secret = 'secret'

exports.verifyToken = function(token, roleNeeded) {
    
}

exports.generateNewToken = function(id,role){
    return jwt.sign({ id: id, role: role}, secret, { expiresIn: '1h' });
}