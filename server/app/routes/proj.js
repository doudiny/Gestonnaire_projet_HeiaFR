//var authController = require('../controllers/authCtrl');
var util = require('../util/util')
var jwt = require('jsonwebtoken');
var log = require('../util/log')
var Model = require('../models');
var Sequelize = require('sequelize')


module.exports = function (app, passport) {

    // GET request on /api/aroundInfo
    app.get('/api/aroundInfo', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            // FOR TESTING
            if (myToken !== "testingToken") {
                var decoded = jwt.verify(myToken, 'secret'); // this line is needed out of testing too
            } else if (myToken === "testingTokenNotPermitted") {
                var decoded = {
                    role: "Etudiant",
                    id: 1
                }
            } else {
                var decoded = {
                    role: "Responsable",
                    id: 6
                }
            }
            //END FOR TESTING
            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                sections = await Model.Section.findAll();
                types = await Model.Type.findAll();
                res.status(200).send(
                    {
                        token: newtoken,
                        role: newtoken.role,
                        sections: sections,
                        types: types
                    }
                );
            } else {
                log.log('warning', 'role note permitted for getting info from DB')
                res.status(420).send({ error: 'role not permitted' });
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }
    });


    // GET request on /api/studentSearch
    app.get('/api/studentSearch', (req, res, next) => {
        const Op = Sequelize.Op;
        try {
            var myToken = req.headers.token.slice(7);
            // FOR TESTING
            if (myToken !== "testingToken") {
                var decoded = jwt.verify(myToken, 'secret'); // this line is needed out of testing too
            } else if (myToken === "testingTokenNotPermitted") {
                var decoded = {
                    role: "Etudiant",
                    id: 1
                }
            } else {
                var decoded = {
                    role: "Responsable",
                    id: 6
                }
            }
            //END FOR TESTING
            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                Model.User.findAll({
                    where: {
                        Role: 'Etudiant',
                        ProjectID_Assigned: null,
                        [Op.or]: [
                            {
                                Name: {
                                    [Op.like]: '%' + req.headers.search + '%'
                                }
                            },
                            {
                                FirstName: {
                                    [Op.like]: '%' + req.headers.search + '%'
                                }
                            }
                        ]
                    },
                    limit: 5
                }).then(students =>
                    res.status(200).send(
                        {
                            token: newtoken,
                            role: newtoken.role,
                            students: students
                        }

                    )
                )

            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for student research')
            }
        } catch (err) {
            res.status(420).send(err);
            log.log('error', err)
        }

    });


    // GET request on /api/respSearch
    app.get('/api/respSearch', (req, res, next) => {
        const Op = Sequelize.Op;
        try {
            var myToken = req.headers.token.slice(7);
            // FOR TESTING
            if (myToken !== "testingToken") {
                var decoded = jwt.verify(myToken, 'secret'); // this line is needed out of testing too
            } else if (myToken === "testingTokenNotPermitted") {
                var decoded = {
                    role: "Etudiant",
                    id: 1
                }
            } else {
                var decoded = {
                    role: "Responsable",
                    id: 6
                }
            }
            //END FOR TESTING

            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                Model.User.findAll({
                    where: {
                        [Op.or]: [
                            {
                                Name: {
                                    [Op.like]: '%' + req.headers.search + '%'
                                },
                                [Op.or]: [
                                    {
                                        Role: 'Professeur'
                                    },
                                    {
                                        Role: 'Responsable'
                                    }
                                ]
                            },
                            {
                                FirstName: {
                                    [Op.like]: '%' + req.headers.search + '%'
                                },
                                [Op.or]: [
                                    {
                                        Role: 'Professeur'
                                    },
                                    {
                                        Role: 'Responsable'
                                    }
                                ]
                            }
                        ]
                    },
                    limit: 5
                }).then(resps =>
                    res.status(200).send(
                        {
                            token: newtoken,
                            role: newtoken.role,
                            resp: resps
                        }
                    )
                )

            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for researching responsible')
            }
        } catch (err) {
            res.status(420).send(err);
            log.log('error', err)
        }

    });

    // GET request on /api/externeSearch
    app.get('/api/externeSearch', (req, res, next) => {
        const Op = Sequelize.Op;
        try {
            var myToken = req.headers.token.slice(7);
            // FOR TESTING
            if (myToken !== "testingToken") {
                var decoded = jwt.verify(myToken, 'secret'); // this line is needed out of testing too
            } else if (myToken === "testingTokenNotPermitted") {
                var decoded = {
                    role: "Etudiant",
                    id: 1
                }
            } else {
                var decoded = {
                    role: "Responsable",
                    id: 6
                }
            }
            //END FOR TESTING

            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                Model.Externe.findAll({
                    where: {
                        Name: {
                            [Op.like]: '%' + req.headers.search + '%'
                        },
                    },
                    limit: 5,
                    attributes: {
                        exclude: 'PhoneNumber'
                    }
                }).then(externes =>
                    res.status(200).send(
                        {
                            token: newtoken,
                            role: newtoken.role,
                            externes: externes
                        }
                    )
                )

            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for researching externe')
            }
        } catch (err) {
            // token error
            res.status(420).send(err);
            log.log('error', err)
        }

    });

    //POST on /api/newExterne to create a new externe
    app.post('/api/newExterne', (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');

            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                log.log('info', 'user ' + decoded.id + ' is creating a new externe')
                var externeToSave = JSON.parse(req.body.externe)
                Model.Externe.create(externeToSave).then(() =>
                    res.status(200).send(
                        JSON.stringify({
                            token: newtoken,
                            role: newtoken.role,
                        }
                        )
                    )
                )

            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for creating extern')
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }

    });

    // GET request on /api/expertSearch
    app.get('/api/expertSearch', (req, res, next) => {
        const Op = Sequelize.Op;
        try {
            var myToken = req.headers.token.slice(7);
            // FOR TESTING
            if (myToken !== "testingToken") {
                var decoded = jwt.verify(myToken, 'secret'); // this line is needed out of testing too
            } else if (myToken === "testingTokenNotPermitted") {
                var decoded = {
                    role: "Etudiant",
                    id: 1
                }
            } else {
                var decoded = {
                    role: "Responsable",
                    id: 6
                }
            }
            //END FOR TESTING

            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                Model.Expert.findAll({
                    where: {
                        [Op.or]: [
                            {
                                Name: {
                                    [Op.like]: '%' + req.headers.search + '%'
                                }
                            },
                            {
                                FirstName: {
                                    [Op.like]: '%' + req.headers.search + '%'
                                }
                            }
                        ]
                    },
                    limit: 5,
                    attributes: {
                        exclude: ['PhoneNumber', 'Email']
                    }
                }).then(experts =>
                    res.status(200).send(
                        {
                            token: newtoken,
                            role: newtoken.role,
                            experts: experts
                        }
                    )
                )

            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for researching experts')
            }
        } catch (err) {
            res.status(420).send(err);
            log.log('error', 'err')
        }

    });


    // GET request on /api/tagSearch
    app.get('/api/tagSearch', (req, res, next) => {
        const Op = Sequelize.Op;
        try {
            var myToken = req.headers.token.slice(7);
            // FOR TESTING
            if (myToken !== "testingToken") {
                var decoded = jwt.verify(myToken, 'secret'); // this line is needed out of testing too
            } else if (myToken === "testingTokenNotPermitted") {
                var decoded = {
                    role: "Etudiant",
                    id: 1
                }
            } else {
                var decoded = {
                    role: "Responsable",
                    id: 6
                }
            }
            //END FOR TESTING

            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                Model.KeyWords.findAll({
                    where: {
                        Word: {
                            [Op.like]: '%' + req.headers.search + '%'
                        },
                    },
                    limit: 5,
                }).then(tags =>
                    res.status(200).send(
                        {
                            token: newtoken,
                            role: newtoken.role,
                            tags: tags
                        }
                    )
                )

            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for researching tags')
            }
        } catch (err) {
            res.status(420).send(err);
            log.log('error', err)
        }

    });

    //POST on /api/newProject to create a new project
    app.post('/api/newProject', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');

            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                log.log('info', 'user ' + decoded.id + ' is creating a new projects')
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                var UserID_Owner = decoded.id;
                // var to save
                var projToSave = JSON.parse(req.body.newProject);       //ok
                var filiereUpdater = req.body.filiereUpdater;           //ok
                var studentUpdater = req.body.studentUpdater;           //ok
                var respInterneUpdater = req.body.respInterneUpdater    //ok
                var expertsUpdater = req.body.expertsUpdater;           //ok
                var respExterneUpdater = req.body.respExterneUpdater;   //ok
                var tagUpdater = req.body.tagUpdater;                   //ok
                var linkUpdater = req.body.linkUpdater;                 //NON

                // get the student to be updated
                const students = await studentUpdater.map(stu => Model.User.findAll({
                    where: {
                        ID: stu.ID,
                        ProjectID_Assigned: null // pour éviter de réatribuer un élève, normalement devrait pas arriver mais on sait jamais
                    },
                    plain: true
                }))

                // création des tags inexistants
                const tags = await tagUpdater.map(async tag => await Model.KeyWords.findOrCreate({
                    where: {
                        Word: tag.KeyWordsWord
                    }
                }))
                // création des liens inexistants
                const links = await linkUpdater.map(l => Model.LinkAndRef.findOrCreate({
                    where: {
                        Link: l.LinkAndRefID
                    }
                }))
                projToSave.UserID_Owner = UserID_Owner;
                //ok
                projToSave.Section = filiereUpdater;
                projToSave.ReponsableInterne = respInterneUpdater;
                projToSave.ResponsableExterne = respExterneUpdater;
                projToSave.Expert = expertsUpdater;
                await Promise.all(tags, links)
                projToSave.KeyWord = tagUpdater;
                projToSave.Link = linkUpdater;
                //to be verified
                //
                Model.Project.create(projToSave, {
                    include: [
                        {
                            model: Model.Affiliated,
                            as: 'Section',
                        },
                        {
                            model: Model.InCharge,
                            as: 'ReponsableInterne',
                        },
                        {
                            model: Model.ExpertPerProject,
                            as: 'Expert',
                        },
                        {
                            model: Model.Externe_Project,
                            as: 'ResponsableExterne',
                        },
                        {
                            model: Model.KeyWordsByProject,
                            as: 'KeyWord',
                        },
                        {
                            model: Model.LinkAndRefByProject,
                            as: 'LinkAndRefByProjects',
                        },
                    ]
                })
                    .then((savedProject) => {
                        // liaison avec les user (les student) en éditant leur fk du projet
                        Promise.all(students).then(readedStudent => savedProject.setStudent(readedStudent))
                        res.status(200).send(savedProject)
                    }).catch(Sequelize.ValidationError, (err) => {
                        log.log("error", err)
                        res.status(430).send(
                            JSON.stringify({
                                token: newtoken,
                                role: decoded.role,
                            })
                        )
                    })


            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for creating a project')
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }
    });


    //PUT on /api/updateProjects to change the state of a list of projects
    app.put('/api/updateProjects', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');
            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                var projectsToUpdate = req.body.projects
                var nextState = req.body.nextState
                log.log('info', 'user ' + decoded.id + ' is is changing the state of the projects ' + projectsToUpdate + ' to ' + nextState)
                await Model.Project.update(
                    { State: nextState },
                    {
                        where: {
                            ID: projectsToUpdate,
                        }
                    }
                )
                res.status(200).send(JSON.stringify({
                    token: newtoken,
                    role: decoded.role,
                }));
            } else {
                res.status(420).send();
                log.log('warning', 'Role not permitted for putting projects to state ' + nextState)
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }

    });


    //PUT on /api/addToChoices to change the state of a list of projects
    app.put('/api/addToChoices', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');
            if (decoded.role === "Etudiant" || decoded.role === "Responsable") { //--------- enlever responsable
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                var projectsToAddTOChoices = req.body
                log.log('info', 'student ' + decoded.id + ' is adding ' + projectsToAddTOChoices + ' to his choices')
                await Model.Choices.bulkCreate(projectsToAddTOChoices)
                res.status(200).send(JSON.stringify({
                    token: newtoken,
                    role: decoded.role,
                }));
            } else {
                res.status(420).send('Role not permitted for adding choices');
                log.log('warning', 'Role not permitted for adding choices')
            }
        } catch (err) {
            if (err.errors[0].message === 'PRIMARY must be unique') {
                res.status(201).send("already in choices")
            } else {
                res.status(420).send(err);
            }
            log.log('error', err)
        }

    });

    //PUT on /api/updateChoices to change the state of a list of projects
    app.put('/api/updateChoices', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');
            if (decoded.role === "Etudiant") { 
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                var projectsToUpdateChoices = req.body
                log.log('info', 'student ' + decoded.id + ' is changing is choices : ' + projectsToUpdateChoices)
                var promises = [];
                projectsToUpdateChoices.forEach(function (choice) {
                    promises.push(Model.Choices.update(
                        { Weight: choice.Weight },
                        {
                            where:
                            {
                                ProjectID: choice.ProjectID,
                                UserID: choice.UserID
                            }
                        }))
                });
                Promise.all(promises).then(function () {
                    res.status(200).send(JSON.stringify({
                        token: newtoken,
                        role: decoded.role,
                    }));
                }, function (err) {
                    res.status(450).send('Error on saving your choices');
                    log.log('error', err)
                });

            } else {
                res.status(420).send('Role not permitted for adding choices');
                log.log('warning', 'Role not permitted for adding choices')
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }

    });

    //DELETE on /api/deleteProjects to delete  list of prjects, including all references
    app.delete('/api/deleteProjects', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');
            if (decoded.role === "Professeur" || decoded.role === "Responsable") {
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                var projectsToDelete = req.body.projects
                log.log('info', 'user ' + decoded.id + ' is cdeleting his projects : ' + projectsToDelete)
                // delete ref on user assigned
                await Model.User.update(
                    { ProjectID_Assigned: null },
                    {
                        where: {
                            ProjectID_Assigned: projectsToDelete,
                        }
                    }
                )
                //delete in the linked table
                await Model.ExpertPerProject.destroy({
                    where: {
                        ProjectID: projectsToDelete
                    }
                })
                await Model.Externe_Project.destroy({
                    where: {
                        ProjectID: projectsToDelete
                    }
                })
                await Model.KeyWordsByProject.destroy({
                    where: {
                        ProjectID: projectsToDelete
                    }
                })
                await Model.LinkAndRefByProject.destroy({
                    where: {
                        ProjectID: projectsToDelete
                    }
                })
                await Model.Affiliated.destroy({
                    where: {
                        ProjectID: projectsToDelete
                    }
                })
                await Model.InCharge.destroy({
                    where: {
                        ProjectID: projectsToDelete
                    }
                })
                // delete the projects 
                await Model.Project.destroy({
                    where: {
                        ID: projectsToDelete
                    }
                })
                res.status(200).send(JSON.stringify({
                    token: newtoken,
                    role: decoded.role,
                }));
            } else {
                res.status(420).send('Role not permitted for deleting projects');
                log.log('warning', 'Role not permitted for deleting projects')
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }

    });

    //DELETE on /api/deleteChoices to delete the student's choices
    app.delete('/api/deleteChoices', async (req, res, next) => {
        try {
            var myToken = req.headers.token.slice(7);
            var decoded = jwt.verify(myToken, 'secret');
            if (decoded.role === "Etudiant" ) {  
                var newtoken = util.generateNewToken(decoded.id, decoded.role)
                var projectsToDelete = req.body.projects
                log.log('info', 'student ' + decoded.id + ' is deleting his chocies : ' + projectsToDelete)
                // delete the chocies 
                await Model.Choices.destroy({
                    where: {
                        ProjectID: projectsToDelete
                    }
                })
                res.status(200).send(JSON.stringify({
                    token: newtoken,
                    role: decoded.role,
                }));
            } else {
                res.status(420).send('Role not permitted for deleting choices');
                log.log('warning', 'Role not permitted for deleting choices')
            }
        } catch (err) {
            log.log('error', err)
            res.status(420).send(err);
        }

    });
}

