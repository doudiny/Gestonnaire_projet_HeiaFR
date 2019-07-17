var respActionController = require('../controllers/respActionCtrl');
var util = require('../util/util')
var log = require('../util/log')
var jwt = require('jsonwebtoken');
var Model = require('../models');

module.exports = function (app) {

    // POST request on /api/executeAttribution
    app.post('/api/executeAttribution', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');

            if (decoded.role === "Responsable") {
                log.log('info', 'dean ' + decoded.id + ' is executing the attribution')
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                var filiere = req.body.filiere;
                var type = req.body.type;
                var year = req.body.year;
                respActionController.attribution(filiere, type, year, res, newtoken);

            } else {
                res.status(420).send();
                log.log('warning', 'starting the attribution')
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }
    });

    // POST request on /api/saveAttribution
    app.post('/api/saveAttribution', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');

            if (decoded.role === "Responsable") {
                log.log('info', 'dean ' + decoded.id + ' is saving the attribution')
                var attributionMatrix = req.body.attributionMatrix;
                respActionController.SaveAttribution(attributionMatrix, res, newToken);
            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for saving the attribution')
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }
    });
}