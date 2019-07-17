var exports = module.exports = {}
var Model = require('../models');
let { PythonShell } = require('python-shell');
var Sequelize = require('sequelize');
var log = require('../util/log')
var filiere = [];

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

async function getChoices(filiere, type, year, cb) {
    const Op = Sequelize.Op;
    this.filiere = filiere;
    choices = await Model.Project.findAll({
        where: {
            //TypeName: type,
            State: 'Concours',
            Year: year
        },
        include: [
            {
                model: Model.Affiliated,
                as: 'Section',
                where: {
                    SectionName: filiere
                },
                attributes: {
                    exclude: ['ProjectID', 'SectionName']
                },
            },
            {
                model: Model.Choices,
                as: 'Choices',
                attributes: {
                    exclude: ['ProjectID']
                },
            },
            {
                model: Model.InCharge,
                as: 'ReponsableInterne',
                attributes: {
                    exclude: ['ProjectID']
                }
            }
        ],
        exclude: [
            {
                model: Model.User,
                as: 'Student'
            }
        ],
        attributes: {
            exclude: ['Title', 'Description', 'Abreviation', 'State', 'Year', 'ClientName', 'Language', 'Public', 'TypeName'],
        },
        raw: true,
        order: Sequelize.literal('rand()')
    })
    //-------------------------------------------------------------
    allProjectAlreadyAssigned = await Model.Project.findAll({
        where: {
            TypeName: type,
            Year: year
        },
        include: [
            {
                model: Model.User,
                as: 'Student',
                where: {
                    ProjectID_Assigned: {
                        [Op.not]: null
                    }
                },
                attributes: [],
            },
        ],
        attributes: ['ID', 'UserID_Owner'],
        raw: true,
        order: Sequelize.literal('rand()')
    })
    //-------------------------------------
    let profData = [];
    let projectData = [];
    let choiceData = [];
    let choiceDataWOHeader = [];
    let studentData = [];



    choices.forEach(choice => {
        // GENERATE PROJECT MATRIX
        if (!isItemInArray(projectData, [choice['ID'], choice['NbrMaxStudent'], choice['UserID_Owner'], choice['ReponsableInterne.UserID']])) {
            // not in projectData
            projectData.push([choice['ID'], choice['NbrMaxStudent'], choice['UserID_Owner'], choice['ReponsableInterne.UserID']])
        }
        //GENERATE STUDENT MATRIX
        if (!isItemInArray(studentData, [choice['Choices.UserID'], choice['NbrMaxStudent']])) {
            studentData.push([choice['Choices.UserID'], 1])
        }
        //GENERATE TEACHER MATRIX BLANK
        if (!isItemInArray(profData, [choice['UserID_Owner'], 0])) {
            profData.push([choice['UserID_Owner'], 0])
        }
    })
    // Link number of project per teacher in teacher matrix
    allProjectAlreadyAssigned.forEach(project => {
        if (profData[project['UserID_Owner']] !== undefined) { // can happen if no student has choosen any project of that specific teacher
            profData[project['UserID_Owner']][1]++
        }
    })

    // GENERATE CHOICE MATRIX
    // first row of choices data
    allStudent = []
    allStudent.push(0);
    studentData.forEach(stu => {
        allStudent.push(stu[0] * 1.0);
    })
    choiceData.push(allStudent);
    //first col + empty choices data
    choicesEmpty = [];
    for (var i = 0; i < studentData.length; i++) choicesEmpty.push(0.0);
    projectData.forEach(prj => {
        choiceData.push([prj[0] * 1.0].concat(choicesEmpty));
        choiceDataWOHeader.push([].concat(choicesEmpty));
    })
    // from here choicesdata has the correct 1st row and 1st col, all choices are at 0
    // set choices weight values
    choices.forEach(choice => {
        usrID = choice['Choices.UserID'];
        projID = choice['ID'];
        indexUserIDX = choiceData[0].indexOf(usrID);
        indexProjectIDY = -1;
        searchIndex: for (var i = 0; i < choiceData.length; i++) {
            if (choiceData[i][0] === projID) {
                indexProjectIDY = i;
                break searchIndex;
            }
        }
        choiceData[indexProjectIDY][indexUserIDX] = choice['Choices.Weight']
        choiceDataWOHeader[(indexProjectIDY - 1)][(indexUserIDX - 1)] = choice['Choices.Weight']

    })
    cb(projectData, studentData, choiceData, choiceDataWOHeader, profData, choiceData)
}

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;   // Found it
        }
    }
    return false; // Not found
}


async function formatresult(codetoSend, resultMatrix, resultCode, res, choiceData) {
    resultDataMatrix = []
    var listIdStudent = [];
    var listIdProject = [];
    var listChoiceValue = [];
    for (let r = 0; r < resultMatrix.length; r++) {
        for (let c = 0; c < resultMatrix[r].length; c++) {
            if (resultMatrix[r][c] > 9) {
                //listPerProject[choiceData[0][c + 1]] = choiceData[r + 1][0]
                listIdStudent.push(choiceData[0][c + 1]);
                listIdProject.push(choiceData[r + 1][0]);
                listChoiceValue.push(choiceData[r + 1][c + 1]);
                //[projectID, projectName?, StudentID, StudentName?, TeacherName?, choiceValue]
                resultDataMatrix.push([choiceData[r + 1][0], "", choiceData[0][c + 1], "", "", choiceData[r + 1][c + 1]])

            }
        }
    }
    resultDataMatrix = await completeData(resultDataMatrix);
    resultDataMatrix = await completeUnAttrStudent(resultDataMatrix, listIdStudent);
    res.status(codetoSend).send(resultDataMatrix)
}

