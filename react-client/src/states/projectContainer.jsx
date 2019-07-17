import { Container } from 'unstated';

export default class ProjectContainer extends Container {
  state = {
    filiere: [],
    types: [],
    studentSearchin: [],
    respSearchin: [],
    respExtSearchin: [],
    expertSearchin: [],
    tagSearchin: [],
    done: false,
    projectToValidate:[],
    choices:[],
    newProject : {
      title: '',
      abrev : '',
      year : 0,
      nbrStudent : 0,
      language : '',
      mandant : '',
      desc : '',
      type : '',
      filiere: [],
      student : [],
      respInterne : [],
      respExterne : [],
      experts : [],
      tags : [],
      links : []
    }
  };

  async setNewType(type) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.type = type;
      return {newProject}
    })
  }

  async setNewLink(links) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.links = links;
      return {newProject}
    })
  }

  async setNewTags(tags) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.tags = tags;
      return {newProject}
    })
  }

  async setNewExpert(experts) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.experts = experts;
      return {newProject}
    })
  }

  async setNewRespExterne(respExterne) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.respExterne = respExterne;
      return {newProject}
    })
  }

  async setNewRespInterne(respInterne) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.respInterne = respInterne;
      return {newProject}
    })
  }

  async setNewStudent(student) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.student = student;
      return {newProject}
    })
  }

  async setNewFiliere(filiere) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.filiere = filiere;
      return {newProject}
    })
  }

  async setNewDesc(desc) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.desc = desc;
      return {newProject}
    })
  }

  async setNewMandant(mandant) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.mandant = mandant;
      return {newProject}
    })
  }

  async setNewLanguage(language) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.language = language;
      return {newProject}
    })
  }

  async setNewNbrStudent(nbrStudent) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.nbrStudent = nbrStudent;
      return {newProject}
    })
  }

  async setNewYear(year) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.year = year;
      return {newProject}
    })
  }

  async setNewAbrev(abrev) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.abrev = abrev;
      return {newProject}
    })
  }

  async setNewTitle(title) {
    this.setState(prevState => {
      let newProject = Object.assign({}, prevState.newProject);
      newProject.title = title;
      return {newProject}
    })
  }

  async setProjectState(filiere, types) {
    await this.setState({ filiere: filiere });
    await this.setState({ types: types });
    await this.setState({ done: true });
  }

  async setStudentState(students) {
    await this.setState({ studentSearchin: students });
  }

  async setRespState(resp) {
    await this.setState({ respSearchin: resp });
  }

  async setRespExtState(resp) {
    await this.setState({ respExtSearchin: resp });
  }

  async setExpertState(expert) {
    await this.setState({ expertSearchin: expert });
  }

  async setTagState(tag) {
    await this.setState({ tagSearchin: tag });
  }

  async setDone(done) {
    await this.setState({ done: done });
  }

  async addToSave(oneToSave) {
    for(var i = 0; i < this.state.projectToValidate.length; i++){
      if(this.state.projectToValidate[i].toString() === oneToSave.toString()){
        return;
      }
    }
    await this.state.projectToValidate.push(oneToSave)
  }
  async removeToSave(oneToRem) {
    for(var i = 0; i < this.state.projectToValidate.length ; i++){
      if(this.state.projectToValidate[i].toString() === oneToRem.toString()){
        await this.state.projectToValidate.splice(i, 1);
      }
    }
  }

  async clearToSave() {
    this.setState({ projectToValidate: [], done : false });
  }

  async setChoices(choices) {
    this.setState({ choices: choices });
  }


}