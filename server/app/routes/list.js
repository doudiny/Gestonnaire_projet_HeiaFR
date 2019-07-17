const Model = require('../models');
const Project = Model.Project
const Choices = Model.Choices
const Sequelize = require("sequelize")
const Op = Sequelize.Op
var log = require('../util/log')

//just for reference
var filters = {
  states: [],
  periods: [],
  sections: [],
  types: [],
  languages: [],
  owner: null,
  student: null
}

module.exports = function (app, passport) {
  app.post("/api/projects", (req, res, next) => {
    var filters = {
      attributes: ["ID", "Title"],
      where: {},
      include: [
        {
          model: Model.KeyWordsByProject,
          as: 'KeyWord'
        }
      ]
    }

    const states = req.body.filters.states
    if (states.length > 0) {
      filters.where.state = { [Op.in]: [] }
      states.forEach(state => {
        filters.where.state[Op.in].push(state)
      })
    }
    const periods = req.body.filters.periods
    if (periods.length > 0) {
      filters.where.year = { [Op.in]: [] }
      periods.forEach(period => {
        filters.where.year[Op.in].push(period)
      })
    }
    const sections = req.body.filters.sections
    if (sections.length > 0) {
      var f = {
        model: Model.Affiliated,
        as: "Section",
        where: {}
      }
      f.where.SectionName = { [Op.in]: [] }
      sections.forEach(section => {
        f.where.SectionName[Op.in].push(section)
      })
      filters.include.push(f)
    }
    const types = req.body.filters.types
    if (types.length > 0) {
      filters.where.typename = { [Op.in]: [] }
      types.forEach(type => {
        filters.where.typename[Op.in].push(type)
      })
    }
    const languages = req.body.filters.languages
    if (languages.length > 0) {
      filters.where.language = { [Op.in]: [] }
      languages.forEach(language => {
        filters.where.language[Op.in].push(language)
      })
    }
    const owner = req.body.filters.owner
    if (owner) {
      filters.where.UserID_Owner = owner
    }
    const student = req.body.filters.student
    if (student) {
      var f = {
        model: Model.User,
        as: "Student",
        where: {}
      }
      f.where.ID = student
      filters.include.push(f)
    }
    Project.findAll(filters).then(projects => {
      res.send(JSON.stringify(projects))
    })
  })




  app.get("/api/project/:id", (req, res, next) => {
    const includes = {
      include: [
        {
          model: Model.Affiliated,
          as: 'Section',
          attributes: ["SectionName"]
        },
        {
          model: Model.User,
          as: 'RespInt',
          attributes: ["ID", "Name", "FirstName"]
        },
        {
          model: Model.Expert,
          as: 'Experts'
        },
        {
          model: Model.Externe,
          as: 'RespExt'
        },
        {
          model: Model.KeyWordsByProject,
          as: 'KeyWord',
          attributes: ["KeyWordsWord"]
        },
        {
          model: Model.LinkAndRef,
          as: 'Link',
          attributes: ["Link"]
        },
        {
          model: Model.User,
          as: 'Student',
          attributes: ["ID", "Name", "FirstName"]
        }
      ]
    }
    Project.findByPk(req.params.id, includes).then(project => {
      res.send(JSON.stringify(project))
    })
  })

  app.post("/api/choices", (req, res, next) => {
    stdID = req.body.studentID;
    Project.findAll({
      include: [
        {
          model: Choices,
          as: 'Choices',
          where: {
            UserID: stdID,
          },
        }
      ],
      order: [
        [{ model: 'Model.Choices', as: 'Choices' }, 'Weight', 'DESC']
      ]
    }).then(project => {
      log.log('info', ' user ' + stdID + ' is listing his choices') 
      res.send(JSON.stringify(project))
    })
  })

}
