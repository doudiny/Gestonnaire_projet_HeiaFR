import { Container } from "unstated"
import * as C from "../constants"

export default class NavContainer extends Container {
  state = {
    pageName: "Projets terminés",
    action: C.nav.action.menu,
    sideBarState: C.nav.menuState.open,
    mainMenuState: C.nav.menuState.close,
    userMenuState: C.nav.menuState.close,
    loginPopupState: C.nav.menuState.close
  }

  setAction = a => {
    this.setState(state => {
      if (state.action != a) {
        state.action = a
        return state
      }
    })
  }

  setPageName = pageName => {
    this.setState(state => {
      if (state.pageName != pageName) {
        state.pageName = pageName
        return state
      }
    })
  }

  toggleSideBar = () => {
    this.setState(state => {
      state.sideBarState = !state.sideBarState
      return state
    })
  }

  toggleMainMenu = () => {
    this.setState(state => {
      state.mainMenuState = !state.mainMenuState
      if(state.mainMenuState){
        state.action = C.nav.action.exit;
      }else{
        state.action = C.nav.action.menu;
      }
      return state
    })
  }

  toggleUserMenu = () => {
    this.setState(state => {
      state.userMenuState = !state.userMenuState
      return state
    })
  }

  showLoginPopup = () => {
    this.setState(state => {
      if (state.loginPopupState == C.nav.menuState.close) {
        state.loginPopupState = C.nav.menuState.open;
        state.mainMenuState = C.nav.menuState.close;
        return state
      }
    })
  }

  hideLoginPopup = () => {
    this.setState(state => {
      if (state.loginPopupState== C.nav.menuState.open) {
        state.loginPopupState = C.nav.menuState.close;
        return state
      }
    })
  }

}
