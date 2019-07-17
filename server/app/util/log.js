var exports = module.exports = {}
const log = require('log-to-file');
const logfile = __dirname +  '/log.txt'
// importnce -> warn, error, info
exports.log = function(importance, message) { 
    log('[' +importance + '] ' + message, logfile);
}
