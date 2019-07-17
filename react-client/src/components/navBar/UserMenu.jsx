import React, { Component } from 'react';
import * as C from "../../constants";
import { withTranslation } from 'react-i18next';

class UserMenu extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }

    handleClick(e){
        if(this.props.authContainer.state.role == C.role.guest){
            this.props.navContainer.showLoginPopup();
        }else{
            this.props.navContainer.toggleUserMenu();
        }
        e.stopPropagation()
    }

    handleDisconnect(){
        this.props.authContainer.logout()
        this.props.history.push('/')
    }

    render() {

        const { t } = this.props;

        return (
            <div className={"user-menu" + (this.props.navContainer.state.userMenuState?" open":"")}>
                <div className="user-menu-header" onClick={this.handleClick}>
                    {this.props.authContainer.state.role==C.role.guest ?(
                        <p>
                            <span className={C.nav.action.connect.icon}></span>
                            <span className="user-menu-header-username">{t("SideBar.UserMenu.Connect")}</span>
                        </p> 
                    ):(
                       <p>
                            <span className={C.nav.action.user.icon}></span>
                            <span className="user-menu-header-username">{this.props.authContainer.state.username}</span>
                        </p> 
                    )}
                       
                </div>
                <div className="user-menu-content">
                    <p className="user-menu-content-role">{t("SideBar.UserMenu.Role")+" "+this.props.authContainer.state.role}</p>
                    <p className="user-menu-content-disconnect" onClick={this.handleDisconnect}>
                        <span className={C.nav.action.disconnect.icon}></span>
                        <span className="user-menu-content-disconnect-button" >{t('SideBar.UserMenu.Disconnect')}</span>
                    </p>
                </div>
            </div>
        )
    }
}
export default withTranslation("common")(UserMenu);