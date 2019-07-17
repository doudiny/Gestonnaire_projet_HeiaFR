import React, { Component } from 'react';
import * as C from "../../constants";
import { withTranslation } from 'react-i18next';

class MobileHeader extends Component {


    handleClick(){
        this.props.navContainer.toggleSideBar();
    }

  render() {
    const { t } = this.props;
    return (
      <div className="mobile-header">
        <span className={"mobile-header-action "+ (this.props.navContainer.state.sideBarState?C.nav.action.exit.icon:C.nav.action.menu.icon)}  onClick={this.handleClick.bind(this)}/>
        <h1 className="mobile-header-title">{t(this.props.navContainer.state.pageName)}</h1>
      </div>
    )
  }
}

export default withTranslation("common")(MobileHeader);