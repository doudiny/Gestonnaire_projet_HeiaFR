import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProjectForm from './projectForm';
import AttributionForm from './../attributionPage/attributionFormComponent';
import * as C from "../../../constants";


class MainNewProject extends Component {
  render() {
    const { auth, proj } = this.props;
    return (
      <div className="main">

        <Route path={C.subPages.add.path} render={(props) =>
          <ProjectForm authContainer={auth} projectContainer={proj} />
        } />

      </div>
    )
  }
}

export default MainNewProject;
