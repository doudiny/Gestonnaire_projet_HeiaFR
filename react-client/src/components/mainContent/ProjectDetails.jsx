import React, { Component } from 'react';
import * as C from "../../constants";
import { withTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';

class ProjectDetails extends Component {


  constructor(props) {
    super(props)
    this.getSections.bind(this)
    this.getRespInt.bind(this)
    this.getRespExt.bind(this)
    this.getExperts.bind(this)
    this.getKeyWords.bind(this)
    this.getLinks.bind(this)
    this.getStudents.bind(this)

    this.state = {}
    fetch("/api/project/"+this.props.match.params.id).then(res => {
      if (res.status === 200) {
        res.json().then(json => (this.setState(json)))
      } else {
        NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Erreur', 2000);
      }
    })
  }


  getSections(){
    if(this.state.Section != undefined){
      return this.state.Section.map(section=>{
        return <span className="project-tag">{section.SectionName}</span>
      })
    }
  }

  getRespInt(){
    if(this.state.RespInt != undefined){
      return this.state.RespInt.map(resp=>{
        return <span>{resp.FirstName+" "+resp.Name}</span>
      })
    }
  }

  getRespExt(){
    if(this.state.RespExt != undefined){
      return this.state.RespExt.map(resp=>{
        return <span>{resp.Name}</span>
      })
    }
  }

  getExperts(){
    if(this.state.Experts != undefined){
      return this.state.Experts.map(expert=>{
        return <span>{expert.FirstName+' '+expert.Name}</span>
      })
    }
  }

  getKeyWords(){
    if(this.state.KeyWord != undefined){
      return this.state.KeyWord.map(keyword=>{
        return <span>{keyword.KeyWordsWord}</span>
      })
    }
  }


  getLinks(){
    if(this.state.Link != undefined){
      return this.state.Link.map(link=>{
        return <a href={link.LinkAndRefLink}><span>{link.LinkAndRefLink}</span></a>
      })
    }
  }


  getStudents(){
    if(this.state.Student != undefined){
      return this.state.Student.map(student=>{
        return <span>{student.FirstName+' '+student.Name}</span>
      })
    }
  }



  render() {
    const { t } = this.props;
    var sections = this.getSections()
    var respInts = this.getRespInt()
    var respExts = this.getRespExt()
    var experts = this.getExperts()
    var students = this.getStudents()
    var keywords = this.getKeyWords()
    var links = this.getLinks()


    return (
      <main className="project-container">
      <div className="project-tags">
        <span className="project-tag">{this.state.Year}</span>
        <span className="project-tag">{t(`Project.Type.${this.state.TypeName}`)}</span>
        {sections}
        <span className="project-tag">{this.state.State}</span>
      </div>
      <h1>{this.state.Title}</h1>
      <p className="project-alias">{this.state.Abreviation}</p>
      <div className="project-description">{this.state.Description}</div>
      <div className="project-infos">

      <div>
        <h2 className="project-infos-label">{t("Project.ResponsibleInternal")}</h2>
        {respInts}
      </div>
      <div>
        <h2 className="project-infos-label">{t("Project.ResponsibleExternal")}</h2>
        {respExts}
      </div>
      <div>
        <h2 className="project-infos-label">{t("Project.Students")}</h2>
        {students}
      </div>
      <div>
        <h2 className="project-infos-label">{t("Project.KeyWords")}</h2>
        {keywords}
      </div>
      <div>
        <h2 className="project-infos-label">{t("Project.Experts")}</h2>
        {experts}
      </div>
      <div>
        <h2 className="project-infos-label">{t("Project.Language")}</h2>
        <span className="project-infos-data">{this.state.Language}</span>
      </div>
      <div>
        <h2 className="project-infos-label">{t("Project.Business")}</h2>
        <span className="project-infos-data">{this.state.ClientName}</span>
      </div>
      <div>
        <h2 className="project-infos-label">{t("Project.NbrStudents")}</h2>
        <span className="project-infos-data">{this.state.NbrMaxStudent}</span>
      </div>
      <div className="project-infos-links">
        <h2 className="project-infos-label">{t("Project.Links")}</h2>
        {links}
      </div>
      </div>
      </main>
        
    )
  }
}

export default withTranslation("common")(ProjectDetails);