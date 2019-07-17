import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import SideBar from './navBar/sideBar';
import Error from "./errors";
import * as C from "../constants";
// pages 
import MainNewProject from './pages/project/mainNewProject';
import MobileHeader from "./navBar/MobileHeader"
import MainContent from './mainContent/mainContent';
import LoginComponent from './pages/loginPage/loginComponent';
//container
import { Provider, Subscribe } from 'unstated';
import AuthContainer from '../states/authContainer';
import NavContainer from '../states/navContainer';
import ProjectContainer from '../states/projectContainer';
import FilterContainer from '../states/filterContainer';
import AttributionContainer from '../states/attributionContainer';

class App extends Component {

  constructor(props){
    super(props)
    this.handleWrapperClick.bind(this);
  }


  handleWrapperClick(e,navContainer){
    navContainer.hideLoginPopup()
    if(navContainer.state.userMenuState){
      navContainer.toggleUserMenu()
    }
  }

  render() {
    return (
      <Router>
        <Provider>
          <Subscribe to={[NavContainer, AuthContainer, ProjectContainer, FilterContainer, AttributionContainer]}>
            {(navContainer, authContainer, projectContainer, filterContainer, attributionContainer) => (
              <Switch>
                <Route path="/login" render={(props) =>
                  <div>
                    {
                      (authContainer.state.role === null || authContainer.state.role === 'Visiteur') &&
                      <LoginComponent authContainer={authContainer} />
                    }
                    {
                      (authContainer.state.role === 'Professeur' || authContainer.state.role === 'Responsable') && !authContainer.state.loading &&
                      <Redirect to={C.pages.finished.path} />
                    }
                  </div>
                } />
                <Route path="/error/:code" render={(props) =>
                  <Error {...props} />
                } />
                <Route exact strict path={"/:page/:display?"} render={(props) =>
                  <div>
                    <div className={"page-wrapper" +(navContainer.state.loginPopupState?" blur":"")} onClick={(e)=>this.handleWrapperClick(e,navContainer)}>
                    <OffCanvas width={300} transitionDuration={300} effect={"push"} isMenuOpened={navContainer.state.sideBarState} position={"left"} className="offcanvas-wrapper">
                      <OffCanvasMenu className="offcanvas-menu " >
                        <SideBar {...props} navContainer={navContainer} projectContainer={projectContainer} authContainer={authContainer} attributionContainer={attributionContainer}/>
                      </OffCanvasMenu>
                      <OffCanvasBody className={"offcanvas-body" + (navContainer.state.sideBarState ? " sidebar-open" : "")}>
                        <MobileHeader navContainer={navContainer} />
                        <MainContent {...props} navContainer={navContainer} filterContainer={filterContainer} authContainer={authContainer} projectContainer={projectContainer} />
                        {
                          (authContainer.state.role === 'Professeur' || authContainer.state.role === 'Responsable') &&
                          <MainNewProject auth={authContainer} proj={projectContainer} />
                        }
                        
                      </OffCanvasBody>
                    </OffCanvas>
                    </div>
                    {navContainer.state.loginPopupState &&
                      <LoginComponent authContainer={authContainer} navContainer={navContainer} />
                    }
                  </div>
                } />
                <Route path="/" render={(props) =>
                  <Redirect to={C.pages.finished.path} />
                } />
              </Switch>
            )}
          </Subscribe>
        </Provider>
      </Router>
    )
  }
}

export default App;