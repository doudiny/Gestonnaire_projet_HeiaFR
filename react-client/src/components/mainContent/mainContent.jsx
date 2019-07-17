import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProjectList from './ProjectsList';
import ProjectDetails from './ProjectDetails';
import AttributionForm from './../pages/attributionPage/attributionFormComponent';
import AttributionList from './../pages/attributionPage/attributionPropositionPage';
import * as C from "../../constants";
import AttributionContainer from '../../states/attributionContainer';
import { Subscribe } from 'unstated';


class MainContent extends Component {
  render() {
    return (
      <div className="main">

        <Route path={C.pages.finished.path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} owner={this.props.authContainer.state.userId} state={["PUBLIE"]} listOptions={{select:false}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.myProjects.path + C.pages.myProjects.displays[0].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} owner={this.props.authContainer.state.userId} state={["Saisie"]} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.myProjects.path + C.pages.myProjects.displays[1].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} owner={this.props.authContainer.state.userId} state={[]} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.subPages.view.path + "/:id"} render={(props) =>
          <ProjectDetails {...props} />
        } />
        <Route path={C.pages.administration.path + C.pages.administration.displays[0].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} state={['VALIDATION']} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.administration.path + C.pages.administration.displays[1].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} state={['VALIDE']} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.administration.path + C.pages.administration.displays[2].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} state={['CONCOURS']} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.administration.path + C.pages.administration.displays[3].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} state={['ATTRIBUE']} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.administration.path + C.pages.administration.displays[4].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} state={['TERMINE']} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.contest.path + C.pages.contest.displays[0].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} state={['CONCOURS']} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Route path={C.pages.contest.path + C.pages.contest.displays[2].path} render={(props) =>
          <ProjectList projects={C.projects} filterContainer={this.props.filterContainer} student={this.props.authContainer.state.userId} state={['CONCOURS']} listOptions={{select:true}} projectContainer={this.props.projectContainer}/>
        } />
        <Subscribe to={[AttributionContainer]}>

          {(attributionContainer) => (
            <div>
              <Route path={C.pages.attribution.path + C.pages.attribution.displays[2].path} render={(props) =>
                <AttributionForm {...props} attributionContainer={attributionContainer} authContainer={this.props.authContainer} />
              } />
              <Route path={C.actions.attribution.path} render={(props) =>
                <AttributionList {...props} attributionContainer={attributionContainer} />
              } />
            </div>
          )}


        </Subscribe>


      </div>
    )
  }
}

export default MainContent;