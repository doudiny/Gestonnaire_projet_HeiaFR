import { Container } from 'unstated';
import * as C from "../constants";

export default class FilterContainer extends Container {
  state = {
    states: [],
    periods: [],
    sections: [],
    types: [],
    languages: [],
    owner: null,
    student: null
  };

  clearFilters = () => {
    this.setState(state => {
      state.states = [];
      state.periods = [];
      state.sections = [];
      state.types = [];
      state.languages = [];
      state.owner = null;
      state.student = null;
      return state;
    })
  }

  toggleElement = (where, what) => {
    this.setState(state => {
      if (state[where].includes(what)) {
        state[where].pop(what);
      } else {
        state[where].push(what);
      }
      return state;
    });
  };

  setUser = (role, user) => {

    this.setState(state => {
      if (state[role] != user) {
        state[role] = user;
        return state;
      }
    });
  }
  
  setToSee = (states, userid) => {
    this.setState({ states: states });
    this.setState({ owner: userid });
  };

}