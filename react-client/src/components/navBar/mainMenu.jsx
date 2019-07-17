import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { withTranslation } from "react-i18next"
import * as C from "../../constants"
import {NotificationContainer} from 'react-notifications';

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    concole.log("mainmenu click")
    this.props.container.toggleMainMenu()
  }

  render() {
    const { t } = this.props
    return (
      <div
        className={
          "main-menu" +
          (this.props.container.state.mainMenuState ? " open" : "")
        }>
          <NotificationContainer/>
        {Object.values(C.pages).map(p => {
          if (p.roles.includes(this.props.authContainer.state.role)) {
            return (
              <NavLink
                className="nav-button"
                key={p.path}
                to={p.path}
                onClick={this.handleClick}>
                {t(p.text)}
              </NavLink>
            )
          }
        })}
      </div>
    )
  }
}

export default withTranslation("common")(MainMenu)
