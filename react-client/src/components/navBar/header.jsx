import React, { Component } from 'react';
import * as C from "../../constants";
import { withTranslation } from 'react-i18next';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    if(this.props.container.state.action == C.nav.action.menu || this.props.container.state.action == C.nav.action.exit){
      this.props.container.toggleMainMenu();
    }else{
      this.props.history.goBack();
    }
  }

  genTitle(){
    const { t } = this.props;
      if(this.props.container.state.mainMenuState){
          return <h1>{t('MainMenu.Title')}</h1>;
      }
      return <h1>{t(this.props.container.state.pageName)}</h1>;
  }

  render() {
    return (
                <div className={"nav-header"+(this.props.container.state.mainMenuState?" open":"")} onClick={this.handleClick}>
                    <span className={this.props.container.state.action.icon}/>
                    {this.genTitle()}
                </div>
    )
  }
}
export default withTranslation("common")(Header);