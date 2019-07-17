import React, { Component } from 'react';
import * as C from "../../constants";
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Action from './NavBarFetchAction.jsx';
import { withRouter } from 'react-router-dom';
import { ProjectsList } from '../mainContent/ProjectsList'

class Display extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    
  }

  handleClick(e) {
    const { attributionContainer, authContainer, projectContainer } = this.props;
    switch (e.target.id) {
      case "SideBar.Actions.LaunchAttribution":
        Action.launchAttribution(attributionContainer.state.selectedFiliere, attributionContainer.state.selectedTypes, attributionContainer.state.selectedYear, authContainer.state.token, attributionContainer, authContainer)
        break;
      case 'SideBar.Actions.SaveAttribution':
        Action.confirmAttribution(authContainer, attributionContainer)
        break;
      case 'SideBar.Actions.Cancel':
        attributionContainer.resetAttribution()
        this.props.history.goBack()
        break;
      case 'SideBar.Actions.Save':
        e.preventDefault(); // prevent page refresh on submit
        Action.saveProject(authContainer, projectContainer)
        this.props.history.push('/MesProjets/Saisie')
        break;
      case 'SideBar.Actions.ToValidation':
        Action.updateProjects(authContainer, projectContainer, 'VALIDATION')
        projectContainer.clearToSave();
        break;
      case 'SideBar.Actions.ToEntry':
        Action.updateProjects(authContainer, projectContainer, 'SAISIE')
        projectContainer.clearToSave();
        break;
      case 'SideBar.Actions.ToValid':
        Action.updateProjects(authContainer, projectContainer, 'VALIDE')
        projectContainer.clearToSave();
        break;
      case 'SideBar.Actions.ToContest':
        Action.updateProjects(authContainer, projectContainer, 'CONCOURS')
        projectContainer.clearToSave();
        break;
      case 'SideBar.Actions.AddToChoices':
        projectContainer.clearToSave();
        Action.addToChoices(authContainer, projectContainer)
        break;
      case 'SideBar.Actions.RemoveFromChoices':
        projectContainer.clearToSave();
        Action.removeFromChoices(authContainer, projectContainer)
        break;
      case 'SideBar.Actions.SaveChoices':
        projectContainer.clearToSave();
        Action.updateChoices(authContainer, projectContainer)
        break;
      case 'SideBar.Actions.Delete':
        projectContainer.clearToSave();
        Action.deleteProjects(authContainer, projectContainer)
        break;
    }
  }

  genActionsList(actions) {
    const { t } = this.props;
    if (actions == undefined || actions.length == 0) { return null };
    return actions.map((a) => {
      return (
        <Link key={a.text} to={a.path} className="nav-action" onClick={this.handleClick} id={a.text}><span className={a.icon} />{t(a.text)}</Link>
      )
    })
  }

  genBatchActionsList(actions, isSelectd) {
    const { t } = this.props;
    var batchEnable = isSelectd ? "" : "disabled";
    if (actions == undefined || actions.length == 0) { return null };
    return actions.map((a) => {
      return (<a key={a.text} className={"nav-action nav-action-batch " + batchEnable} ><span className={a.icon} />{t(a.text)}</a>)
    })
  }

  isThereWork() {
    if (this.props.actions != undefined && this.props.actions.length > 0) {
      return true;
    }
    if (this.props.batchActions != undefined && this.props.batchActions.length > 0) {
      return true;
    }
    return false;
  }

  render() {
    const { t } = this.props;
    const IS_SELECTED = false;

    if (!this.isThereWork()) { return null; }
    return (
      <div className="nav-actions">
        <h2 className="sidebar-title">{t("SideBar.Actions.Title")}</h2>
        {this.genActionsList(this.props.actions)}
        {this.genBatchActionsList(this.props.batchActions, IS_SELECTED)}
      </div>
    )
  }
}
export default withTranslation("common")(Display);