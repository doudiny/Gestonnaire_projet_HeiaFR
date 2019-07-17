import React, { Component } from "react"
import MainMenu from "./mainMenu"
import Header from "./header"
import * as C from "../../constants"
import { Redirect } from "react-router-dom"
import { withTranslation } from "react-i18next"
import PageMenu from "./Display"
import Actions from "./Actions"
import UserMenu from "./UserMenu"
import { Route } from "react-router-dom"

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.cleanActions = this.cleanActions.bind(this)
  }

  getPageFromObject(obj, path) {
    return Object.values(obj).find(page => {
      return page.path == "/" + path
    })
  }

  checkPath(path) {
    var page = this.getPageFromObject(C.pages, path)
    if (page != undefined) {
      this.props.navContainer.setPageName(page.text)
      if(!this.props.navContainer.state.mainMenuState){
        if(this.props.authContainer.state.role==C.role.guest){
          this.props.navContainer.setAction(C.nav.action.none)
        }else{
          this.props.navContainer.setAction(C.nav.action.menu)
        }
        
      }
      
    } else {
      page = this.getPageFromObject(C.subPages, path)
      if (page != undefined) {
        this.props.navContainer.setPageName(page.text)
        this.props.navContainer.setAction(C.nav.action.back)
      }
    }
    return page
  }

  checkDisplay(pageInfo, path) {
    path = path == undefined ? "" : path
    return pageInfo.displays.find(d => {
      return d.path == "/" + path
    })
  }
  
  cleanActions(actions){
    if(actions == undefined || actions.length == 0){return actions}
    return actions.filter((a) => {    
      if(a.roles.includes(this.props.authContainer.state.role)){
        return true
      }else if(a.roles.length == 0){
        return true
      }
      return false
    })
  }

  render() {
    const page = this.props.match.params.page
    const display = this.props.match.params.display
    var displayInfo
    var pageInfo = this.checkPath(page)
    if (pageInfo == undefined) {
      return <Redirect to="/error/NotFound" />
    }
    var isSubPage = pageInfo.displays == undefined

    this.props.navContainer.setPageName(pageInfo.text)

    var permissionOK = pageInfo.roles.includes(
      this.props.authContainer.state.role
    )
    if (!permissionOK) {
      return <Redirect to={C.pages.finished} />
    }

    if (!isSubPage) {
      //Auto redirect to default page display option if none specified.
      if (display == undefined && pageInfo.displays.length > 1) {
        return <Redirect to={"/" + page + pageInfo.displays[0].path} />
      }
      displayInfo = this.checkDisplay(pageInfo, display)
      if (displayInfo == undefined) {
        return <Redirect to="/error/NotFound" />
      }
    }
    var actions = this.cleanActions(isSubPage ? pageInfo.actions : displayInfo.actions)
    var batchActions = this.cleanActions(isSubPage ? [] : displayInfo.batchActions)

    return (
      <nav className="side-bar">
        <Header {...this.props} container={this.props.navContainer} />
        <MainMenu
          container={this.props.navContainer}
          authContainer={this.props.authContainer}
        />
        <div className="side-bar-content">
          <PageMenu {...this.props} displays={pageInfo.displays} navContainer={this.props.navContainer} />
          <Actions
            {...this.props}
            actions={actions}
            batchActions={batchActions}
            authContainer={this.props.authContainer}
            projectContainer={this.props.projectContainer}
          />
        </div>
        <UserMenu {...this.props} navContainer={this.props.navContainer} attributionContainer={this.props.attributionContainer} />
      </nav>
    )
  }
}
export default withTranslation("common")(SideBar)