async function completeUnAttrStudent(resultDataMatrix, listIdStudent) {
    //[projectID, projectName?, StudentID, StudentName?, TeacherName?, choiceValue]
    const Op = Sequelize.Op;
    missingStudent = await Model.Choices.findAll({
        where: {
            'UserID': {
                [Op.notIn]: listIdStudent
            }
        },
        include: [{
            model: Model.User,
            as: 'StudentChoice',
            attribute: ['FirstName', 'Name'],
            where: {
                SectionName: {
                    [Op.in]: this.filiere
                },
                ProjectID_Assigned: null
            }
        }],
        attributes: [
            // specify an array where the first element is the SQL function and the second is the alias
            [Sequelize.fn('DISTINCT', Sequelize.col('UserID')), 'UserID'],

        ],
        raw: true
    })
    resultMatrixWithMissingStudent = await Promise.all(missingStudent.map(async function (entry) {
        return [null, null, entry.UserID, (entry['StudentChoice.FirstName'] + ' ' + entry['StudentChoice.Name']), 'No project found', 0]
    }));
    return resultDataMatrix.concat(resultMatrixWithMissingStudent);
}

async function completeData(resultDataMatrix) {
    //[projectID, projectName?, StudentID, StudentName?, TeacherName?, choiceValue]
    var entryWithPrjectName = await Promise.all(resultDataMatrix.map(async function (entry) {
        project = await Model.Project.findOne({
            where: {
                ID: entry[0]
            },

            include: [{
                model: Model.User,
                as: 'Owner',
                attribute: ['FirstName', 'Name']
            }],
            attributes: ['Title'],
            raw: true
        })
        entry[1] = project.Title;
        entry[4] = (project['Owner.FirstName'] + " " + project['Owner.Name'])
        return entry;
    }))
    var entryWithStdName = await Promise.all(entryWithPrjectName.map(async function (entry) {
        student = await Model.User.findOne({
            where: {
                ID: entry[2]
            },
            attributes: ['FirstName', 'Name'],
            raw: true
        })
        entry[3] = (student.FirstName + " " + student.Name);
        return entry;
    }))
    return entryWithStdName;
}

exports.attribution = async function (filiere, type, year, res, newtoken) {
    function callPython(projects, students, choices, data, profs, choiceData) {
        const nbOfProjects = choices.length - 1;
        const nbOfStudents = choices[0].length - 1;
        const nbOfProfs = profs.length;
        // Get max per project
        const pmax = projects.map(function (x) {
            return x[0]
        });

        // Get max per student
        const smax = students.map(function (x) {
            return x[0]
        });
        // Get already assigned projects
        var alreadyAssigned = {};
        profs.forEach(function (pair) {
            alreadyAssigned[pair[0]] = pair[1];
        });

        var randomp = Array(nbOfProjects);
        for (var i = 0; i < nbOfProjects; i++) randomp[i] = i;
        randomp = shuffle(randomp);

        var randoms = Array(nbOfStudents);
        for (var i = 0; i < nbOfStudents; i++) randoms[i] = i;
        randoms = shuffle(randoms);

        let optionsPy = {
            mode: 'text',
            pythonPath: 'C:\\Python27\\python.exe',
            //pythonPath: '/usr/bin/python2.7',
            scriptPath: __dirname,
            args: [JSON.stringify(randomp), JSON.stringify(randoms), JSON.stringify(data), JSON.stringify(smax), JSON.stringify(pmax), nbOfStudents, nbOfProjects]
        };
        let pyshell = new PythonShell('algo.py', optionsPy);

        let codetoSend = 0;
        let resultCode = 0;
        let resultMatrix = [];
        pyshell.on('message', function (message) {
            if (message.indexOf('.') > -1) {
                resultCode = parseFloat(message)
            } else if (message.indexOf("aa") > -1) {
                resultMatrix = JSON.parse(message.slice(2))
            } else {
                switch (message) {
                    case 'True':
                        codetoSend = 200;
                        break;
                    case 'False':
                        codetoSend = 450;
                        break;
                    default:
                        log.log('error', message + " is received from python and not threated")
                }
            }
        });

        pyshell.end(function (err, code, signal) {
            formatresult(codetoSend, resultMatrix, resultCode, res, choiceData)
            if (err) log.log('error', err);
        });
    }

    await getChoices(filiere, type, year, callPython)
}

exports.SaveAttribution = async function (attributionMatrix, res, newtoken) {
    try {
        attributionMatrix.forEach(async (entry) => {
            await Model.User.update(
                { ProjectID_Assigned: entry[1] },
                {
                    where: {
                        ID: entry[0]
                    }
                }
            )
            await Model.Project.update(
                { State: 'ATTRIBUE' },
                {
                    where: {
                        ID: entry[1]
                    }
                }
            )
        })
    } catch (e) {
        res.status(450).send(e + "couldnt attribute everithing")
        log.log('error', e)
    }
    res.status(200).send();
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}