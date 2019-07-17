var authController = require('../controllers/authCtrl');
var util = require('../util/util')
var log = require('../util/log')
var jwt = require('jsonwebtoken');
var Model = require('../models');
const { Client } = require('ldapts');
var fs = require('fs');
const https = require("https");
var parseString = require('xml2js').parseString;

module.exports = function (app, passport) {

    // POST request on /api/login
    app.post('/api/login', async (req, res, next) => {
        const url = 'ldaps://ticolp01.hefr.ch';
        const binddn = 'cn=nisRead,ou=Special Users,ou=nis,o=tic';
        const bindpw = 'HZYWj1LokeHGFpNQm8z1';

        var login = req.body.login;
        var pswd = req.body.password;
        const userDN = 'uid=' + login + ',ou=sync,ou=People,ou=nis,o=tic';
        const userPW = pswd;

        const client = new Client({
            url,
            tlsOptions: {
                ca: [fs.readFileSync(__dirname + '/../util/HESSOFRCAG2.pem')]
            },
        });

        // verifiy auth for user
        let isAuthenticated;
        try {
            await client.bind(userDN, userPW);
            isAuthenticated = true;
        } catch (ex) {
            isAuthenticated = false;
            log.log('error', ex)
        } finally {
            await client.unbind();
        }

        if (!isAuthenticated) {
            res.status(420).send();
            log.log('warning', 'unable to authenticate user : ' +  userDN)
        } else {
            try {
                let user = await Model.User.findOne({
                    where: {
                        Login: login,
                    },
                })
                if (user === null) { // user not present in the system
                    await client.bind(binddn, bindpw);
                    const {
                        searchEntries
                    } = await client.search(userDN);

                    var id = searchEntries[0].employeeNumber;
                    var firstName = searchEntries[0].givenName;
                    var name = searchEntries[0].sn;
                    var email = searchEntries[0].mail;
                    var password = 'test';
                    var sectionName = 'Informatique'; 
                    https.get('https://webapps.hefr.ch/Axis_HEFR/services/HEFR_WS/userRequest?filter=(employeeNumber=' + id + ')', userdata => {
                        let body = '';
                        userdata.on('data', data => {
                            body += data.toString();
                        });
                        userdata.on("end", () => {
                            parseString(body, function (err, result) {
                                var attributArray = result['ns:userRequestResponse']['ns:return'][0]['result'][0]['entry'][0]['attributes'][0]['attribut'];
                                var roleGotten = attributArray[attributArray.length - 1]['value'][0];
                                var role;
                                switch (roleGotten) {
                                    case 'Etudiant':
                                        role = 'ETUDIANT';
                                        break;
                                    case 'Responsable de filière':
                                        role = 'RESPONSABLE';
                                        break;
                                    case 'Professeur':
                                        role = 'PROFESSEUR';
                                        break;
                                }
                                Model.User.findOrCreate(
                                    {
                                        where: {
                                            Name: name,
                                            FirstName: firstName,
                                            Email: email,
                                            Login: login,
                                            SectionName: sectionName,
                                            Role: role
                                        }
                                    }).then(([user, created]) => {
                                        log.log('info', ' user ' + user + ' logged in for the first time and get created in the DB');
                                        var token = util.generateNewToken(user.ID, user.Role);
                                        res.setHeader('Content-Type', 'application/json');
                                        res.status(200).send(
                                            {
                                                token: token,
                                                role: user.Role,
                                                name: (user.FirstName + " " + user.Name),
                                                id: user.ID
                                            }
                                        );
                                    });
                            });
                        });
                    });
                } else {
                    var token = util.generateNewToken(user.ID, user.Role);
                    //var token = util.generateNewToken(user.ID, 'Responsable');
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(
                        {
                            token: token,
                            role: user.Role,
                            //role: 'Responsable',
                            name: (user.FirstName + " " + user.Name),
                            id: user.ID
                        }
                    );
                }
            } catch (ex) {
                log.log('error', ex)
            } finally {
                await client.unbind();
            }
        }


    });
}