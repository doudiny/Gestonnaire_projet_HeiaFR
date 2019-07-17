import React, { Component } from 'react';
import * as C from "../../constants";
import { withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

class Display extends Component {
    constructor(props) {
        super(props);
        this.genMenuItems = this.genMenuItems.bind(this);

    }
    

    genMenuItems(){
      const { t } = this.props;
      {return this.props.displays.map((p) => {    
          return (<NavLink exact className="nav-button" key={p.path} to={'/'+this.props.match.params.page + p.path} onClick={this.handleClick}>{t(p.text)}</NavLink>) 
      })}
      
    }


  render() {
    const { t } = this.props;

    if(this.props.displays == undefined || this.props.displays.length < 2){return null};

    return (
      <div className="page-menu">
        <h2 className="sidebar-title">{t("SideBar.Display.Title")}</h2>
        {this.genMenuItems()}
      </div>
    )
  }
}
export default withTranslation("common")(Display);